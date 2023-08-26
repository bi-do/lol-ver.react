import React from "react";

const Playgame = (props) => {
  const 아이템 = props.아이템;

  const 나찾는함수 = (item) => {
    return item.find((it) => it.본인인증 === "나야");
  };

  const 울팀찾는함수 = (item) => {
    const 울팀찾았다 = item.filter((it) => {
      return it.팀번호 === 나찾는함수(item).팀번호;
    });
    return 울팀찾았다 && 울팀찾았다;
  };

  const 상대팀찾는함수 = (item) => {
    const 상대팀찾았다 = item.filter((it) => {
      return it.팀번호 !== 나찾는함수(item).팀번호;
    });
    return 상대팀찾았다 ? 상대팀찾았다 : null;
  };

  const 전체킬 = (item) => {
    let 전체킬 = 0;
    item.forEach((it) => {
      전체킬 = 전체킬 + it.킬;
    });
    return 전체킬;
  };

  const 최대딜량 = (items) => {
    let maxDeal = 0;
    items.forEach((item) => {
      if (item.딜량 > maxDeal) maxDeal = item.딜량;
    });
    return maxDeal;
  };

  const 최대받은피해량 = (items) => {
    let 최받딜 = 0;
    items.forEach((item) => {
      if (item.받은피해량 > 최받딜) 최받딜 = item.받은피해량;
    });

    return 최받딜;
  };

  return (
    <div className="드롭다운-all">
      <div>
        <div className="드롭다운-내브바">
          <div
            className={`드롭다운-소환사정보 ${
              울팀찾는함수(아이템)[0].승리여부 === "승리"
                ? "소환사정보-승리"
                : "소환사정보-패배"
            }`}
          >
            {울팀찾는함수(아이템)[0].승리여부}
          </div>
          <div className="드롭다운-kda">KDA</div>
          <div className="드롭다운-그래프">피해량</div>
          <div className="드롭다운-기타지표">
            <div className="드롭다운-와드">와드</div>
            <div className="드롭다운-cs">CS</div>
          </div>
          <div className="드롭다운-아이템">아이템</div>
        </div>
        <ul className={`우리팀드롭다운 ${울팀찾는함수(아이템)[0].승리여부 === '승리'?'팀드롭다운-승리':'팀드롭다운-패배'}`}>
          {울팀찾는함수(아이템).map((item) => (
            <li
              className={`드롭다운 ${
                item.본인인증 !== "나야"
                  ? null
                  : item.승리여부 === "승리"
                  ? "드롭다운-승리-나"
                  : "드롭다운-패배-나"
              } ${
                울팀찾는함수(아이템)[0].승리여부 === "승리"
                  ? "드롭다운-승리"
                  : "드롭다운-패배"
              }`}
            >
              <div className="드롭다운-소환사정보">
                <div className="드롭다운-챔피언">
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/${item.챔피언}.png`}
                    width={32}
                  ></img>
                  <span className="드롭다운-챔피언레벨">{item.챔피언레벨}</span>
                </div>
                <div className="드롭다운-스펠">
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/13.16.1/img/spell/${item.스펠[0]}.png`}
                    width={16}
                  ></img>
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/13.16.1/img/spell/${item.스펠[1]}.png`}
                    width={16}
                  ></img>
                </div>
                <div>
                  <div className="드롭다운-닉네임">{item.닉네임}</div>
                  <div className="드롭다운-소환사레벨">
                    LEVEL {item.소환사레벨}
                  </div>
                </div>
              </div>
              <div className="드롭다운-kda">
                <div className="드롭다운-킬뎃">
                  {`${item.킬}/${item.데스}/${item.어시}`} (
                  {Math.floor(
                    ((item.킬 + item.어시) / 전체킬(울팀찾는함수(아이템))) * 100
                  )}
                  %)
                </div>
                <div className="드롭다운-킬관여율">
                  {((item.킬 + item.어시) / item.데스).toFixed(2)}:1
                </div>
              </div>
              <div className="드롭다운-그래프">
                <div className="드롭다운-딜량">
                  <div>{item.딜량}</div>
                  <div className="백그라운드바">
                    <div
                      className="graph-bar"
                      style={{
                        width: `${
                          (item.딜량 / 최대딜량(울팀찾는함수(아이템))) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="드롭다운-받은피해량">
                  <div>{item.받은피해량}</div>
                  <div className="백그라운드바">
                    <div
                      className="graph-bar"
                      style={{
                        width: `${
                          (item.받은피해량 /
                            최대받은피해량(울팀찾는함수(아이템))) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="드롭다운-기타지표">
                <div className="드롭다운-와드">
                  <div>{item.와드}</div>
                  <div>
                    {item.와드설치} / {item.와드제거}
                  </div>
                </div>
                <div className="드롭다운-cs">
                  <div>{item.cs}</div>
                  <div>분당 {(item.cs / (item.게임시간 / 60)).toFixed(1)}</div>
                </div>
              </div>
              <div className="드롭다운-아이템">
                {item.아이템.map((it) => (
                  <img
                    src={
                      it !== 0
                        ? `https://ddragon.leagueoflegends.com/cdn/13.16.1/img/item/${it}.png`
                        : "../images/null.png"
                    }
                    width={22}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="드롭다운-팀비교">
        <div>
          {/* <span>
            <img src="" />
          </span>
          <span>
            <img src="" />
          </span>
          <span>
            <img src="" />
          </span>
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
        <div>
          <span>
            <img src="" />
          </span>
          <span>
            <img src="" />
          </span>
          <span>
            <img src="" />
          </span> */}
        </div>
      </div>
      <div>
      <div className="드롭다운-내브바">
          <div
            className={`드롭다운-소환사정보 ${
              상대팀찾는함수(아이템)[0].승리여부 === "승리"
                ? "소환사정보-승리"
                : "소환사정보-패배"
            }`}
          >
            {상대팀찾는함수(아이템)[0].승리여부}
          </div>
          <div className="드롭다운-kda">KDA</div>
          <div className="드롭다운-그래프">피해량</div>
          <div className="드롭다운-기타지표">
            <div className="드롭다운-와드">와드</div>
            <div className="드롭다운-cs">CS</div>
          </div>
          <div className="드롭다운-아이템">아이템</div>
        </div>
        <ul className={`우리팀드롭다운 ${상대팀찾는함수(아이템)[0].승리여부 === '승리'?'팀드롭다운-승리':'팀드롭다운-패배'}`}>
          {상대팀찾는함수(아이템).map((item) => (
            <li
              className={`드롭다운 ${
                item.본인인증 !== "나야"
                  ? null
                  : item.승리여부 === "승리"
                  ? "드롭다운-승리-나"
                  : "드롭다운-패배-나"
              } ${
                상대팀찾는함수(아이템)[0].승리여부 === "승리"
                  ? "드롭다운-승리"
                  : "드롭다운-패배"
              }`}
            >
              <div className="드롭다운-소환사정보">
                <div className="드롭다운-챔피언">
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/${item.챔피언}.png`}
                    width={32}
                  ></img>
                  <span className="드롭다운-챔피언레벨">{item.챔피언레벨}</span>
                </div>
                <div className="드롭다운-스펠">
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/13.16.1/img/spell/${item.스펠[0]}.png`}
                    width={16}
                  ></img>
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/13.16.1/img/spell/${item.스펠[1]}.png`}
                    width={16}
                  ></img>
                </div>
                <div>
                  <div className="드롭다운-닉네임">{item.닉네임}</div>
                  <div className="드롭다운-소환사레벨">
                    LEVEL {item.소환사레벨}
                  </div>
                </div>
              </div>
              <div className="드롭다운-kda">
                <div className="드롭다운-킬뎃">
                  {`${item.킬}/${item.데스}/${item.어시}`} (
                  {Math.floor(
                    ((item.킬 + item.어시) / 전체킬(상대팀찾는함수(아이템))) * 100
                  )}
                  %)
                </div>
                <div className="드롭다운-킬관여율">
                  {((item.킬 + item.어시) / item.데스).toFixed(2)}:1
                </div>
              </div>
              <div className="드롭다운-그래프">
                <div className="드롭다운-딜량">
                  <div>{item.딜량}</div>
                  <div className="백그라운드바">
                    <div
                      className="graph-bar"
                      style={{
                        width: `${
                          (item.딜량 / 최대딜량(상대팀찾는함수(아이템))) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="드롭다운-받은피해량">
                  <div>{item.받은피해량}</div>
                  <div className="백그라운드바">
                    <div
                      className="graph-bar"
                      style={{
                        width: `${
                          (item.받은피해량 /
                            최대받은피해량(상대팀찾는함수(아이템))) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="드롭다운-기타지표">
                <div className="드롭다운-와드">
                  <div>{item.와드}</div>
                  <div>
                    {item.와드설치} / {item.와드제거}
                  </div>
                </div>
                <div className="드롭다운-cs">
                  <div>{item.cs}</div>
                  <div>분당 {(item.cs / (item.게임시간 / 60)).toFixed(1)}</div>
                </div>
              </div>
              <div className="드롭다운-아이템">
                {item.아이템.map((it) => (
                  <img
                    src={
                      it !== 0
                        ? `https://ddragon.leagueoflegends.com/cdn/13.16.1/img/item/${it}.png`
                        : "../images/null.png"
                    }
                    width={22}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Playgame;
