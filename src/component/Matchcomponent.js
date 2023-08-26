import { useDispatch, useSelector } from "react-redux";
import Playgame from "./Playgame";
import { 드롭다운전환 } from "../redux/reducer/lolSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Matchcomponent = () => {
  const 소환사주문 = useSelector((state) => state.lol.소환사주문);
  const dispatch = useDispatch();
  const 전체정보 = useSelector((state) => state.lol.전체정보);
  const 드롭다운뷰 = useSelector((state) => state.lol.드롭다운뷰);

  const 나찾는함수 = (item) => {
    return item.인원[0].find((it) => it.본인인증 === "나야");
  };

  const 울팀찾는함수 = (item) => {
    const 울팀찾았다 = item.인원[0].filter((it) => {
      return it.팀번호 === 나찾는함수(item).팀번호;
    });
    return 울팀찾았다 ? 울팀찾았다 : null;
  };

  const 상대팀찾는함수 = (item) => {
    const 상대팀찾았다 = item.인원[0].filter((it) => {
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

  const 닉네임긴거좀잘라라 = (item) => {
    return item.length > 5 ? item.substr(0, 4) + "..." : item;
  };

  const 드롭다운버튼 = (index) => {
    dispatch(드롭다운전환(index));
  };

  return (
    <div>
      {전체정보 &&
        전체정보?.map((item, index) => (
          <div>
            <div
              className={`match-box ${
                나찾는함수(item)?.승리여부 === "승리"
                  ? "color-win"
                  : "color-lose"
              }`}
            >
              <div
                className={`color-default ${
                  나찾는함수(item)?.승리여부 === "승리"
                    ? "colorwin"
                    : "colorlose"
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
                    {나찾는함수(item)?.승리여부 === '승리' ? "승리" : "패배"}
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
                      src={`https://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/${
                        나찾는함수(item)?.챔피언
                      }.png`}
                      width={48}
                      className="splashart"
                    />
                    <div className="champion-lv">
                      {나찾는함수(item).챔피언레벨}
                    </div>
                  </div>
                  <div className="spell">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/13.16.1/img/spell/${
                        나찾는함수(item)?.스펠[0]
                      }.png`}
                      width={22}
                    />
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/13.16.1/img/spell/${
                        나찾는함수(item)?.스펠[1]
                      }.png`}
                      width={22}
                    />
                  </div>
                  <div className="kda-all">
                    <div className="kda">
                      <span>{나찾는함수(item)?.킬}</span>
                      <span> / </span>
                      <span className="킬관여">{나찾는함수(item)?.데스}</span>
                      <span> / </span>
                      <span>{나찾는함수(item)?.어시}</span>
                    </div>
                    <div className="kda-rate">
                      {(
                        (나찾는함수(item)?.킬 + 나찾는함수(item).어시) /
                        나찾는함수(item).데스
                      ).toFixed(2)}
                      :1평점
                    </div>
                  </div>
                  <div>
                    {item.게임모드 === "아레나" ? null : (
                      <ul className="champion-others">
                        <li className="킬관여">
                          킬관여{" "}
                          {Math.ceil(
                            ((나찾는함수(item).킬 + 나찾는함수(item).어시) /
                              전체킬(울팀찾는함수(item))) *
                              100
                          )}
                          %
                        </li>
                        <li>제어와드 {나찾는함수(item)?.와드}</li>
                        <li>
                          CS {나찾는함수(item)?.cs}{" "}
                          {`(${(
                            나찾는함수(item)?.cs /
                            (item.게임시간 / 60)
                          ).toFixed(1)})`}
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
                <div className="item-img">
                  {나찾는함수(item).아이템.map((it) => (
                    <img
                      src={
                        it !== 0
                          ? `https://ddragon.leagueoflegends.com/cdn/13.16.1/img/item/${it}.png`
                          : "../images/null.png"
                      }
                      width={22}
                    ></img>
                  ))}
                </div>
              </div>
              <div className="team-box">
                <div className="팀박스고정용">
                  {울팀찾는함수(item).map((its) => (
                    <div>
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/${its.챔피언}.png`}
                      />
                      <span>{닉네임긴거좀잘라라(its.닉네임)}</span>
                    </div>
                  ))}
                </div>
                <div className="팀박스고정용">
                  {상대팀찾는함수(item).map((its) => (
                    <div>
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/${its.챔피언}.png`}
                      />
                      <span>{닉네임긴거좀잘라라(its.닉네임)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <button
                  className={`dropdown ${울팀찾는함수(item)[0].승리여부 === '승리'?'드롭다운-승리-나' : '드롭다운-패배-나'}`}
                  onClick={() => 드롭다운버튼(index)}
                >
                  {드롭다운뷰[index] === true ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  )}
                </button>
              </div>
            </div>
            {드롭다운뷰[index] === true ? (
              <Playgame 아이템={item.인원[0]} />
            ) : null}
          </div>
        ))}
    </div>
  );
};

export default Matchcomponent;
