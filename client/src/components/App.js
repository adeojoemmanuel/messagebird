import React, { Component } from 'react';
import MessageList from './MessageList';

import LoadingIcon from './Loading';
import './App.css';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://messagebird-task.now.sh'
    : 'http://localhost:8111';

class App extends Component {
  state = {
    number: '',
    message: '',
    isSending: false,
    sentMessages: [],
    receivedMessages: [],
    isMessageListVisible: false,
    messageListType: 'sent'
  };

  componentWillMount() {
    setInterval(this.pollForReceivedMessages, 5000);
  }

  pollForReceivedMessages = async () => {
    try {
      const response = await fetch(`${BASE_URL}/messages`, {
        method: 'GET'
      });
      const data = await response.json();
      this.setState({
        receivedMessages: [].concat(data).concat(this.state.receivedMessages)
      });
    } catch (e) {
      console.log('Error polling for received messages', e);
    }
  };

  setNumber = event => {
    this.setState({
      number: event.target.value
    });
  };

  setMessage = event => {
    this.setState({
      message: event.target.value
    });
  };

  sendMessage = async () => {
    this.setState({
      isSending: true
    });
    const params = {
      message: this.state.message,
      number: this.state.number
    };
    try {
      const response = await fetch(`${BASE_URL}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });
      const data = await response.json();
      this.setState({
        sentMessages: [].concat([data]).concat(this.state.sentMessages)
      });
    } catch (e) {
      console.log('Error sending your message', e);
    }
    this.setState({
      isSending: false
    });
  };

  showMessages = type => {
    this.setState({
      isMessageListVisible: true,
      messageListType: type
    });
  };

  onMessageListClose = () => {
    this.setState({
      isMessageListVisible: false
    });
  };

  render() {
    return (
      <div className="app">
        <input
          type="tel"
          placeholder="Enter number"
          className="app__input"
          autoFocus
          spellCheck={false}
          value={this.state.number}
          onChange={this.setNumber}
        />
        <input
          type="text"
          placeholder="Enter message"
          className="app__input"
          spellCheck={false}
          value={this.state.message}
          onChange={this.setMessage}
        />
        <button className="app__button" onClick={this.sendMessage}>
          {this.state.isSending ? <LoadingIcon /> : 'Send Message'}
        </button>
        <div className="app__actions">
          <div
            className="app__actions__text"
            onClick={this.showMessages.bind(this, 'sent')}
          >
            <span>
              Sent Messages{' '}
              {this.state.sentMessages.length > 0 &&
                `( ${this.state.sentMessages.length} )`}
            </span>
          </div>
          <div
            className="app__actions__text"
            onClick={this.showMessages.bind(this, 'received')}
          >
            <span>
              Received Messages{' '}
              {this.state.receivedMessages.length > 0 &&
                `( ${this.state.receivedMessages.length} )`}
            </span>
          </div>
        </div>
        <MessageList
          type={this.state.messageListType}
          isVisible={this.state.isMessageListVisible}
          onClose={this.onMessageListClose}
          contentLabel={
            this.state.messageListType === 'sent' ? (
              'Sent Messages'
            ) : (
              'Received Messages'
            )
          }
          messages={
            this.state.messageListType === 'sent' ? (
              this.state.sentMessages
            ) : (
              this.state.receivedMessages
            )
          }
        />
      </div>
    );
  }
}

export default App;
