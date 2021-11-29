import { AutoIncrement, Column, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";

@Table
export class Role extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    name: string;

    @HasOne(() => User)
    user: User;
}
