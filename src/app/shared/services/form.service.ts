import {Injectable} from '@angular/core';

@Injectable()
export class FormService {

  constructor() {}

  onValueChanged(form, errorForm, validationMessages) {
    if (!form) { return; }
    const _form = form;
    for (const field in errorForm) {
      if (errorForm.hasOwnProperty(field)) {
        // clear previous error message (if any)
        errorForm[field] = '';
        const control = _form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              errorForm[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
