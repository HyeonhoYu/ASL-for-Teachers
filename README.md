# ASL for Teachers

A website that helps preservice teachers learn everyday classroom signs in American Sign Language (ASL) and the Deaf culture behind them. Guided by the character Frog Baby.

Every sign is shown as a **sign card** with four parts: handshape, location, movement, and face. All pictures and content are created for this project. The only outside material is an optional "See a reference video" button that opens an outside dictionary in a new tab.

This is a plain static website (HTML, CSS, and JavaScript). There is nothing to install or build, so it runs on GitHub Pages as is.

## Put it on GitHub Pages

1. Create a new repository on GitHub, for example `asl-for-teachers`.
2. Upload everything in this folder to the repository (on github.com: **Add file > Upload files**, then drag in all files and folders).
3. Go to **Settings > Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose the `main` branch and the `/ (root)` folder, then **Save**.
5. After a minute or two the site appears at `https://<your-username>.github.io/asl-for-teachers/`.

## Clean page addresses

Each page lives in its own folder as `index.html`, so addresses look like `.../learn/` and `.../sign/?id=wait` with no `.html` at the end. This works on GitHub Pages and on your own computer. If someone uses an old link ending in `.html`, `404.html` sends them to the new address.

## Try it on your own computer

Open a terminal in this folder and run:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`. (Mirror Practice needs `localhost` or a GitHub Pages address to use the camera.)

## Where things are

| Path | What it is |
| --- | --- |
| `index.html` | Home page |
| `start/` | Start Here: What is ASL, how to read a sign card, a note on interpreters |
| `learn/`, `module/` | The four learning modules |
| `sign/` | One page per sign, for example `sign/?id=wait` |
| `dictionary/` | Search by word, category, or handshape |
| `practice/`, `scenario/`, `quiz/`, `mirror/` | Practice tools |
| `progress/` | Saved progress (stored in the browser only) |
| `resources/` | Printable sign cards and classroom ideas |
| `about/` | About, reviewers, accessibility statement |
| `js/data.js` | **All content: signs, sign card parts, modules, scenarios. Edit this file to change content.** |
| `js/app.js` | Shared code, including the body map and movement animations |
| `css/style.css` | All styles and colors |
| `images/` | Frog Baby pictures and your own pictures |
| `docs/sign-list.md` | The 50 classroom signs as a checklist for review |

## Adding your own pictures

Pictures are found automatically by file name. Until a picture exists, the card shows a labeled placeholder.

| Content | File name |
| --- | --- |
| Handshapes | `images/handshapes/<id>.webp`, for example `images/handshapes/5.webp`. Ids are listed in `HANDSHAPES` in `js/data.js`. |
| Letters | `images/letters/a.webp` to `images/letters/z.webp` |
| Numbers | `images/numbers/1.webp` to `images/numbers/20.webp` |
| Frog Baby faces | `images/faces/<id>.webp`. Ids are listed in `FACES` in `js/data.js`. |

Square pictures work best. A photo of your own hand on a plain background is enough. `.webp` keeps files small; if you use `.jpg` or `.png`, change the file ending in `js/app.js` (search for `.webp`).

## Adding or editing a sign

Open `js/data.js` and copy an existing entry in `SIGNS`. Set its `recipe` using the ids in `HANDSHAPES`, `LOCATIONS`, `MOVEMENTS`, and `FACES`. When a reviewer has checked a sign, add `reviewed: true` and the draft label disappears.

## Reference button

`REFERENCE_URL` at the end of `js/data.js` sets which outside dictionary the "See a reference video" button opens. Check that the link works, or change it to a dictionary you prefer.

## Important

All sign cards and descriptions in this first version are drafts for planning. They should be reviewed by a fluent ASL signer before the site is used with students.
