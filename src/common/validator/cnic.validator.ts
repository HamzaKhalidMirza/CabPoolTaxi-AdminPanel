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
            let res;
            for(let i=0; i<cnicList.length; i++) {
              if(cnicList[i] === input.value) {
                res = null;
                break;
              } else {
                res = { shouldBeValid: true };
              }
            }
            resolve(res);
            // cnicList.forEach(cnic => {
            //   if(cnic === input.value) {
            //     console.log('null');
            //     resolve(null);
            //   } else {
            //     console.log('shouldBeValid');
            //     resolve({ shouldBeValid: true });
            //   }
            // });
          });
        }, 1000);
      });
    };
  }
}
