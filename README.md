# saranya-govindaraj.github.io

Personal site of **Saranya Govindaraj** — Senior Data Scientist at Ericsson, Stockholm.
Built with [Jekyll](https://jekyllrb.com/) using the [al-folio](https://github.com/alshedivat/al-folio) theme.

## Local development

The site is built with Jekyll (al-folio theme) and depends on a large set of
plugins — including native-extension gems (`jekyll-imagemagick`) and a
git-sourced gem (`jekyll-terser`). Because of that, the most reliable way to run
it on a fresh machine is inside a container. Both paths below produce the site
at `http://127.0.0.1:4000`.

### Option A — Container (recommended, no local Ruby needed)

This avoids every Ruby/toolchain issue and works with either Podman or Docker
(substitute `docker` for `podman` if that's what you have).

```bash
# 1. One-time: install all gems into ./vendor/bundle (gitignored)
podman run --rm -v "$PWD":/srv/jekyll -w /srv/jekyll jekyll/jekyll:4 \
  sh -c "bundle config set --local path vendor/bundle && bundle install"

# 2. Serve (re-run this any time to start the preview)
podman run --rm -it --name jekyll-preview -p 4000:4000 \
  -v "$PWD":/srv/jekyll -w /srv/jekyll jekyll/jekyll:4 \
  sh -c "bundle config set --local path vendor/bundle && bundle exec jekyll serve --host 0.0.0.0"
```

Stop a detached container with `podman rm -f jekyll-preview`.

> VS Code users can instead "Reopen in Container" — a dev container is already
> configured under `.devcontainer/` and runs `jekyll serve` on attach.

### Option B — Native Ruby

Requires **Ruby 3.3+** and Bundler. The system Ruby shipped with macOS (2.6) is
**too old** and its gem directory is not writable, so you must install a
separate, user-owned Ruby first (e.g. via `rbenv`, `chruby`/`ruby-install`, or
Homebrew). Do not try to `gem install` against the system Ruby.

```bash
# with a modern Ruby active on your PATH:
gem install bundler
bundle install
bundle exec jekyll serve
```

If `bundle install` fails building native gems, make sure you have a working C
toolchain and ImageMagick available (on macOS, up-to-date Xcode Command Line
Tools; on Debian/Ubuntu, the packages listed in `.devcontainer/devcontainer.json`:
`build-essential`, `imagemagick`, `zlib1g-dev`, `ruby-full`).

### Notes on dependencies

- **`Gemfile` / `Gemfile.lock`** — the source of truth for the build. All
  plugins are pinned here, including `jekyll-terser` (installed from GitHub).
- **`requirements.txt`** (`nbconvert`) — only needed if you embed Jupyter
  notebooks via `jekyll-jupyter-notebook`. Not required for the core site.
- **`package.json`** — dev-only Prettier formatting; not needed to build.

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
