// Subscribing to gps publ
// ----------------------

var states_listener = new ROSLIB.Topic({
  ros : ros,
  name : '/drone_state',
  messageType : 'cc_node/drone_states'
});
states_listener.subscribe(function(data) {
  $("#airborne_state").text(data.airborne);
  $("#in_mission_state").text(data.in_mission);
  $("#landing_phase_state").text(data.landing_phase);
});
