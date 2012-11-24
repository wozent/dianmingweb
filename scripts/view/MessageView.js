var MessageView = Backbone.View.extend({
	el:$('#postTest'),

	events:{
		'click button#POSTsubmitClick':'POSTsubmitClick',
	},


	initialize:function(messages){
		_.bindAll(this, 'POSTsubmitClick');
		this.messages = messages;  
	},

	POSTsubmitClick:function(){
		alert("POSTsubmitClick event fired");
		var newMessage = new Message();
		var locationString = $('#POSTprovinceValue').val() + " " + $('#POSTcityValue').val() + " " + $('#POSTregionValue').val() + " " + $('#POSTschoolValue').val();

		var date = new Date();
		newMessage.set({'userName' : $('#POSTuserNameValue').val(), 'password' : $('#POSTpasswordValue').val(), 'date' : date.getFullYear() + " " + date.getMonth() + " " + date.getDate(),
        'location' : locationString, 'isMale' : true, 'content' : $('#POSTcontentValue').val(),
        'email' : $('#POSTemailValue').val(), 'phone' : $('#POSTphoneValue').val(), 'qq' : $('#POSTqqValue').val(), 'selfDefined' : $('#POSTselfDefinedValue').val(),
        'price' : Number($('#POSTpriceValue').val()), 'type' : Number($('#POSTphoneValue').val())});

		var self = this;
		newMessage.save(
							{},
							{
							success:function(model, response){
								console.log("saving succeeded");
								console.log(model.get('id'));
								self.messages.add(newMessage);
								alert("Connection Success: congradualations");
							},
							
							error: function(){
								console.log("saving failed");
								alert("Connection Error: check server configuration");
							}
						});

	},


});