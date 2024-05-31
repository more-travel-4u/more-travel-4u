// Function for formatting our date. // takes in .toISOString(); of Date obj
export const formatDate = (inputDate) => {
  const date = inputDate.slice(0, 10)
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const strArray = date.split('');
  let monthNum = strArray[5] + strArray[6];
  if (monthNum[0] === '0') monthNum = monthNum.substring(1);
  return `${months[Number(monthNum)-1]} ${strArray[8]}${strArray[9]}, ${strArray[0]}${strArray[1]}${strArray[2]}${strArray[3]}`
}

// Function for formatting time. // takes in .toISOString(); of Date obj
export const formatTime = (inputDate) => {
  const time = inputDate.slice(11, 16)
  const timeArray = time.split("");
  let pmTrue = false;
  let hour = timeArray[0] + timeArray[1]
  if ((hour * 1) >= 12) {
    pmTrue = true;
    if ((hour * 1) > 12)
      hour = (hour * 1) - 12;
  } else if ((hour * 1) === 0) hour = 12;
  else if ((hour * 1) < 10) hour = timeArray[1];
  const minutes = timeArray[3] + timeArray[4]
  let formattedTime = `${hour}:${minutes}`;
  formattedTime += pmTrue ? ` PM` : ` AM`;
  return formattedTime;
}