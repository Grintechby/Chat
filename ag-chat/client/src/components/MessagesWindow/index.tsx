import { FC } from 'react'
import { Events } from '../types';
import MessageItem from './MessageItem';
import { CHAT_TEXT } from '../../dictionary';

type MessagesFields = {
    messages: any[];
};

const MessagesWindow: FC<MessagesFields> = ({ messages }) => {
    return (
        <div className='chat_window_wrapper'>
            {messages?.map((message) => (
                (message.event === Events.Connection) ?
                    <div key={message.id} className='sign_in_notification'>
                        {`${CHAT_TEXT.user} ${message.username} ${CHAT_TEXT.enteredTheChat}`}
                    </div>
                    :
                    <MessageItem
                        key={message.id}
                        message={message.message}
                        userName={message.username}
                    />

            ))}
        </div>
    )
}

export default MessagesWindow;