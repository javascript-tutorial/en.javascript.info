# The JavaScript Tutorial

This repository hosts the content of the Modern JavaScript Tutorial, published at [https://javascript.info](https://javascript.info).

## Translations

We'd like to make the tutorial available in many languages. Please help us to translate.

Here's the list of existing ongoing translations (in alphabetical order):

| Language | Github | Translation leads | Translated (%) | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last&nbsp;Commit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Published |
|----------|--------|-------------------|----------------|-------------|-----------|
| Azerbaijani | [orkhan-huseyn/javascript-tutorial-az](https://github.com/orkhan-huseyn/javascript-tutorial-az) | @orkhan-huseyn | ![](http://stats.javascript.info/translate/az.svg) | ![](https://img.shields.io/github/last-commit/orkhan-huseyn/javascript-tutorial-az.svg?maxAge=900&label=) |  |
| Chinese | [xitu/javascript-tutorial-zh](https://github.com/xitu/javascript-tutorial-zh) | @leviding | ![](http://stats.javascript.info/translate/zh.svg) | ![](https://img.shields.io/github/last-commit/xitu/javascript-tutorial-zh.svg?maxAge=900&label=) | [zh.javascript.info](https://zh.javascript.info) |
| French | [HachemiH/javascript-tutorial-fr](https://github.com/HachemiH/javascript-tutorial-fr) | @HachemiH | ![](http://stats.javascript.info/translate/fr.svg) | ![](https://img.shields.io/github/last-commit/HachemiH/javascript-tutorial-fr.svg?maxAge=900&label=) | |
| Japanese | [KenjiI/javascript-tutorial-ja](https://github.com/KenjiI/javascript-tutorial-ja) | @KenjiI | ![](http://stats.javascript.info/translate/ja.svg) | ![](https://img.shields.io/github/last-commit/KenjiI/javascript-tutorial-ja.svg?maxAge=900&label=) | [ja.javascript.info](https://ja.javascript.info) |
| Korean | [Violet-Bora-Lee/javascript-tutorial-ko](https://github.com/Violet-Bora-Lee/javascript-tutorial-ko) | @Violet-Bora-Lee | ![](http://stats.javascript.info/translate/ko.svg) | ![](https://img.shields.io/github/last-commit/Violet-Bora-Lee/javascript-tutorial-ko.svg?maxAge=900&label=) |  |
| Persian (Farsi) | [mehradsadeghi/javascript-tutorial-fa](https://github.com/mehradsadeghi/javascript-tutorial-fa) | @mehradsadeghi | started | ![](https://img.shields.io/github/last-commit/krzmaciek/javascript-tutorial-pl.svg?maxAge=900&label=) | |
| Polish | [krzmaciek/javascript-tutorial-pl](https://github.com/krzmaciek/javascript-tutorial-pl) | @krzmaciek | ![](http://stats.javascript.info/translate/pl.svg) | ![](https://img.shields.io/github/last-commit/krzmaciek/javascript-tutorial-pl.svg?maxAge=900&label=) |  |
| Romanian | [lighthousand/javascript-tutorial-ro](https://github.com/lighthousand/javascript-tutorial-ro) | @lighthousand | ![](http://stats.javascript.info/translate/ro.svg) | ![](https://img.shields.io/github/last-commit/lighthousand/javascript-tutorial-ro.svg?maxAge=900&label=) |  |
| Russian | [iliakan/javascript-tutorial-ru](https://github.com/iliakan/javascript-tutorial-ru) | @iliakan | * . | ![](https://img.shields.io/github/last-commit/iliakan/javascript-tutorial-ru.svg?maxAge=900&label=) | [learn.javascript.ru](https://learn.javascript.ru) |
| Turkish | [sahinyanlik/javascript-tutorial-tr](https://github.com/sahinyanlik/javascript-tutorial-tr) | @sahinyanlik | ![](http://stats.javascript.info/translate/tr.svg) | ![](https://img.shields.io/github/last-commit/sahinyanlik/javascript-tutorial-tr.svg?maxAge=900&label=) | |

`*` – the previous version is published in Russian, need to backport/translate the new one from English.

**If you'd like to translate it into your language:**

1. First, check if the translation has already started in the list above or in issues. If it exists, contact the original lead, ask him  to join efforts. If the translation is stalled, ask him to transfer the repo to you or just create a new one and write an issue.
2. If there's no such translation, create a new one. Clone the repository, change its name to `javascript-tutorial-<lang>` (by your language) and [create an issue](https://github.com/iliakan/javascript-tutorial-en/issues/new) for me to add you to the list.

**You can edit the text in any editor (markdown-like syntax).** And if you want to see how it looks, there's a server to run the tutorial locally at <https://github.com/iliakan/javascript-tutorial-server>.  



## Structure

Every chapter, article or a task has its folder.

The folder is named like `N-url`, where `N` is a number for the sorting purposes and `url` is the URL part with title of the material.

The type of the material is defined by the file inside the folder:

  - `index.md` stands for a chapter
  - `article.md` stands for an article
  - `task.md` stands for a task (solution must be provided in `solution.md` file aswell)

Each of these files starts from the `# Main header`.
