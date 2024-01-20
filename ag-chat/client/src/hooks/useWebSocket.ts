import { useRef, useState } from "react";
import { Events } from "../components/types";

export const useWebSocket = () => {
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [userName, setUserName] = useState('');
    const [input, setInput] = useState('');

    const socket = useRef<WebSocket>();

    const onConnect = () => {
        socket.current = new WebSocket(`ws://${window.location.hostname}:5000`);

        socket.current.onopen = () => {
            const message = {
                event: Events.Connection,
                username: userName,
                id: Date.now(),
            };

            setConnected(true);

            socket.current?.send(JSON.stringify(message));

            console.log('Connection open');
        };

        socket.current.onmessage = (event: MessageEvent<string>) => {
            const message = JSON.parse(event.data);

            setMessages((prevMessages) => [...prevMessages, message]);
        };

        socket.current.onclose = () => console.log('Socket closed');

        socket.current.onerror = () => console.log('Error occurred');
    };

    const sendMessage = () => {
        if (!input) {
            return;
        }

        const message = {
            username: userName,
            message: input,
            id: Date.now(),
            event: Events.Message,
        };

        socket.current?.send(JSON.stringify(message));
        setInput('');
    };

    return {
        connected,
        messages,
        userName,
        input,
        setUserName,
        setInput,
        onConnect,
        sendMessage,
    };
};

export default useWebSocket;