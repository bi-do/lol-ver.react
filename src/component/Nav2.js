import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import { useNavigate } from "react-router";


const Nav2 = () => {
  const navigate = useNavigate()

  const gotohome = ()=>{
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
                <div></div>
              </ul>
            </Col>
            <Col lg={3}>패치보기(미구현)</Col>
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
