import { VictoryTheme, VictoryThemeDefinition } from "victory";
import { merge, assign } from "lodash";

const baseProps = {
  width: 350,
  height: 350,
  padding: 50,
};

const overwrites: VictoryThemeDefinition = {
  axis: assign(
    {
      style: {
        axis: {
          fill: "transparent",
          stroke: "transparent",
        },
        grid: {
          fill: "none",
          stroke: "transparent",
        },
        ticks: {
          fill: "none",
          stroke: "transparent",
        },
      },
    },
    baseProps
  ),
};

export const theme = merge(VictoryTheme.material, overwrites);
