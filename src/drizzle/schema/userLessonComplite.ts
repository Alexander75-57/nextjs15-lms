import { relations } from 'drizzle-orm';
import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';

import { UserTable } from '@/drizzle/schema/user';
import { createdAt, updatedAt } from '@/drizzle/schemaHelpers';
import { LessonTable } from './lesson';

export const UserLessonCompliteTable = pgTable(
    'user_lesson_complite',
    {
        userId: uuid()
            .notNull()
            .references(() => UserTable.id, { onDelete: 'cascade' }),
        lessonId: uuid()
            .notNull()
            .references(() => LessonTable.id, { onDelete: 'cascade' }),
        createdAt,
        updatedAt,
    },
    (t) => [primaryKey({ columns: [t.userId, t.lessonId] })]
);

export const UserLessonCompliteTableRelationships = relations(
    UserLessonCompliteTable,
    ({ one }) => ({
        user: one(UserTable, {
            fields: [UserLessonCompliteTable.userId],
            references: [UserTable.id],
        }),
        lesson: one(LessonTable, {
            fields: [UserLessonCompliteTable.lessonId],
            references: [LessonTable.id],
        }),
    })
);
