import React from "react";
import { useSelector } from "react-redux";

const Lank = () => {
  const info = useSelector((state) => state.lol.소환사정보);
  const 소환사정보 = info.filter((item) => item.queueType !== "CHERRY" && item.queueType !=='RANKED_TFT_DOUBLE_UP');
  
  return (
    <div>
      {소환사정보.map((item) => (
        <div className="lank">
          <div className="lank-mode">
            {item.queueType === "RANKED_FLEX_SR" ? "자유랭크" : '솔로랭크'}
          </div>
          <div className="lank-info">
            <div className="lank-img">
              <img
                src={`../images/lol-tier/emblem-${item.tier}.png`}
                width={80}
              ></img>
              <div>
                <div className="tier">
                  {item.tier} {item.rank}
                </div>
                <div className="lp">{item.leaguePoints} LP</div>
              </div>
            </div>
            <div className="lank-rate">
              <div>
                {item.wins}승 {item.losses}패
              </div>
              <div>
                승률 {Math.ceil((item.wins / (item.wins + item.losses)) * 100)}%
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Lank;
