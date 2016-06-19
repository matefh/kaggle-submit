
var exports = require('exports');
exports.printMsg = function() {
  console.log("Use me to submit your solutions to Kaggle from command-line.");
}

var system = require('system');
var args = system.args;
var phantomjs = require('phantomjs');
var path = require('path');
var childProcess = require('child_process');
var binPath = phantomjs.path;

var childArgs = [
  "--ssl-protocol=any",
  path.join(__dirname, 'phantom_submit.js'),
  process.argv[2]
]

childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  console.log(stdout);
  if (stderr) {
    console.log("ERROR:");
    console.log(stderr);
  }
})

