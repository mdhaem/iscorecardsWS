Template.gamesMasterTemplate.created = function() {
    Session.setDefault('selectTemplate', 'gameSelector');
};

Template.gamesMasterTemplate.helpers({
    chooseTemplate: function() {
      return {template: Template[Session.get('selectTemplate')]};
  	}
});