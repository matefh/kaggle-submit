#!/usr/local/bin/node

var program = require('commander');
var exports = require('exports');

var phantomjs = require('phantomjs');
var path = require('path');
var childProcess = require('child_process');
var binPath = phantomjs.path;

var YAML = require('js-yaml');
var fs = require('fs');
var conf = YAML.safeLoad(fs.readFileSync('config.yml'));

var competition = conf.competition, username = conf.username, password = conf.password;

exports.printMsg = function() {
  console.log("Use me to submit your solutions to Kaggle from command-line.");
}

program
  .version('0.0.1')
  .option('-c, --competition <competition>', 'the comp')
  .option('-u, --username <username>', 'uzar name')
  .option('-p, --password <password>', 'bassword')
  .option('-S, --submission <submission>', 'subz')
  .parse(process.argv);

if (program.competition)
  competition = program.competition;

if (program.username)
  username = program.username;

if (program.password)
  password = program.password;

var submission = program.submission;

var childArgs = [
  "--ssl-protocol=any",
  path.join(__dirname, 'phantom_submit.js'),
  competition,
  username,
  password,
  submission
]

childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  console.log(stdout);
  if (stderr) {
    console.log("ERROR:");
    console.log(stderr);
  }
})

