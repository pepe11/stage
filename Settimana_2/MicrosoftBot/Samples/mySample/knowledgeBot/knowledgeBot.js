require('./searchHelpers.js')();
var builder = require('botbuilder');

module.exports = [
	function (session) {
        var choices = ["Musician Explorer", "Musician Search"]
        builder.Prompts.choice(session, "How would you like to explore the classical music bot?", choices);
    },
    function (session, results) {
        if (results.response) {
            var selection = results.response.entity;
            // route to corresponding dialogs
            switch (selection) {
                case "Musician Explorer":
                    session.replaceDialog('musicianExplorer');
                    break;
                case "Musician Search":
                    session.replaceDialog('musicianSearch');
                    break;
                default:
                    session.reset('/');
                    break;
            }
        }
    }
];