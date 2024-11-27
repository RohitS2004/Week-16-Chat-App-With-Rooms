import { createSlice } from "@reduxjs/toolkit";

interface Socket {
    socket: WebSocket | null;
}

const initialState: Socket = {
    socket: null,
}

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload;
        },
    }
})

export const { setSocket } = socketSlice.actions;

export default socketSlice.reducer;