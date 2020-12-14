import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryPolarAxis,
  VictoryLabel,
  VictoryTooltip,
} from "victory";
const Graph = (props) => {
  const deltaMin = 0.1;
  const max = 1.0;
  let min = 1;
  const concepts = props?.concepts.slice(0, props?.itemsNumber);
  concepts.map((x) => (x.value < min ? (min = x.value) : null));
  min -= deltaMin;
  const shiftedData = [];
  concepts.map((x) => shiftedData.push({ name: x.name, value: x.value - min }));
  return (
    <VictoryChart
      polar
      invertAxis={false}
      startAngle={60}
      endAngle={-60}
      height={500}
      width={400}
      padding={{ left: -200, top: 18, bottom: 18 }}
      scale={1.5}
      domain={{ y: [0, max - min] }}
      animate={{
        duration: 1000,
        onLoad: { duration: 1000, easing: "cubicOut" },
      }}
      innerRadius={20}
    >
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="myGradient">
            <stop offset="0%" stopColor="#cc8c87" />
            <stop offset="100%" stopColor="tomato" />
          </linearGradient>
        </defs>
      </svg>
      {shiftedData
        .reduce((acc, val) => {
          acc.push(val.name);
          return acc;
        }, [])
        .map((d, i) => {
          return (
            <VictoryPolarAxis
              dependentAxis
              key={i}
              label={d}
              labelPlacement="vertical"
              style={{
                axis: {
                  stroke: "#abcdefff",
                  strokeWidth: 1,
                },
                tickLabels: { fill: "none", fontSize: 15, padding: 15 },
                labels: { angle: -90, fill: "red", fontSize: 20 },
              }}
              axisValue={d}
            />
          );
        })}
      <VictoryBar
        labelComponent={<VictoryTooltip />}
        style={{ data: { fill: "url(#myGradient)", width: 12 } }}
        data={shiftedData}
        x="name"
        y="value"
        label="name"
        events={[
          {
            target: "data",
            eventHandlers: {
              onMouseOver: () => {
                return [
                  {
                    target: "data",
                    mutation: () => ({ style: { fill: "gold", width: 10 } }),
                  },
                  {
                    target: "labels",
                    mutation: () => ({ active: true }),
                  },
                ];
              },
              onMouseOut: () => {
                return [
                  {
                    target: "data",
                    mutation: () => {},
                  },
                  {
                    target: "labels",
                    mutation: () => ({ active: false }),
                  },
                ];
              },
            },
          },
        ]}
      />
      <VictoryLabel capHeight={6} style={{ fill: "red" }} />
    </VictoryChart>
  );
};
export default Graph;
