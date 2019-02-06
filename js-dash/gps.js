// Subscribing to gps publ
// ----------------------

var listener = new ROSLIB.Topic({
  ros : ros,
  name : '/gps_raw',
  messageType : 'gps_node/gps_raw'
});
listener.subscribe(function(data) {
  $("#disp_heading").text(data.heading);
  $("#disp_sats").text(data.gps_sats);
  $("#disp_latlon").text(data.lat + ', ' + data.lon);
  $("#disp_alt").text(data.alt);
  $("#disp_latestrefresh").text(new Date().toUTCString());
});
function setTakeOffPosition(){
  var service_client = new ROSLIB.Service({
    ros : ros,
    name : '/get_set_take_off_pos',
    serviceType : 'cc_node/get_set_take_off_pos'
  });

  var request = new ROSLIB.ServiceRequest({
    get_set: 'set'
  });

  service_client.callService(request, function(result) {});
}

function syncTakeOffPosition(){
  var service_client = new ROSLIB.Service({
    ros : ros,
    name : '/get_set_take_off_pos',
    serviceType : 'cc_node/get_set_take_off_pos'
  });

  var request = new ROSLIB.ServiceRequest({
    get_set: 'get'
  });

  service_client.callService(request, function(result) {
    $("#disp_s_heading").text(result.heading);
    $("#disp_s_gps_sats").text(result.gps_sats);
    $("#disp_s_latlon").text(result.lat + ', ' + result.lon);
    $("#disp_s_alt").text(result.alt);
    $("#disp_s_latestrefresh").text(new Date().toUTCString());
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sync(){
  do {
  await sleep(1000);
  syncTakeOffPosition();
  calc_distance();
  } while (1){}
}
$("#set_takeoff").click(function(){
  setTakeOffPosition();
});

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
  Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
  Math.sin(dLon/2) * Math.sin(dLon/2)
  ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}
function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function calc_distance() {
  var lat = $('#disp_s_latlon').text().split(',')[0];
  var lon = $('#disp_s_latlon').text().split(',')[1];
  var lat1 = $('#disp_latlon').text().split(',')[0];
  var lon1 = $('#disp_latlon').text().split(',')[1];
  var dist = getDistanceFromLatLonInKm(lat,lon,lat1,lon1);
  if($('#disp_sats').text()<8){
  $("#dist").text("Not enough Satellites!");
  } else {
  $("#dist").text(dist.toFixed(3));
  }
  $("#latestrefreshdist").text(new Date().toUTCString());
}
