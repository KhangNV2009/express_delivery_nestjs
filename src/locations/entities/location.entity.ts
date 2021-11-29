import { AutoIncrement, Column, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DeliveryOrder } from "src/delivery-orders/entities/delivery-order.entity";
import { User } from "src/users/entities/user.entity";
import { Warehouse } from "src/warehouses/entities/warehouse.entity";

@Table
export class Location extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    lat: number;

    @Column
    lng: number;

    @Column
    street: string;

    @Column
    ward: string;

    @Column
    district: string;

    @Column
    city: string;

    @HasOne(() => User)
    user: User;

    @HasOne(() => Warehouse)
    warehouse: Warehouse;

    @HasOne(() => DeliveryOrder)
    location: DeliveryOrder;
}
