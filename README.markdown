Marky Mark
==========

Marky Mark is a quick and simple wrapper for [Google maps V3](http://code.google.com/apis/maps/documentation/v3/). It's meant to be extremely simple and doesn't do advanced things, but it does the following things well:

  - Create single or multiple markers
  - Integrated geocoding without an API key! Hooray!
  - It can be an alternative to integrating maps without going to google maps and getting the iframe maps
  - Dependency free! You can use this with your favorite JS library if you like
  
Remember if you need more advanced features, just drop down into the actual API code, it's really not that hard, just gets repetitive sometimes, this small library is meant to alleviate some of the more trivial things like setting [Markers](http://code.google.com/apis/maps/documentation/v3/reference.html#Marker) and customizing [Info Windows](http://code.google.com/apis/maps/documentation/v3/reference.html#InfoWindow)

Installation
============
  
    cd into/your/js/directory
    git clone git@github.com:vanntastic/easy_mapr.git 
    
    // Add the following to your page in the head
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <script type="text/javascript" 
            src="http://maps.google.com/maps/api/js?sensor=false"></script>
    
    <script type="text/javascript" charset="utf-8">
      function init () {
        // create your map
        // find more map options at : http://code.google.com/apis/maps/documentation/v3/reference.html#MapOptions
        var map_opts = {
          zoom: 15,
          center: set_latlng(coordinates.USA.MN),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = create_map("map",map_opts);

        // set multiple markers of the addresses that you need to mark
        set_markers([
           {
             address: 'Powderhorn Park, Minneapolis, MN',
             map: map
           },
           {
             address: 'Corcoran Park, Minneapolis, MN',
             map: map,
             center: true,
             icon: "images/aim_16.png",
             info: "#special-house"
           },
           {
             address: 'Sibley Park, Minneapolis, MN',
             map: map,
             info: "Sibley Park"
           }
        
         ]);

      }
      
      // attach it to the onload event
      window.onload = function(){ init(); }
    </script>

Methods
=======

# Continue here..