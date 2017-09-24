import React from 'react';
import moment from 'moment';

import './MessageItem.css';

const MessageItem = props => {
  const formattedDate = moment(props.message.createdDatetime).fromNow();
  return (
    <div className="messageItem">
      <div className="messageItem__top">
        <div className="messageItem__top__number">
          {props.type === 'sent' ? (
            props.message.recipient
          ) : (
            props.message.originator
          )}
        </div>
        <div className="messageItem__top__time">{formattedDate}</div>
      </div>
      <div className="messageItem__body">{props.message.body}</div>
    </div>
  );
};

export default MessageItem;
