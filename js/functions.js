// Функция для проверки длины строки
function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}

// Функция для проверки, является ли строка палиндромом
function isPalindrome(str) {
  let cleanedStr = str.replace(/\s+/g, '').toLowerCase();
  return cleanedStr === cleanedStr.split('').reverse().join('');
}

function extractDigits(input) {
  let str = input.toString();

  let digits = '';
  for (let char of str) {
    if (!isNaN(parseInt(char))) {
      digits += char;
    }
  }

  if (digits === '') {
    return NaN;
  }

  return parseInt(digits, 10);
}


// Функция "Делу — время"
function isMeetingWithinWorkday(workStart, workEnd, meetingStart, meetingDuration) {
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }


  const workStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;

}

isMeetingWithinWorkday('08:00', '17:30', '14:00', 90); // true
isMeetingWithinWorkday('8:0', '10:0', '8:0', 120); // true
isMeetingWithinWorkday('08:00', '14:30', '14:00', 90); // false
isMeetingWithinWorkday('14:00', '17:30', '08:0', 90); // false
isMeetingWithinWorkday('8:00', '17:30', '08:00', 900); // false
