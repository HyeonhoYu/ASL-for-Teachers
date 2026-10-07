# ASL for Teachers

A website that helps preservice teachers learn everyday classroom signs in American Sign Language (ASL) and the Deaf culture behind them. Guided by the character Frog Baby.

This is a plain static website (HTML, CSS, and JavaScript). There is nothing to install or build, so it runs on GitHub Pages as is.

## Put it on GitHub Pages

1. Create a new repository on GitHub, for example `asl-for-teachers`.
2. Upload everything in this folder to the repository (on github.com: **Add file > Upload files**, then drag in all files and folders).
3. Go to **Settings > Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose the `main` branch and the `/ (root)` folder, then **Save**.
5. After a minute or two the site appears at `https://<your-username>.github.io/asl-for-teachers/`.

## Try it on your own computer

Open a terminal in this folder and run:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. (Mirror Practice needs `localhost` or a GitHub Pages address to use the camera.)

## Where things are

| Path | What it is |
| --- | --- |
| `index.html` | Home page |
| `start.html` | Start Here: What is ASL, how to use the site, a note on interpreters |
| `learn.html`, `module.html` | The four learning modules |
| `sign.html` | One page per sign, chosen with `?id=`, for example `sign.html?id=wait` |
| `dictionary.html` | Search and filter all signs |
| `practice.html`, `scenario.html`, `quiz.html`, `mirror.html` | Practice tools |
| `progress.html` | Saved progress (stored in the browser only) |
| `resources.html` | Printable sign cards and classroom ideas |
| `about.html` | About, signers and collaborators, accessibility statement |
| `js/data.js` | **All content: signs, modules, lessons, scenarios. Edit this file to change content.** |
| `js/app.js` | Shared code for every page |
| `css/style.css` | All styles and colors |
| `images/` | Frog Baby character images |
| `videos/` | Sign videos (see below) |
| `docs/sign-list.md` | The 50 classroom signs as a checklist for your ASL consultant |

## Adding sign videos

Videos are found automatically by file name. Until a video exists, the page shows a placeholder.

| Content | File name |
| --- | --- |
| A sign | `videos/<sign id>.mp4`, for example `videos/wait.mp4` |
| Captions for a sign (optional) | `videos/<sign id>.vtt` |
| Letters | `videos/letters/a.mp4` to `videos/letters/z.mp4` |
| Numbers | `videos/numbers/1.mp4` to `videos/numbers/20.mp4` |
| Welcome video | `videos/welcome.mp4` |

Sign ids are listed in `docs/sign-list.md` and in `js/data.js`.

Keep each video small: MP4 (H.264), 720p, a few seconds long, no audio needed. GitHub rejects single files over 100 MB, and a repository works best under about 1 GB. If you end up with many large videos, you can host them elsewhere and change the `videoSrc` function in `js/app.js` to point there.

## Adding or editing a sign

Open `js/data.js` and copy an existing entry in `SIGNS`. Give it a new `id`, `gloss`, `meaning`, and `category`. When your ASL consultant has checked a description, add `reviewed: true` and the draft label disappears.

## Important

All sign descriptions in this first version are drafts for planning. They must be reviewed and corrected by a fluent ASL signer before the site is used with students.
