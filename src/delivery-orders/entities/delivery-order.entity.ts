import { BelongsTo, Column, ForeignKey, PrimaryKey, Model, Table, HasOne, HasMany } from "sequelize-typescript";
import { DeliveryHistory } from "src/delivery-histories/entities/delivery-history.entity";
import { Location } from "src/locations/entities/location.entity";
import { Package } from "src/packages/entities/package.entity";
import { User } from "src/users/entities/user.entity";
import { Warehouse } from "src/warehouses/entities/warehouse.entity";

@Table
export class DeliveryOrder extends Model {
    @ForeignKey(() => User)
    @PrimaryKey
    @Column
    authorId: number;

    @ForeignKey(() => Warehouse)
    @PrimaryKey
    @Column
    warehouseId: number;

    @ForeignKey(() => Package)
    @PrimaryKey
    @Column
    packageId: number;

    @Column
    status: string;

    @Column
    price: string;

    @ForeignKey(() => Location)
    @Column
    locationId: number;

    @ForeignKey(() => DeliveryHistory)
    @Column
    deliveryHistoryId: number;

    @BelongsTo(() => DeliveryHistory)
    deliveryOrder: DeliveryHistory;

    @BelongsTo(() => Location)
    location: Location;

    @BelongsTo(() => User)
    driver: User;

    @BelongsTo(() => Warehouse)
    warehouse: Warehouse;

    @BelongsTo(() => Package)
    package: Package;
}
