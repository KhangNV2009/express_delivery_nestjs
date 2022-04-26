import { AutoIncrement, BelongsTo, Column, ForeignKey, PrimaryKey, Table, Model } from "sequelize-typescript";
import { DeliveryOrder } from "src/delivery-orders/entities/delivery-order.entity";

@Table
export class DeliveryHistory extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => DeliveryOrder)
    @Column
    deliveryId: number;

    @Column
    title: string;

    @Column
    description: string;

    @BelongsTo(() => DeliveryOrder)
    delivery: DeliveryOrder;
}
