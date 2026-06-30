# Moja Summer Camp Enrollment Hub — TODO

## Core Forms
- [x] Hub landing page with three pathway cards
- [x] Existing Client Enrollment form (Aqua)
- [x] Community Camper Registration form (Pink)
- [x] New Client + Camp Enrollment form (Orange)

## Content & Dates
- [x] Camp dates set to July 13 – August 21, 2026
- [x] Session weeks updated across all forms (6 sessions)
- [x] Age eligibility notice (2–11 years) on all forms and hub page
- [x] Tuition updated to $600/week on Community form
- [x] Year updated to 2026 throughout

## Form Fields
- [x] Autism diagnosis question added to New Client form
- [x] Child age dropdown added to New Client form
- [x] Child gender field added to New Client form
- [x] Services interest checklist added to New Client form
- [x] Planned absences field made required on Client form
- [x] August session weeks added to Community and New Client forms

## Backend / Submissions
- [x] Upgrade to full-stack (tRPC + database)
- [x] Database schema with 3 enrollment tables
- [x] tRPC enrollment router with 3 procedures
- [x] All three forms wired to backend API
- [x] Owner notifications on each submission
- [x] Loading states on all submit buttons
- [x] Success confirmation screens on all forms
- [x] Vitest tests for all 3 enrollment procedures (7 tests passing)

## Pending / Future
- [ ] Add actual ABA Engine portal URL (currently placeholder) — needs URL from Moja team
- [ ] Add age gate validation (warn if child is outside 2–11 range) — optional future enhancement
- [x] Add autism diagnosis question to Community form
- [x] Add FAQ section to hub landing page

## Hub Page Content Enrichment (from original camp.mojakids.com)
- [x] Add "What is Camp Moja?" section with mission statement
- [x] Add "Days packed with adventures" activities grid (6 activity cards)
- [x] Add "Why Camp Moja?" 4-pillar trust section
- [x] Add camp details bar (dates, hours, location, duration)
- [x] Add parent testimonial quote
- [x] Add "Reserve your child's spot" CTA section with bullet checklist
- [x] Add address and contact email to footer

## FAQ & Form Clarifications
- [x] Add collapsible FAQ section to Home.tsx above the footer
- [x] Add autism diagnosis question to CommunityEnrollment form
- [x] Add clarifying footer text to ClientEnrollment form
- [x] Add clarifying footer text to CommunityEnrollment form
- [x] Add clarifying footer text to NewClientEnrollment form

## Email Notifications
- [x] Install Resend SDK
- [x] Create server/email.ts with HTML email builders for all 3 enrollment types
- [x] Wire sendEnrollmentEmail() into all 3 enrollment procedures
- [x] Add RESEND_API_KEY to ENV — requires secret to be set to activate
