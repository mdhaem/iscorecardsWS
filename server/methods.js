Meteor.methods({
	addNewGame: function(newgameName, hands, startRow, gameWinner){
		CardGames.insert({name: newgameName, rows: hands, start:startRow, winner:gameWinner});
	},
	deleteGame:function(gameName){
		CardGames.remove({name: gameName});
	},
	//ADD TEAM
	'addTeam': function(gameId, playerList){
        console.log("add new team " + playerList + ' ' + gameId);
        var totals = "";
        for(index=0; index < playerList.split(',').length; ++index){
            totals += "0,";
        }
        totals = totals.substring(0, totals.length - 1);
console.log(totals);
        CardGames.update({_id: gameId}, { $push: { teams:{team: playerList, history: totals}}});
    },
    'newTableRow': function(){
        $('#genericTable tr:last').genericScoreCard().after('<tr><td>7:</td><td><input class="input-small" type="text" value="0" /></td><td><input class="input-small" type="text" value="0" /></td><td><input class="input-small" type="text" value="0" /></td><td><input class="input-small" type="text" value="0" /></td></tr>');
    },
    'teamExists': function(gameId, team){
    	console.log(gameId + team);
    	var cardGame = CardGames.find({_id: gameId, "teams.team": team}).fetch();

    	console.log('card Game length: ' + cardGame.length);
    	if(cardGame.length > 0){
    		console.log("team exists: " + team);
    		return 1;
    	}else{
    		console.log("team does not exist: " + team);
    		return 0;
    	}
    },
    'deleteTeam': function(selectedGame, playerNamesDelete){
    	console.log('player names to delete: '+ playerNamesDelete);
    	console.log('selected game: '+ selectedGame);
    	return CardGames.update({_id: selectedGame}, {$pull : {teams : {team: playerNamesDelete}}},
    		function(error, id){
    			console.log(error,id);
    		});
    },
    'updateTeamGameHistory':function(gameId, playerList, newHistory){
        console.log( 'game ' + gameId);
        console.log('team ' + playerList);
        console.log('newHistory '+ newHistory);
        CardGames.update({_id:gameId, "teams.team": playerList},{ $set: { "teams.$":{team: playerList, history: newHistory}}});
    }
});