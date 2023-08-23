import React from "react";
import Matchcomponent from "./Matchcomponent";

const Match = () => {
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
            <div className="rate-category">20전 14승 6패</div>
            <div></div>
          </div>
          <div>
            <div className="rate-category">플레이한 챔피언 (최근 20게임)</div>
            <div>챔피언 몇승 몇패 몇평점</div>
          </div>
          <div>
            <div className="rate-category">선호 포지션</div>
            <div>그래프</div>
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
