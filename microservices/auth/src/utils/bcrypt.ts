import * as bcrypt from 'bcrypt';

export function encodePaswrd(password: string) {
    const SALT = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, SALT);
}

export function comparePaswrd(password: string , hash : string) {
    return bcrypt.compare(password , hash)
}