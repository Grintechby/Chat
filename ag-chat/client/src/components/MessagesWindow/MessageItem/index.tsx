import React, { FC } from 'react'

type MessageItemProps = {
  userName: string;
  message: string;
};

const MessageItem: FC<MessageItemProps> = ({ userName, message }) => {
  return (
    <div className="message_container">
      <div className='username'>{`${userName}:`}</div>
      <div>{message}</div>
    </div>
  )
}

export default MessageItem