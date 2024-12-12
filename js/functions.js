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
