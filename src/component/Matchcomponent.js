import React from "react";
import { useSelector } from "react-redux";

const Matchcomponent = () => {
  const 매치정보 = useSelector((state) => state.lol.매치정보);
  const 소환사기본정보 = useSelector((state) => state.lol.소환사기본정보);
  const 내id = 소환사기본정보.puuid;
  const 소환사주문 = useSelector((state) => state.lol.소환사주문);
  const 스펠 = Object.values(소환사주문.data);

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

  const 스펠변환 = (its) => {
    const 스펠찾았다 = 스펠.find((it) => {
       return it.key == its;
    })
   return 스펠찾았다?.id
  };

  const 정보변환 = 매치정보.map((item) => ({
    몇일전: timefilter(item),
    게임모드: 번역(item.queueId),
    게임시간: item.gameDuration,
    인원: [
      item.participants.map((it) => ({
        라인: it.teamPosition,
        닉네임: it.summonerName,
        챔피언: it.championName,
        챔피언레벨:it.champLevel,
        푸아이디: it.puuid,
        본인인증: it.puuid === 내id ? `나야` : "",
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

  const 나찾는함수 = (item) => {
    return item.인원[0].find((it) => it.본인인증 === "나야");
  };

  const 울팀찾는함수 = (item) =>{
    const 울팀찾았다 = item.인원[0].filter((it)=>{
    return  it.승리여부 === 나찾는함수(item).승리여부
    })
    return 울팀찾았다?울팀찾았다 :null
  }

  const 상대팀찾는함수 = (item)=>{
    const 상대팀찾았다 = item.인원[0].filter((it)=>{
      return  it.승리여부 !== 나찾는함수(item).승리여부
      })
      return 상대팀찾았다?상대팀찾았다 : null
  }

  const 전체킬 = (item)=>{
    let 전체킬 = 0
    item.forEach((it)=>{
      전체킬 = 전체킬+it.킬
    })
    return 전체킬
  }

  const 닉네임긴거좀잘라라 = (item)=>{
    return item.length > 5?item.substr(0,4)+'...' : item
  }
  console.log("나", 정보변환);

  return (
    <div>
      {정보변환.map((item) => (
        <div
          className={`match-box ${
            나찾는함수(item)?.승리여부 === "승리" ? "color-win" : "color-lose"
          }`}
        >
          <div
            className={`color-default ${
              나찾는함수(item)?.승리여부 === "승리" ? "colorwin" : "colorlose"
            }`}
          ></div>
          <div className="match-first">
            <ul className="match-mode">
              <li
                className={`${
                  나찾는함수(item)?.승리여부 === "승리"
                    ? "font-win"
                    : "font-lose"
                }`}
              >
                {item.게임모드}
              </li>
              <li>{item.몇일전}</li>
              <li className="font-winlose">
                {나찾는함수(item)?.승리여부 == true ? "승리" : "패배"}
              </li>
              <li>
                {Math.ceil(item.게임시간 / 60)}분{" "}
                {Math.ceil(item.게임시간 % 60)}초
              </li>
            </ul>
          </div>
          <div className="champion-box">
            <div className="champion-info">
              <div className="splash">
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/${
                    나찾는함수(item)?.챔피언
                  }.png`}
                  width={48}
                  className="splashart"
                />
                <div className="champion-lv">{나찾는함수(item).챔피언레벨}</div>
              </div>
              <div className="spell">
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/13.16.1/img/spell/${
                    스펠변환(나찾는함수(item)?.스펠[0])
                  }.png`}
                  width={22}
                />
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/13.16.1/img/spell/${
                    스펠변환(나찾는함수(item)?.스펠[1])
                  }.png`}
                  width={22}
                />
              </div>
              <div className="kda-all">
                <div className="kda">
                  <span>
                    {나찾는함수(item)?.킬}
                  </span>
                  <span> / </span>
                  <span className="킬관여">
                    {나찾는함수(item)?.데스}
                  </span>
                  <span> / </span>
                  <span>
                    {나찾는함수(item)?.어시}
                  </span>
                </div>
                <div className="kda-rate">
                  {((나찾는함수(item)?.킬+나찾는함수(item).어시)/나찾는함수(item).데스).toFixed(2)}
                  평점
                </div>
              </div>
              <div>
                {item.게임모드 === '아레나' ? null : (
                  <ul className="champion-others">
                    <li className="킬관여">
                      킬관여 {Math.ceil(((나찾는함수(item).킬+나찾는함수(item).어시)/(전체킬(울팀찾는함수(item))))*100)
                      }%
                    </li>
                    <li>
                      제어와드 {나찾는함수(item)?.와드}
                    </li>
                    <li>
                      CS {나찾는함수(item)?.cs} {`(${(나찾는함수(item)?.cs/(item.게임시간/60)).toFixed(2)})`}
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className="item-img">
              {나찾는함수(item).아이템.map((it)=>(
                  <img
                  src={it!==0?`http://ddragon.leagueoflegends.com/cdn/13.16.1/img/item/${it}.png`:'../images/null.png'}
                  width={22}
                ></img>
              ))}
            </div>
          </div>
          <div className="team-box">
            <div>
              {울팀찾는함수(item).map((its) => (
                  <div>
                    <img
                      src={`http://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/${its.챔피언}.png`}
                    />
                    <span>{닉네임긴거좀잘라라(its.닉네임)}</span>
                  </div>
                ))}
            </div>
            <div>
              {상대팀찾는함수(item)
                .map((its) => (
                  <div>
                    <img
                      src={`http://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/${its.챔피언}.png`}
                    />
                    <span>{닉네임긴거좀잘라라(its.닉네임)}</span>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <button className="dropdown">드롭다운</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Matchcomponent;
