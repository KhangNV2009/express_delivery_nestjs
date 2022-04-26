import { BelongsTo, Column, ForeignKey, PrimaryKey, Model, Table, HasMany, AutoIncrement, HasOne } from "sequelize-typescript";
import { DeliveryHistory } from "src/delivery-histories/entities/delivery-history.entity";
import { DeliveryReports } from "src/delivery-reports/entities/delivery-report.entity";
import { Location } from "src/locations/entities/location.entity";
import { Package } from "src/packages/entities/package.entity";
import { Session } from "src/sessions/entities/session.entity";
import { User } from "src/users/entities/user.entity";
import { Warehouse } from "src/warehouses/entities/warehouse.entity";

@Table
export class DeliveryOrder extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column
    customerId: number;

    @ForeignKey(() => Warehouse)
    @Column
    warehouseId: number;

    @ForeignKey(() => Location)
    @Column
    locationId: number;

    @Column
    state: number;

    @BelongsTo(() => Location)
    location: Location;

    @BelongsTo(() => Warehouse)
    warehouse: Warehouse;

    @HasMany(() => DeliveryHistory)
    deliveryHistories: DeliveryHistory[];

    @HasMany(() => DeliveryReports)
    deliveryReports: DeliveryReports[];

    @HasMany(() => Session)
    session: Session[];
}
