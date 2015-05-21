Template.teamsMasterTemplate.created = function() {
    Session.setDefault('teamSelectTemplate', 'teamSelector');
};

Template.teamsMasterTemplate.helpers({
    chooseTemplate: function() {
        return {template: Template[Session.get('teamSelectTemplate')]};
    }
});
