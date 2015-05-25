Template.selectedTeam.helpers({
    playerNames: function(){
        return Session.get('playerNames');
    }
});

Template.selectedTeam.events({
    'click #changeTeam': function(){
        return Session.set('teamSelectTemplate', 'teamSelector');
    }
});
