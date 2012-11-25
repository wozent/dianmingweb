
var Message = Backbone.Model.extend({
	
	defaults:{

        "userName" : "defaultUserName",
        "password" : "defaultPassword",
        "date" : "0 0 0",	
        "location" : "default default default default",
        "isMale" : true,
        "content" : "defaultContent",
        "email" : "defaultEmail@default.com",
        "phone" : "1383838438",
        "qq" : "1234567890",
        "selfDefined" : "dafultSelfDefiend",
        "price" : 0.0,
        "type" : 0,
	},

	urlRoot: "http://localhost:8015/api/badstudent/v0.9/messages",

	initialize:function(){
		_.bindAll(this, 'preSave', 'postSave');
		console.log("creating schedule: "+ this.toJSON + " id: " + this.id);
	},

	preSave:function(){

	},

	postSave:function(){

	},


});

var Messages = Backbone.Collection.extend({
	model: Message,

	url: "http://localhost:8015/api/badstudent/v0.9/messages",

	initialize:function(){
		_.bindAll(this);

	},
});