import { FC } from 'react';
import MessagesWindow from '../MessagesWindow';
import useWebSocket from '../../hooks/useWebSocket';
import SignIn from '../SignIn';
import { CHAT_TEXT } from '../../dictionary';

const Chat: FC = () => {
    const {
        connected,
        messages,
        input,
        setInput,
        sendMessage,
        onConnect,
        setUserName,
        userName,
    } = useWebSocket();

    return (
        <div className='chat_wrapper'>
            {(!connected) ? (
                <SignIn
                    onConnectCallback={onConnect}
                    setUserNameCallback={setUserName}
                    userName={userName}
                />
            ) : (
                <div className='chat-container'>
                    <MessagesWindow messages={messages} />

                    <div className='send-message-section'>
                        <input className='form-input' value={input} onChange={(e) => setInput(e.currentTarget.value)} type='text' placeholder={CHAT_TEXT.writeMessage} />
                        <button className='button' onClick={sendMessage}>{CHAT_TEXT.send}</button>
                    </div>
                </div>
            )}
        </div>
    )
};

export default Chat;