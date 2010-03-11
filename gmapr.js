// create map by id
function create_map (elem,opts) {
  return new google.maps.Map(document.getElementById(elem), opts);
}

// set_latlng(lat,lng)
function set_latlng (latlng) {
  return new google.maps.LatLng(latlng[0],latlng[1]);
}

// EX:
// set_markers(map,[{name:'Name/Content of location',lat:latitude,long:longitude}],)
// map is the map object #=> new google.maps.LatLng(lat, long);
// locations is an array of marker option hashes in the following format:
/*
  set_markers([
      { 
        position: set_latlng([45.024112,-93.2956656]),
        map: map
      },
      {
        position: set_latlng([45.0221762, -93.2944366]),
        map: map,
        icon: "aim_16.png"
      }
   ]);
*/

function set_markers (marker_opts) {
  for (var i = marker_opts.length - 1; i >= 0; i--){
    var marker = new google.maps.Marker({
      position: marker_opts[i].position,
      map: marker_opts[i].map
    });
    // CONTINUE here : refactor this to allow a setting of optional params thru the for loop
    // try routing it thru eval statements
    // next step .... do info windows!
    // set optional params
    
    if (is.defined(marker_opts[i].icon)) { marker.icon = marker_opts[i].icon; };
  };
}

// Helper functions

var is = function() {
  return {
    // is.not_defined(obj_or_var)
    not_defined : function(obj) {
        return typeof(obj) == 'undefined';
    },
    // is.defined(obj_or_var)
    defined : function(obj) {
        return typeof(obj) != "undefined";
    }
  };
} ();
