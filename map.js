function initMap() {
	const locations = [
			['Avenida Paulista', -23.563311, -46.654275, 5],
			['Gama Academy', -23.567427, -46.684607, 4],
			['Marco Zero', -23.550460, -46.633934, 3],
			['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
			['Maroubra Beach', -33.950198, 151.259302, 1]
	];

	const map = new google.maps.Map(document.getElementById('map'), {
			zoom: 10,
			center: new google.maps.LatLng(-23.550460, -46.633934),
			mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	const infowindow = new google.maps.InfoWindow();

	let marker, i;

	// for (i = 0; i < locations.length; i++) {
	// 		marker = new google.maps.Marker({
	// 				position: new google.maps.LatLng(locations[i][1], locations[i][2]),
	// 				map: map
	// 		});

	// 		google.maps.event.addListener(marker, 'click', (function (marker, i) {
	// 				return function () {
	// 						infowindow.setContent(locations[i][0]);
	// 						infowindow.open(map, marker);
	// 				}
	// 		})(marker, i));
	// }
}
