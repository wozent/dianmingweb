
var Message = Backbone.Model.extend({
	
	defaults:{

        "userName" : "defaultUserName",
        "password" : "defaultPassword",
        "startDate":"0 0 0",
        "endDate" : "0 0 0",	
        "courseLengthInMinutes" : 0,
        "location" : "default default default",
        "gender" : 2,
        "content" : "defaultContent",
        "email" : "defaultEmail@default.com",
        "phone" : "1383838438",
        "qq" : "1234567890",
        "twitter":"defaultTwitter",
        "selfDefined" : "dafultSelfDefiend",
        "price" : 0.0,
        "type" : 0,
        "authCode" : -1,
	},

	urlRoot: "http://localhost:8015/api/badstudent/v0.9/messages",

	initialize:function(urlRootOverride){
		_.bindAll(this, 'preSave', 'postSave');
		console.log("creating message: "+ this.toJSON + " id: " + this.id);
		if (urlRootOverride != null){
			this.urlRoot = urlRootOverride;
		}
	},

	preSave:function(){

	},

	postSave:function(){

	},


});

var Messages = Backbone.Collection.extend({
	model: Message,

	url: "http://localhost:8015/api/badstudent/v0.9/messages",

	initialize:function(urlOverride){
		_.bindAll(this);
		if (urlOverride != null){
			this.url = urlOverride;
		}

	},
});