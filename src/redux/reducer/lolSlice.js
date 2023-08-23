import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const lolslice = createSlice({
  name: "lol",
  initialState: {
    소환사명: "",
    매치아이디: [],
    소환사정보: [],
    소환사기본정보: "",
    매치정보: [],
    소환사주문: [],
  },
  reducers: {
    search: (state, action) => {
      state.소환사명 = action.payload;
    },
    search2: (state, action) => {
      state.매치아이디 = action.payload.matchid;
      state.소환사정보 = action.payload.userrank;
      state.소환사기본정보 = action.payload.data;
      state.소환사주문 = action.payload.spell;
    },
    매치아이디넣기: (state, action) => {
      state.매치정보.push(action.payload);
    },
    매치아이디비우기: (state, action) => {
      state.매치정보 = [];
      state.매치아이디 = [];
      state.소환사정보 = [];
      state.소환사기본정보 = [];
    },
    매치정보정리: (state, action) => {
      state.대전그룹화정보.나 = action.payload.정보변환;
      state.대전그룹화정보.우리팀 = action.payload.우리팀정보변환;
      state.대전그룹화정보.상대팀 = action.payload.상대팀정보변환;
    },
  },
});

export default lolslice;

export const { search, search2, 매치아이디넣기, 매치아이디비우기 } =
  lolslice.actions;
