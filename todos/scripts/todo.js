$(document).ready(function(){

	var jqxhr = $.getJSON("http://localhost:9090/todo_items.json", function(result){
		console.log("successfully sent request..");
	}).done(function(json, objectIndex){
		console.log("fetched " + JSON.stringify(json[objectIndex]));
		return json[objectIndex];
	})
	.fail(function(){
		console.log("failed ");
	})
	.always(function(){
		console.log("request sent...");
	});

	var getTodo = function(objectIndex){
		var objectArray = jqxhr.done(); 
		objectArray = objectArray.responseJSON;
		var selectedObject = objectArray[objectIndex];
		return selectedObject;			
	}

	var getName = function(jsonObj){
		return jsonObj.name;
	}

	var getDescription = function(jsonObj){
		return jsonObj.description;
	}


	$("button").click(function(){
		var obj1 = getTodo(0);
		console.log(getName(obj1));
		console.log(getDescription(obj1));
		var obj2 = getTodo(1);
		console.log(getName(obj2));		
		console.log(getDescription(obj2));
	});


	var Todo = Backbone.Model.extend({
		defaults: {
			name: "Default title",
			description: "this is a default description",
			checked: false
		},

		toggle: function(){
			this.set('checked', !this.get('checked'));
		}

	});

	var getTodos = function(url){
		$.getJSON(url, function(result){
			return result;
		});
	}
	
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

	var todos = new TodoList([
		new Todo({ name: getName(getTodo(0)), description: getDescription(getTodo(0))}),
		new Todo({ name: getName(getTodo(1)), description: getDescription(getTodo(1))}),

		]);

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
		el: $('#main'),

		initialize: function(){
			_.bindAll(this);
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

