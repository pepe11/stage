var builder = require('botbuilder');

module.exports = [
	 (session, args, next) => {
        let message = '';
        switch(args.action) {
            case 'AddNumber':
                message = 'You can either type the next number, or use **total** to get the total.';
                break;
            default:
                message = 'You can type **add** to add numbers.';
                break;
        }
        session.endDialog(message);
    }
];