import { Expose } from "class-transformer"

export class Profile {
    @Expose({ name: '_id' })
    id?: string
    @Expose()
    lastname!: string
    @Expose()
    firstname!: string
    @Expose()
    gender?: string
    @Expose()
    email!: string
    @Expose()
    phonenumber?: string

}