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

// Subscribing to gps publ
// ----------------------

var listener = new ROSLIB.Topic({
  ros : ros,
  name : '/drone_state',
  messageType : 'cc_node/drone_states'
});
listener.subscribe(function(data) {
  $("#airborne_state").text(data.airborne);
  $("#in_mission_state").text(data.in_mission);
  $("#landing_phase_state").text(data.landing_phase);
});
