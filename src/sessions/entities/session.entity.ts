import { AutoIncrement, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Chat } from "src/chats/entities/chat.entity";
import { User } from "src/users/entities/user.entity";

@Table
export class Session extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column
    customerId: number;

    @ForeignKey(() => User)
    @Column
    driverId: number;

    @BelongsTo(() => User)
    customer: User;

    @BelongsTo(() => User)
    driver: User;

    @HasMany(() => Chat)
    chats: Chat[];
}
