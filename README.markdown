Marky Mark
==========

Marky Mark is a quick and simple wrapper for [Google maps V3](http://code.google.com/apis/maps/documentation/v3/). I wrote this library for one reason and one reason only... to simplify the creation of map markers in google maps! It's meant to be extremely simple and doesn't do advanced things, but it does the following things well:

  - Create single or multiple markers
  - it's super easy to attach info windows to markers
  - Integrated geocoding without an API key! Hooray! **NOTE:** the built in geocoding only allows 11 geocode requests per request, please use an external geocoder if you need to make more requests.
  - It can be an alternative to integrating maps without going to google maps and getting the iframe maps
  - Dependency free! You can use this with your favorite JS library if you like (Unless you want to use set_remote_markers)
  - A simple way to create your own map themes!
  
Remember if you need more advanced features, just drop down into the actual API code, it's really not that hard, just gets repetitive sometimes, this small library is meant to alleviate some of the more trivial things like setting [Markers](http://code.google.com/apis/maps/documentation/v3/reference.html#Marker) and customizing [Info Windows](http://code.google.com/apis/maps/documentation/v3/reference.html#InfoWindow)

Installation
============
  
    cd into/your/js/directory
    git clone git@github.com:vanntastic/marky_mark.git 
    
Dependencies
============

You can still use all non ajax functions with this library without any other framework, but if you want to be able to load a json file into your maps then jQuery is required.    

Example
=======

From the example page:


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
        
        // this is the from the example page
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

create_map (elem,opts)
----------------------

Create a map object, this is an abstraction of google.maps.Map.

Options:

    - elem : the id of the element you want to attach the map to
    - opts : standard map options, you can find them here: [Google Maps Options](http://code.google.com/apis/maps/documentation/v3/reference.html#MapOptions), you can apply a theme by passing the theme attribute, a list of built in themes is listed at the bottom of this readme or the marky_mark source.

Example:

     // no theme
     var map_opts = {
        zoom: 14,
        center: set_latlng(coordinates.USA.MN),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = create_map("map",map_opts);
      
      // with a theme
      var map_opts = {
        zoom: 14,
        center: set_latlng(coordinates.USA.MN),
        theme: themes.dark
      };
      map = create_map("map",map_opts);
      
      
set_latlng ([latlng])
---------------------

Set latitude and longitude, this is an abstraction of google.maps.LatLng.

Options:

    - latlng : This is the latitude and longitude of a location, this needs to be an array, if you need to get coordinates of any of the US states, there is a coordinates.US hash that you can grab predefined list of US states.
    
    
set_marker (opts)
-----------------

An all inclusive method to set map markers, this has built in geocoding (with no API key!) with it. NOTE: addresses that you will pinpoint, will do so only for the first result, remember we're keeping it simple!

Opts hash options:

    - address: The address to set your marker at, this can be an literal address or an actual location like: 'Powderhorn Park, Minneapolis, MN' (required unless latlng set)
    - latlng: [lat,lng] is the lat and lng of the marker, NOTE: this will take precendence over the address if it is set
    - map: the map object for which you want to apply the map to (required)
    - center: true/false pass whether or not you want the map centered on this marker (optional)
    - icon: the path to an image that you want to set the marker to (optional)
    - info: the content of the info window you want to set on the marker, this can be an id in the form of '#my-elem-id' or actual html content (optional)
    - auto_open: true/false - automatically opens the marker's info window
    
Example:

      set_marker({
        address: 'Powderhorn Park, Minneapolis, MN',
        map: map,
        center: true,
        icon: "path/to/my/icon.png",
        info: 'Powderhorn Park!'
      });
    
set_info_window (info,marker,auto_open)
-----------------------------

Sets an info window on a marker. This is usually used in set_marker.

Options:

    - info: the content of the info window, this can be html content or the id of an element.
    - marker: the marker object where you want to place your info window.
    - auto_open: true/false opens the info window on the marker
    
Example:

      set_info_window({
        info: "You clicked me!",
        marker: marker
      });

set_markers (opts)
------------------

Sets multiple markers based on a array of marker option hashes. Takes the same options as set_marker options.

Example:

    set_markers([
      
      {
        address: 'Corcoran Park, Minneapolis, MN',
        map: map,
        center: center,
        icon: 'path/to/my/icon.png',
        info: 'Corcoran Park'
      },
      {
        address: 'Powderhorn Park, Minneapolis, MN',
        map: map
      }
      
    ]);
    
set_remote_markers(file,map)    
----------------------------

Sets markers from a json file, here's an example of how your JSON file should look (it requires a locations key):

    // addresses.json
    {
      "locations": [
       {
          "address": "Powderhorn Park, Minneapolis, MN",
          "info": "Remote Request to Powderhorn Park"
        },
        {
          "address": "Corcoran Park, Minneapolis, MN",
          "center": "true",
          "icon": "images/aim_16.png",
          "info": "Remote request for Corcoran"
        },
        {
          "address": "Sibley Park, Minneapolis, MN",
          "info": "Remote Request for Sibley Park"
        }
      ]
    }

Example:    
  
    set_remote_markers('addresses.json',remote_map)

I aim to keep this simple, but if my needs change in the future, I will update this library to match those needs. If you feel like you can contribute to it, feel free to fork the code and do what you want with it.

Themes
======

You can apply various themes to your maps, here's the list of available themes:

  - buildingOutlines
  - neonGreen
  - dark
  - greenOrange
  - hiliteUrban
  - inverted
  - midnight
  - sepia
  - grayScale
  
You can add your own themes as well, if you haven't already, [do some reading at the google maps api v3 site](http://code.google.com/apis/maps/documentation/javascript/maptypes.html#StyledMaps) about styled maps. Then simply pass in the following hash:


    // the attributes themeName and set are both REQUIRED
    nameOftheme = {
      themeName = nameOftheme,
      set = [{stylesOptions}]
    }
  
    // then apply it the create_map method as so:
    var map_opts = {
       zoom: 14,
       center: set_latlng(coordinates.USA.MN),
       theme: nameOftheme
    };
    map = create_map("map",map_opts);
    
  
Most themes are based on this article: [http://www.41latitude.com/post/1268734799/google-styled-maps](http://www.41latitude.com/post/1268734799/google-styled-maps)  
  
Copyright (c) 2010 Vann Ek., released under the MIT license
