export const APP_ID = '8773d3bca4704221babc683eea64dd28';
export const DAY =1000 * 60 * 60 * 24; 
export const WEEK = 1000 * 60 * 60 * 24 * 7;

export const formatDate = (date) => date.toISOString().split('T')[0];

export const getDaysBetweenDates = (from, to) => {
    const startDate = new Date(from);
    const endDate = new Date(to);
    const differenceInMs = endDate - startDate;
    const differenceInDays = differenceInMs / DAY;
    return differenceInDays;
}