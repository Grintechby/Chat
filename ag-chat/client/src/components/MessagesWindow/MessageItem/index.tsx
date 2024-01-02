import React, { FC } from 'react'

type MessageItemProps = {
    userName: string;
    message: string;
};

const MessageItem: FC<MessageItemProps> = ({userName, message}) => {
  return (
    <div className='message_container'>{`${userName}: ${message}`}</div>
  )
}

export default MessageItem