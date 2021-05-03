import { AbstractControl } from "@angular/forms";


export function passwordValidators(control:AbstractControl):{[key:string]:boolean} {
    const password = control.get('password');
    const confirmPassword = control.get("confirmPassword");
    if(password.pristine || confirmPassword.pristine){
        return {"misMatch":false};
    }   
    
    return (password && confirmPassword && (password.value == confirmPassword.value))? {"misMatch":false} : {"misMatch":true}
}