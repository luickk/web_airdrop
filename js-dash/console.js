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
