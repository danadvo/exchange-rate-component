  import {useState} from 'react';
import { useQueries } from '@tanstack/react-query';
import { APP_ID, DAY, formatDate, WEEK } from './utils';

const fetchDailyILSExchangeRate = async (date) => {
    const response = await fetch(`https://openexchangerates.org/api/historical/${date}.json?app_id=${APP_ID}&symbols=ILS`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${date}`);
    }
    const data = await response.json();
    return data.rates?.ILS ?? 0;
}

const getDatesInRange = (startDate, days) => {
    const dates = [];
    for (let i = 0; i <= days; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        dates.push(formatDate(date));
    }
    return dates;
}

export const useHistoricalExchangeRates = (startDate, days) => {
    const dates = getDatesInRange(startDate,days);
    const queries = useQueries({
        queries: dates.map(date => ({ 
            queryKey: ['ILSRate', date],
            queryFn: async () => {
                const ILSRate = await fetchDailyILSExchangeRate(date);
                return {date, ILSRate};
            },
            enabled: !!date,
            staleTime: DAY, 
            cacheTime: WEEK, 
            refetchOnWindowFocus: false
        })
        )
    });
    
    const allQueriesDone = queries.every((query) => query.isSuccess || query.isError);
    
    if (allQueriesDone) {
        const processedData = queries.map((query) => query.data);
        return {
            data: processedData,
            isLoading: false,
            isError: queries.some((query) => query.isError),
        };
      }

    return {
        data: [],
        isLoading: queries.some((query) => query.isLoading),
        isError: queries.some((query) => query.isError),
    };
  };