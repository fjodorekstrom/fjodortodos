$(function() {
	var Todo = Backbone.Model.extend({
		defaults: {
			name: "name",
			description: "description",
			completed: false
		},
		initialize: function(){
			this.on('change', function(){
				console.log("model changed");
			});
		}
	});

	var TodosCollection = Backbone.Collection.extend({
		model: Todo,
		name: "todo_items",
		url: 'http://localhost/api/todo_items'
	});

	var Todos = new TodosCollection();
	Todos.fetch().done();

	console.log(Todos);
	var models = Todos['models'];
	console.log(models.length);
});