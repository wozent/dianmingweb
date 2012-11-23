var MessageView = Backbone.View.extend({
	el:$('#initTest'),

	events:{
		'click button#submitClick':'submitClick',
	},


	initialize:function(messages){
		_.bindAll(this, 'submitClick');
		this.messages = messages;  
	},

	submitClick:function(){
		alert("submitClick events fired");
		var newMessage = new Message();
		var locationString = $('#provinceValue').val() + " " + $('#cityValue').val() + " " + $('#regionValue').val() + " " + $('#schoolValue').val();

		var date = new Date();
		newMessage.set({'userName' : $('#userNameValue').val(), 'password' : $('#passwordValue').val(), 'date' : date.getFullYear() + " " + date.getMonth() + " " + date.getDate(),
        'location' : locationString, 'isMale' : true, 'content' : $('#contentValue').val(),
        'email' : $('#emailValue').val(), 'phone' : $('#phoneValue').val(), 'qq' : $('#qqValue').val(), 'selfDefined' : $('#selfDefinedValue').val(),
        'price' : Number($('#priceValue').val()), 'type' : 0});

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