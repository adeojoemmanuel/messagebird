const Hapi = require('hapi');
const messagebird = require('messagebird')(process.env.MESSAGEBIRD_TOKEN);

const server = new Hapi.Server();
let receivedMessages = [];

server.connection({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8111,
  routes: { cors: true }
});

server.route({
  method: 'POST',
  path: '/send',
  handler(request, reply) {
    const message = {
      originator: 'Karan',
      recipients: [request.payload.number],
      body: request.payload.message
    };
    messagebird.messages.create(message, function(err, response) {
      if (err) {
        return reply(err.errors[0]).code(400);
      }
      const { body, originator, createdDatetime, recipients } = response;
      const data = {
        body,
        originator,
        recipient: recipients.items[0].recipient,
        createdDatetime
      };
      console.log('Message sent: ', data);
      reply(data).code(200);
    });
  }
});

server.route({
  method: 'GET',
  path: '/messages',
  handler(request, reply) {
    console.log('Message list: ', receivedMessages);
    reply(receivedMessages).code(200);
    receivedMessages = [];
  }
});

server.route({
  method: 'POST',
  path: '/receive',
  handler(request, reply) {
    const { body, recipient, originator, createdDatetime } = request.payload;
    receivedMessages.push({
      body,
      originator,
      recipient,
      createdDatetime
    });
    console.log('Message received: ', receivedMessages);
    reply('OK').code(200);
  }
});

// Start the server
server.start(() => {
  console.log('Server started', server.info.uri);
});
