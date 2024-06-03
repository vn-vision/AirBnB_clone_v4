$(function(){
	let Amenity = {}
	function updateAmenities (){
		let amenity = Object.values(Amenity).join(', ');
		$('.amenities h4').text(amenity);

		$('#api_status').addClass('notavailable');
		$.get('http://0.0.0.0:5001/api/v1/status/', function(data, status){
			if (status === "success" && data.status === "OK"){
				$('#api_status').addClass('available') && $('#api_status').removeClass('notavailable');
			} else {
				$('#api_status').removeClass('available');
			}
		});
	}

	$('input[type=checkbox]').change(function(){
		/** if it is checked get the data id and data name */
		let data_id = $(this).data("id");

		if ($(this).prop('checked')){
			Amenity[data_id] = $(this).data('name');
		}
		else
		{
			delete Amenity[data_id];
		}
		updateAmenities();
	});
		updateAmenities();
});
