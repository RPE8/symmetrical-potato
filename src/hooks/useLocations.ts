import useSWR from "swr";
import z from "zod";
import _ from "lodash";

const locationApiKey = process.env.NEXT_PUBLIC_LOCATION_API_KEY;

const locationsSchema = z.array(
  z.object({
    name: z.string(),
    country: z.string(),
  })
);

type SuggestionLocation = z.TypeOf<typeof locationsSchema>[number] & {
  id: string;
};
type SuggestionLocations = SuggestionLocation[];
type FetcherFn<T> = (url: string) => Promise<T>;

const defaultFetcher: FetcherFn<SuggestionLocations> = (url: string) =>
  fetch(url).then(async (res) => {
    const data = await res.json();
    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      return Promise.reject(error);
    }
    return _.uniqBy(
      locationsSchema.parse(data).map((location) => ({
        ...location,
        id: `${location.name}-${location.country}`,
      })),
      "id"
    );
  });

export const useLocations = <T extends SuggestionLocations>(
  location: string,
  fetcher?: FetcherFn<T>
) => {
  const fetchOrSkip = Boolean(location && location.length > 2);

  const LOCATION_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${locationApiKey}`;
  const { data, error } = useSWR(
    fetchOrSkip ? LOCATION_API_URL : null,
    fetcher || defaultFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: fetchOrSkip,
      revalidateIfStale: false,
      refreshInterval: 0,
    }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useLocations;
