var app = app || {};

app.AppView = Backbone.View.extend({
	el: '#todoapp',

	statsTemplate: _.template( $('#stats-template').html() ),

	events: {
		'keypress #new-todo': 'createOnEnter',
		'keypress #new-todo-descr': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete'
	},

	initialize: function() {

		this.allCheckbox = this.$('#toggle-all')[0];
		this.$input = this.$('#new-todo');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		_.bindAll(this, 'render');

		

		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);

		this.listenTo(app.Todos, 'change:completed', this.filterOne);
		this.listenTo(app.Todos, 'filter', this.filterAll);
		this.listenTo(app.Todos, 'all', this.render);
		this.listenTo(app.Todos, 'reset', this.render);
		app.Todos.fetch({reset: true});
		this.render();
	},

	render: function() {
		var completed = app.Todos.completed().length;
		var remaining = app.Todos.remaining().length;

		if ( app.Todos.length ) {
			this.$main.show();
			this.$footer.show();

			this.$footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}));

			this.$('#filters li a')
				.removeClass('selected')
				.filter('[href="#/' + (app.TodoFilter || '' ) + '"]')
				.addClass('selected');
		} else {
			this.$main.hide();
			this.$footer.hide();
		}
		this.allCheckbox.checked = !remaining;
	},

	addOne: function( todo ) {
		app.Todos.add(todo);
		var view = new app.TodoView({model: todo });
		$('#todo-list').append(view.render().el);		

	},

	addAll: function() {
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne, this);
	},

	filterOne: function(todo) {
		todo.trigger('visible');
	},

	filterAll: function() {
		app.Todos.each(this.filterOne, this);
	},

	newAttributes: function() {
		return {
			name: this.$("#new-todo").val().trim(),
			description: this.$("#new-todo-descr").val().trim(),
			order: app.Todos.nextOrder(),
			completed: false
		};
	},

	createOnEnter: function( event ) {
		if ( event.which !== ENTER_KEY || !this.$("#new-todo").val().trim() || !this.$("#new-todo-descr").val().trim() ) {
			return;
		}
		var self = this;
		app.Todos.create( this.newAttributes() );
		app.Todos.reset().fetch({
			done: function() {
				console.log("successfully fetched all todos");
			}
		});
		console.log("Creating new todo...");
		this.$("#new-todo").val('');
		this.$("#new-todo-descr").val('');
	},

	clearCompleted: function() {
		_.invoke(app.Todos.completed(), 'destroy');
		return false;
	},

	toggleAllComplete: function() {
		var completed = this.allCheckbox.checked;

		app.Todos.each(function( todo ) {
			todo.save({
				'completed': completed
			});
		});	
	}
});