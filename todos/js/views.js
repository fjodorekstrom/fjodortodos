window.TodoView = Backbone.View.extend({
	render: function() {
		var todo = _.template( $("#todo_template").html(), this.model.toJSON());
		$("#todos").append(todo);
		$("#t_" + this.model.get("name")).fadeIn();
	}
});

window.FormView = Backbone.View.extend({
	el: $("#getTodos"),
	events: {
		"submit": "get_todos"
	},

	get_todos: function(e) {
		e.preventDefault();
		var self = this;
		$.getJSON("http://localhost/api/todo_items").success(function(json){
			console.log(json);
			$("#todos li").fadeOut();
				for (var i  in json) {
					var todo = new Todo(json[i]);
					var todoView = new TodoView({model: todo});
					todoView.render();
					console.log(json[i]);
				}
		});		
	},
});