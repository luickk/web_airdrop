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
