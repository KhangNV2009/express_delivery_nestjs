import { AutoIncrement, Column, PrimaryKey, Table, Model, ForeignKey, BelongsTo, HasOne, HasMany, BelongsToMany, IsEmail } from "sequelize-typescript";
import { Chat } from "src/chats/entities/chat.entity";
import { DeliveryOrder } from "src/delivery-orders/entities/delivery-order.entity";
import { Location } from "src/locations/entities/location.entity";
import { Role } from "src/roles/entities/role.entity";
import { Session } from "src/sessions/entities/session.entity";
import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { Warehouse } from "src/warehouses/entities/warehouse.entity";

@Table
export class User extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    email: string;

    @Column
    password: string;

    @Column
    fullName: string;

    @Column
    phoneNumber: string;

    @Column
    avatar: string;

    @ForeignKey(() => Role)
    @Column
    roleId: number;

    @BelongsTo(() => Role)
    role: Role;

    @ForeignKey(() => Location)
    @Column
    locationId: number;

    @BelongsTo(() => Location)
    location: Location;

    @HasOne(() => Vehicle)
    vehicle: Vehicle;

    @HasMany(() => Session)
    sessions: Session[];

    @HasMany(() => Chat)
    chatOwners: Chat[];

    @HasMany(() => Warehouse)
    warehouseCustomer: Warehouse[];

    @HasMany(() => DeliveryOrder)
    deliveryOrders: DeliveryOrder[];

    @BelongsToMany(() => Warehouse, () => DeliveryOrder)
    warehouseDelivery: Warehouse[];
}
