import { pgTable, text, integer, pgEnum, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { id, createdAt, updatedAt } from '../schemaHelpers';
import { CourseTable } from '@/drizzle/schema/course';
import { LessonTable } from './lesson';

export const courseSectionStatuses = ['public', 'private'] as const; //as const неизменный массив
export type CourseSectionStatus = (typeof courseSectionStatuses)[number];
export const courseSectionStatusesStatusEnum = pgEnum(
    'course_section_status',
    courseSectionStatuses
);

export const CourseSectionTable = pgTable('course_section', {
    id,
    name: text().notNull(),
    status: courseSectionStatusesStatusEnum().notNull().default('private'),
    order: integer().notNull(),
    courseId: uuid()
        .notNull()
        .references(() => CourseTable.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt,
});

export const CourseSectionRelationships = relations(
    CourseSectionTable,
    ({ one, many }) => ({
        course: one(CourseTable, {
            fields: [CourseSectionTable.courseId],
            references: [CourseTable.id],
        }),
        lessons: many(LessonTable),
    })
);
