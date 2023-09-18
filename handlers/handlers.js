'use strict'

let alexaHandlers = {
  LaunchRequestHandler: {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';
    return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .withSimpleCard('Hello World', speechText)
                .getResponse();
        }
    },

  HelloWorldIntentHandler: {
      canHandle(handlerInput) {
          return handlerInput.requestEnvelope.request.type === 'IntentRequest'
              && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
      },
      handle(handlerInput) {
          const speechText = 'Hello World!';
  return handlerInput.responseBuilder
              .speak(speechText)
              .withSimpleCard('Hello World', speechText)
              .getResponse();
      }
  },

  HelpIntentHandler: {
      canHandle(handlerInput) {
          return handlerInput.requestEnvelope.request.type === 'IntentRequest'
              && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
      },
      handle(handlerInput) {
          const speechText = 'You can say hello to me!';
  return handlerInput.responseBuilder
              .speak(speechText)
              .reprompt(speechText)
              .withSimpleCard('Hello World', speechText)
              .getResponse();
      }
  },

  CancelAndStopIntentHandler: {
      canHandle(handlerInput) {
          return handlerInput.requestEnvelope.request.type === 'IntentRequest'
              && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                  || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
      },
      handle(handlerInput) {
          const speechText = 'Goodbye!';
  return handlerInput.responseBuilder
              .speak(speechText)
              .withSimpleCard('Hello World', speechText)
              .getResponse();
      }
  },

  SessionEndedRequestHandler: {
      canHandle(handlerInput) {
          return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
      },
      handle(handlerInput) {
          //any cleanup logic goes here
          return handlerInput.responseBuilder.getResponse();
      }
  },

  ErrorHandler: {
      canHandle() {
        return true;
      },
      handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
  return handlerInput.responseBuilder
          .speak('Sorry, I can\'t understand the command. Please say again.')
        .reprompt('Sorry, I can\'t understand the command. Please say again.')
          .getResponse();
      },
  }

}

module.exports = alexaHandlers