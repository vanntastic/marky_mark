// GLOBALS
var GEOCODER = new google.maps.Geocoder();

// create map by id
function create_map (elem,opts) {
  return new google.maps.Map(document.getElementById(elem), opts);
}

// set_latlng(lat,lng)
function set_latlng (latlng) {
  return new google.maps.LatLng(latlng[0],latlng[1]);
}

// Sets a single marker up
// EX:
/* 
    set_marker({
      address: '1234 your address',
      map: map,
      icon: icon, // optional
      info: content_or_element_id // optional
    })

*/
function set_marker (opts) {
  GEOCODER.geocode({'address': opts.address}, function(results, status) {
    
    if (status == google.maps.GeocoderStatus.OK) {
       marker_opts = {
         map: opts.map,
         position: results[0].geometry.location
       };
       // set optional defaults right here
       if (is.defined(opts.icon)) { marker_opts.icon = opts.icon };
       // set the info var for the infowindow
       if (is.defined(opts.info)) {
         info = opts.info;
         delete opts.info;
       } else {
         info = undefined;
       };
       
       marker = new google.maps.Marker(marker_opts);
       
       // set info windows and events
       if (is.defined(info)) { set_info_window(info,marker) };
       
    } else {
      alert("Could not geocode address: " + opts.address + " because of: " + status);
    };
    
  });
}

// Can either be an id: '#somediv' or actual html content
// EX: set_info_window('#somediv',marker) # => grabs some div
//     set_info_window("<div id='cool'>My Map content!</div>",marker)
function set_info_window (info,marker) {
  // pulls an element's html content
  if (info.charAt(0) == '#') {
    id = info.split('#')[1];
    info = document.getElementById(id).innerHTML;
  }
  
  var infowindow = new google.maps.InfoWindow({
    content: info
  });
  
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(marker.map, marker);
  });
}
/*
  
  EX:
  
  set_markers([
    
    {
      address: '1206 N 37th Ave, Minneapolis, MN',
      map: map
      // you can add in other optional params as well
    },
    {
      address: '1210 N 37th Ave, Minneapolis, MN',
      map: map
    }
    
  ])
  
*/

function set_markers (opts) {
  for (var i=0; i < opts.length; i++) {
    set_marker(opts[i]);
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
