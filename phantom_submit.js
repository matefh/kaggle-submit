
var YAML = require('js-yaml');
var fs = require('fs');
var system = require('system');
var args = system.args;
var conf = YAML.safeLoad(fs.read('config.yml'));

var page = new WebPage(), testindex = 0, loadInProgress = false;

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
};

page.onLoadFinished = function() {
  loadInProgress = false;
};

var steps = [
  function() {
    //Load Login Page
    page.open("https://www.kaggle.com/c/" + conf.competition + "/submissions/attach");
  },
  function() {
    //Enter Credentials
    page.evaluate(function(u, p) {
      console.log("Logging in...");
      var form = document.getElementById("signin");
      form.elements["UserName"].value = u;
      form.elements["Password"].value = p;
    }, conf.username, conf.password);
  },
  function() {
    //Login
    page.evaluate(function() {
      var form = document.getElementById("signin");
      form.submit();
    });
  },
  function() {
    // Upload submission
    page.uploadFile("input[type='file']", args[1]);
    page.evaluate(function() {
      var form = document.getElementById("submission-form");
      console.log("Uploading submission...");
      form.submit();
    });
  },
  function() {
    // Show last page
    page.evaluate(function() {
      //console.log(document.getElementsByClassName("submission-results")[0].innerHTML.trim());
    });
  }
];

interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == "function") {
    steps[testindex]();
    testindex++;
  }
  if (typeof steps[testindex] != "function") {
    phantom.exit();
  }
}, 50);

