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
    전체정보: [],
    승리횟수: 0,
    내대전정보: [],
    kda: {
      킬: 0,
      데스: 0,
      어시: 0,
      미드:0,
      탑:0,
      원딜:0,
      서폿:0,
      정글:0,
    },
    드롭다운뷰 : [],
    큐타입:null,
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
      state.매치정보 = action.payload;
    },
    매치아이디비우기: (state, action) => {
      state.매치정보 = [];
      state.매치아이디 = [];
      state.소환사정보 = [];
      state.소환사기본정보 = [];
      state.승리횟수 = 0;
      state.큐타입 = null
    },
    전체정보가져오기: (state, action) => {
      state.전체정보 = action.payload;
      state.내대전정보 = state.전체정보.map((item) => {
        return item.인원[0].filter((it) => {
          return it.본인인증 === "나야";
        });
      });
      let 승패율 = 0;
      let kill = 0;
      let deaths = 0;
      let assists = 0;
      let 서폿 = 0
      let 탑 = 0
      let 원딜 = 0
      let 정글 = 0
      let 미드 = 0

      state.내대전정보.forEach((it) => {
        if (it[0].승리여부 === "승리") {
          승패율 += 1;
        }
        if(it[0].라인 ==='TOP'){
          탑 +=1
        }else if(it[0].라인 === 'JUNGLE'){
          정글 +=1
        }else if(it[0].라인 === 'MIDDLE'){
          미드 +=1
        }else if(it[0].라인 === 'BOTTOM'){
          원딜 +=1
        }else if(it[0].라인 === 'UTILITY'){
          서폿 += 1
        }
        kill += it[0].킬;
        deaths += it[0].데스;
        assists += it[0].어시;
      });
      state.승리횟수 = 승패율;
      state.kda.킬 = kill;
      state.kda.데스 = deaths;
      state.kda.어시 = assists;
      state.kda.미드 = 미드
      state.kda.서폿 = 서폿
      state.kda.정글 = 정글
      state.kda.원딜 = 원딜
      state.kda.탑 = 탑
      
    },
    드롭다운전환 : (state,action)=>{
      const 인덱스 = action.payload
      state.드롭다운뷰[인덱스] = !state.드롭다운뷰[인덱스]
    },
    큐타입변경: (state,action)=>{
      state.큐타입 = action.payload
    },
    매치아이디변경:(state,action)=>{
      state.매치아이디 = action.payload
    }
  },
});

export default lolslice;

export const {
  search,
  search2,
  매치아이디넣기,
  매치아이디비우기,
  전체정보가져오기,
  전체승패가져오기,
  내대전정보걸러내기,
  드롭다운전환,
  큐타입변경,
  매치아이디변경
} = lolslice.actions;
