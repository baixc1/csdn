onconnect = function (e) {
  console.log(e.ports);
  var port = e.ports[0];

  port.onmessage = function (e) {
    console.log(e);
    var workerResult = "Result:xxxxx " + e.data[0] * e.data[1];
    port.postMessage(workerResult);
  };
};
console.log(1);
