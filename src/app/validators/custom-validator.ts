import { FormControl, FormGroup, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export class customValidations {
    
    constructor() {}

    public domainValid(control: FormControl) {
        let email = control.value;
        if (email && email.indexOf("@") != -1) {
            let [_, domain] = email.split("@");
            if (domain !== "ncrypted.com" || domain !== "gmail.com") {
                return {
                    emailDomain: {
                        parsedDomain: domain
                    }
                }
            }
        }
        return null;
    }

    public onlyNumeric(control: FormControl) {
        const valid = /^\d+$/.test(control.value);

        if (valid || control.value == null || control.value == undefined || control.value == ''){
            return null;
        }else{
            return {
                onlyNumeric: {
                    numeric : control.value
                }
            }
        }
    }

    public checkBoxTrue(control: FormControl) {
        if (control.value == 'y' || control.value == null || control.value == undefined || control.value == ''){
            return null;
        }else{
            return {
                checkBoxTrue: {
                    check : control.value
                }
            }
        }
    }

    public onlyFloat(control: FormControl) {
        const valid = /^-?\d*(\.\d+)?$/.test(control.value);

        if (valid || control.value == null || control.value == undefined || control.value == ''){
            return null;
        }else{
            return {
                onlyFloat: {
                    float : control.value
                }
            }
        }
    }

    public validURL(control: FormControl) {
        const valid = /^(https|http)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)?$/.test(control.value);

        if (valid || control.value == null || control.value == undefined || control.value == ''){
            return null;
        }else{
            return {
                validURL: {
                    url : control.value
                }
            }
        }
    }

    public validEmail(control: FormControl) {
        const valid = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(control.value);

        if (valid || control.value == null || control.value == undefined || control.value == ''){
            return null;
        }else{
            return {
                validEmail: {
                    url : control.value
                }
            }
        }
    }

    public checkLimit(min: number, max: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { 'checkLimit': true };
            }
            return null;
        };
    }

    
}
