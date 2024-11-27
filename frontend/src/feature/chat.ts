import { createSlice } from "@reduxjs/toolkit";

interface ChatMessage {
    type: String,
    payload?: {
        msg: String,
    },
    user?: String,
    data?: String,
}

const initialState: ChatMessage[] = [];

export const ChatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.push(action.payload);
        }
    }
})

export const { addMessage } = ChatSlice.actions;

export default ChatSlice.reducer;