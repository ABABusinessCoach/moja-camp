/*
 * CLIENT ENROLLMENT FORM — Existing Moja Clients
 * Design: Aqua accent (#6dccc2), warm and familiar tone
 * Short logistics-focused form — no clinical data re-collection
 * Quicksand Bold headers, Aqua focus rings, Aqua submit button
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

const LOGO_URL = "/manus-storage/MOJATransparentBG_dfe53c13.png";
const SUCCESS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029578766/9JgjAwZpq3q6CgrVrmg5fu/camp_success_banner-cu83sZ24nunHtf9PCp4HHt.webp";

type FormData = {
  childFirstName: string;
  childLastName: string;
  dateOfBirth: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  plannedAbsences: string;
  tshirtSize: string;
  dietaryRestrictions: string;
  accommodationNotes: string;
  photoConsent: boolean;
  activityConsent: boolean;
  liabilityAcknowledged: boolean;
};

const initialForm: FormData = {
  childFirstName: "",
  childLastName: "",
  dateOfBirth: "",
  parentName: "",
  parentEmail: "",
  parentPhone: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  emergencyContactRelation: "",
  plannedAbsences: "",
  tshirtSize: "",
  dietaryRestrictions: "",
  accommodationNotes: "",
  photoConsent: false,
  activityConsent: false,
  liabilityAcknowledged: false,
};

export default function ClientEnrollment() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = (field: keyof FormData, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.childFirstName.trim()) e.childFirstName = "Required";
    if (!form.childLastName.trim()) e.childLastName = "Required";
    if (!form.dateOfBirth) e.dateOfBirth = "Required";
    if (!form.parentName.trim()) e.parentName = "Required";
    if (!form.parentEmail.trim()) e.parentEmail = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.parentEmail)) e.parentEmail = "Enter a valid email";
    if (!form.parentPhone.trim()) e.parentPhone = "Required";
    if (!form.emergencyContactName.trim()) e.emergencyContactName = "Required";
    if (!form.emergencyContactPhone.trim()) e.emergencyContactPhone = "Required";
    if (!form.emergencyContactRelation.trim()) e.emergencyContactRelation = "Required";
    if (!form.plannedAbsences.trim()) e.plannedAbsences = "Required — please list any planned absences, or write \"None planned\"";

    if (!form.tshirtSize) e.tshirtSize = "Please select a size";
    if (!form.activityConsent) e.activityConsent = "Required to participate";
    if (!form.liabilityAcknowledged) e.liabilityAcknowledged = "Required to enroll";
    return e;
  };

  const submitMutation = trpc.enrollment.submitClientEnrollment.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: () => {
      alert("Something went wrong submitting your enrollment. Please try again or contact us directly.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErr = document.querySelector("[data-error]");
      firstErr?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    submitMutation.mutate({
      childFirstName: form.childFirstName,
      childLastName: form.childLastName,
      childAge: form.dateOfBirth,
      childGender: undefined,
      parentName: form.parentName,
      parentEmail: form.parentEmail,
      parentPhone: form.parentPhone,
      tshirtSize: form.tshirtSize,
      plannedAbsences: form.plannedAbsences,
      emergencyName: form.emergencyContactName,
      emergencyPhone: form.emergencyContactPhone,
      emergencyRelationship: form.emergencyContactRelation,
      accommodations: form.accommodationNotes,
      additionalNotes: form.dietaryRestrictions,
      consentMedia: form.photoConsent ? "yes" : "no",
      consentLiability: form.liabilityAcknowledged ? "yes" : "no",
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f0faf9] flex flex-col items-center justify-center px-4 py-16">
        <div
          className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl text-center"
          style={{ border: "2px solid #6dccc2", animation: "fadeInUp 0.4s cubic-bezier(0.23,1,0.32,1) both" }}
        >
          <img src={SUCCESS_IMG} alt="" className="w-full h-44 object-cover" />
          <div className="p-10">
            {/* Animated check */}
            <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "rgba(109,204,194,0.15)" }}>
              <CheckCircle2 className="w-10 h-10" style={{ color: "#6dccc2" }} />
            </div>
            <h2 className="text-[#355574] text-3xl font-bold mb-2">You're enrolled!</h2>
            <p className="text-[#6dccc2] font-semibold text-sm mb-5" style={{ fontFamily: "'Mango AC', 'Comic Sans MS', cursive" }}>See you this summer!</p>
            <p className="text-[#355574]/70 text-base leading-relaxed mb-4">
              We're so excited to have <strong>{form.childFirstName}</strong> join us at Moja Kids Summer Camp!
            </p>
            {/* What happens next */}
            <div className="rounded-2xl px-5 py-4 mb-6 text-left" style={{ background: "rgba(109,204,194,0.08)", border: "1px solid rgba(109,204,194,0.3)" }}>
              <p className="text-[#355574] font-bold text-sm mb-2">What happens next</p>
              <ul className="space-y-1.5">
                {[
                  `A confirmation will be sent to ${form.parentEmail}`,
                  "Your care team will confirm your child's placement",
                  "You'll receive a camp prep packet before July 13",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#355574]/70 text-sm">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#6dccc2" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <button className="btn-aqua mx-auto" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4" /> Back to Camp Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#355574] px-6 py-5">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <img src={LOGO_URL} alt="Moja" className="h-8 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
        </div>
      </div>

      {/* Form header */}
      <div className="bg-[#6dccc2]/10 border-b border-[#6dccc2]/30 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <span
            className="text-[#6dccc2] text-lg mb-1 block"
            style={{ fontFamily: "'Mango AC', 'Comic Sans MS', cursive" }}
          >
            Welcome back to the Moja family!
          </span>
          <h1 className="text-[#355574] text-3xl sm:text-4xl font-bold mb-2">
            Existing Client Enrollment
          </h1>
          <p className="text-[#355574]/70 text-base max-w-xl">
            Since your child is already a Moja client, we just need a few camp-specific details to reserve their spot. This should only take a few minutes.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-6 py-10 space-y-10">

        {/* Section: Child Info */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Child Information</h2>
          <div className="h-0.5 bg-[#6dccc2] w-16 mb-5 rounded-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="First Name" error={errors.childFirstName}>
              <input
                className="moja-input"
                placeholder="Child's first name"
                value={form.childFirstName}
                onChange={(e) => set("childFirstName", e.target.value)}
                data-error={errors.childFirstName ? true : undefined}
              />
            </Field>
            <Field label="Last Name" error={errors.childLastName}>
              <input
                className="moja-input"
                placeholder="Child's last name"
                value={form.childLastName}
                onChange={(e) => set("childLastName", e.target.value)}
              />
            </Field>
            <Field label="Date of Birth" error={errors.dateOfBirth}>
              <input
                type="date"
                className="moja-input"
                value={form.dateOfBirth}
                onChange={(e) => set("dateOfBirth", e.target.value)}
              />
            </Field>
            <Field label="T-Shirt Size" error={errors.tshirtSize}>
              <select
                className="moja-input"
                value={form.tshirtSize}
                onChange={(e) => set("tshirtSize", e.target.value)}
              >
                <option value="">Select size</option>
                <option value="YXS">Youth XS</option>
                <option value="YS">Youth S</option>
                <option value="YM">Youth M</option>
                <option value="YL">Youth L</option>
                <option value="YXL">Youth XL</option>
                <option value="AS">Adult S</option>
                <option value="AM">Adult M</option>
                <option value="AL">Adult L</option>
                <option value="AXL">Adult XL</option>
              </select>
            </Field>
          </div>
          {/* Age eligibility notice */}
          <div className="mt-5 flex items-start gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(109,204,194,0.10)", border: "1px solid rgba(109,204,194,0.4)" }}>
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#6dccc2" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-[#355574] text-sm font-semibold">
              Moja Kids Summer Camp serves children ages <strong>2–11 years old</strong>.
            </p>
          </div>
        </section>

        {/* Section: Camp Session */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Attendance & Planned Absences</h2>
          <div className="h-0.5 bg-[#6dccc2] w-16 mb-5 rounded-full" />
          {/* Staffing notice */}
          <div className="mb-5 flex items-start gap-3 rounded-xl px-4 py-4" style={{ background: "rgba(53,85,116,0.06)", border: "1px solid rgba(53,85,116,0.15)" }}>
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#6dccc2" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <div>
              <p className="text-[#355574] text-sm font-bold mb-1">A note about staffing</p>
              <p className="text-[#355574]/70 text-sm leading-relaxed">
                We staff Moja Kids Summer Camp very carefully to ensure every child has an exceptional, supported experience. To do this well, we need to know about any planned travel or absences in advance. <strong>Letting us know ahead of time is required</strong> so we can plan staffing appropriately for each week.
              </p>
            </div>
          </div>
          <Field label="Are there any dates your child will be unable to attend camp? (travel, appointments, vacations, etc.)" error={errors.plannedAbsences}>
            <textarea
              className="moja-input min-h-[100px] resize-y"
              placeholder="Please list any specific dates or weeks your child will be absent. If no absences are planned, write 'None planned' - we appreciate you letting us know either way!"
              value={form.plannedAbsences}
              onChange={(e) => set("plannedAbsences", e.target.value)}
            />
          </Field>
        </section>

        {/* Section: Parent/Guardian */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Parent / Guardian</h2>
          <div className="h-0.5 bg-[#6dccc2] w-16 mb-5 rounded-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full Name" error={errors.parentName} className="sm:col-span-2">
              <input
                className="moja-input"
                placeholder="Parent or guardian's full name"
                value={form.parentName}
                onChange={(e) => set("parentName", e.target.value)}
              />
            </Field>
            <Field label="Email Address" error={errors.parentEmail}>
              <input
                type="email"
                className="moja-input"
                placeholder="email@example.com"
                value={form.parentEmail}
                onChange={(e) => set("parentEmail", e.target.value)}
              />
            </Field>
            <Field label="Phone Number" error={errors.parentPhone}>
              <input
                type="tel"
                className="moja-input"
                placeholder="(555) 000-0000"
                value={form.parentPhone}
                onChange={(e) => set("parentPhone", e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* Section: Emergency Contact */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Emergency Contact</h2>
          <div className="h-0.5 bg-[#6dccc2] w-16 mb-5 rounded-full" />
          <p className="text-[#355574]/60 text-sm mb-5">Please provide a contact other than the parent/guardian listed above.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full Name" error={errors.emergencyContactName}>
              <input
                className="moja-input"
                placeholder="Emergency contact name"
                value={form.emergencyContactName}
                onChange={(e) => set("emergencyContactName", e.target.value)}
              />
            </Field>
            <Field label="Relationship to Child" error={errors.emergencyContactRelation}>
              <input
                className="moja-input"
                placeholder="e.g., Grandparent, Aunt"
                value={form.emergencyContactRelation}
                onChange={(e) => set("emergencyContactRelation", e.target.value)}
              />
            </Field>
            <Field label="Phone Number" error={errors.emergencyContactPhone} className="sm:col-span-2">
              <input
                type="tel"
                className="moja-input"
                placeholder="(555) 000-0000"
                value={form.emergencyContactPhone}
                onChange={(e) => set("emergencyContactPhone", e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* Section: Special Notes */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Camp Accommodations</h2>
          <div className="h-0.5 bg-[#6dccc2] w-16 mb-5 rounded-full" />
          <div className="space-y-5">
            <Field label="Dietary Restrictions or Allergies (optional)">
              <input
                className="moja-input"
                placeholder="e.g., nut allergy, gluten-free, vegetarian"
                value={form.dietaryRestrictions}
                onChange={(e) => set("dietaryRestrictions", e.target.value)}
              />
            </Field>
            <Field label="Additional Accommodation Notes (optional)">
              <textarea
                className="moja-input min-h-[100px] resize-y"
                placeholder="Any specific sensory needs, communication preferences, or other notes for our camp staff..."
                value={form.accommodationNotes}
                onChange={(e) => set("accommodationNotes", e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* Section: Consents */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Consents & Agreements</h2>
          <div className="h-0.5 bg-[#6dccc2] w-16 mb-5 rounded-full" />
          <div className="space-y-4">
            <CheckboxField
              checked={form.photoConsent}
              onChange={(v) => set("photoConsent", v)}
              label="I give permission for my child to be photographed or filmed during camp activities for Moja's internal use and social media (optional)."
            />
            <CheckboxField
              checked={form.activityConsent}
              onChange={(v) => set("activityConsent", v)}
              label="I give permission for my child to participate in all scheduled camp activities, including outdoor play, arts and crafts, and group games."
              error={errors.activityConsent}
              required
            />
            <CheckboxField
              checked={form.liabilityAcknowledged}
              onChange={(v) => set("liabilityAcknowledged", v)}
              label="I acknowledge that Moja Behavioral Services will exercise reasonable care for my child's safety and I agree to the camp's participation terms and liability waiver."
              error={errors.liabilityAcknowledged}
              required
            />
          </div>
        </section>

        {/* Clarifying footer note */}
        <div className="rounded-2xl px-6 py-5" style={{ background: "rgba(109,204,194,0.07)", border: "1px solid rgba(109,204,194,0.25)" }}>
          <h3 className="text-[#355574] font-bold text-base mb-2">About This Enrollment Path</h3>
          <p className="text-[#355574]/70 text-sm leading-relaxed">
            This form is for <strong>families currently enrolled in Moja Kids ABA services</strong>. Because we already have your child's clinical information on file, this form focuses on logistics — session preferences, absences, and consents. Your care team will confirm your child's camp placement and follow up with any additional details. If you are not currently a Moja client, please return to the hub and select the appropriate enrollment path.
          </p>
        </div>

        {/* Submit */}
        <div className="pt-4 pb-8">
          <button type="submit" disabled={submitMutation.isPending} className="btn-aqua w-full sm:w-auto justify-center text-lg py-4 px-10 disabled:opacity-60 disabled:cursor-not-allowed">
            {submitMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting…
              </span>
            ) : "Submit Enrollment"}
          </button>
          <p className="text-[#355574]/50 text-xs mt-3">
            You'll receive a confirmation email once your enrollment is processed.
          </p>
        </div>
      </form>
    </div>
  );
}

// ── Helper components ──

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className} data-error={error ? true : undefined}>
      <label className="block text-[#355574] text-sm font-bold mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1 font-semibold">{error}</p>}
    </div>
  );
}

function CheckboxField({
  checked,
  onChange,
  label,
  error,
  required,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative mt-0.5 flex-shrink-0">
          <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <div
            className="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
            style={{
              borderColor: checked ? "#6dccc2" : "#c0cfe0",
              background: checked ? "#6dccc2" : "white",
            }}
          >
            {checked && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
        <span className="text-[#355574]/80 text-sm leading-relaxed">
          {required && <span className="text-red-400 mr-1">*</span>}
          {label}
        </span>
      </label>
      {error && <p className="text-red-500 text-xs mt-1 ml-8 font-semibold">{error}</p>}
    </div>
  );
}
