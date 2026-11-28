(() => {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("js");

  // Scroll story: the sticky pipeline follows whichever step is in the middle of the screen
  const stage = document.querySelector("[data-stage]");
  if (stage) {
    const steps = [...document.querySelectorAll(".step")];
    const rows = [...stage.querySelectorAll(".row")];
    const con = stage.querySelector("[data-console]");
    const status = stage.querySelector(".status");
    const timer = stage.querySelector(".st-timer");
    const secs = ["0 s", "0 s", "17 s", "48 s", "84 s", "84 s"];
    const show = (n) => {
      steps.forEach((s) => s.classList.toggle("on", +s.dataset.step === n));
      rows.forEach((r) => {
        const s = +r.dataset.s;
        r.classList.toggle("on", s === n);
        r.classList.toggle("done", s < n);
      });
      const src = steps[n - 1].querySelector(".console");
      con.innerHTML = src ? src.innerHTML : "";
      const done = n === 5;
      status.dataset.state = done ? "passed" : "running";
      status.querySelector(".status-text").textContent = done ? "passed" : "running";
      timer.textContent = secs[n];
    };
    show(1);
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) show(+e.target.dataset.step); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    steps.forEach((s) => io.observe(s));
  }

  // Terraform approval gate (a demo of the flow, not a live system)
  const gate = document.querySelector("[data-gate]");
  if (gate) {
    const cap = gate.querySelector("[data-gate-cap]");
    const ok = gate.querySelector("[data-approve]");
    const undo = gate.querySelector("[data-undo]");
    const gt = gate.querySelector(".g-gate-text");
    const at = gate.querySelector(".g-apply-text");
    const set = (approved) => {
      gate.dataset.state = approved ? "approved" : "waiting";
      ok.hidden = approved; undo.hidden = !approved;
      gt.textContent = approved ? "approved by a person" : "waiting for a person";
      at.textContent = approved ? "runs now" : "blocked";
      cap.textContent = approved ? "A person approved, so terraform apply is allowed to run. Without that click, it never does." : "Nothing is applied until a person approves.";
    };
    ok.addEventListener("click", () => set(true));
    undo.addEventListener("click", () => set(false));
  }


  // Hero: the real pipeline, replayed. Finished state is the default; JS resets it and runs it once.
  const dep = document.querySelector("[data-deploy]");
  if (dep) {
    const route = dep.querySelector(".route");
    const st = dep.querySelector(".status");
    const stText = dep.querySelector(".status-text");
    const tm = dep.querySelector(".d-timer");
    const btn = dep.querySelector("[data-run]");
    const START = 0.5, SCALE = 0.07, END = 8;
    let raf = 0, id = 0;
    const setSt = (s) => { st.dataset.state = s; stText.textContent = s; };
    const run = () => {
      const me = ++id;
      cancelAnimationFrame(raf);
      route.classList.remove("run", "reset");
      void route.offsetWidth;
      route.classList.add("reset");
      void route.offsetWidth;
      route.classList.remove("reset");
      route.classList.add("run");
      setSt("running"); tm.textContent = "0 s";
      const t0 = performance.now();
      const tick = (now) => {
        if (me !== id) return;
        const t = (now - t0) / 1000;
        tm.textContent = Math.floor(Math.max(0, Math.min(84, (t - START) / SCALE))) + " s";
        if (t < 7.2) { raf = requestAnimationFrame(tick); return; }
        setSt("passed"); tm.textContent = tm.dataset.final;
      };
      raf = requestAnimationFrame(tick);
    };
    if (reduce) { btn.hidden = true; }
    else {
      route.classList.add("reset"); setSt("running"); tm.textContent = "0 s";
      setTimeout(run, 1500);
      btn.addEventListener("click", run);
    }
  }

  // Cursor-lit dot grid in the hero
  const hero = document.querySelector(".hero");
  if (hero && !reduce && matchMedia("(hover: hover)").matches) {
    let pend = 0, mx = 0, my = 0;
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top;
      if (!pend) pend = requestAnimationFrame(() => { pend = 0; hero.style.setProperty("--mx", mx + "px"); hero.style.setProperty("--my", my + "px"); });
    });
  }

  // Scroll progress bar
  const bar = document.querySelector(".progress i");
  const prog = () => { const m = document.documentElement.scrollHeight - innerHeight; bar.style.transform = "scaleX(" + (m > 0 ? scrollY / m : 0) + ")"; };
  addEventListener("scroll", prog, { passive: true }); prog();

  // Reveal on scroll, then drop the classes so hover transforms work
  if (!reduce) {
    const items = document.querySelectorAll(".stat, .cards li, .xp-card, .built li, .edu > div, .gate, .tf-text .btn, .prod");
    const rio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      rio.unobserve(e.target);
      e.target.classList.add("in");
      setTimeout(() => e.target.classList.remove("reveal", "in"), 1500);
    }), { threshold: 0.15 });
    items.forEach((el) => {
      const sib = [...el.parentElement.children].indexOf(el);
      el.style.setProperty("--rd", Math.min(sib, 4) * 0.09 + "s");
      el.classList.add("reveal");
      rio.observe(el);
    });
  }

  // Count-up numbers
  document.querySelectorAll("[data-n]").forEach((el) => {
    const n = +el.dataset.n;
    if (reduce) return;
    const cio = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      cio.disconnect();
      const t0 = performance.now(), dur = 1300;
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      el.textContent = "0";
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    cio.observe(el);
  });

  // Copy the email address. If the clipboard is blocked, select the address instead.
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    const label = btn.querySelector(".copy-label");
    btn.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(btn.dataset.copy); label.textContent = "Copied"; }
      catch (e) {
        const r = document.createRange(); r.selectNodeContents(document.querySelector(".email"));
        const s = getSelection(); s.removeAllRanges(); s.addRange(r); label.textContent = "Selected";
      }
      setTimeout(() => (label.textContent = "Copy"), 1600);
    });
  });
})();
