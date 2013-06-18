var app = app || {}

app.Todo = Backbone.Model.extend({
	defaults: {
		name: '',
		description: '',
		url: 'http://fjodortodos.herokuapp.com/todo_items',
		completed: false
	},

	toggle: function() {
		this.save({
			completed: !this.get('completed')
		});
	}
});