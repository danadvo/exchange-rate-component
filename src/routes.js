import { useQuery } from '@tanstack/react-query';
import { APP_ID, DAY, formatDate, WEEK } from './utils';

const fetchDailyILSExchangeRate = async (date) => {
    const response = await fetch(`https://openexchangerates.org/api/historical/${date}.json?app_id=${APP_ID}&symbols=ILS`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${date}`);
    }
    return response.json();
}

const fetchILSExchangeRatesForRange = async (startDate, days) => {
    const requests = [];
    for (let i = 0; i <= days; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const formattedDate = formatDate(date);
        requests.push(fetchDailyILSExchangeRate(formattedDate));
    }
    return Promise.all(requests);
}

export const useHistoricalExchangeRates = (startDate, days) => {
    return useQuery({
        queryKey: ['exchangeRates', startDate, days],
        queryFn: () => fetchILSExchangeRatesForRange(startDate, days),
        enabled: !!startDate,
        staleTime: DAY,
        cacheTime: WEEK, 
        refetchOnWindowFocus: false,
      });
  };