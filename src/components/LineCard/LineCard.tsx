import * as React from "react";
import { CardWithHeader } from "@Components";
import type { CardWithHeaderProps } from "../CardWithHeader/CardWithHeader";
import {
  VictoryArea,
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryZoomContainer,
} from "victory";

type Data = {
  x: Date;
  y: number;
};

interface LineCardProps extends CardWithHeaderProps {
  data: Data[] | null;
}

type DomainTuple = [number, number] | [Date, Date];

function abbreviateNumber(value: number): string {
  const suffixes = ["", "k", "m", "b", "t"];
  let suffixNum = 0;
  let tempValue = value;
  while (tempValue >= 1000) {
    tempValue /= 1000;
    suffixNum++;
  }
  if (suffixNum === 0) {
    return value.toFixed(1);
  }
  const cutNum = 3 * suffixNum;
  return (value / 10 ** cutNum).toFixed(1) + suffixes[suffixNum];
}

const LineChart = ({ data }: { data: Data[] }) => {
  const [zoomDomain, setZoomDomain] = React.useState<{
    x?: DomainTuple;
    y?: DomainTuple;
  }>();
  const [selectedDomain, setSelectedDomain] = React.useState<{
    x?: DomainTuple;
    y?: DomainTuple;
  }>();

  const [boundingRect, setBoundingRect] = React.useState({
    width: 0,
    height: 0,
  });
  const graphRef = React.useCallback((node: any) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);

  return (
    <div style={{ width: "100%" }} ref={graphRef}>
      <VictoryChart
        height={300}
        width={boundingRect.width}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryZoomContainer
            responsive={false}
            height={300}
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={(domain) => setSelectedDomain(domain)}
          />
        }
      >
        <VictoryArea
          data={data}
          style={{ data: { fill: "#00AE99" } }}
          animate
        />
        <VictoryAxis />
        <VictoryAxis
          dependentAxis
          tickFormat={(t) => abbreviateNumber(t)}
          width={60}
        />
      </VictoryChart>
      <VictoryChart
        height={90}
        width={boundingRect.width}
        scale={{ x: "time" }}
        padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
        prependDefaultAxes={false}
        containerComponent={
          <VictoryBrushContainer
            responsive={false}
            height={90}
            brushDimension="x"
            brushDomain={selectedDomain}
            onBrushDomainChange={(domain) => setZoomDomain(domain)}
          />
        }
      >
        <VictoryArea data={data} style={{ data: { fill: "#00AE99" } }} />
        <VictoryAxis
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            tickLabels: { fill: "transparent" },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export const LineCard = ({ data, ...props }: LineCardProps) => {
  return (
    <CardWithHeader
      {...props}
      content={data === null ? null : <LineChart data={data} />}
    />
  );
};
