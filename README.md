# Messagebird

Sample app which uses the messagebird API to send messages to any number. It also updates any message received by a number in real time.

# Setup

- Clone the repo: `git clone git@github.com:karanjthakkar/messagebird.git`
- Install dependencies: `yarn install`
- Create a Messagebird live API token and add it to `MESSAGEBIRD_TOKEN` environment variable
- Run the client: `yarn client` (Starts at http://localhost:3000)
- Run the server: `yarn server` (Starts at http://localhost:8111)
- Run `ngrok http 8111` to tunnel localhost to the outside world. Copy the url generate by ngrok. This is needed for the next steps. eg: `https://ff51d6e0.ngrok.io/`
- Buy a virtual number here: https://dashboard.messagebird.com/en/numbers
- Setup the virtual number to receive messages as shown in the image here:

![Virtual Number Setup](https://i.imgur.com/lo59JXX.jpg)

- Change the post url to: `<ngrok-url>/receive`

# Implementation

### 1. Server

- [POST] `/send`: Sends a message to a given number. Accepts a valid number and a message body
- [POST] `/receive`: Receives a message sent to the virtual number.
- [GET] `/messages`: Sends back the latest set of messages received

### 2. Client

- Provides a number/text input to send a message to. On success, this message is added to a list of `sentMessages`
- Polls the `/messages` endpoint every 5 seconds to get the latest messages sent to the virtual number. Any new messages available are added to the list of `receivedMessages`

# Try it out

Since the setup required to run the project is pretty involved, you can directly try a running version at https://messagebird-task.netlify.com. Whether it works or not depends on the credits I have left (0.26$ at the time of this writing). The server for this is running here: https://messagebird-task.now.sh. To check if the app is actually consuming data sent by the API, you can check the server logs over here: https://zeit.co/geekykaran/messagebird-task/urtjbtyucu/logs Please use the number `+13615023162` if you want to test whether received messages update in real time.

# Demo

https://i.imgur.com/W1tzOFl.gif

# License

MIT © [Karan Thakkar](https://karanjthakkar.com)
