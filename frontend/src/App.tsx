import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSocket } from "./feature/socket";
import { addMessage } from "./feature/chat";

// type message = "send" | "recieve";

// interface Message {
//     type: message;
//     data: String;
//     user?: String; // when type is send it is not necessary
// }

function App() {
    const dispatch = useDispatch();
    // const [ws, setWs] = useState<WebSocket>();

    useEffect(() => {
        const socket: WebSocket = new WebSocket("ws://localhost:8080");
        dispatch(setSocket(socket));
        // setWs(socket);

        socket.onmessage = (msg: any) => {
            const message = JSON.parse(msg.data);
            
            dispatch(
                addMessage({
                    type: "recieve",
                    user: message.user,
                    data: message.data,
                })
            )
            
            console.log("Recieved message dispatched")
        }
    }, [dispatch]);

    return (
        <div className="max-w-full min-h-screen bg-gradient-to-r from-black to-slate-800 font-mono">
            <main className="flex w-full min-h-screen justify-center items-center">
                <Outlet></Outlet>
            </main>
        </div>
    );
}

export default App;
