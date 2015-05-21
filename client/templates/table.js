Template.tables.rendered = function(){
	Session.set('tablesTemplateInstance', this._id);
}

Template.tables.helpers({
	table: function(row, column){
		playerPosition = ['one','two','three','four','five','six','seven', 'eight'];
        Session.setDefault('rows', 7);
        Session.setDefault('columns', 4);

        //GET TEAM HISTORY
        var gameCursor = CardGames.find({_id: Session.get('selectedGame')});
        var gameArray = gameCursor.fetch();
        for (var i=0; i<gameArray.length; i++) {
            Session.set('winner', gameArray[i].winner );
            Session.set('rows', gameArray[i].rows);
            Session.set('start', gameArray[i].start);
            var teamsArray = gameArray[i].teams;
            for (var y=0; y<teamsArray.length; y++) {
                if(teamsArray[y].team == Session.get('playerNames')){
                    Session.set('teamHistory', teamsArray[y].history );
                }
            }
        }

		var html = '<table id="card" class="table table-striped table-responsive">';
		var history = true;
		var playerNames = Session.get('playerNames');
		var playersArray = null;
		
		if(playerNames){
			playersArray = playerNames.split(',');
			column = playersArray.length;
			Session.set('columns', column);
		}else{
            column = Session.get('columns');
        }

		//WIN HISTORY
		if(history){
			html += "<tr><td class='scorecardsidemenu' id='history'>History:</td>";
			for(var h=0; h<column; h++){
				//html += "<td><input class='scoreCard' id='history" + playerPosition[h] + "' placeholder='0' /></td>"
                html += "<td id='history'" + playerPosition[h] + "'>0</td>"
			}
			html += "</tr>";
		}

		//GAME SCORE
		html += "<tr><td class='scorecardsidemenu' id='score'>Score:</td>";
		for(var s=0; s<column; s++){
			//html += "<td><input class='scoreCard'  id='gamescore" + playerPosition[s] + "' placeholder='0' type='number' /></td>"
            html += "<td id='gamescore'" + playerPosition[s] + "'>0</td>"
		}
		html += "</tr>";


		// PLAYER NAMES
		html += "<tr><td class='scorecardsidemenu' id='players'>Players:</td>";
		if(playersArray){
			for(var p=0; p<column; p++){
				//html += "<td><input class='scoreCard'  id='players" + playerPosition[p] + "' value='"+playersArray[p]+"'/></td>"
                html += "<td id='players'" + playerPosition[p] + "'>"+playersArray[p]+"</td>"
			}
		}else{
			for(var p=0; p<column; p++){
				html += "<td id='players' class='scoreplayer'>Name</td>"
			}
		}
		html += "</tr>";

		//PLAYER SCORE
		for(var r=0; r<Session.get('rows'); r++){
			html += "<tr><td class='scorecardsidemenu' id='score'>"+(r+1)+"</td>";
			for(var c=0; c<column; c++){
				html += "<td><input class='scoreCard'  id='score" + playerPosition[c] + "' placeholder='0' type='number' /></td>"
			}
			html += "</tr>";
			Session.set('r', r+1);
		}
		html += "</table>"
		
		return Spacebars.SafeString(html);
	}
}); 

Template.tables.events({
 'click .addRow': function(event, template){
 	var inst = Session.get('tablesTemplateInstance');
 	var column = Session.get('columns');
 	var r = Session.get('r')+1;
 	Session.set('r', r);
 	var html =  "<tr><td class='scorecardsidemenu' id='score'>"+r+"</td>";
	for(var c=0; c<column; c++){
		html += "<td><input class='scoreCard' id='score" + playerPosition[c] + "' placeholder='0' type='number'/></td>"
	};
	html = html + "</tr>";

 	template.$('#card tr:last').after(html);
 },
    'click .removeRow': function(event,template){
 	    var r = Session.get('r');
 	    Session.set('r', r-1)
 	    //
 	    //IF DELETED ROW CONTAIN VALUES, DELETE VALUES FROM TOTAL
 	    //
 	    template.$('#card tr:last').remove();
 },
    'change .scoreCard': function(event, template){
 	    var score = event.target.value;
 	    if(parseInt(score)){
 		    var scoreid = event.target.id;
 		    var gamescoreid = "#gamescore" + scoreid.substring(5);
 		    var gamescore = template.$(gamescoreid).text();
 		    template.$(gamescoreid).text(gamescore*1+score*1);
	    }else{
		    event.target.value = "";
 		    alert('A number is the only valid player score entry...');
 	    }
 },
    'click #saveGame': function(event, template){
        //GET TEAM HISTORY
        //var gameCursor = CardGames.find({_id: Session.get('selectedGame')});
        //var gameArray = gameCursor.fetch();
        //for (var i=0; i<gameArray.length; i++) {
        //    Session.set('winner', gameArray[i].winner );
        //    var teamsArray = gameArray[i].teams;
        //    for (var y=0; y<teamsArray.length; y++) {
        //        if(teamsArray[y].team == Session.get('playerNames')){
        //            Session.set('teamHistory', teamsArray[y].history );
        //        }
        //    }
        //}

        //CREATE TEAM HISTORY ARRAY
        var history = Session.get('teamHistory');
        var historyArray = history.split(',').map(function(item) {
            return parseInt(item, 10);
        });

        //GET GAME SCORES ARRAY
        var scores = [];
        for (var i=0; i<historyArray.length; i++){
            var id = '#gamescore' + playerPosition[i];
            scores.push(template.$(id).val());
        }

        //ID WINNING SCORE
        var winningScore = 0;
        if(Session.get('winner') == 'High Score'){
            winningScore = Math.max.apply(Math, scores);
        }else{
            winningScore = Math.min.apply(Math, scores);
        }

        //UPDATE TEAM HISTORY ARRAY
        for(var i=0; i<historyArray.length; i++){
            if(scores[i] == winningScore){
                var val = historyArray[i];
                val = parseInt(val);
                val += 1;
                historyArray[i] = val;
            }
        }
        history = historyArray.toString();

        Meteor.call('updateTeamGameHistory',Session.get('selectedGame'), Session.get('playerNames'), history);
	}
});
