import { formatMinutes } from './flightsDateUtils';

export const flightsStatusChecking = (flight) =>
  (flight.status === 'CK' ? 'Check-in' : null) ||
  (flight.status === 'ON' ? 'On time' : null) ||
  (flight.status === 'FR' ? 'In flight' : null) ||
  (flight.status === 'GC' ? 'Gate closed' : null) ||
  (flight.status === 'BD' ? 'Boarding' : null) ||
  (flight.status === 'CC' ? 'Check-in closed' : null) ||
  (flight.status === 'CX' ? 'Cancelled' : null) ||
  (flight.status === 'DL'
    ? `Departure expected at ${new Date(
        flight.timeDepExpectCalc
      ).getHours()}:${formatMinutes(new Date(flight.timeDepExpectCalc))}`
    : null) ||
  (flight.status === 'LN'
    ? `Landed ${new Date(flight.timeLandFact).getHours()}:${formatMinutes(
        new Date(flight.timeLandFact)
      )}`
    : null) ||
  (flight.status === 'DP'
    ? `Departed at ${new Date(
        flight.timeTakeofFact
      ).getHours()}:${formatMinutes(new Date(flight.timeTakeofFact))}`
    : null);
