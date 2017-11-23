var builder = require('botbuilder');

module.exports = [
	function(session) {
		session.sendTyping();
		session.send("Nome: "+session.userData.name);
		session.sendTyping();
		session.send("Cognome: "+session.userData.surname);
		session.endDialog();
	}
];