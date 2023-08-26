import React, { useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useSelector } from "react-redux";

const Piechart = () => {
  const 승리횟수 = useSelector((state) => state.lol.승리횟수);
  const 전체정보 = useSelector((state) => state.lol.전체정보);
  const 내대전정보 = useSelector((state) => state.lol.내대전정보);
  const kda = useSelector((state) => state.lol.kda);

  const 나찾는함수 = (item) => {
    return item.인원[0].find((it) => it.본인인증 === "나야");
  };

  const 전체킬 = (items) => {
    let 전체킬 = 0;
    items.forEach((itemArray) => {
      itemArray.forEach((item) => {
        if (item.킬) {
          // 킬이 있는지 확인
          전체킬 += item.킬;
        }
      });
    });
    return 전체킬;
  };

  const data = [
    {
      id: "패배",
      label: "패배",
      value: 15 - 승리횟수,
      color: "hsl(23, 70%, 50%)",
    },
    {
      id: "승리",
      label: "승리",
      value: 승리횟수,
      color: "hsl(144, 70%, 50%)",
    },
  ];
  const MyResponsivePie = ({ data /* see data tab */ }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
      innerRadius={0.75}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "set1" }}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", "0.1"]],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      legends={[]}
    />
  );

  return (
    <div className="차트">
      <div>
        <div>
          <div className="rate-category">
            전적 15전 {승리횟수}승 {15 - 승리횟수}패
          </div>
        </div>
        <div className="차트-pie">
          <div className="pie-chart">
            <MyResponsivePie data={data} />
            <div className="pie-rate">{Math.floor((승리횟수 / 15) * 100)}%</div>
          </div>
          <div>
            <div className="차트-kda">
              <span>{(kda.킬 / 15).toFixed(1)}</span>
              <span> / </span>
              <span>{(kda.데스 / 15).toFixed(1)}</span>
              <span> / </span>
              <span>{(kda.어시 / 15).toFixed(1)}</span>
            </div>
            <div className="차트-평점">{((kda.킬 + kda.어시) / kda.데스).toFixed(2)}:1</div>
            <div className="차트-킬관여">
              킬관여{" "}
              {전체정보 &&
                Math.ceil(
                  ((kda.킬 + kda.어시) /
                    전체킬(
                      전체정보.map((item) => {
                        return item.인원[0].filter((it) => {
                          return it.승리여부 === 나찾는함수(item).승리여부;
                        });
                      })
                    )) *
                    100
                )}
              %
            </div>
          </div>
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Piechart;
