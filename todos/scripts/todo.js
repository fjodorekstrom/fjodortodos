$(document).ready(function(){
	$("button").click(function(){
		$.getJSON("http://localhost:9090/todo_items.json",function(result){
			$.each(result, function(i, field){
				$("div").html("<p>" + field + "</p>");
			});
		});
	});
});

