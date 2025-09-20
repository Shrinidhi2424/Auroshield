import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  photoURL: text("photo_url"),
  isVolunteer: boolean("is_volunteer").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reports = pgTable("reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  description: text("description").notNull(),
  location: text("location").notNull(), // JSON string with lat/lng and address
  priority: text("priority").notNull(), // 'low', 'medium', 'high'
  isAnonymous: boolean("is_anonymous").default(false),
  hasVoiceNote: boolean("has_voice_note").default(false),
  hasPhoto: boolean("has_photo").default(false),
  status: text("status").default("pending"), // 'pending', 'in-progress', 'resolved'
  assignedVolunteerId: varchar("assigned_volunteer_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const emergencyContacts = pgTable("emergency_contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  relationship: text("relationship").notNull(),
});

export const panicAlerts = pgTable("panic_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  location: text("location").notNull(), // JSON string with lat/lng and address
  status: text("status").default("active"), // 'active', 'resolved', 'false_alarm'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertReportSchema = createInsertSchema(reports).omit({
  id: true,
  createdAt: true,
  status: true,
  assignedVolunteerId: true,
});

export const insertEmergencyContactSchema = createInsertSchema(emergencyContacts).omit({
  id: true,
});

export const insertPanicAlertSchema = createInsertSchema(panicAlerts).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Report = typeof reports.$inferSelect;
export type InsertReport = z.infer<typeof insertReportSchema>;
export type EmergencyContact = typeof emergencyContacts.$inferSelect;
export type InsertEmergencyContact = z.infer<typeof insertEmergencyContactSchema>;
export type PanicAlert = typeof panicAlerts.$inferSelect;
export type InsertPanicAlert = z.infer<typeof insertPanicAlertSchema>;
