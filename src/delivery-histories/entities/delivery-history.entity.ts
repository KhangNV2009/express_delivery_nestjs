import { AutoIncrement, BelongsTo, Column, ForeignKey, PrimaryKey, Table, Model, HasOne } from "sequelize-typescript";
import { DeliveryOrder } from "src/delivery-orders/entities/delivery-order.entity";

@Table
export class DeliveryHistory extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    title: string;

    @Column
    description: string;

    @HasOne(() => DeliveryOrder)
    deliveryOrder: DeliveryOrder;
}
