function manual_action(action_type, action_val){
  var service_client = new ROSLIB.Service({
    ros : ros,
    name : '/manual_action',
    serviceType : 'cc_node/manual_action'
  });

  var request = new ROSLIB.ServiceRequest({
    m_action_type: action_type,
    m_action_val: action_val
  });

  service_client.callService(request, function(result) {
  });
}

function hover(){
  var service_client = new ROSLIB.Service({
    ros : ros,
    name : '/a_operation_stop_action_and_hover',
    serviceType : 'cc_node/a_operation_stop_action_and_hover'
  });

  var request = new ROSLIB.ServiceRequest({
    a_operation_pausing_reason: "web-dashboard"
  });

  service_client.callService(request, function(result) {
  });
}
function conf_states(airborne_, in_mission_, landing_phase_){
  var service_client = new ROSLIB.Service({
    ros : ros,
    name : '/conf_states',
    serviceType : 'cc_node/conf_states'
  });

  var request = new ROSLIB.ServiceRequest({
    airborne: airborne_,
    in_mission: in_mission_,
    landing_phase: landing_phase_
  });

  service_client.callService(request, function(result) {
  });
}

$(document).ready( function () {
  $("#header").load("sidebar.html");
});
