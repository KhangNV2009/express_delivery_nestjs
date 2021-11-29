import { Session } from "./entities/session.entity";

export const sessionsProviders = [
    {
        provide: 'SESSIONS_REPOSITORY',
        useValue: Session,
    }
]