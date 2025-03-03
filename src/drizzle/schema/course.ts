import { relations } from 'drizzle-orm';
import { pgTable, text /*, timestamp, uuid */ } from 'drizzle-orm/pg-core';

import { id, createdAt, updatedAt } from '@/drizzle/schemaHelpers';
import { CourseProductTable } from './courseProduct';
import { UserCourseAccessTable } from './userCourseAccess';

export const CourseTable = pgTable('courses', {
    /* id: uuid().primaryKey().defaultRandom(), */
    id,
    name: text().notNull(),
    description: text().notNull(),
    /* createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),*/
    createdAt,
    updatedAt,
});

export const CourseRelationships = relations(CourseTable, ({ many }) => ({
    courseProduct: many(CourseProductTable),
    userCourseAccess: many(UserCourseAccessTable),
}));
