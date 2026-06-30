import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { clientEnrollments, communityEnrollments, newClientEnrollments } from "../../drizzle/schema";
import { notifyOwner } from "../_core/notification";
import {
  sendEnrollmentEmail,
  buildClientEnrollmentEmail,
  buildCommunityEnrollmentEmail,
  buildNewClientEnrollmentEmail,
} from "../email";

// ── Client Enrollment ──────────────────────────────────────────────────────────
const clientEnrollmentSchema = z.object({
  childFirstName: z.string().min(1),
  childLastName: z.string().min(1),
  childAge: z.string().min(1),
  childGender: z.string().optional(),
  parentName: z.string().min(1),
  parentEmail: z.string().email(),
  parentPhone: z.string().min(1),
  tshirtSize: z.string().optional(),
  plannedAbsences: z.string().min(1),
  emergencyName: z.string().min(1),
  emergencyPhone: z.string().min(1),
  emergencyRelationship: z.string().optional(),
  accommodations: z.string().optional(),
  additionalNotes: z.string().optional(),
  consentMedia: z.string().optional(),
  consentLiability: z.string().optional(),
});

// ── Community Enrollment ───────────────────────────────────────────────────────
const communityEnrollmentSchema = z.object({
  childFirstName: z.string().min(1),
  childLastName: z.string().min(1),
  childAge: z.string().min(1),
  childGender: z.string().optional(),
  childDob: z.string().optional(),
  diagnosis: z.string().optional(),
  autismDiagnosis: z.string().optional(),
  parentName: z.string().min(1),
  parentEmail: z.string().email(),
  parentPhone: z.string().min(1),
  address: z.string().optional(),
  sessionPreference: z.string().optional(),
  tshirtSize: z.string().optional(),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  medicalConditions: z.string().optional(),
  physicianName: z.string().optional(),
  physicianPhone: z.string().optional(),
  communicationStyle: z.string().optional(),
  sensoryNeeds: z.string().optional(),
  behavioralSupports: z.string().optional(),
  emergencyName: z.string().min(1),
  emergencyPhone: z.string().min(1),
  emergencyRelationship: z.string().optional(),
  paymentMethod: z.string().optional(),
  consentMedia: z.string().optional(),
  consentLiability: z.string().optional(),
  additionalNotes: z.string().optional(),
});

// ── New Client Enrollment ──────────────────────────────────────────────────────
const newClientEnrollmentSchema = z.object({
  childFirstName: z.string().min(1),
  childLastName: z.string().min(1),
  childAge: z.string().min(1),
  childGender: z.string().optional(),
  childDob: z.string().optional(),
  autismDiagnosis: z.string().optional(),
  parentName: z.string().min(1),
  parentEmail: z.string().email(),
  parentPhone: z.string().min(1),
  servicesInterest: z.array(z.string()).optional(),
  sessionInterest: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insuranceMemberId: z.string().optional(),
  primaryConcerns: z.string().optional(),
  additionalNotes: z.string().optional(),
  consentIntake: z.string().optional(),
});

// ── Router ─────────────────────────────────────────────────────────────────────
export const enrollmentRouter = router({
  submitClientEnrollment: publicProcedure
    .input(clientEnrollmentSchema)
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      await db.insert(clientEnrollments).values({
        ...input,
        childGender: input.childGender ?? null,
        tshirtSize: input.tshirtSize ?? null,
        emergencyRelationship: input.emergencyRelationship ?? null,
        accommodations: input.accommodations ?? null,
        additionalNotes: input.additionalNotes ?? null,
        consentMedia: input.consentMedia ?? null,
        consentLiability: input.consentLiability ?? null,
      });

      // Manus owner notification
      await notifyOwner({
        title: `New Client Enrollment: ${input.childFirstName} ${input.childLastName}`,
        content: `**Parent:** ${input.parentName}\n**Email:** ${input.parentEmail}\n**Phone:** ${input.parentPhone}\n**Child Age:** ${input.childAge}\n**T-Shirt:** ${input.tshirtSize ?? "Not specified"}\n**Planned Absences:** ${input.plannedAbsences}`,
      });

      // Email to hello@mojakids.com
      await sendEnrollmentEmail(buildClientEnrollmentEmail(input));

      return { success: true };
    }),

  submitCommunityEnrollment: publicProcedure
    .input(communityEnrollmentSchema)
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      await db.insert(communityEnrollments).values({
        ...input,
        childGender: input.childGender ?? null,
        childDob: input.childDob ?? null,
        diagnosis: input.diagnosis ?? null,
        autismDiagnosis: input.autismDiagnosis ?? null,
        address: input.address ?? null,
        sessionPreference: input.sessionPreference ?? null,
        tshirtSize: input.tshirtSize ?? null,
        allergies: input.allergies ?? null,
        medications: input.medications ?? null,
        medicalConditions: input.medicalConditions ?? null,
        physicianName: input.physicianName ?? null,
        physicianPhone: input.physicianPhone ?? null,
        communicationStyle: input.communicationStyle ?? null,
        sensoryNeeds: input.sensoryNeeds ?? null,
        behavioralSupports: input.behavioralSupports ?? null,
        emergencyRelationship: input.emergencyRelationship ?? null,
        paymentMethod: input.paymentMethod ?? null,
        consentMedia: input.consentMedia ?? null,
        consentLiability: input.consentLiability ?? null,
        additionalNotes: input.additionalNotes ?? null,
      });

      // Manus owner notification
      await notifyOwner({
        title: `New Community Enrollment: ${input.childFirstName} ${input.childLastName}`,
        content: `**Parent:** ${input.parentName}\n**Email:** ${input.parentEmail}\n**Phone:** ${input.parentPhone}\n**Child Age:** ${input.childAge}\n**Autism Diagnosis:** ${input.autismDiagnosis ?? "Not specified"}\n**Session:** ${input.sessionPreference ?? "Not specified"}\n**Payment:** ${input.paymentMethod ?? "Not specified"}`,
      });

      // Email to hello@mojakids.com
      await sendEnrollmentEmail(buildCommunityEnrollmentEmail(input));

      return { success: true };
    }),

  submitNewClientEnrollment: publicProcedure
    .input(newClientEnrollmentSchema)
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      await db.insert(newClientEnrollments).values({
        ...input,
        childGender: input.childGender ?? null,
        childDob: input.childDob ?? null,
        autismDiagnosis: input.autismDiagnosis ?? null,
        servicesInterest: input.servicesInterest ?? null,
        sessionInterest: input.sessionInterest ?? null,
        insuranceProvider: input.insuranceProvider ?? null,
        insuranceMemberId: input.insuranceMemberId ?? null,
        primaryConcerns: input.primaryConcerns ?? null,
        additionalNotes: input.additionalNotes ?? null,
        consentIntake: input.consentIntake ?? null,
      });

      // Manus owner notification
      await notifyOwner({
        title: `New Client + Camp Inquiry: ${input.childFirstName} ${input.childLastName}`,
        content: `**Parent:** ${input.parentName}\n**Email:** ${input.parentEmail}\n**Phone:** ${input.parentPhone}\n**Child Age:** ${input.childAge}\n**Autism Diagnosis:** ${input.autismDiagnosis ?? "Not specified"}\n**Services Interested In:** ${(input.servicesInterest ?? []).join(", ") || "None selected"}\n**Session Interest:** ${input.sessionInterest ?? "Not specified"}`,
      });

      // Email to hello@mojakids.com
      await sendEnrollmentEmail(buildNewClientEnrollmentEmail(input));

      return { success: true };
    }),
});
