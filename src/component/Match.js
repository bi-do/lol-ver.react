import React from "react";
import Matchcomponent from "./Matchcomponent";
import Piechart from "./Piechart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  전체승패가져오기,
  전체정보가져오기,
  내대전정보걸러내기,
} from "../redux/reducer/lolSlice";
import Graph from "./Graph";

const Match = () => {
  const 매치정보 = useSelector((state) => state.lol.매치정보);
  const 전체정보 = useSelector((state) => state.lol.전체정보);
  const 내id = useSelector((state) => state.lol.소환사기본정보.puuid);
  const 내대전정보 = useSelector((state) => state.lol.내대전정보);
  const dispatch = useDispatch();
  const timefilter = (item) => {
    const seconds = 1;

    const minute = seconds * 60;

    const hour = minute * 60;

    const day = hour * 24;

    const mon = day * 30;

    const year = mon * 12;

    let today = Math.floor(Date.now() / 1000);

    let endtime = `${item.gameEndTimestamp}`;

    endtime = Math.floor(endtime / 1000);

    let duraitionmin = Math.floor(item.gameDuration / 60);

    let duraitionsec = Math.floor(item.gameDuration % 60);

    let timedifference = today - endtime;

    if (timedifference < seconds) {
      return "바로";
    } else if (timedifference < hour) {
      return Math.trunc(timedifference / minute) + "분전 ";
    } else if (timedifference < day) {
      return Math.trunc(timedifference / hour) + "시간전 ";
    } else if (timedifference < mon) {
      return Math.trunc(timedifference / day) + "일전 ";
    } else if (timedifference < year) {
      return Math.trunc(timedifference / mon) + "달전 ";
    } else {
      return Math.trunc(timedifference / year) + "년 ";
    }
  };
  const 번역 = (item) => {
    return 한국어[큐타입[item]];
  };
  const 큐타입 = {
    400: "norm", //Normal Draft Pick
    420: "solo",
    430: "norm",
    440: "flex",
    450: "aram",
    700: "clash",
    800: "ai", // Deprecated
    810: "ai", // Deprecated
    820: "ai", // Deprecated
    830: "ai",
    840: "ai",
    850: "ai",
    900: "urf",
    920: "poro",
    1020: "ofa",
    1300: "nbg",
    1400: "usb", // Ultimate Spellbook
    1700: "arn",
    2000: "tut",
    2010: "tut",
    2020: "tut",
  };
  const 한국어 = {
    solo: "개인/2인 랭크",
    norm: "일반",
    aram: "무작위 총력전",
    flex: "자유 랭크 게임",
    nbg: "돌격 넥서스",
    usb: "궁주문서",
    urf: "URF",
    ofa: "단일챔피언",
    ai: "AI대전",
    poro: "포로왕",
    tut: "튜토리얼",
    etc: "기타",
    clash: "격전",
    arn: "아레나",
  };

  const 정보변환프로세스 = async (매치정보) => {
    const 정보변환 = await 매치정보?.map((item) => ({
      몇일전: timefilter(item),
      게임모드: 번역(item.queueId),
      게임시간: item.gameDuration,
      인원: [
        item.participants.map((it) => ({
          라인: it.teamPosition,
          닉네임: it.summonerName,
          챔피언: it.championName,
          챔피언레벨: it.champLevel,
          푸아이디: it.puuid,
          본인인증: it.puuid === 내id ? '나야' : "",
          킬: it.kills,
          데스: it.deaths,
          어시: it.assists,
          아이템: [
            it.item0,
            it.item1,
            it.item2,
            it.item3,
            it.item4,
            it.item5,
            it.item6,
          ],
          cs: it.totalMinionsKilled,
          게임시간: it.timePlayed,
          승리여부: it.win == true ? "승리" : "패배",
          스펠: [it.summoner1Id, it.summoner2Id],
          와드: it.visionWardsBoughtInGame,
        })),
      ],
    }));
   await dispatch(전체정보가져오기(정보변환))
  };

  useEffect(() => {
    정보변환프로세스(매치정보);
    console.log(매치정보)
  }, [매치정보]);

  return (
    <div>
      <div className="rate-info">
        <div className="q-area">
          <button>전체</button>
          <button>솔로랭크</button>
          <button>자유랭크</button>
          <button>큐 타입</button>
        </div>
        <div className="rate-box">
          <div>
           <Piechart 전체정보={전체정보} />
          </div>
          <div>
            <div className="rate-category">플레이한 챔피언 (최근 15게임)</div>
            <div>여긴짜증남구현안함</div>
          </div>
          <div>
           <Graph/>
          </div>
        </div>
      </div>
      <div>
        <Matchcomponent />
      </div>
    </div>
  );
};

export default Match;
