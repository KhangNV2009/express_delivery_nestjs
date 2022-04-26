import { AutoIncrement, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Chat } from "src/chats/entities/chat.entity";
import { DeliveryOrder } from "src/delivery-orders/entities/delivery-order.entity";
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

    @ForeignKey(() => DeliveryOrder)
    @Column
    deliveryId: number;

    @BelongsTo(() => User)
    customer: User;

    @BelongsTo(() => User)
    driver: User;

    @BelongsTo(() => DeliveryOrder)
    delivery: DeliveryOrder;

    @HasMany(() => Chat)
    chats: Chat[];
}
