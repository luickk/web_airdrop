// Subscribing to rosout
// ----------------------

var listener = new ROSLIB.Topic({
  ros : ros,
  name : '/rosout',
  messageType : 'rosgraph_msgs/Log'
});
listener.subscribe(function(data) {
  $('#log_field').append(data.msg);
});

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
    console.log(result.m_action_status);
  });
}

$(document).ready( function () {
  $("#header").load("sidebar.html");
});
