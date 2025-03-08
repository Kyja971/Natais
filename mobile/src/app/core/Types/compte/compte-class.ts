import { Exclude, Expose } from "class-transformer"
import { RoleTypeEnum } from "./role-type-enum"

export class Compte {
    @Expose()
    id?: number
    
    @Expose()
    email!: string

    @Exclude()
    password?: string

    @Expose()
    role!: RoleTypeEnum
}
