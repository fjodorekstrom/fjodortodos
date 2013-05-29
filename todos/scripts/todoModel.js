(function($){
	var Todo = Backbone.Model.extend({
		el: $('.todo'),
		initialize: {
			_.bindAll(this, 'render');
		},
		render: {
			$(this.el).append("<ul><li>hello world</li></ul>");
		}
	});

	var todo = new Todo();
})(Zepto);