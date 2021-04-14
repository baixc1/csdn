var first = document.getElementById("input1");
var second = document.getElementById("input2");
var result = document.getElementById("result");
if (window.Worker) {
  var myWorker = new Worker("worker.js");
  setTimeout(() => {
    console.log("main.js Worker call terminate  after 6s");
    myWorker.terminate();
  }, 6000);
  first.onchange = function () {
    myWorker.postMessage([first.value, second.value]);
    console.log("Message posted to worker");
  };

  second.onchange = function () {
    myWorker.postMessage([first.value, second.value]);
    console.log("Message posted to worker");
  };
  myWorker.onmessage = function (e) {
    result.textContent = e.data;
    console.log("Message received from worker");
  };
}
