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
                             animation: google.maps.Animation.DROP,
                             title: "Você Está Aqui!"
                            };

        var marker = new google.maps.Marker(configMarker);
 
    });
});

function initMap(){

}




