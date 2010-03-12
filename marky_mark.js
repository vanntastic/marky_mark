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
      address: '1234 your address', // required
      map: map, // required
      center: true_or_false, // optional
      icon: icon, // optional
      info: content_or_element_id // optional
    })
    
    NOTE: set_marker will only pinpoint the first address found
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
       
       // center the map if it's set to true
       if (is.defined(opts.center)) {
         opts.map.setCenter(results[0].geometry.location);
         delete opts.center;
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
  Set multiple markers
  EX:
  // pass the same arguments as set_marker hashes
  set_markers([
    {
      address: '1206 N 37th Ave, Minneapolis, MN',
      map: map
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

// latlng coordinate constants
// currently only have US states, add in other coordinates as neccessary
var coordinates = {
  USA: {
    AK: [63.5888, -154.4931],
    AL: [32.3182, -86.9023],
    AR: [35.2011, -91.8318],
    AZ: [34.0489, -111.0937],
    CA: [36.7783, -119.4179],
    CO: [39.5501, -105.7821],
    CT: [41.6032, -73.0877],
    DC: [38.9060, -77.0334],
    DE: [38.9108, -75.5277],
    FL: [27.6648, -81.5158],
    GA: [32.1574, -82.9071],
    HI: [19.8987, -155.6659],
    IA: [41.8780, -93.0977],
    ID: [44.0682, -114.7420],
    IL: [40.6331, -89.3985],
    IN: [40.5512, -85.6024],
    KS: [39.0119, -98.4842],
    KY: [37.8393, -84.2700],
    LA: [31.2448, -92.1450],
    MA: [42.4072, -71.3824],
    ME: [45.2538, -69.4455],
    MD: [39.0458, -76.6413],
    MI: [44.3148, -85.6024],
    MN: [46.7296, -94.6859],
    MO: [37.9643, -91.8318],
    MS: [32.3547, -89.3985],
    MT: [46.8797, -110.3626],
    NC: [46.8797, -110.3626],
    ND: [47.5515, -101.0020],
    NE: [41.4925, -99.9018],
    NH: [41.4925, -99.9018],
    NJ: [41.4925, -99.9018],
    NM: [34.9727, -105.0324],
    NV: [38.8026, -116.4194],
    NY: [38.8026, -116.4194],
    OH: [40.4173, -82.9071],
    OK: [35.0078, -97.0929],
    OR: [43.8041, -120.5542],
    PA: [41.2033, -77.1945],
    RI: [41.5801, -71.4774],
    SC: [33.8361, -81.1637],
    SD: [43.9695, -99.9018],
    TN: [35.5175, -86.5804],
    TX: [31.9686, -99.9018],
    UT: [39.3210, -111.0937],
    VT: [44.5588, -72.5778],
    VA: [37.4316, -78.6569],
    WA: [47.7511, -120.7401],
    WI: [43.7844, -88.7879],
    WV: [38.5976, -80.4549],
    WY: [43.0760, -107.2903]
  }
};