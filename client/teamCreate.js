Template.teamCreate.events({
  'click #addPlayer': function(event, template) {
    event.preventDefault();
    var validated = true;
    var first = template.$('#newPlayerFirstName').val();
    var last = template.$('#newPlayerLastName').val();

    if(!first){
      $('#newPlayerFirstName').css({'background-color' : 'pink'});

      alert('First name is required');
      validated = false;
    }
    if(!last){
      $('#newPlayerLastName').css({'background-color' : 'pink'});
      alert('Last name is required');
      validated = false;
    }

    if(Players.find({ firstName: first, lastName: last }).count()){
      alert('Player already exists...')
    }else{
      if(validated){
        Players.insert({ firstName: first, lastName: last });
        $('#newPlayerFirstName').val('');
        $('#newPlayerLastName').val('');
      }
    }
  },
  'change #players': function(event, template){
      var player = template.$("#players option:selected").html();
      if(!Session.get('count'))
        Session.set('count', 0);

      var labelText;
      if(Session.get('count') == 0){
        labelText = $('#newTeamMembers').text() + ' ' + (player.split(" "))[0];
        Session.set('count', 1);
      } else {
        labelText = $('#newTeamMembers').text() + ', ' + (player.split(" "))[0];
      }
      template.$('#newTeamMembers').text(labelText);
    },
    //CANCEL TEAM
    'click #cancelTeam': function(){
      return  Session.set('teamSelectTemplate', 'teamSelector');
    },
    'click #addTeam': function(){
      Session.set('count', 0);
      var newTeamMembers = $('#newTeamMembers').text();
      var team = newTeamMembers.replace("New Team: ", "");
      cardGameId = Session.get('selectedGame');
      Meteor.call('teamExists', cardGameId, team, function(error, result){
        if(error){
          console.log(error.reason);
        }else{
          if(result){
            alert('Team already exists for this game.');
          }else{
            Meteor.call('addTeam', cardGameId, team);
          }
        }
      });
    },
    'change #cardTeam': function(event) {
      var playerNames = $(event.target).val();
      return Session.set('playerNamesDelete', playerNames);
    },
    'click #deleteTeam': function(){
      Meteor.call('deleteTeam', Session.get('selectedGame'), Session.get('playerNamesDelete'));
    }
});

Template.teamCreate.helpers({
  cardPlayer: function(){
    return Players.find({}).fetch();
  },
  cardTeam: function(){
    //alert('selected card game in team selector: ' + reactiveVar.get());
    var cardTeam = CardGames.find({_id: Session.get('selectedGame')}).fetch();
    if(cardTeam){
      return cardTeam;
    }
  }
});