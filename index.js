/**
 * This template was made by Hri7566.
 */

// Require Lamp's MPP client
const Client = require('mpp-client-xt');

// Construct a new client from the class
var client = new Client('wss://www.multiplayerpiano.com:443');

// Start the client and move to a room
client.start();
client.setChannel('test/awkward');

// Detect when the client connects to the server
client.on('hi', () => {
    // Everything in here will be run every time the client joins
    console.log('✔️ Online');
});

// Set some variables for later
var prefix = "!";

// We will call this function every time we need to send a chat message
function sendChat(str) {
    // 'str' above is the string we will send
    client.sendArray([ { m: 'a', message: '\u034f' + str } ]); // We send a blank unicode character (U+034F) and then the message because of a security flaw with user input and names
}

// Detect chat messages
client.on('a', msg => {
    // Everything in here will be run every time a chat message is sent
    // Structure of 'msg':
    //       msg.a (string) - the message that msg.p sent
    //       msg.t (number) - time the message was sent
    //       msg.m (string) - message type (not that useful)
    //       msg.p (object) - user who sent the message
    //  msg.p.name (string) - name of the user
    //   msg.p._id (string) - permanent id of the user
    //    msg.p.id (string) - session id of the user (NOT the same as _id, different every time the user joins)
    // msg.p.color (string) - color of the user in hex

    let args = msg.a.split(' '); // Get the arguments in the user's message (args will be an array that looks like ['/name','beginbot'])
    let cmd = args[0].split(prefix).join(''); // This will be the command the user enters, i.e. if the user types '/8ball Will I ever get married?', cmd would be '8ball'

    if (!msg.a.startsWith(prefix)) return; // If the message doesn't start with the prefix, we don't want to do anything
    
    // This is where the commands are handled (very basic switch statement)
    switch (cmd) {
        case 'help':
        case 'h': // You can put multiple cases for command aliases
            // The help command isn't dynamic; you have to add something here every time you add a command.
            sendChat(`Commands: ${prefix}help, ${prefix}about, ${prefix}8ball`);
            break;
        case 'about':
        case 'a':
            sendChat(`This bot was made with https://github.com/Hri7566/bot-base`);
            break;
        case '8ball':
        case 'magic8ball':
            if (args[1]) { // Check if the user entered a question
                sendChat(getRandom8ballAnswer() + ', ' + msg.p.name + '.'); // Get a random 8ball answer and send it in chat
            }
            break;
    }
});

function getRandom8ballAnswer() {
    return magic8ballanswers[Math.floor(Math.random() * magic8ballanswers.length)]; // Generate an integer between 0 and the length of magic8ballanswers, then use that as the index to get a value from the array
}

var magic8ballanswers = [
    "As I see it, yes",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "It is certain",
    "It is decidedly so",
    "Most likely",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Outlook good",
    "Reply hazy, try again",
    "Signs point to yes",
    "Very doubtful",
    "Without a doubt",
    "Yes",
    "Yes - definitely",
    "You may rely on it"
];
