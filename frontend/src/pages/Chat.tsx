import { useParams } from "react-router-dom";
import { Input, Button, Message } from "../components";
import { Send } from "../assets";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../feature/chat";

const Chat = () => {
    const dispatch = useDispatch();
    const data: any = useParams();
    const chatMessageRef: any = useRef();
    const socket = useSelector((state: any) => state.socket.socket);
    const message = useSelector((state: any) => state.chat);
    const messageWindowRef: any = useRef();

    const handleSendMessage = () => {
        socket.send(
            JSON.stringify({
                type: "message",
                roomId: data.roomId,
                payload: { msg: chatMessageRef.current.value },
                user: data.userName,
            })
        );

        dispatch(
            addMessage({
                type: "send",
                payload: {
                    msg: chatMessageRef.current.value,
                },
                user: data.userName,
            })
        );

        chatMessageRef.current.value = "";
    };

    useEffect(() => {
        if (messageWindowRef.current) {
            messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight
        }
    }, [message]);

    return (
        <div className="h-[90vh] flex flex-col gap-2 w-[500px]">
            <div className="bg-slate-800 rounded-md p-2 flex flex-col gap-2">
                {data.roomId && (
                    <p className="text-white">
                        Room id:{" "}
                        <span className="font-semibold bg-orange-500 text-black px-2 py-1">
                            {data.roomId}
                        </span>
                    </p>
                )}

                {data.userName && (
                    <p className="text-white">
                        Name:{" "}
                        <span className="font-semibold bg-orange-500 text-black px-2 py-1">
                            {data.userName}
                        </span>
                    </p>
                )}
            </div>

            <div className="flex-grow bg-slate-800 rounded-md font-primary text-white flex flex-col overflow-y-scroll gap-2 p-2" ref={messageWindowRef}>
                <div className="flex-grow"></div>
                {message &&
                    message.map(
                        (msg: any) =>
                            // Ensure msg is defined before accessing its properties
                            msg && (
                                msg.type && msg.type === "send" ? (
                                    <Message 
                                    message={msg.payload.msg && msg.payload.msg}
                                    padding={"p-2"}
                                    backgroundColor={"green"}
                                    fontColor={"black"}
                                    borderRadius={"rounded-md"}
                                    fontSize={"sm"}
                                    textAlign={"text-right"}
                                    classes={"w-fit"}
                                    justify={"justify-end"}
                                    />
                                ) : 
                                (
                                    <Message 
                                    message={msg.data && msg.data}
                                    padding={"p-2"}
                                    backgroundColor={"blue"}
                                    fontColor={"black"}
                                    borderRadius={"rounded-md"}
                                    fontSize={"sm"}
                                    textAlign={"text-left"}
                                    classes={"flex flex-col gap-1 w-fit"}
                                    sender={msg.user && msg.user}
                                    justify={"justify-start"}
                                    />
                                )
                            )
                    )}
            </div>

            <div className="flex w-full gap-2">
                <Input
                    inputType={"text"}
                    inputPlaceholder="Type your message"
                    inputFontSize={"lg"}
                    inputFontColor="slate"
                    inputPadding={"px-4 py-2"}
                    inputBorderRadius={"rounded-md"}
                    inputWidth={"w-full"}
                    inputBackgroundColor="transparent"
                    flexProperties={"flex justify-center items-center w-full"}
                    inputName="room"
                    inputClasses={
                        "flex-grow border-2 border-white font-semibold"
                    }
                    ref={chatMessageRef}
                />
                <Button
                    icon={Send("size-6")}
                    buttonBackgroundColor="orange"
                    buttonFontColor="black"
                    buttonFontSize="lg"
                    buttonPadding={"px-4 py-2"}
                    buttonRadius={"rounded-md"}
                    onActiveStyle={"active:scale-95"}
                    onClick={handleSendMessage}
                    onHoverStyle={"hover:opacity-80"}
                    classes={
                        "transition-all duration-300 ease-in-out font-semibold"
                    }
                />
            </div>
        </div>
    );
};

export default Chat;
