var builder = require('botbuilder');

module.exports = [
	(session, results, next) => {
	        session.endConversation(`The total is ${session.privateConversationData.runningTotal}`);
	}
];