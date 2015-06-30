var alexa = require('alexa-app');

var app = new alexa.app();
app.intent('Spell',
    {
        "slots":{"Word":"LITERAL"}, 
        "utterances":[ "Spell {Word}", "Spell {Word} for me" ]
    },
    function(request,response) {
        console.log("request\n%j", request.data.request);
        console.log("onIntent requestId=" + request.data.request.requestId
                    + ", sessionId=" + request.sessionId);

        var intent = request.data.request.intent,
            intentName = intent.name;

        // Dispatch to your skill's intent handlers
        console.log("intentName %s", intentName);
        if ("Spell" === intentName) {
            Spell(intent, response);
        } else {
            response.say("Invalid intent "+intentName).send();
        }
    }
);
app.launch(function(request,response) {
    response.shouldEndSession(true);
    console.log("request\n%j", request);
    console.log("onLaunch requestId=" + request.requestId
                + ", sessionId=" + request.sessionId);
    response.say("testing scripps response").send();
    // Dispatch to your skill's launch.
    sendWelcomeResponse(response);
    // Because this is an async handler
    return false;
});

// Connect to lambda
exports.handler = app.lambda();

function Spell(intent, response) {
    var cardTitle = intent.name,
        word=intent.slots.Word, speechOutput=word+" "+word.split('').join(' ')+" "+word;
    response.shouldEndSession(true);
    console.log("saying %s", word.split('').join(' '));
    response.say(speechOutput).send();
    response.card(cardTitle, speechOutput);
}

function sendWelcomeResponse(response) {
    var welcomeOutput="just ask to spell the word you want";
    response.say(welcomeOutput).send();
}