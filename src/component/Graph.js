import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useSelector } from "react-redux";

const Graph = () => {
  const kda = useSelector((state) => state.lol.kda);
  const data = [
    {
      country: "탑",
      선호도: kda.탑,
    },
    {
      country: "정글",
      선호도: kda.정글,
    },
    {
      country: "미드",
      선호도: kda.미드,
    },
    {
      country: "원딜",
      선호도: kda.원딜,
    },
    {
      country: "서폿",
      선호도: kda.서폿,
    },
  ];
  const MyResponsiveBar = ({ data /* see data tab */ }) => (
    <ResponsiveBar
      data={data}
      keys={["선호도"]}
      indexBy="country"
      margin={{ top: 10, right: 0, bottom: 30, left: 0 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "purpleRed_green" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );

  return (
    <div>
      <div className="rate-category">선호 포지션</div>
      <div className="그래프">
        <MyResponsiveBar data={data} />
      </div>
    </div>
  );
};

export default Graph;
