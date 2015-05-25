Template.teamSelector.helpers({
  cardTeam: function(){
    var cardTeam = CardGames.findOne({_id: Session.get('selectedGame')});

    if(cardTeam){
      var teams = cardTeam.teams;
      return teams;
    }
  }
});

  Template.teamSelector.events({
    'change #cardTeam': function(event, template) {
        var playerNames = template.$('#cardTeam option:selected').text();
        Session.set('playerNames', playerNames);

        return Session.set('teamSelectTemplate', 'selectedTeam');

    },
        'click #changeTeam': function(){
          return Session.set('teamSelectTemplate', 'teamSelector');
    },
      'click #newTeam': function(){
          return Session.set('teamSelectTemplate', 'teamCreate');
      }
  });


  //############# SCORE CARD #############
  //Template.scoreCard.created = function() {
  //  Session.setDefault('currentStep', 1);
  //};
  //
  //
  //Template.scoreCard.helpers({
  //  isStep: function(n) {
  //    return Session.equals('currentStep', n);
  //  }
  //});