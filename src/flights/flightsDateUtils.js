import moment from 'moment';

export const formatMinutes = (date) => moment(date).format('mm');
export const formatDate = (date) => moment(date).format('DD-MM-YYYY');
export const currentDate = formatDate(new Date());
