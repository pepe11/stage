
var builder = require('botbuilder');

module.exports = [
	function(session) {
		session.sendTyping();
		builder.Prompts.choice(session, "Cosa vuoi fare?", ["Imposta info personali","Visualizza info personali","Prenota ristorante"], { listStyle: builder.ListStyle.button });
		//builder.Prompts.text(session, "Cosa vuoi fare? (Imposta info personali, Visualizza info personali, Prenota ristorante)");
	},
	function(session, result) {
		if(result.response.entity == "Imposta info personali") {
			session.beginDialog("setInfo");
		}
		else if(result.response.entity == "Visualizza info personali") {
			session.beginDialog("getInfo");
		}
		else if(result.response.entity == "Prenota ristorante") {
			session.beginDialog("reservation");
		}
		else {
			session.beginDialog("Unknown");
		} 
	},
	function(session, result) {
		session.endDialogWithResult(result);
	}
];


/*
bot.dialog('setInfo', [
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
]);

bot.dialog('getInfo', [
	function(session) {
		session.sendTyping();
		session.send("Nome: "+session.userData.name);
		session.sendTyping();
		session.send("Cognome: "+session.userData.surname);
		session.endDialog();
	}
]);

bot.dialog('Unknown', [
	function(session) {
		session.send("Nessun comando associato a '"+session.message.text+"'");
		session.beginDialog("Init");
	},
	function(session, results) {
		session.endDialogWithResult(results);
	}
]);

bot.dialog('reservation', [
	function (session) {
        session.send("Welcome to the dinner reservation.");
        session.beginDialog('askForDateTime');
    },
    function (session, results) {
        session.dialogData.reservationDate = builder.EntityRecognizer.resolveTime([results.response]);
        session.beginDialog('askForPartySize');
    },
    function (session, results) {
        session.dialogData.partySize = results.response;
        session.beginDialog('askForReserverName');
    },
    function (session, results) {
        session.dialogData.reservationName = results.response;

        // Process request and display reservation details
        session.send(`Reservation confirmed. Reservation details: <br/>Date/Time: ${session.dialogData.reservationDate} <br/>Party size: ${session.dialogData.partySize} <br/>Reservation name: ${session.dialogData.reservationName}`);
        session.endDialog();
    }
]);

// Dialog to ask for a date and time
bot.dialog('askForDateTime', [
    function (session) {
        builder.Prompts.time(session, "Please provide a reservation date and time (e.g.: June 6th at 5pm)");
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);

// Dialog to ask for number of people in the party
bot.dialog('askForPartySize', [
    function (session) {
        builder.Prompts.text(session, "How many people are in your party?");
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
])

// Dialog to ask for the reservation name.
bot.dialog('askForReserverName', [
    function (session) {
        builder.Prompts.text(session, "Who's name will this reservation be under?");
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);

// The dialog stack is cleared and this dialog is invoked when the user enters 'help'.

//args ->
//{ 
//	action: '*:help',
//	{ 
//		score: 1,
// 		intent: '/^help$/i',
//     	expression: /^help$/i,
//    	matched: [ 'help', index: 0, input: 'help' ] 
//    },
//  	libraryName: '*' 
//}
bot.dialog('help', [
	function (session, args, next) {
		session.send("Questo bot permette le seguenti azioni: \n\n Impostare il tuo nome e cognome (Imposta info profilo) \n\n Visualizzare il tuo nome e cognome (Visualizza info profilo) \n\n Prenota un posto al ristorante");
	    session.beginDialog("Init");
	},
	function(session, results) {
		session.endDialog();
	}
])
.triggerAction({
    matches: /^help$/i,
});
*/
//********************************************************************************************************************
