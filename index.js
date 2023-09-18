'use strict';
const Alexa = require('ask-sdk-core');
const alexaHandlers = require('./handlers/handlers')


exports.handler = Alexa.SkillBuilders.custom()
     .addRequestHandlers(alexaHandlers.LaunchRequestHandler,
        alexaHandlers.HelloWorldIntentHandler,
        alexaHandlers.HelpIntentHandler,
        alexaHandlers.CancelAndStopIntentHandler,
        alexaHandlers.SessionEndedRequestHandler)
     .lambda();

