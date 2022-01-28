import moment from 'moment'

/**
 * Function to format date
 * @param date
 * @returns formatted date.
 */
export const getFormattedDate = (date) => {
  return new Date(date).toString() !== 'Invalid Date' ? moment(date).format('DD-MMM-YYYY') : 'n/a';
}

/**
 * Function to get total capacity of starship
 * @param crewCount
 * @param passengerCount
 * @returns total count with commas
 */
export const getTotalCapacity = (crewCount, passengerCount, formatted = true) => {
  crewCount = crewCount.replace(/,/g, '');
  if (crewCount.includes('-')) {
    crewCount = Math.max.apply(Math, crewCount.split('-'));
  } else if (isNaN(crewCount)) {
    crewCount = 0;
  }

  passengerCount = passengerCount.replace(/,/g, '');
  if (passengerCount.includes('-')) {
    passengerCount = Math.max.apply(Math, passengerCount.split('-'));
  } else if (isNaN(+passengerCount)) {
    passengerCount = 0;
  }
  return formatted ? new Intl.NumberFormat('en-US').format(+crewCount + +passengerCount) : +crewCount + +passengerCount;
}
