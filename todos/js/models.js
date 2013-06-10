$(function() {
	window.Todo = Backbone.Model.extend({
		defaults: {
			name: "name",
			description: "description"
		}
	});
})