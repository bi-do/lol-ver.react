import { configureStore } from "@reduxjs/toolkit";
import lolslice from "./reducer/lolSlice";
import tftslice from "./reducer/tftSlice";
import valslice from "./reducer/valSlice";

const  store =configureStore({
    reducer:{
        lol:lolslice.reducer,
        tft:tftslice.reducer,
        val:valslice.reducer
    }
})

export default store
