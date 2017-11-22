var builder = require('botbuilder');

module.exports = [
	function(session) {
		session.sendTyping();
		builder.Prompts.text(session, "Inserisci nome");
	},
	function(session, result) {
		session.sendTyping();
		session.userData.name = result.response;
		builder.Prompts.text(session, "Inserisci cognome");
	},
	function(session, result) {
		session.userData.surname = result.response;
		session.endDialog("Dati inseriti");
	}
];


