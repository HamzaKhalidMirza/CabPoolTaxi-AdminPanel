import { CnicService } from './../sdk/custom/api/cnic.service';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

export class CnicValidator {

  constructor(
  ) {}

  static shouldBeValid(cnicService: CnicService)  {

    return (input: FormControl) => {
      return new Promise((resolve, reject) => {

        setTimeout(() => {
          cnicService.getCNIC_JSON()
          .subscribe(response => {
            const cnicList = response.Cnic;
            cnicList.forEach(cnic => {
              if(cnic === input.value) {
                resolve(null);
              } else {
                resolve({ shouldBeValid: true });
              }
            });
          });
        }, 1000);
      });
    };
  }
}
