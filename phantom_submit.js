
var system = require('system');
var args = system.args;
var page = new WebPage(), testindex = 0, loadInProgress = false;

var competition = args[1],
    username = args[2],
    password = args[3],
    submission = args[4];

page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log(msg);
  if (msg == "Unexpected response code: 400") {
    loadInProgress = false;
  }
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
    page.open("https://www.kaggle.com/c/" + competition + "/submissions/attach");
  },
  function() {
    //Enter Credentials and Login
    page.evaluate(function(u, p) {
      console.log("Logging in...");
      var form = document.getElementById("signin");
      form.elements["UserName"].value = u;
      form.elements["Password"].value = p;
      var form = document.getElementById("signin");
      form.submit();
    }, username, password);
  },
  function() {
    // Upload submission
    page.uploadFile("input[type='file']", submission);
    page.evaluate(function() {
      var form = document.getElementById("submission-form");
      console.log("Uploading submission...");
      form.submit();
    });
  },
];

interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == "function") {
    steps[testindex]();
    testindex++;
  }
  if (!loadInProgress && testindex == steps.length) {
    setTimeout(function(){phantom.exit();}, 30000);
  }
}, 50);

