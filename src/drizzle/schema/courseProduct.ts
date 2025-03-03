import { relations } from 'drizzle-orm';
import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';

import { CourseTable } from '@/drizzle/schema/course';
import { ProductTable } from '@/drizzle/schema/product';
import { createdAt, updatedAt } from '@/drizzle/schemaHelpers';

export const CourseProductTable = pgTable(
    'course_products',
    {
        courseId: uuid()
            .notNull()
            .references(() => CourseTable.id, { onDelete: 'cascade' }),
        productId: uuid()
            .notNull()
            .references(() => ProductTable.id, { onDelete: 'cascade' }),
        createdAt,
        updatedAt,
    },
    (t) => [primaryKey({ columns: [t.courseId, t.productId] })]
);

export const CourseProductRelationships = relations(
    CourseProductTable,
    ({ one }) => ({
        course: one(CourseTable, {
            fields: [CourseProductTable.courseId],
            references: [CourseTable.id],
        }),
        product: one(ProductTable, {
            fields: [CourseProductTable.productId],
            references: [ProductTable.id],
        }),
    })
);
