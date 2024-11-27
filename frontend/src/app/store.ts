import { configureStore } from "@reduxjs/toolkit";
import SocketReducer from "../feature/socket"
import ChatReducer from "../feature/chat";

export const store = configureStore({
    reducer: {
        socket: SocketReducer,
        chat: ChatReducer,
    }
})