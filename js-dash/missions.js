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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function sync(){
  do {
  await sleep(1000);
  sync_missions();
  } while (1){}
}
$(document).ready( function () {
  $("#header").load("sidebar.html");
  sync();
});
function sync_missions(){
  var service_client = new ROSLIB.Service({
    ros : ros,
    name : '/list_missions',
    serviceType : 'mn_node/list_missions'
  });

  var request = new ROSLIB.ServiceRequest({
  });

  service_client.callService(request, function(result) {
    $("#mission_list").empty();
    for(var mission in result.mission_list){
      $("#mission_list").append('<li style="cursor: pointer;" onclick="start_missions('+"'"+result.mission_list[mission]+"'"+')" class="list-group-item">'+result.mission_list[mission].split('.')[0].trim()+'</li>');
    }
  });
}
function start_missions(mission){
  $("#status").text("pending");
  var service_client = new ROSLIB.Service({
    ros : ros,
    name : '/start_mission',
    serviceType : 'mn_node/start_mission'
  });

  var request = new ROSLIB.ServiceRequest({
    mission_name: mission
  });

  service_client.callService(request, function(result) {
    $("#mission_status").text(result.mission_status);
    $("#operation_status").text(result.operation_status);
    $("#action_status").text(result.action_status);
    $("#status").text("done");
  });
}
