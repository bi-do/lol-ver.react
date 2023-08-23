import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Lank from "../component/Lank";
import Match from "../component/Match";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { 매치아이디넣기 } from "../redux/reducer/lolSlice";
const Loldetail = () => {
  const 소환사기본정보 = useSelector((state) => state.lol.소환사기본정보);
  const 매치아이디 = useSelector((state) => state.lol.매치아이디);
  const disfatch = useDispatch();
  const apikey = process.env.REACT_APP_lol_apikey;
  const 매치정보 = useSelector((state) => state.lol.매치정보);

  const 매치정보넣기 = () => {
    매치아이디.map(async (item) => {
      const url4 = new URL(
        `https://asia.api.riotgames.com/lol/match/v5/matches/${item}?api_key=${apikey}`
      );
      const response4 = await fetch(url4);
      const data4 = await response4.json();
      disfatch(매치아이디넣기(data4.info));
    });
  };
  useEffect(() => {
    if (매치정보.length === 0) {
      매치정보넣기();
    } else {
      console.log(매치정보);
    }
  }, [매치정보]);
  return (
    <div className="lol-detail">
      <Container>
        <div className="userinfo">
          <div className="user-profile">
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/13.16.1/img/profileicon/${소환사기본정보.profileIconId}.png`}
            ></img>
            <div className="level">{소환사기본정보.summonerLevel}</div>
          </div>
          <div className="user-text">
            <div className="tier-list">s2023 s1 diamond4</div>
            <h3>{소환사기본정보.name}</h3>
            <div>
              <Button variant="primary">전적갱신</Button>
            </div>
          </div>
        </div>
      </Container>
      <div className="bottom">
        <Container>
          <div>
            <Row>
              <Col lg={4}>
                <Lank />
              </Col>
              <Col lg={8}>
                <Match />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Loldetail;
