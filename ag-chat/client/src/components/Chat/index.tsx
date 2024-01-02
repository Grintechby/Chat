import { FC, useRef, useState } from 'react';
import { Events } from '../types';
import MessagesWindow from '../MessagesWindow';

const Chat: FC = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState('');
    const [connected, setConnected] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');

    const socket = useRef<WebSocket>();

    const onConnect = () => {
        socket.current = new WebSocket('ws://192.168.100.3:5000');

        socket.current.onopen = () => {
            const message = {
                event: Events.Connection,
                username: userName,
                id: Date.now(),
            };

            setConnected(true);

            socket.current?.send(JSON.stringify(message));

            console.log('Подключение открыто');

        }

        socket.current.onmessage = (event: MessageEvent<string>) => {
            const message = JSON.parse(event.data);

            setMessages(prevMessages => [...prevMessages, message]);
        }

        socket.current.onclose = () => console.log('Socket закрыт');

        socket.current.onerror = () => console.log('Произошла ошибка');
    };

    const sendMessage = () => {
        const message = {
            username: userName,
            message: input,
            id: Date.now(),
            event: Events.Message,
        };

        socket.current?.send(JSON.stringify(message));

        setInput('');
    };

    return (
        <div className='chat_wrapper'>
            {(!connected) ? (
                <div className='sign_form'>
                    <div className='form_container'>
                        <div className='form-title'>AG Chat</div>
                        <input className='form-input' value={userName} onChange={e => setUserName(e.currentTarget.value)} type="text" placeholder='Введите имя' />
                        <button className='button' onClick={onConnect}>Войти</button>
                    </div>
                </div>
            ) : (
                <div className='chat-container'>
                    <MessagesWindow messages={messages} />

                    <div className='send-message-section'>
                        <input className='form-input' value={input} onChange={(e) => setInput(e.currentTarget.value)} type='text' placeholder='Написать сообщение...' />
                        <button className='button' onClick={sendMessage}>Отправить</button>
                    </div>
                </div>
            )}
        </div>
    )
};

export default Chat;