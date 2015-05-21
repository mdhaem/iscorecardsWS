Template.selectedGame.helpers({
  gameName: function(){
    return Session.get('selectedGameName');
  }
});

Template.selectedGame.events({
	'click #newGame': function(){
		return Session.set('selectTemplate', 'gameSelector');
	}
});