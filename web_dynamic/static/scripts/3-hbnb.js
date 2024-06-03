$(function () {
	let Amenity = {}

	function checkApiStatus() {
		$('#api_status').addClass('notavailable');
		$.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
			if (status === "success" && data.status === "OK") {
				$('#api_status').addClass('available') && $('#api_status').removeClass('notavailable');
			} else {
				$('#api_status').removeClass('available');
			}
		});
	}

	function updateAmenities() {
		let amenity = Object.values(Amenity).join(', ');
		$('.amenities h4').text(amenity);
	}

	function placeSearch() {
		/** Fetch places
		 * Set the url and method to make request
		 * set the content-type, the datatype and data
		 * set headers
		 * check the response/data on success
		 * check the error message if it fails
		*/

		$.ajax({
			url: 'http://0.0.0.0:5001/api/v1/places_search/',
			type: "POST",
			contentType: "application/json",
			dataType: "json",
			data: JSON.stringify({}),
			headers: { "Content-Type": "application/json" },
			success: function (response) {
				let responsemsg = response;
				responsemsg.forEach(place => {
					let article = $('<article></article>');
					let titleBox = $('<div class="title_box"></div>');
					titleBox.append('<h2>' + place.name + '</h2>');
					titleBox.append('<div class="price_by_night">$' + place.price_by_night + '</div>');
					article.append(titleBox);

					let information = $('<div class="information"></div>');
					information.append('<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>');
					information.append('<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>');
					information.append('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>');
					article.append(information);

					let description = $('<div class="description"></div>');
					description.html(place.description);
					article.append(description);

					$('.places').append(article);
				});
				console.log(responsemsg);
			},
			error: function (error) {
				let errormsg = error;
				console.log("Error Loading places:", errormsg);
			}
		});
	}
	$('#btnSearch').click(placeSearch);

	$('input[type=checkbox]').change(function () {
		/** if it is checked get the data id and data name */
		let data_id = $(this).data("id");

		if ($(this).prop('checked')) {
			Amenity[data_id] = $(this).data('name');
		}
		else {
			delete Amenity[data_id];
		}
		updateAmenities();
	});
	//initial calls to update the api status, amenities and places
	checkApiStatus();
	updateAmenities();
	placeSearch();
});
