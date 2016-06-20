#! /usr/bin/env node

var program = require('commander');
var exports = require('exports');
var _ = require('lodash');

var phantomjs = require('phantomjs');
var path = require('path');
var childProcess = require('child_process');
var binPath = phantomjs.path;

exports.printMsg = function() {
  console.log("Use me to submit your solutions to Kaggle from command-line.");
}

program
  .version('0.0.1')
  .option('-c, --competition <competition>', 'kaggle competition (example: titanic, as in https://www.kaggle.com/c/titanic/')
  .option('-u, --username <username>', 'your kaggle username')
  .option('-p, --password <password>', 'your kaggle password')
  .option('-s, --submission <submission>', 'path to your submission file (csv/zip/gz/rar/7z)')
  .parse(process.argv);

var inputs = [
  program.competition,
  program.username,
  program.password,
  program.submission
];

if (_.some(inputs, _.isNil))
  program.help();


var childArgs = _.concat(
  [
    "--ssl-protocol=any",
    path.join(__dirname, 'phantom_submit.js')
  ],
  inputs);

childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  console.log(stdout);
  if (stderr) {
    console.log("ERROR:");
    console.log(stderr);
  }
})

