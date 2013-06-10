window.TodoView = Backbone.View.extend({
	render: function() {
		var todo = _.template( $("#todo_template").html(), this.model.toJSON());
		$("#todos").append(todo);
		$("#t_" + this.model.get("name")).fadeIn();
	}
});

window.FormView = Backbone.View.extend({
	el: $("#main"),
	events: {
		"click #getTodos": "get_todos",
		"submit #makeTodo": "make_todo"
	},

	get_todos: function(e) {
		e.preventDefault();
		var self = this;
		$.getJSON("http://localhost/api/todo_items").done(function(json){
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

	make_todo: function(e) {
		e.preventDefault();
		var self = this;
		var todo = new Todo({ name: $("#name").val, description: $("description").val() });
		console.log(todo);
		$.post("http://localhost/api/todo_items", { "todo_item": [todo] }).done(function(data) {
  			alert("Data Loaded: " + data);
		});
	}
});