$(document).ready(function(){
	$('.link').on('click', getJSON("http://localhost:9090/todo_items/1.json"));

	function getJSON(url) {
		var res;
		$.ajax({
			type: 'GET',
			crossDomain: true,
			url: url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				alert(data);
			},
			error: function(xhr, type, error) {
				//error code here
			},
			complete: function() {
				// on complete code here
				console.log("Successfully fetched " + res);
			}
		});
	}

		function getJSON2(urlen){
		$.getJSON(urlen, function(data) {
			var items = [];

			$.each(data, function(key, val) {
				items.push('<li id="' + key + '">' + val + '</li>');
			});

			$('<ul/>', {
				'class': 'my-new-list',
				html: items.join('')
			}).appendTo('body');
		});
	}
});