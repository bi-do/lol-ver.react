import React from "react";
import Matchcomponent from "./Matchcomponent";
import Piechart from "./Piechart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  매치아이디변경,
  전체정보가져오기,
  큐타입변경,
} from "../redux/reducer/lolSlice";
import Graph from "./Graph";
import { Button } from "react-bootstrap";

const Match = () => {
  const apikey = process.env.REACT_APP_lol_apikey;
  const 매치정보 = useSelector((state) => state.lol.매치정보);
  const 전체정보 = useSelector((state) => state.lol.전체정보);
  const 내id = useSelector((state) => state.lol.소환사기본정보.puuid);
  const dispatch = useDispatch();
  const 소환사주문 = useSelector((state) => state.lol.소환사주문);
  const 스펠 = Object.values(소환사주문.data);
  const 큐타입 = useSelector((state) => state.lol.큐타입);

  const 스펠변환 = (its) => {
    const 스펠찾았다 = 스펠.find((it) => {
      return it.key == its;
    });
    return 스펠찾았다?.id;
  };

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
    return 한국어[대전타입[item]];
  };
  const 대전타입 = {
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
      팀정보: item.teams,
      인원: [
        item.participants.map((it) => ({
          라인: it.teamPosition,
          닉네임: it.summonerName,
          챔피언: it.championName,
          챔피언레벨: it.champLevel,
          소환사레벨: it.summonerLevel,
          팀번호: it.teamId,
          푸아이디: it.puuid,
          딜량: it.totalDamageDealtToChampions,
          받은피해량: it.totalDamageTaken,
          본인인증: it.puuid === 내id ? "나야" : "",
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
          스펠: [스펠변환(it.summoner1Id), 스펠변환(it.summoner2Id)],
          와드: it.visionWardsBoughtInGame,
          와드설치: it.wardsPlaced,
          와드제거: it.wardsKilled,
        })),
      ],
    }));
    await dispatch(전체정보가져오기(정보변환));
  };

  const 큐타입버튼 = (item) => {
    console.log("버튼누르는중");
    dispatch(큐타입변경(item));
  };

  useEffect(() => {
    정보변환프로세스(매치정보);
  }, [매치정보]);

  useEffect(() => {

    if (큐타입 !== null) {
      try{
      const api3 = async (data) => {
        const url3 = new URL(
          `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${data}/ids?queue=${큐타입}&start=0&count=15&api_key=${apikey}`
        );
        const response3 = await fetch(url3);
        const data3 = await response3.json();
        dispatch(매치아이디변경(data3));
      };
      api3(내id);
    }catch (error){
      console.log('너무많은 api요청')
    }
    }
  }, [큐타입]);

  return (
    <div>
      <div className="rate-info">
        <div className="q-area">
          <button onClick={() => 큐타입버튼("")}>전체</button>
          <button onClick={() => 큐타입버튼(420)}>솔로랭크</button>
          <button onClick={() => 큐타입버튼(440)}>자유랭크</button>
          <button onClick={() => 큐타입버튼(1700)}>아레나</button>
          {/* <button>큐 타입</button> */}
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
            <Graph />
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
