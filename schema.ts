import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Enrollment submissions for existing Moja clients.
 */
export const clientEnrollments = mysqlTable("client_enrollments", {
  id: int("id").autoincrement().primaryKey(),
  // Child info
  childFirstName: varchar("childFirstName", { length: 128 }).notNull(),
  childLastName: varchar("childLastName", { length: 128 }).notNull(),
  childAge: varchar("childAge", { length: 16 }).notNull(),
  childGender: varchar("childGender", { length: 64 }),
  // Parent/guardian
  parentName: varchar("parentName", { length: 256 }).notNull(),
  parentEmail: varchar("parentEmail", { length: 320 }).notNull(),
  parentPhone: varchar("parentPhone", { length: 32 }).notNull(),
  // Camp details
  tshirtSize: varchar("tshirtSize", { length: 16 }),
  plannedAbsences: text("plannedAbsences").notNull(),
  // Emergency contact
  emergencyName: varchar("emergencyName", { length: 256 }).notNull(),
  emergencyPhone: varchar("emergencyPhone", { length: 32 }).notNull(),
  emergencyRelationship: varchar("emergencyRelationship", { length: 128 }),
  // Accommodations & notes
  accommodations: text("accommodations"),
  additionalNotes: text("additionalNotes"),
  // Consents
  consentMedia: varchar("consentMedia", { length: 8 }),
  consentLiability: varchar("consentLiability", { length: 8 }),
  // Metadata
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
});

export type ClientEnrollment = typeof clientEnrollments.$inferSelect;
export type InsertClientEnrollment = typeof clientEnrollments.$inferInsert;

/**
 * Enrollment submissions for self-pay community campers.
 */
export const communityEnrollments = mysqlTable("community_enrollments", {
  id: int("id").autoincrement().primaryKey(),
  // Child info
  childFirstName: varchar("childFirstName", { length: 128 }).notNull(),
  childLastName: varchar("childLastName", { length: 128 }).notNull(),
  childAge: varchar("childAge", { length: 16 }).notNull(),
  childGender: varchar("childGender", { length: 64 }),
  childDob: varchar("childDob", { length: 32 }),
  diagnosis: text("diagnosis"),
  autismDiagnosis: varchar("autismDiagnosis", { length: 128 }),
  // Parent/guardian
  parentName: varchar("parentName", { length: 256 }).notNull(),
  parentEmail: varchar("parentEmail", { length: 320 }).notNull(),
  parentPhone: varchar("parentPhone", { length: 32 }).notNull(),
  address: text("address"),
  // Camp details
  sessionPreference: varchar("sessionPreference", { length: 128 }),
  tshirtSize: varchar("tshirtSize", { length: 16 }),
  // Medical info
  allergies: text("allergies"),
  medications: text("medications"),
  medicalConditions: text("medicalConditions"),
  physicianName: varchar("physicianName", { length: 256 }),
  physicianPhone: varchar("physicianPhone", { length: 32 }),
  // Behavioral profile
  communicationStyle: varchar("communicationStyle", { length: 128 }),
  sensoryNeeds: text("sensoryNeeds"),
  behavioralSupports: text("behavioralSupports"),
  // Emergency contact
  emergencyName: varchar("emergencyName", { length: 256 }).notNull(),
  emergencyPhone: varchar("emergencyPhone", { length: 32 }).notNull(),
  emergencyRelationship: varchar("emergencyRelationship", { length: 128 }),
  // Payment
  paymentMethod: varchar("paymentMethod", { length: 64 }),
  // Consents
  consentMedia: varchar("consentMedia", { length: 8 }),
  consentLiability: varchar("consentLiability", { length: 8 }),
  // Notes
  additionalNotes: text("additionalNotes"),
  // Metadata
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
});

export type CommunityEnrollment = typeof communityEnrollments.$inferSelect;
export type InsertCommunityEnrollment = typeof communityEnrollments.$inferInsert;

/**
 * Enrollment submissions for new/potential clients needing ABA + camp.
 */
export const newClientEnrollments = mysqlTable("new_client_enrollments", {
  id: int("id").autoincrement().primaryKey(),
  // Child info
  childFirstName: varchar("childFirstName", { length: 128 }).notNull(),
  childLastName: varchar("childLastName", { length: 128 }).notNull(),
  childAge: varchar("childAge", { length: 16 }).notNull(),
  childGender: varchar("childGender", { length: 64 }),
  childDob: varchar("childDob", { length: 32 }),
  autismDiagnosis: varchar("autismDiagnosis", { length: 128 }),
  // Parent/guardian
  parentName: varchar("parentName", { length: 256 }).notNull(),
  parentEmail: varchar("parentEmail", { length: 320 }).notNull(),
  parentPhone: varchar("parentPhone", { length: 32 }).notNull(),
  // Services interest (stored as JSON array)
  servicesInterest: json("servicesInterest"),
  sessionInterest: varchar("sessionInterest", { length: 128 }),
  // Insurance
  insuranceProvider: varchar("insuranceProvider", { length: 256 }),
  insuranceMemberId: varchar("insuranceMemberId", { length: 128 }),
  // Primary concerns
  primaryConcerns: text("primaryConcerns"),
  additionalNotes: text("additionalNotes"),
  // Consent
  consentIntake: varchar("consentIntake", { length: 8 }),
  // Metadata
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
});

export type NewClientEnrollment = typeof newClientEnrollments.$inferSelect;
export type InsertNewClientEnrollment = typeof newClientEnrollments.$inferInsert;
