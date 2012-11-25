var ResultView = Backbone.View.extend({
	el:$('#ResultContainer'),

	initialize:function(message){
		_.bindAll(this, 'render', 'removeView');
		this.message = message;

	},

	render:function(){
		this.el.append(this.template(this.message.toJSON()));
	},

	removeView:function(){
		Backbone.View.prototype.remove.call(this);
	}


});