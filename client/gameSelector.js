Template.gameSelector.helpers({
    cardGame: function(){
      return CardGames.find({}, {sort: {name: 1} }).fetch();
    }
  });

  Template.gameSelector.events({
    'change #cardGame': function(event, template){

      var selectedGame = $(event.target).val();
      var selectedGameName = template.$('#cardGame option:selected').text();

      Session.set('selectedGame', selectedGame);
      Session.set('selectedGameName', selectedGameName);

      return Session.set('selectTemplate', 'selectedGame');

    },
    'click #newGame': function(){
      return Session.set('selectTemplate', 'gameCreate');
    }
  });