var app = app || {}

app.Todo = Backbone.Model.extend({
	defaults: {
		name: '',
		description: '',
		//url: 'api/todo_items',
		completed: false,
		idAttribute: 'id'
	},
/**
	methodUrl:  function(method){
	if(method == "delete"){
    		return this.attributes.url;
    	}else if(method == "update"){
                return "http://www.api.com/mymodel/" + this.attributes.id+"/update";
        }else if(method == "create"){
                return "http://www.api.com/mymodel/create";
        } 
    	return false;
	},

	sync = function(method, model, options) {
    if (model.methodUrl && model.methodUrl(method.toLowerCase())) {
      	options = options || {};
      	options.url = model.methodUrl(method.toLowerCase());
    }
	},
**/
	toggle: function() {
		this.save({
			completed: !this.get('completed')
		});
	}
});