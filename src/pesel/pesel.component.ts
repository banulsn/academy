import { Component } from '@angular/core';

@Component({
  selector: 'pesel',
  templateUrl: './pesel.component.html',
  styleUrls: ['./pesel.component.scss']
})
export class PeselComponent {
  userDate: string;
  userDatePattern = /^\d{4}[\-]\d{2}[\-]\d{2}$/i;
  generatedPeselNumber: string;

  generatePesel(userDate: string): void {
    // userDate string format rrrr-mm-dd
    if (!userDate || !this.userDatePattern.test(userDate)) {
      this.generatedPeselNumber = 'Podaj datę w formacie rrrr-mm-dd';
      return;
    }
    let pesel = '';
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let checksum = 0;
    
    let userDateMonth = parseInt(userDate.substring(5, 7));
  
    const calculatePeselMonthNumbers = (userDateYear: number): string => {
      if (userDateYear >= 1800 && userDateYear <= 1899) {
        return (userDateMonth + 80).toString();
      } else if (userDateYear >= 1900 && userDateYear <= 1999) {
        return  userDateMonth.toString();
      } else if (userDateYear >= 2000 && userDateYear <= 2099) {
        return  (userDateMonth + 20).toString();
      } else if (userDateYear >= 2100 && userDateYear <= 2199) {
        return  (userDateMonth + 40).toString();
      } else if (userDateYear >= 2200 && userDateYear <= 2299) {
        return  (userDateMonth + 60).toString();
      }
    }

    let peselMonthNumbers = calculatePeselMonthNumbers(parseInt(userDate.substring(0, 4)));

    if (peselMonthNumbers.length === 1) {
      peselMonthNumbers = '0' + peselMonthNumbers;
    }

      // pierwszych 6 cyfr peselu z daty urodznia
    pesel = userDate.substring(8, 10) + peselMonthNumbers + userDate.substring(2, 4);

    // 7, 8, 9, 10 losowa cyfra peselu
    for (let i = 0; i < 4; i++) {
      pesel += (Math.floor(Math.random()*9) + 1).toString();
    }

    for (let j = 0; j < weights.length; j++) {
      checksum += parseInt(pesel.substring(j, j + 1))*weights[j];
    }

    checksum = 10 - checksum % 10;

    // 11 cyfra - suma kontrolna
    pesel = pesel + checksum.toString();

    this.generatedPeselNumber = pesel;
  }
}
