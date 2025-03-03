import { pgTable, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { id, createdAt, updatedAt } from '../schemaHelpers';

export const userRole = ['user', 'admin'] as const; //as const неизменный массив
export type UserRole = (typeof userRole)[number];
export const userRoleEnum = pgEnum('product_status', userRole);

export const UserTable = pgTable('users', {
    id,
    clerkUserId: text().notNull().unique(),
    email: text().notNull(),
    name: text().notNull(),
    role: userRoleEnum().notNull().default('user'),
    imageUrl: text(),
    deletedAt: timestamp({ withTimezone: true }),
    createdAt,
    updatedAt,
});
