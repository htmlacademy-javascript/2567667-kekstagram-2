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

// Проверки для checkStringLength
console.log(checkStringLength('проверяемая строка', 20));
console.log(checkStringLength('проверяемая строка', 18));
console.log(checkStringLength('проверяемая строка', 10));

// Проверки для isPalindrome
console.log(isPalindrome('топот'));
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
console.log(isPalindrome('Лёша на полке клопа нашёл'));

// Пример 1: Строка с годом, извлекаем цифры
console.log(extractDigits('2023 год'));

// Пример 2: Строка с текстом и годом
console.log(extractDigits('ECMAScript 2022'));

// Пример 3: Строка с числовыми значениями и текстом
console.log(extractDigits('1 кефир, 0.5 батона'));

// Пример 4: Строка с числом в конце
console.log(extractDigits('агент 007'));

// Пример 5: Строка без цифр
console.log(extractDigits('а я томат'));

// Пример 6: Число в качестве входных данных
console.log(extractDigits(2023));

// Пример 7: Отрицательное число, извлекаем цифры
console.log(extractDigits(-1));

// Пример 8: Число с плавающей точкой, извлекаем цифры
console.log(extractDigits(1.5));
