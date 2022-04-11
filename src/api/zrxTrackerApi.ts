type Symbols = "ETH" | "USD";

type Period = "hour" | "day" | "month";

type SortBy = "tradeVolume" | "tradeCount";

type SortDirection = "asc" | "desc";

type Categories = "relayer" | "dex-aggregator" | "wallet";

type AppInfo = {
  categories: Categories[];
  description: string;
  id: string;
  name: string;
  logoUrl: string;
  stats: {
    activeTraders: number;
    tradeVolume: {
      total: number;
    };
  };
};

export type AppInfoResponse = {
  apps: AppInfo[];
  limit: number;
  page: number;
  pageCount: number;
  sortBy: SortBy;
  sortDirection: SortDirection;
  statsPeriod: Period;
  total: number;
};

export type NetworkInfo =
  | {
      date: string;
      protocolFees: {
        [K in Symbols]?: string;
      };
      tradeCount: number;
      tradeVolume: number;
    } & { [K in Symbols]?: string | number };

export async function getNetworkInfoAsync(
  granularity: Period,
  period: Period
): Promise<NetworkInfo[]> {
  //https://api.0xtracker.com/metrics/network?granularity=hour&period=day
  const response = await fetch(
    `https://api.0xtracker.com/metrics/network?granularity=${granularity}&period=${period}`
  );

  const out = (await response.json()) as NetworkInfo[];

  return out;
}

export async function getAppInfoAsync(
  limit: number,
  statsPeriod: Period
): Promise<AppInfoResponse> {
  const response = await fetch(
    `https://api.0xtracker.com/apps?limit=${limit}&statsPeriod=${statsPeriod}`
  );

  const out = (await response.json()) as AppInfoResponse;

  return out;
}
