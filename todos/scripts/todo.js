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
		var objectArray = getObjectArray();
		var selectedObject = objectArray[objectIndex];
		return selectedObject;			
	}

	var getObjectArray = function(){
		var objectArray = jqxhr.done(); 
		return objectArray.responseJSON;	
	}

	var getName = function(jsonObj){
		return jsonObj.name;
	}

	var getDescription = function(jsonObj){
		return jsonObj.description;
	}


	$("button").click(function(){
		todos = new TodoList([]);
		for(var i = 0; i < jqxhr.responseJSON.length; i++){
			if(jqxhr.responseJSON.length > todos.length){
				todos.push(makeTodo(i));
			}
		}
		new App();
	});

	var makeTodo = function(todoIndex){
		var namn = getName(getTodo(todoIndex));
		var descr = getDescription(getTodo(todoIndex));
		var tempTodo = new Todo({name: namn, description: descr});
		return tempTodo;	
	}


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

	var todos = new TodoList([]);

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
			this.list.empty();
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

