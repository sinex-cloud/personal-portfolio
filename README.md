# ahmed-brini-portfolio

Personal portfolio of Ahmed Brini, Software Engineer (Cloud & DevOps). One static page built with plain HTML, CSS and JavaScript. It has no framework, no build step and no tracking.

## Run locally

```bash
python3 -m http.server 8765
```

Then open http://127.0.0.1:8765.

## Files

| File | What it is |
|---|---|
| `index.html` | All content, plus an inline SVG icon sprite |
| `styles.css` | Dark and light themes, layout, motion |
| `main.js` | Theme toggle, scroll reveals, pipeline replay, terminal typing |
| `og.html` → `og.png` | Social preview image (the regenerate command is in `og.html`) |
| `Ahmed_Brini_Resume.pdf` | The resume behind the download buttons |

The pipeline replay uses real data from GitLab pipeline #2911155655 of `brinidev/gcp-delivery-pipeline`.

## Deploy

Vercel deploys every push to `main`. `vercel.json` sets the framework to "Other", so there is no build step. It also redirects the old `/cv.pdf` link to the current resume.
