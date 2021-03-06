var app = app || {};

app.TodoView = Backbone.View.extend({
	tagName: 'li',

	template: _.template( $('#item-template').html() ),

	events: {
		'dblclick label': 'edit',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close',
		'click .toggle': 'togglecompleted',
		'click .destroy': 'deleteFromDb'
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'reset', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'visible', this.toggleVisible);
	},

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );

		this.$el.toggleClass( 'completed', this.model.get('completed') );
		this.toggleVisible();

		this.$input = this.$('.edit');
		console.log(this.model.toJSON() );
		return this;
	},

	toggleVisible: function() {
		this.$el.toggleClass( 'hidden', this.isHidden());
	},

	isHidden: function() {
		var isCompleted = this.model.get('completed');
		return( 
			(!isCompleted && app.TodoFilter === 'completed')
			|| (isCompleted && app.TodoFilter === 'active')
			);
	},

	togglecompleted: function() {
		this.model.toggle();
	},

	edit: function() {
		this.$el.addClass('editing');
		this.$input.focus();
	},

	close: function() {
		//var value = this.$input.val().trim();
		var value1 = this.$("#new-todo").val();
		var value2 = this.$("#new-todo-descr").val();
		if( value1 && value2 ) {
			this.model.save({ name: value1, description: value2 }, {
				success: function() {
					console.log("successfully saved " + this.model);
				}
			});
		} else {
			this.clear();
		}

		this.$el.removeClass('editing');
	},

	updateOnEnter: function( e ) {
		if ( e.which === ENTER_KEY ) {
			this.close();
		}
	},

	clear: function() {
		this.model.destroy();
	},

	deleteFromDb: function() {
		var modelId = this.model.attributes.url.split("/");
		var modelIndex = modelId[modelId.length - 1].split(".")[0];
		console.log("Removing todo " + modelIndex);
		Backbone.sync("delete", this.model, {url: "api/todo_items/" + modelIndex});
		this.clear();	
	}
});