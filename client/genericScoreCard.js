Template.genericScoreCard.events({
	'click .addRow': function(evt, template){
    	template.showNewRow = true;
	}
});

Template.genericScoreCard.created = function() {
  this.showNewRow = false;
  alert(this.showNewRow);
};

Template.genericScoreCard.page = function(){
	return Session.get();
}