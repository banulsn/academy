
  const generatePesel = (userDate, gender) => {
    const date = new Date(userDate);
    if (date.toString() === 'Invalid Date') {
      console.log('Podana data nie jest poprawna');
      return;
    }
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const peselMonthNumbers = calculatePeselMonthNumbers(year, month);

    const initialNumbersFromDateForPesel = year.toString().substring(2, 4) + peselMonthNumbers + (day.toString().length === 1 ? '0' + day : day.toString());
    const randomNumbersWithGenderDigit = calculateRandomNumbersWithGenderDigit(gender);
    const checksumDigit = calculateChecksumDigit(initialNumbersFromDateForPesel + randomNumbersWithGenderDigit);

    return initialNumbersFromDateForPesel + randomNumbersWithGenderDigit + checksumDigit;
  }

  const calculatePeselMonthNumbers = (userDateYear, userDateMonth) => {
    let peselDateMonth = '';
    if (userDateYear >= 1800 && userDateYear <= 1899) {
      peselDateMonth = (userDateMonth + 80).toString();
    } else if (userDateYear >= 1900 && userDateYear <= 1999) {
      peselDateMonth =  userDateMonth.toString();
    } else if (userDateYear >= 2000 && userDateYear <= 2099) {
      peselDateMonth =  (userDateMonth + 20).toString();
    } else if (userDateYear >= 2100 && userDateYear <= 2199) {
      peselDateMonth =  (userDateMonth + 40).toString();
    } else if (userDateYear >= 2200 && userDateYear <= 2299) {
      peselDateMonth =  (userDateMonth + 60).toString();
    }
    if (peselDateMonth.length === 1) {
      peselDateMonth = '0' + peselDateMonth;
    }
    return peselDateMonth;
  }

  const calculateRandomNumbersWithGenderDigit = (gender) => {
    let randomNumbers = '';
    for (let i = 0; i < 4; i++) {
      if (i === 3) {
        const peselGenderDigit = Math.floor(Math.random()*9) + 1;
        isGenderDigitValid(gender, peselGenderDigit) ? randomNumbers += peselGenderDigit.toString() : i--;
      } else {
        randomNumbers += (Math.floor(Math.random()*9) + 1).toString();
      }
    }
    return randomNumbers;
  }

  const calculateChecksumDigit = (numbersForCalculate) => {
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let checksum = 0;
    for (let j = 0; j < weights.length; j++) {
      checksum += parseInt(numbersForCalculate.substring(j, j + 1))*weights[j];
    }
    checksum = 10 - checksum % 10;
    return checksum.toString();
  }

  const isGenderDigitValid = (gender, randomNumber) => {
    if (gender === 'male') {
      return randomNumber % 2
    } else {
      return !(randomNumber % 2)
    }
  }
  // https://sprawdz-numer.com/pesel
  console.log(generatePesel('1999/04/17', 'male'));
