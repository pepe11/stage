
/*
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
*/

//****************************************************************************************** https://github.com/Microsoft/BotBuilder-Samples/blob/master/Node/cards-RichCards/app.js
var restify = require('restify');
    global.builder = require('botbuilder');

    //If testing via the emulator, no need for appId and appPassword. If publishing, enter appId and appPassword here 
    var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID ? process.env.MICROSOFT_APP_ID : '',
    appPassword: process.env.MICROSOFT_APP_PASSWORD ? process.env.MICROSOFT_APP_PASSWORD : '',
        gzipData: true
    });

    global.bot = new builder.UniversalBot(connector, [
        function (session) {
            console.log("Dio boia");
            builder.Prompts.choice(session, "Scegli l'esempio da eseguire", ["firstSample", "richCards"], { listStyle: builder.ListStyle.button });       
        },
        function (session, results) {
            if(results.response.entity == "firstSample") {
                session.beginDialog("firstSample");
            }
            else if (results.response.entity =="richCards") {
                session.send("richCards");
            }
        }
    ]);

    require('./firstSample/firstSample.js')();

    // Setup Restify Server
    var server = restify.createServer();
    server.listen(process.env.port || 3978, function () {
        console.log('%s listening to %s', server.name, server.url);
    });
    server.post('/api/messages', connector.listen());
    bot.use(builder.Middleware.dialogVersion({ version: 0.2, resetCommand: /^reset/i }));
    console.log("************ setup connector *******");

//require('./connectorSetup.js')();

/*
console.log("*****************BOT "+bot);

bot.dialog("/", [
     function (session) {
        builder.Prompts.choice(session, "Scegli l'esempio da eseguire", ["firstSample", "richCards"], { listStyle: builder.ListStyle.button });       
    },
    function (session, results) {
        if(results.response.entity == "firstSample") {
            session.beginDialog("firstSample");
        }
        else if (results.response.entity =="richCards") {
            session.send("richCards");
        }
    }
]);
*/
/*
var bot = new builder.UniversalBot(connector, [
    function (session) {
    	builder.Prompts.choice(session, "Scegli l'esempio da eseguire", ["firstSample", "richCards"], { listStyle: builder.ListStyle.button });       
    },
    function (session, results) {
    	if(results.response.entity == "firstSample") {
    		session.beginDialog("firstSample");
    	}
    	else if (results.response.entity =="richCards") {
    		session.beginDialog("richCards");
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
*/