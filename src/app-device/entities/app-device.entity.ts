import { Table, Model, ForeignKey, PrimaryKey, Column, BelongsTo, AutoIncrement, Unique } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";

@Table
export class AppDevice extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @Column
    platform: string;

    @Unique
    @Column
    token: string;

    @BelongsTo(() => User)
    user: User;
}