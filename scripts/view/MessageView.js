var MessageView = Backbone.View.extend({
	el:$('body'),

	events:{
		'click button#POSTsubmitClick':'POSTsubmitClick',
		'click button#PUTsubmitClick':'PUTsubmitClick',
		'click button#DELETEsubmitClick':'DELETEsubmitClick',
		'click button#GETsubmitClick':'GETsubmitClick',
		'click button#GETclearClick':'GETclearClick',
		'click button#primarySearchSubmitClick':'primarySearchSubmitClick',
		'click button#primarySearchClearClick':'primarySearchClearClick',
		'click button#authSubmitClick':'authSubmitClick',
	},


	initialize:function(messages){
		_.bindAll(this, 'POSTsubmitClick','PUTsubmitClick', 'DELETEsubmitClick', 'GETsubmitClick', 'GETclearClick', 'primarySearchSubmitClick', 'primarySearchClearClick', 'findById');
		this.messages = messages;  
		this.tempMessages = new Messages();
		this.tempMessagesArray =  new Array();    //used to store views
		this.passwordMessage = new Message("/api/badstudent/v0.9/auth");
		this.primarySearchResult = new Messages("/api/badstudent/v0.9/primarySearch");
	},

	POSTsubmitClick:function(){
		alert("POSTsubmitClick event fired");
		var newMessage = new Message();
		var locationString = $('#POSTprovinceValue').val() + " " + $('#POSTcityValue').val() + " " + $('#POSTschoolValue').val();

		var date = new Date();
		newMessage.set({'userName' : $('#POSTuserNameValue').val(), 'password' : $('#POSTpasswordValue').val(), 'startDate' : "2012 12 21", 'endDate' : "2012 12 31",
        'location' : locationString, 'gender' : 2, 'content' : $('#POSTcontentValue').val(),
        'email' : $('#POSTemailValue').val(), 'phone' : $('#POSTphoneValue').val(), 'qq' : $('#POSTqqValue').val(), 'twitter' : $('#POSTtwitterValue').val(), 'selfDefined' : $('#POSTselfDefinedValue').val(),
        'price' : Number($('#POSTpriceValue').val()), "courseLengthInMinutes" : 60, 'authCode':-1, 'type' : Number($('#POSTtypeValue').val())});

		var self = this;
		newMessage.save({},{
							success:function(model, response){
								console.log("POST succeeded");
								console.log(model.get('id'));
								self.messages.add(newMessage);
								alert("POST Success: congradualations");
							},
							
							error: function(){
								console.log("POST failed");
								alert("POST Error: check server configuration");
							}
						});

	},

	PUTsubmitClick:function(){
		alert("PUTsubmitClick event fired");
		var id = $('#PUTidValue').val();
		console.log("target: " + id);

		var thisMessage = this.messages.get(id);
		

		var locationString = $('#PUTprovinceValue').val() + " " + $('#PUTcityValue').val() + " " + $('#PUTschoolValue').val();

		var date = new Date();
		thisMessage.set({'userName' : $('#PUTuserNameValue').val(), 'password' : $('#PUTpasswordValue').val(), 'date' : date.getFullYear() + " " + date.getMonth() + " " + date.getDate(),
        'location' : locationString, 'isMale' : true, 'content' : $('#PUTcontentValue').val(),
        'email' : $('#PUTemailValue').val(), 'phone' : $('#PUTphoneValue').val(), 'qq' : $('#PUTqqValue').val(), 'twitter' : $('#PUTtwitterValue').val(), 'selfDefined' : $('#PUTselfDefinedValue').val(),
        'price' : Number($('#PUTpriceValue').val()), 'type' : Number($('#PUTtypeValue').val())});

		var self = this;
		thisMessage.save({},{
							success:function(model, response){
								console.log("PUT succeeded");
								console.log(model.get('id'));
								alert("PUT Success: congradualations");
							},
							
							error: function(){
								console.log("PUT failed");
								alert("PUT Error: check server configuration");
							}
						});

	},

	DELETEsubmitClick:function(){
		alert("DELETEsubmitClick event fired");
		var id = $('#DELETEidValue').val();
		var thisMessage = this.messages.get(id);

		var self = this;
		thisMessage.destroy({},{
							success:function(model, response){
								console.log("DELETE succeeded");
								console.log(model.get('id'));
								self.messages.remove(thisMessage);
								alert("DELETE Success: congradualations");
							},
							
							error: function(){
								console.log("DELETE failed");
								alert("DELETE Error: check server configuration");
							}
						});

	},

	GETsubmitClick:function(){
		alert("GETsubmitClick event fired");
		var phoneValue = $('#GETphoneValue').val();
		var emailValue = $('#GETemailValue').val();
		var qqValue = $('#GETqqValue').val();
		var selfDefinedValue = $('#GETselfDefinedValue').val();
		var self = this;
		this.tempMessages.fetch({
				data: $.param({ phone: phoneValue, email: emailValue, qq: qqValue, selfDefined: selfDefinedValue}),
		
				dataType:'json',
				
		        success: function (model, response) {
		            console.log("GET success"); 
		            console.log(response);

		        },
		        
				error: function(model, response){
					console.log("GET failed");
					console.log(response);
					alert("failed to GET data from server");
				}

			});

		for (var i = 0; i < this.tempMessages.length; i++){
			utils.loadTemplate(new ResultView(this.tempMessages.at(i)), self.tempMessagesArray.push(new ResultView(this.tempMessages.at(i))));
			 
		}


	},

	GETclearClick:function(){
		for (var i = 0; i < this.tempMessagesArray.length; i++){
			this.tempMessagesArray[i].removeView();
		}
		this.tempMessages.reset();
		$('#ResultContainer').empty()
	},

	primarySearchSubmitClick:function(){
		var locationString = $('#primarySearchProvinceValue').val() + " " + $('#primarySearchCityValue').val() + " " + $('#primarySearchSchoolValue').val();
		var date = new Date();
		var dateString = date.getFullYear() + " " + date.getMonth() + " " + date.getDate();

		this.primarySearchResult.fetch({
				data: $.param({ location: locationString, date: dateString}),
		
				dataType:'json',
				
		        success: function (model, response) {
		            console.log("GET success"); 
		            console.log(response);

		        },
		        
				error: function(model, response){
					console.log("GET failed");
					console.log(response);
					alert("failed to GET data from server");
				}

			});

	},

	primarySearchClearClick:function(){
		this.primarySearchResult.reset();
	},

	authSubmitClick:function(){
		var idValue = $('#authIdValue').val();
		var passwordValue = $('#authPasswordValue').val();
		var self = this;

		this.passwordMessage.fetch({
				data: $.param({id: idValue, password : passwordValue}),
		
				dataType:'json',
				
		        success: function (model, response) {
		            console.log("GET success"); 
		            console.log(response);
		            self.messages.get(idValue).set({'authCode':response.authCode});
		            console.log(self.messages.get(idValue));
		        },
		        
				error: function(model, response){
					console.log("GET failed");
					console.log(response);
					alert("failed to GET data from server");
				}

			});
	},



	findById:function(id){
		this.messages.each(function(message){
			console.log("current : " + id);
			if (message.id == id){
				return message;
			}
		});
	},


});