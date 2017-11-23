var restify = require('restify');
var builder = require('botbuilder');


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());


//****************************************************************************************** https://github.com/Microsoft/BotBuilder-Samples/blob/master/Node/cards-RichCards/app.js
var bot = new builder.UniversalBot(connector, [
    function (session) {
    	builder.Prompts.choice(session, "Scegli l'esempio da eseguire", ["firstSample", "richCards","knowledgeBot", "globalMessageHandler"], { listStyle: builder.ListStyle.button });       
    },
    function (session, results) {
    	if(results.response.entity == "firstSample") {
    		session.beginDialog("firstSample");
    	}
    	else if (results.response.entity =="richCards") {
    		session.beginDialog("richCards");
    	}
        else if (results.response.entity =="knowledgeBot") {
            session.beginDialog("knowledgeBot");
        }
        else if (results.response.entity =="globalMessageHandler") {
            session.beginDialog("globalMessageHandler");
        }

    }
]);

bot.dialog("firstSample",require("./firstSample/firstSample"));
// firstSample dialogs
bot.dialog("setInfo",require("./firstSample/setInfo"));
bot.dialog("getInfo",require("./firstSample/getInfo"));
bot.dialog("reservation",require("./firstSample/reservation/reservation"));
// firstSample/reservation dialogs
bot.dialog("askForDateTime",require("./firstSample/reservation/askForDateTime"));
bot.dialog("askForPartySize",require("./firstSample/reservation/askForPartySize"));
bot.dialog("askForReserverName",require("./firstSample/reservation/askForReserverName"));
// richCards dialogs
bot.dialog("richCards", require("./richCards/richCards"));
// knowledgeBot dialogs
bot.dialog("knowledgeBot", require("./knowledgeBot/knowledgeBot"));
bot.dialog("musicianExplorer", require("./knowledgeBot/dialogs/musicianExplorer"));
bot.dialog("musicianSearch", require("./knowledgeBot/dialogs/musicianSearch"));
bot.dialog("showResults", require("./knowledgeBot/dialogs/results"));
// globalMessageHandler dialogs
bot.dialog("globalMessageHandler", require("./globalMessageHandler/globalMessageHandler"));

bot.dialog("AddNumber", require("./globalMessageHandler/AddNumber"))
.triggerAction({matches: /^add$/i})
.cancelAction('CancelAddNumber', 'Operation cancelled', {
    matches: /^cancel$/,
    onSelectAction: (session, args) => {
        session.endConversation(`Operation cancelled.`);
    },
    confirmPrompt: `Are you sure you wish to cancel?`
})
.beginDialogAction('Total', 'Total', { matches: /^total$/})
.beginDialogAction('HelpAddNumber', 'Help', { matches: /^help$/, dialogArgs: {action: 'AddNumber'} });

bot.dialog("Total", require("./globalMessageHandler/Total"));

bot.dialog("Help", require("./globalMessageHandler/Help"))
.triggerAction({
    matches: /^help/i, 
    onSelectAction: (session, args) => {
        session.beginDialog(args.action, args);
    }
});