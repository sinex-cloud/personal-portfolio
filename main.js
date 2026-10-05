(() => {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const onceVisible = (el, fn, threshold = 0.35) => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { io.disconnect(); fn(); }
    }, { threshold });
    io.observe(el);
  };

  // Theme toggle (initial theme is set by the inline script in <head>)
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Header gets a background once the page scrolls
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal: hero items right away, everything else when it scrolls into view
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((el) => {
    if (el.closest(".hero")) requestAnimationFrame(() => el.classList.add("in"));
    else io.observe(el);
  });

  // Cursor light: green dots in the hero, soft light inside tiles
  if (!reduce && matchMedia("(hover: hover)").matches) {
    const hero = document.querySelector(".hero");
    const bg = hero.querySelector(".hero-bg");
    hero.addEventListener("pointermove", (e) => {
      const r = bg.getBoundingClientRect();
      bg.style.setProperty("--mx", `${e.clientX - r.left}px`);
      bg.style.setProperty("--my", `${e.clientY - r.top}px`);
      bg.style.setProperty("--spot-on", "1");
    });
    hero.addEventListener("pointerleave", () => bg.style.setProperty("--spot-on", "0"));

    document.addEventListener("pointermove", (e) => {
      const tile = e.target.closest && e.target.closest(".tile");
      if (!tile) return;
      const r = tile.getBoundingClientRect();
      tile.style.setProperty("--x", `${e.clientX - r.left}px`);
      tile.style.setProperty("--y", `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  // Pipeline replay. Job times are real (pipeline #2911155655), compressed about 15x.
  const pipe = document.querySelector("[data-pipeline]");
  if (pipe) {
    const stages = [...pipe.querySelectorAll(".stage")];
    const status = pipe.querySelector(".status");
    const statusText = pipe.querySelector(".status-text");
    const timer = pipe.querySelector(".console-timer");
    const bar = pipe.querySelector(".console-progress");
    const replay = pipe.querySelector("[data-replay]");
    const total = stages.reduce((sum, s) => sum + Number(s.dataset.secs || 0), 0);
    let run = 0;

    const setStatus = (state) => { status.dataset.state = state; statusText.textContent = state; };
    const tween = (ms, fn) => new Promise((done) => {
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / ms);
        fn(p);
        if (p < 1) requestAnimationFrame(step); else done();
      };
      requestAnimationFrame(step);
    });

    const play = async () => {
      const id = ++run;
      stages.forEach((s) => (s.dataset.state = "pending"));
      setStatus("running");
      timer.textContent = "0 s";
      bar.style.transform = "scaleX(0)";
      let elapsed = 0;
      await wait(350);

      for (const s of stages) {
        if (id !== run) return;
        s.dataset.state = "running";
        const secs = Number(s.dataset.secs || 0);
        await tween(secs ? secs * 65 : Number(s.dataset.ms), (p) => {
          if (id !== run) return;
          const now = elapsed + secs * p;
          timer.textContent = `${Math.floor(now)} s`;
          bar.style.transform = `scaleX(${now / total})`;
        });
        if (id !== run) return;
        elapsed += secs;
        s.dataset.state = "passed";
      }
      setStatus("passed");
      timer.textContent = timer.dataset.final;
    };

    if (reduce) {
      replay.hidden = true;
    } else {
      onceVisible(pipe, () => setTimeout(play, 500));
      replay.addEventListener("click", play);
    }
  }

  // Terminal: type the command, then print the real log line by line
  const term = document.querySelector("[data-terminal]");
  if (term && !reduce) {
    const lines = [...term.querySelectorAll(".ln")];
    const cmd = term.querySelector(".cmd-text");
    const full = cmd.textContent;
    lines.forEach((l) => l.classList.add("hide"));

    onceVisible(term, async () => {
      lines[0].classList.remove("hide");
      cmd.textContent = "";
      cmd.classList.add("typing");
      for (const ch of full) { cmd.textContent += ch; await wait(16); }
      cmd.classList.remove("typing");
      for (const l of lines.slice(1)) {
        await wait(l.textContent.trim() ? 120 : 60);
        l.classList.remove("hide");
      }
    }, 0.3);
  }

  // Mini flow lights up step by step
  const mini = document.querySelector("[data-mini]");
  if (mini && !reduce) {
    const steps = [...mini.querySelectorAll(".stage")];
    steps.forEach((s) => (s.dataset.state = "pending"));
    onceVisible(mini, async () => {
      for (const s of steps) {
        s.dataset.state = "running";
        await wait(260);
        s.dataset.state = "passed";
      }
    }, 0.5);
  }

  // Copy email
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    const label = btn.querySelector(".copy-label");
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        label.textContent = "Copied";
        setTimeout(() => (label.textContent = "Copy"), 1600);
      } catch (e) {
        location.href = `mailto:${btn.dataset.copy}`;
      }
    });
  });
})();
