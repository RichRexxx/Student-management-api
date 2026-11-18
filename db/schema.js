import { pgTable, serial, text, date, timestamp } from "drizzle-orm/pg-core";
export const studentTable = pgTable("students", {
    id: serial("id").primaryKey(),
    fullName: text("fullname").notNull(),
    email: text("email").notNull().unique(),
    gender: text("gender").notNull(),
    dateOfBirth: date("date_of_birth").notNull(),
    department: text("department").notNull(),
    level: text("level").notNull(),
    registrationNumber: text("registration_number").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});