Template.gameCreate.events({
	'click #add': function(event, template){
		if(template.$('#addGame').val()){

			Meteor.call('addNewGame', 
				template.$('#addGame').val(),
				template.$('#hands').val(),
				template.$('#startRow').val(),
				template.$('#winner option:selected').text());
		}
	},
	'click #delete': function(event, template){
		var game = template.$('#deleteGame').val();
		if(game){
			Meteor.call('deleteGame', game);
			alert('Game ' + game + ' was deleted.')
			template.$('#deleteGame').val(''); 
		}
	},
	'click .cancel': function(){
		return  Session.set('selectTemplate', 'gameSelector');
	}
});