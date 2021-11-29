import { AutoIncrement, Column, PrimaryKey, Model, ForeignKey, BelongsTo, Table, HasOne, HasMany, BelongsToMany } from "sequelize-typescript";
import { DeliveryOrder } from "src/delivery-orders/entities/delivery-order.entity";
import { User } from "src/users/entities/user.entity";
import { Warehouse } from "src/warehouses/entities/warehouse.entity";

@Table
export class Package extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    name: string;

    @Column
    weight: number;

    @Column
    category: string;   

    @ForeignKey(() => Warehouse)
    @Column
    warehouseId: number;

    @BelongsTo(() => Warehouse)
    warehouse: Warehouse;

    @HasMany(() => DeliveryOrder)
    deliveryOrders: DeliveryOrder[];

    @BelongsToMany(() => User, () => DeliveryOrder)
    drivers: User[];
}
