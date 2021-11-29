import { BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Table, Model, AutoIncrement } from "sequelize-typescript";
import { Session } from "src/sessions/entities/session.entity";
import { User } from "src/users/entities/user.entity";

@Table
export class Chat extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;
    
    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Session)
    @Column
    sessionId: number;

    @Column
    text: string;

    @Column(DataType.ARRAY(DataType.STRING))
    images: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Session)
    session: Session;
}
