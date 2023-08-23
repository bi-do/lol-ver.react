import React from "react";


const Nav = () => {
    let games = [
        { name: '리그오브레전드', img: 'lol' },
        { name: '전략적 팀 전투', img: 'tft' },
        { name: '발로란트', img: 'valolant' },
        { name: '배틀그라운드', img: 'pubg' },
        { name: '오버워치2', img: 'overwatch' }
      ];
      
  return (
    <div className="nav1">
      <ul className="nav-games">
        <li className="logo">
          <img src="../images/opgglogo.png" width={65}></img>
        </li>
        {games.map((item)=>(
            <li>
            <img src={`../images/${item.img}.png`} width={24}></img>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
      <div className="nav-loginbox">
        <button className="nav-language">한국어</button>
        <button className="loginbutton">로그인</button>
      </div>
    </div>
  );
};

export default Nav;
