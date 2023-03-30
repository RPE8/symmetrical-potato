import { addMilliseconds, differenceInMilliseconds } from "date-fns";

const getMedianDate = (date1: Date, date2: Date): Date => {
  const midpointMs = (date1.getTime() + date2.getTime()) / 2;
  return addMilliseconds(date1, midpointMs - date1.getTime());
};

export default getMedianDate;
