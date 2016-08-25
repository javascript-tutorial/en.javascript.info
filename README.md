
# The JavaScript Tutorial

This repository hosts the content of the JavaScript Tutorial, to be available on [https://javascript.info](https://javascript.info).

The backend is written using [io.js](https://iojs.org/en/index.html). It is in the separate repo: [https://github.com/iliakan/javascript-tutorial-server](https://github.com/iliakan/javascript-tutorial-server), here is the text only.

Please use this repository to file issues and suggest PRs for the text.

## Structure

Every chapter, article or task has it's folder.

The folder has the name `N-url`, where `N` is a number for the sorting and `url` — is the URL-address for the material.

The kind of the material is defined by the file inside the folder:

  - `index.md` means a chapter
  - `article.md` means an article
  - `task.md` means a task (+must also have `solution.md` with the solution)

Each of these files starts from the `# Main header`.

Assets required for the material are in it's folder and can be referenced from the file.

For example, an `image.png` for the article should be in it's folder and accessed as `<img src="image.png">` from it's `article.md` file.
