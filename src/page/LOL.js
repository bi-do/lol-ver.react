import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { search, search2, 매치아이디비우기 } from "../redux/reducer/lolSlice";
import { useLocation, useNavigate, useParams } from "react-router";

const LOL = () => {
  const 로케이션 = useLocation();
  const summonername = useSelector((state) => state.lol.소환사명);
  const 매치아이디 = useSelector((state)=>state.lol.매치아이디)
  const 소환사정보 = useSelector((state) => state.lol.소환사정보);
  const 큐타입 = useSelector((state) => state.lol.큐타입);
  const disfatch = useDispatch();
  const apikey = process.env.REACT_APP_lol_apikey;
  const navigate = useNavigate();
  let 에러 = false;
  const username = (e) => {
    disfatch(search(e.target.value));
  };

  const lolapi = async () => {
    const url = new URL(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonername}?api_key=${apikey}`
    );
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const api2 = async (data) => {
        const url2 = new URL(
          `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${data.id}?api_key=${apikey}`
        );
        const response2 = await fetch(url2);
        const data2 = await response2.json();
        return data2;
      };

      const api3 = async (data) => {
        const url3 = new URL(
          `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${data.puuid}/ids?start=0&count=15&api_key=${apikey}`
        );
        const response3 = await fetch(url3);
        const data3 = await response3.json();
        return data3;
      };

      const api4 = async () => {
        const url4 = new URL(
          `https://ddragon.leagueoflegends.com/cdn/13.16.1/data/en_US/summoner.json`
        );
        const response4 = await fetch(url4);
        const data4 = await response4.json();
        return data4;
      };

      let [userrank, matchid, spell] = await Promise.all([
        api2(data),
        api3(data),
        api4(),
      ]);

      disfatch(search2({ userrank, matchid, data, spell }));
      disfatch(search(""));
    } catch (error) {
      console.log("API호출중 에러발생", error);
      에러 = true;
    }

    if(!에러 && 로케이션.pathname === '/'){
      navigate("/loldetail");
    }
   
  };

  const 엔터이벤트 = (e)=>{
    if(e.key==='Enter'){
      lolapi()
    }
  }


  useEffect(() => {
    disfatch(매치아이디비우기());
  },[]);

  return (
    <div className="lol-main">
      <Container>
        <div className="main-box">
          <img src="../images/lol-logo.png" width={400}></img>
          <div className="input-box">
            <div>
              <div>Search</div>
              <input
                type="text"
                placeholder={
                  에러 === false
                    ? "소환사명을 입력해주세요"
                    : "소환사 닉네임 입력중 에러가 발생했습니다."
                }
                onChange={username}
                onKeyDown={엔터이벤트}
              />
            </div>
            <button className="ggbutton" onClick={lolapi}></button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LOL;
