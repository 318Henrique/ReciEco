/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global google */

document.addEventListener('DOMContentLoaded', function(){

    var target = document.querySelector('#map');
    
    navigator.geolocation.getCurrentPosition(function(position) {

        var latitude   = position.coords.latitude;
        var longitude  = position.coords.longitude;
        var coordinate = new google.maps.LatLng(latitude, longitude);

        var optionsMap = {
                    center : coordinate,
                    zoom: 17,
                    mapTypeId: 'satellite'
        };

        var map = new google.maps.Map(target, optionsMap);
        
        var configMarker = {
                             position : coordinate,
                             map : map,
                             title: "Você Está Aqui!"
                             
                            };

        var marker = new google.maps.Marker(configMarker);

    });
});




