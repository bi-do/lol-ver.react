import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { 매치아이디비우기 } from "../redux/reducer/lolSlice";

const Nav2 = () => {
  const navigate = useNavigate()
  const disfatch = useDispatch()
  const gotohome = ()=>{
    disfatch(매치아이디비우기())
    navigate('/')
  }
  return (
    <div>
      <div className="nav2">
        <Container>
          <Row className="nav2-row">
            <Col lg={9} className="fk-shit">
              <ul className="nav2-ul">
                <li onClick={gotohome}>홈</li>
                <li>챔피언 분석</li>
                <li>아레나</li>
                <li>멀티서치</li>
                <div></div>
              </ul>
            </Col>
            <Col lg={3}>패치보기</Col>
          </Row>
        </Container>
      </div>
      <div className="nav3">
        <Container>
          알고 계셨나요? 생각을 하면서 게임을 해야 성장한답니다!
        </Container>
      </div>
    </div>
  );
};

export default Nav2;
