import { AutoIncrement, BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DeliveryOrder } from "src/delivery-orders/entities/delivery-order.entity";
import { Location } from "src/locations/entities/location.entity";
import { Package } from "src/packages/entities/package.entity";
import { User } from "src/users/entities/user.entity";

@Table
export class Warehouse extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    name: string;

    @ForeignKey(() => User)
    @Column
    customerId: number;

    @ForeignKey(() => Location)
    @Column
    locationId: number;

    @BelongsTo(() => User)
    customer: User;

    @BelongsTo(() => Location)
    location: Location;

    @HasMany(() => Package)
    packages: Package[];

    @HasMany(() => DeliveryOrder)
    deliveryOrders: DeliveryOrder[];

    @BelongsToMany(() => User, () => DeliveryOrder)
    drivers: User[];
}
