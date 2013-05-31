$(document).ready(function(){
	$("button").click(function(){
		$.getJSON("http://localhost:9090/todo_items.json",function(result){
			$.each(result, function(i, field){
				   console.log(' name=' + key + ' value=' + JSON.stringify(field[name]));

				$('.todo').append('<p>' + JSON.stringify(field) + '</p>');
				
			});
		});
	});

	var Todo = Backbone.Model.extend({
		defaults: {
			name: "Todo default",
			description: "this is a default description",
			checked: false
		},

		toggle: function(){
			this.set('checked', !this.get('checked'));
		}

	});

	var TodoList = Backbone.Collection.extend({
		model: Todo,

		getChecked: function(){
			return this.where({checked:true});
		}
	});

	var fetchJSON = function(url){
		$.getJSON(url, function(result){
			return result;
		});
	}

	var todos = new TodoList({
		var res = fetchJSON("http://localhost:9090/todo_items.json");
			$.each(result, function(i, field){
				new Todo({ name: field[name], description: field[description]});
			});
		});	
	});

	var TodoView = Backbone.View.extend({
		tagName: 'li',

		events: {
			'click': 'toggleTodo'
		},

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},

		render: function(){
			this.$el.html('<input type="checkbox" value="1" name="' + this.model.get('name') + '" /> ' + this.model.get('name') + '<span>$' + this.model.get('description') + '</span>');
			this.$('input').prop('checked', this.model.get('checked'));
			
			return this;
		},

		toggleTodo: function(){
			this.model.toggle();
		}
	});

	var App = Backbone.View.extend({
		el: $('.todos'),

		initialize: function(){
			this.list = $('#todos');

			this.listenTo(todos, 'change', this.render);

			todos.each(function(todo){
				var view = new TodoView({ model: todo});
				this.list.append(view.render().el);
			}, this);
		},

		render: function(){
			return this;
		}
	});

	new App();
});

