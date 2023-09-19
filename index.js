'use strict';
const Alexa = require('ask-sdk-core');
const express = require('express');
const morgan = require('morgan');
const { ExpressAdapter } = require('ask-sdk-express-adapter')

const app = express()
app.use(morgan('dev'))
const port = process.env.port || 3000

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola! Qué te gustaría probar hoy?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const NameIntentHandler = {
    canHandle(handlerInput) {
        console.log(`Tu intent fue: ${Alexa.getIntentName(handlerInput.requestEnvelope)}`)
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NameIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Soy Alexa bartender, ¿quieres una cubeiby, una paloma o un preparado de vokda?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const vodkaCHandler = {
    canHandle(handlerInput) {
        console.log(`Tu intent fue: ${Alexa.getIntentName(handlerInput.requestEnvelope)}`)
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Vodka';
    },
    handle(handlerInput) {
        const speakOutput = 'Ahí te va tu vodka guapo';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const tequilaCHandler = {
    canHandle(handlerInput) {
        console.log(`Tu intent fue: ${Alexa.getIntentName(handlerInput.requestEnvelope)}`)
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Tequila';
    },
    handle(handlerInput) {
        const speakOutput = 'Ahí te va tu palomita';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const cubaCHandler = {
    canHandle(handlerInput) {
        console.log(`Tu intent fue: ${Alexa.getIntentName(handlerInput.requestEnvelope)}`)
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Cuba';
    },
    handle(handlerInput) {
        const intent = handlerInput.requestEnvelope.request.intent;
        console.log(`This is the intent ${JSON.stringify(intent)}`)
        const speakOutput = '¿Qué tan cargada la quieres?';


        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Ahí te va tu cubaibi')
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();

    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        //const speakOutput = 'Adíos pinche alcohólico, ojalá tu higado perezca pronto uwu!';
        const speakOutput = 'Adíos te amo uwu'
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};



/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'No se como procesar eso, lo siento';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};



const SkillBuilder = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        NameIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        cubaCHandler,
        tequilaCHandler,
        vodkaCHandler
    )
    .addErrorHandlers(
        ErrorHandler
    )


const skill = SkillBuilder.create()
const adapter = new ExpressAdapter(skill, false, false)

app.post('/api/v1/webhook-alexa', adapter.getRequestHandlers())
app.use(express.json())

app.listen(port, () => {
    console.log(`Server running on: localhost:${port}`)
})

