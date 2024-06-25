const monthNames = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
  };

export default function dateHandler (matchDate) {
    const date = new Date(matchDate.seconds * 1000);
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    // const year = date.getFullYear();
    return `${month} ${day}`;
}