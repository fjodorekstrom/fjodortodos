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
	url: 'http://localhost/api/todo_items',

	initialize: function(){
		console.log("Todos initialized");
	}
});

var Todos = new TodosCollection();
Todos.fetch();
Todos.fetch().done(function(){
	Todos.forEach(function(model){
		console.log(model.attributes.name);
		console.log(model.attributes.description);
		console.log(" ");
	});
});

console.log(Todos.models.length);
console.log(Todos);