# ASL for Teachers

A website that helps preservice teachers learn everyday classroom signs in American Sign Language (ASL) and the Deaf culture behind them. Guided by the character Frog Baby.

Every sign is shown as a **sign card** with four parts: handshape, location, movement, and face. Everything the site shows is stored in this project: the Frog Baby pictures, every hand and face drawing, the fonts, and all lesson content. The site loads nothing from outside services and works even with no internet connection once it is opened.

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

## Pictures

All pictures are included and made for this project:

| Content | Files |
| --- | --- |
| 15 handshapes | `images/handshapes/<id>.svg` |
| Alphabet A to Z | `images/letters/a.svg` to `z.svg` |
| Numbers 1 to 20 | `images/numbers/1.svg` to `20.svg` |
| Face expressions (10) | Drawn in code by `faceSVG` in `js/app.js` |
| Frog Baby poses | `images/*.webp` |

The hand pictures are drawn by `tools/draw-hands.py`. Each hand is described in a short table (which fingers are up, bent, or curled, where the thumb is, and any movement arrow). To change a picture, edit its line in the table at the bottom of that file and run `python3 tools/draw-hands.py`. You can also replace any `.svg` file with your own picture under the same name.

The pictures show a right hand as you see it on someone facing you. They are simplified drawings, so a fluent signer should check them, especially letters and numbers with movement (J, Z, 10 to 20).

## Adding or editing a sign

Open `js/data.js` and copy an existing entry in `SIGNS`. Set its `recipe` using the ids in `HANDSHAPES`, `LOCATIONS`, `MOVEMENTS`, and `FACES`. When a reviewer has checked a sign, add `reviewed: true` and the draft label disappears.

## Fonts

Fredoka and Atkinson Hyperlegible are stored in `fonts/` under the SIL Open Font License (license files included). No font service is used.

## Optional reference button

`REFERENCE_URL` in `js/data.js` is empty, so no outside links appear. If you ever want a "See a reference video" button on each sign page, put an outside dictionary address there.

## Important

All sign cards and descriptions in this first version are drafts for planning. They should be reviewed by a fluent ASL signer before the site is used with students.
