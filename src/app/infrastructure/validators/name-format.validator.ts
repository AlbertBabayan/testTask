import { AbstractControl, ValidatorFn } from '@angular/forms';

export function nameFormat(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (control.value.indexOf(' ') === -1) {
            return null;
        }
        return { nameFormat: { message: 'Type format is Owner/Repository' } };
    };
}
