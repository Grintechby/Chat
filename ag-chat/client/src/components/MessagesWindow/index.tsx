import { FC } from 'react'
import { Events } from '../types';
import MessageItem from './MessageItem';

type MessagesFields = {
    messages: any[];
};

const MessagesWindow: FC<MessagesFields> = ({ messages }) => {
    return (
        <div className='chat_window_wrapper'>
            {messages?.map((message) => (
                (message.event === Events.Connection) ?
                    <div key={message.id} className='sign_in_notification'>Пользователь {message.username} вошёл в чат</div>
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