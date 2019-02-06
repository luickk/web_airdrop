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
