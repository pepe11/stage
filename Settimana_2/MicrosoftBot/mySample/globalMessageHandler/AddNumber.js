var builder = require('botbuilder');

module.exports = [
	(session, args, next) => {
        let message = null;
        if(!session.privateConversationData.runningTotal) {
            message = `Give me the first number.`;
            session.privateConversationData.runningTotal = 0;
        } else {
            message = `Give me the next number, or say **total** to display the total.`;
        }
        builder.Prompts.number(session, message, {maxRetries: 3});
    },
    (session, results, next) => {
        if(results.response) {
            session.privateConversationData.runningTotal += results.response;
            session.replaceDialog('AddNumber');
        } else {
            session.endConversation(`Sorry, I don't understand. Let's start over.`);
        }
    }
];