import moment from 'moment';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

/**
 * Get the formatted date
 * @param date
 */
export function getDateFormat(date: FirebaseFirestoreTypes.Timestamp): string {
  // Convert the date to moment
  const momentDate = moment(date.toMillis());
  const today = moment().startOf('day');

  // Check if the date is less than today
  const isLessThanToday = momentDate.isBefore(today);

  // Return the formatted date
  // If the date is less than today, return the date with the time
  return isLessThanToday
    ? momentDate.format('MMM D, YYYY (h:mm A)')
    : momentDate.format('h:mm A');
}
