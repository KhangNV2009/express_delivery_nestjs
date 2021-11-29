import { Sequelize } from "sequelize-typescript";
import { Chat } from "src/chats/entities/chat.entity";
import { DeliveryHistory } from "src/delivery-histories/entities/delivery-history.entity";
import { DeliveryOrder } from "src/delivery-orders/entities/delivery-order.entity";
import { Location } from "src/locations/entities/location.entity";
import { Package } from "src/packages/entities/package.entity";
import { Role } from "src/roles/entities/role.entity";
import { Session } from "src/sessions/entities/session.entity";
import { User } from "src/users/entities/user.entity";
import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { Warehouse } from "src/warehouses/entities/warehouse.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '123456',
                database: 'express-delivery',
            });
            sequelize.addModels([
                Chat,
                User,
                DeliveryHistory,
                DeliveryOrder,
                Location,
                Package,
                Role,
                Session,
                Vehicle,
                Warehouse,
            ]);
            await sequelize.sync();
            return sequelize;
        },
    },
];