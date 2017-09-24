import React, { Component } from 'react';
import ReactModal from 'react-modal';
import MessageItem from './MessageItem';
import CrossIcon from './CrossIcon';

import './MessageList.css';

class MessageList extends Component {
  render() {
    return (
      <ReactModal
        contentLabel={this.props.contentLabel}
        isOpen={this.props.isVisible}
        onRequestClose={this.props.onClose}
        closeTimeoutMS={100}
      >
        <div className="messageList">
          <div className="messageList__close" onClick={this.props.onClose}>
            <CrossIcon />
          </div>
          <div className="messageList__heading">{this.props.contentLabel}</div>
          <div className="messageList__body">
            {this.props.messages.map((message, index) => {
              return (
                <MessageItem
                  key={index}
                  message={message}
                  type={this.props.type}
                />
              );
            })}
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default MessageList;
