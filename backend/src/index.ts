import { WebSocketServer, WebSocket, RawData } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    name: string;
    socket: WebSocket;
    roomId: string;
}

const currentUsers: User[] = [];

// wss -> web socket server, ws -> web socket
wss.on("connection", (ws) => {
    ws.on("message", (message: RawData) => {
        try {
            console.log("Message recieved: ", message.toString());

            const data = JSON.parse(message.toString());
            if (data.type === "join") {
                currentUsers.push({
                    name: data.name,
                    socket: ws,
                    roomId: data.roomId,
                });

                // console.log(currentUsers);
            } else if (data.type === "message") {
                currentUsers.forEach((user) => {
                    if (user.roomId === data.roomId && user.socket !== ws) {
                        const message = {
                            data: data.payload.msg,
                            user: data.user,
                        }
                        user.socket.send(JSON.stringify(message));
                        console.log("Message sent: ", JSON.stringify(message));
                    }
                });
            }
        } catch (error: any) {
            console.log("Error is: ", error);
        }
    });
});

// * There will be rooms, each user will send a room id to join a room
// NOTE: We cannot send object to the server, we can only send a string
