# The JavaScript Tutorial

This repository hosts the content of the Modern JavaScript Tutorial, published at [https://javascript.info](https://javascript.info).

## Translations

(In alphabetical order):

| Language | Github | Translation leads | Translated (%) | Published |
|----------|--------|-------------------|-----------------|-----------|
| Chinese | https://github.com/xitu/javascript-tutorial-zh | @leviding | ![](http://translate-hook.javascript.info/stats/zh.svg) | - |
| Danish | https://github.com/ockley/javascript-tutorial-da | @ockey | ![](http://translate-hook.javascript.info/stats/da.svg) | - |
| German | https://github.com/MartinEls/javascript-tutorial-de | @MartilEls | ![](http://translate-hook.javascript.info/stats/de.svg) | - |
| Japanese | https://github.com/KenjiI/javascript-tutorial-ja | @KenjiI | ![](http://translate-hook.javascript.info/stats/ja.svg) | - |
| Persian | https://github.com/Goudarz/javascript-tutorial-fa | @Goudarz | ![](http://translate-hook.javascript.info/stats/fa.svg) | - |
| Russian | https://github.com/iliakan/javascript-tutorial-ru | @iliakan |  | https://learn.javascript.ru |
| Turkish | https://github.com/sahinyanlik/javascript-tutorial-tr | @sahinyanlik | ![](http://translate-hook.javascript.info/stats/tr.svg) | - |

If you'd like to translate it into your language, please clone the repository, change its name to `javascript-tutorial-...` (by the language) and [create an issue](https://github.com/iliakan/javascript-tutoria-en/issues/new) for me to add you to the list.

You can edit the text in any editor (markdown-like syntax). The server to run the tutorial locally and see how it looks is at <https://github.com/iliakan/javascript-tutorial-server>.  

## Structure

Every chapter, article or a task has its folder.

The folder is named like `N-url`, where `N` is a number for the sorting purposes and `url` is the URL part with title of the material.

The type of the material is defined by the file inside the folder:

  - `index.md` stands for a chapter
  - `article.md` stands for an article
  - `task.md` stands for a task (solution must be provided in `solution.md` file aswell)

Each of these files starts from the `# Main header`.
