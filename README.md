# saranya-govindaraj.github.io

Personal site of **Saranya Govindaraj** — Senior Data Scientist at Ericsson, Stockholm.
Built with [Jekyll](https://jekyllrb.com/) using the [al-folio](https://github.com/alshedivat/al-folio) theme.

## Local development

Requires Ruby 3.3+ and Bundler.

```bash
bundle install
bundle exec jekyll serve
```

Site will be available at `http://127.0.0.1:4000`.

## Deploying to GitHub Pages

1. Create a GitHub repository named **`saranya-govindaraj.github.io`** (replace with your actual GitHub username if different).
2. Initialize and push this directory:

   ```bash
   git init -b main
   git add .
   git commit -m "Initial commit: personal site"
   git remote add origin https://github.com/saranya-govindaraj/saranya-govindaraj.github.io.git
   git push -u origin main
   ```

3. In the repo on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The workflow at `.github/workflows/deploy.yml` will build and publish to a `gh-pages` branch on every push to `main`.
5. Then in **Settings → Pages**, set the source to the `gh-pages` branch (`/ (root)`).

After the first run, the site will be live at `https://saranya-govindaraj.github.io`.

## Customizing content

| What | Where |
| --- | --- |
| Hero / About intro | `_pages/about.md` |
| Tagline, name, footer, blog name | `_config.yml` |
| Photo (`prof_pic.jpg`) | `assets/img/prof_pic.jpg` (replace with your headshot) |
| Resume PDF (download button) | `assets/pdf/saranya-govindaraj-resume.pdf` |
| CV (experience, education, skills, certifications) | `_data/cv.yml` |
| Projects | `_projects/*.md` |
| Patents & publications | `_pages/publications.md` |
| Thesis supervision | `_pages/supervision.md` |
| Blog posts | `_posts/YYYY-MM-DD-title.md` |
| News updates (homepage feed) | `_news/*.md` |
| Social links | `_data/socials.yml` |

## Replacing the profile photo

Place your headshot at `assets/img/prof_pic.jpg` (the file already exists as a placeholder). Square images work best with the circular crop enabled in `_pages/about.md`.

## Theme

Defaults to **dark mode** for first-time visitors (see `assets/js/theme.js`). Visitors can toggle light/dark via the navbar.

## License

Theme: MIT (al-folio). Personal content: © Saranya Govindaraj.
