import { Table , Model, AutoIncrement, PrimaryKey, Column, ForeignKey, BelongsTo} from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";

@Table
export class Vehicle extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    modelCode: string;

    @Column
    licensePlate: string;

    @Column
    brandName: string;

    @ForeignKey(() => User)
    @Column
    driverId: number;

    @BelongsTo(() => User)
    driver: User;
}
