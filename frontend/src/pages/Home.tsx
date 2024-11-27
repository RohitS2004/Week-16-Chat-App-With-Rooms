import { Button, Input } from "../components";
import { useRef, useState } from "react";
import { nanoid } from "nanoid"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {

    const usernameRef = useRef();
    const roomRef = useRef();
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState("");
    const [userName, setUserName] = useState("");
    const [roomIdName, setRoomIdName] = useState("");
    
    const socket = useSelector((state: any) => state.socket.socket)

    const handleRoomIdCreate = () => {
        const room_id = nanoid(); 
        setRoomId(room_id);
    }

    const handleJoinRoom = () => {
        // type: "join", name, roomId
        if (userName && roomIdName) {
            socket.send(JSON.stringify
            ({
                type: "join",
                name: userName,
                roomId: roomIdName,
            }))
                
            navigate(`/chat/${roomIdName}/${userName}`); // we will pass the room id in the parameter
        }


    }

    const handleUserNameChange = (e: any) => {
        setUserName(e.target.value);
    }

    const handleRoomChange = (e: any) => {
        setRoomIdName(e.target.value);
    }

    return (
        <div className="bg-black rounded-xl flex flex-col gap-3 p-12">
            <div className="">
                <Input 
                inputType={"text"}
                inputPlaceholder="Enter username..."
                inputFontSize={"lg"}
                inputFontColor="slate"
                inputPadding={"px-4 py-2"}
                inputBorderRadius={"rounded-md"}
                inputWidth={"w-full"}
                inputBackgroundColor="transparent"
                flexProperties={"flex justify-center items-center w-full"}
                inputClasses={"flex-grow border-2 border-white font-semibold"}
                inputName="username"
                ref={usernameRef}
                onChange={handleUserNameChange}
                />
            </div>

            <div className="flex items-center gap-2">
                <Input 
                inputType={"text"}
                inputPlaceholder="Enter room id..."
                inputFontSize={"lg"}
                inputFontColor="slate"
                inputPadding={"px-4 py-2"}
                inputBorderRadius={"rounded-md"}
                inputWidth={"w-full"}
                inputBackgroundColor="transparent"
                flexProperties={"flex justify-center items-center"}
                inputName="room"
                inputClasses={"flex-grow border-2 border-white font-semibold"}
                ref={roomRef}
                onChange={handleRoomChange}
                />

                <Button 
                buttonText={"Join Room"}
                buttonBackgroundColor="orange"
                buttonFontColor="black"
                buttonFontSize="lg"
                buttonPadding={"px-4 py-2"}
                buttonRadius={"rounded-md"}
                onActiveStyle={"active:scale-95"}
                onClick={handleJoinRoom}
                onHoverStyle={"hover:opacity-80"}
                classes={"transition-all duration-300 ease-in-out font-semibold"}
                />
            </div>
            
            <div>
                <Button 
                buttonText={"Create Room"}
                buttonBackgroundColor="white"
                buttonFontColor="black"
                buttonFontSize="lg"
                buttonPadding={"px-4 py-2"}
                buttonRadius={"rounded-md"}
                onActiveStyle={"active:scale-95"}
                onClick={handleRoomIdCreate}
                onHoverStyle={"hover:opacity-80"}
                classes={"transition-all duration-300 ease-in-out w-full font-semibold"}
                />
            </div>

            <div className="flex-grow text-white">
                { roomId && <p>Your room id is: <span className="font-semibold bg-orange-500 text-black px-2 py-1">{roomId}</span></p> }
            </div>
        </div>
    )
}

export default Home;