import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

interface ErrorValidate{
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noPalacio(control: FormControl): ErrorValidate{
    if (control.value?.toLowerCase() === 'Palacio') {
      return {
        noPalacio: true
      };
    }
    return  {
      noPalacio: false
    };
  }

  passwordsIguales(pass1Name: string, pass2Name: string): any{
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];
      if (pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({noEsIgual: true});
      }
    };
  }

  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate>{
    if (!control.value){
      return Promise.resolve({existe: true});
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'rev'){
          resolve({existe: true});
        } else{
          resolve({existe: false});
        }
      }, 3500);
    });
  }
}
