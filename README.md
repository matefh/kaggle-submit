# kaggle-submit

A command for submitting solutions to Kaggle competitions.

## Installation

`npm install kaggle-submit`

## Usage

Then make sure that `node_modules/.bin` is in your `PATH`, so that the `kaggle-submit` is an executable command.

You can also fallback to running via `node submit.js [options] [submission file]`.

```
  Usage: kaggle-submit [options]

  Options:

    -h, --help                       output usage information
    -V, --version                    output the version number
    -c, --competition <competition>  kaggle competition (example: titanic, as in https://www.kaggle.com/c/titanic/
    -u, --username <username>        your kaggle username
    -p, --password <password>        your kaggle password
    -s, --submission <submission>    path to your submission file (csv/zip/gz/rar/7z)
```
