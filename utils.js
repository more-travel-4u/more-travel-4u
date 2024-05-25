// Function for formatting our date.
export const formatDate = (inputDate) => {
  const date = inputDate.slice(0, 10)
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const strArray = date.split('');
  let monthNum = strArray[5] + strArray[6];
  if (monthNum[0] === '0') monthNum = monthNum.substring(1);
  return `${months[Number(monthNum)-1]} ${strArray[8]}${strArray[9]}, ${strArray[0]}${strArray[1]}${strArray[2]}${strArray[3]}`
}