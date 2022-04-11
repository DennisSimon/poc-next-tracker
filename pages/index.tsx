import React, { useEffect, useState } from "react";
// import { Layout } from "../src/Layout";
// import { CardWithHeader } from "../src/components/CardWithHeader/CardWithHeader";
import { Grid, Box } from "@mui/material";
import {
  AppInfoResponse,
  getAppInfoAsync,
  getNetworkInfoAsync,
} from "src/api/zrxTrackerApi";
// import { LineCard } from "src/components/LineCard/LineCard";
// import { TopAppsCard } from "src/components/TopAppsCard/TopAppsCard";

function abbreviateNumber(value: number): string {
  const suffixes = ["", "k", "m", "b", "t"];
  let suffixNum = 0;
  let tempValue = value;
  while (tempValue >= 1000) {
    tempValue /= 1000;
    suffixNum++;
  }
  if (suffixNum === 0) {
    return value.toFixed(2);
  }
  const cutNum = 3 * suffixNum;
  return (value / 10 ** cutNum).toFixed(2) + suffixes[suffixNum];
}

type Data = {
  volume: string;
  trades: string;
  traders: string;
  avgTradeSize: string;
};

export async function getServerSideProps() {
  const requests = [
    fetch("https://api.0xtracker.com/stats/network?period=month"),
    fetch("https://api.0xtracker.com/stats/trader?period=month"),
  ];

  const results = await Promise.all(requests);

  const [networkData, traderData] = await Promise.all(
    results.map((res) => res.json())
  );

  const out: Data = {
    volume: `$${abbreviateNumber(networkData.tradeVolume)}`,
    trades: abbreviateNumber(networkData.tradeCount),
    traders: abbreviateNumber(traderData.traderCount),
    avgTradeSize: `$${abbreviateNumber(
      networkData.tradeVolume / networkData.tradeCount
    )}`,
  };

  return {
    props: {
      data: out,
    },
  };
}

const Home = ({ data }: { data: Data }) => {
  const { volume, trades, traders, avgTradeSize } = data;

  const [data1, setdata1] = useState<{ loading: boolean; data: string | null }>(
    { loading: true, data: null }
  );
  const [data2, setdata2] = useState<{ loading: boolean; data: string | null }>(
    { loading: true, data: null }
  );

  const [chartData, setChartData] = useState<{
    loading: boolean;
    data: { x: Date; y: number }[] | null;
  }>({ loading: true, data: null });
  const [performers, setPerformers] = useState<{
    loading: boolean;
    data: AppInfoResponse | null;
  }>({ loading: true, data: null });

  useEffect(() => {
    const d1 = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setdata1({ loading: false, data: "$10.9b" });
      await new Promise((resolve) => setTimeout(resolve, 800));
      setdata2({ loading: false, data: "5.42k" });
      const rawChartData = await getNetworkInfoAsync("hour", "day");
      const data = rawChartData.map((item) => ({
        x: new Date(item.date),
        y: item.tradeVolume,
      }));
      setChartData({ loading: false, data });

      const rawPerformersData = await getAppInfoAsync(5, "day");

      setPerformers({ loading: false, data: rawPerformersData });
    };

    d1();
  }, []);

  return (
    // <Layout>
    <Box>
      {/* <Grid container columnSpacing={1} columns={12}>
          <Grid item xs={3}>
            <CardWithHeader header="Volume (30 D)" content={volume} />
          </Grid>
          <Grid item xs={3}>
            <CardWithHeader header="Trades (30 D)" content={trades} />
          </Grid>
          <Grid item xs={3}>
            <CardWithHeader header="Traders (30 D)" content={traders} />
          </Grid>
          <Grid item xs={3}>
            <CardWithHeader
              header="Avg Trade Size (30 D)"
              content={avgTradeSize}
            />
          </Grid>
        </Grid>
        <Grid container columnSpacing={2} columns={2} sx={{ mt: 4 }}>
          <Grid item xs={1}>
            <CardWithHeader
              header="Test data"
              content={data1.data}
              loading={data1.loading}
            />
          </Grid>
          <Grid item xs={1}>
            <CardWithHeader
              header="Test data"
              content={data2.data}
              loading={data2.loading}
            />
          </Grid>
        </Grid> */}
      {/* <Grid container columnSpacing={2} columns={12} sx={{ mt: 4 }}>
          <Grid item xs={7}>
            <LineCard
              data={chartData.data}
              loading={chartData.loading}
              header="Trading Metric (24 H)"
            />
          </Grid>
          <Grid item xs={5}>
            <TopAppsCard
              header="Top Performing Apps (24 H)"
              data={performers.data}
              loading={performers.loading}
            />
          </Grid>
        </Grid> */}
    </Box>
    // </Layout>
  );
};

export default Home;
