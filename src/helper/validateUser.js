import toast from 'react-hot-toast'
import { authenticate } from './helperUser';


/** validate username */
export async function usernameValidate(values){
    const errors = usernameVerify({},values);
    if(values.username){
        const {status} = await authenticate(values.username);
        if(status !== 200){
            errors.exist = toast.error('User does not exist')
        }
    }
    return errors;
}

/**validate password */
export async function passwordValidate(values){
    const errors = passwordVerify({},values)

    return errors;
}
/** validate reset password */
export async function resetPasswordValidate(values){
    const errors = passwordVerify({},values);

    if(values.password !== values.cfm_password){
        errors.exist = toast.error("password not match")
    }
    return errors
}

/** validate registration */
export async function registrationValidate(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values)
    emailVerify(errors, values)

    return errors
}
/** profile validate */
export async function profilevalidation(values){
    const errors = emailVerify({},values);
    return errors
}

/** ********************** */

/**validate password */
function passwordVerify(error ={},values){
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{}; ' : "\\\, .<>\/?~]/;
    if(!values.password){
        error.password = toast.error('Password Required!!')
    }else if(values.password.includes(" ")){
        error.password = toast.error('Invalid Password')
    }else if(values.password.lenght < 4){
        error.password = toast.error('Password must be more than 4 characters')
    }else if(!specialChars.test(values.password)){
        error.password = toast.error("Password should contain special character")
    }
    return error;
}

/** validate username */
function usernameVerify(error ={},values){
    if(!values.username){
        error.username =  toast.error('Username Required...!')
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid username')
    }
    return error;
}

/** validate email */
function emailVerify(error = {}, values){
    if(!values.email){
        error.email = toast.error("Email Required..!!")
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(values.email)){
        error.email = toast.error("Enter valid email...")
    }
    return error
}
