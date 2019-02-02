// Connecting to ROS
// -----------------

var ros = new ROSLIB.Ros({
  url : 'ws://192.168.2.1:9090'
});

ros.on('connection', function() {
  console.log('Connected to websocket server.');
  $('#con_status').attr('src','assets/img/connected.svg');
});

ros.on('error', function(error) {
  console.log('Error connecting to websocket server: ', error);
  $('#con_status').attr('src','assets/img/disconnected.svg');
});

ros.on('close', function() {
  console.log('Connection to websocket server closed.');
  $('#con_status').attr('src','assets/img/disconnected.svg');
});
function splitString (string, size) {
  var re = new RegExp('.{1,' + size + '}', 'g');
  return string.match(re);
}
// Subscribing to rosout
// ----------------------

var listener = new ROSLIB.Topic({
  ros : ros,
  name : '/rosout',
  messageType : 'rosgraph_msgs/Log'
});
var msg;
listener.subscribe(function(data) {
  $('.prompt').append('ROSOUT > ' + data.msg + '<br>');
});

//
// var listener1 = new ROSLIB.Topic({
//   ros : ros,
//   name : '/rosout_agg',
//   messageType : 'rosgraph_msgs/Log'
// });
// var msg;
// listener1.subscribe(function(data) {
//   $('.prompt').append('ROSOUT_AGG > ' + data.msg + '<br>');
// });
//
var listener2 = new ROSLIB.Topic({
  ros : ros,
  name : '/diagnostics_agg',
  messageType : 'diagnostic_msgs/DiagnosticArray'
});
var msg;
listener2.subscribe(function(data) {
  $('.prompt').append('DIAGNOSTICS_AGG > ' + data.msg + '<br>');
});

$(document).ready( function () {
  $("#header").load("sidebar.html");
});
