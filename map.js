var map;
var info = null;

function init() {

	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 0, lng: 0},
		zoom: 2,
		fullscreenControl: true,
		streetViewControl: false,
		mapTypeId: google.maps.MapTypeId.HYBRID,
		backgroundColor: '#222'
	});

	for (var i = data.length - 1; i >= 0; i--) {

		var content = '<a href="' + data[i]['permalink'] + '" target="_blank"><img src="' + data[i]['thumbnail'] + '" width="200"></a>' + data[i]['location'];
		if (data[i]['state'])
			content += ' (' + data[i]['state'] + ')';

		var marker = new google.maps.Marker({
			position: data[i]['coordinates'],
			map: map,
			optimized: true,
			icon: 'img/marker.png'
		});

		google.maps.event.addListener(marker, 'click', (function(marker, content){ 
			return function() {
				if(info)
					info.close();
				info = new google.maps.InfoWindow({content: content});
				info.open(map, marker);
			};
		})(marker, content));
	}
}