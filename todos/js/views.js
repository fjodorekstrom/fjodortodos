var TodoView = Backbone.View.extend({
	tagName: 'li',
	todoTpl: _.template("an example template" ),
	events: {
		'click .toggle': 'toggleCompleted',
		'dblclick label': 'edit',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	initialize: function() {
		this.$el = $("#todo");
	 	this.model.bind('change', _.bind(this.render, this));
		//this.listenTo(todos, 'all', this.render);
	},

	render: function() {
		this.$el.html(this.todoTpl(this.model.toJSON));
		this.input = this.$(".edit");
		return this;
	},

	edit: function() {

	},

	close: function() {

	},

	updateOnEnter: function() {

	}
});

var ListView = Backbone.View.extend({
	render: function() {
		var items = this.model.get('items');
		_.each(items, function(item){
			var itemView = new ItemView({model: item});
			this.$el.append( itemView.render().el);
		}, this);
	}
});

var ItemView = Backbone.View.extend({
	events: {},
	render: function() {
		this.$el.html(this.model.toJSON());
		return this;
	}
});
