import { currentDate } from './flightsDateUtils';

const baseUrl = 'https://api.iev.aero/api/flights';

export const fetchFlights = () =>
  fetch(`${baseUrl}/${currentDate}`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Failed to get flights');
  });
