/*
 * COMMUNITY ENROLLMENT FORM — Self-Pay Community Campers
 * Design: Pink accent (#df76b6), welcoming and inclusive tone
 * Full registration: demographics, medical, behavioral profile, payment, waivers
 * Quicksand Bold headers, Aqua focus rings, Pink submit button
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

const LOGO_URL = "/manus-storage/MOJATransparentBG_dfe53c13.png";
const SUCCESS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029578766/9JgjAwZpq3q6CgrVrmg5fu/camp_success_banner-cu83sZ24nunHtf9PCp4HHt.webp";

type FormData = {
  // Child
  childFirstName: string;
  childLastName: string;
  dateOfBirth: string;
  gender: string;
  tshirtSize: string;
  // Parent
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  // Emergency
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  // Medical
  primaryDiagnosis: string;
  otherDiagnoses: string;
  currentMedications: string;
  allergies: string;
  physicianName: string;
  physicianPhone: string;
  // Behavioral profile
  communicationStyle: string;
  sensoryNeeds: string;
  behaviorSupports: string;
  previousCampExperience: string;
  // Autism diagnosis
  autismDiagnosis: string;
  // Camp
  sessionPreference: string;
  dietaryRestrictions: string;
  // Payment
  paymentMethod: string;
  // Consents
  photoConsent: boolean;
  activityConsent: boolean;
  medicalConsent: boolean;
  liabilityAcknowledged: boolean;
  financialAgreement: boolean;
};

const initial: FormData = {
  childFirstName: "", childLastName: "", dateOfBirth: "", gender: "", tshirtSize: "",
  parentName: "", parentEmail: "", parentPhone: "", address: "", city: "", state: "", zip: "",
  emergencyContactName: "", emergencyContactPhone: "", emergencyContactRelation: "",
  primaryDiagnosis: "", otherDiagnoses: "", currentMedications: "", allergies: "",
  physicianName: "", physicianPhone: "",
  communicationStyle: "", sensoryNeeds: "", behaviorSupports: "", previousCampExperience: "",
  autismDiagnosis: "",
  sessionPreference: "", dietaryRestrictions: "",
  paymentMethod: "",
  photoConsent: false, activityConsent: false, medicalConsent: false,
  liabilityAcknowledged: false, financialAgreement: false,
};

export default function CommunityEnrollment() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState<FormData>(initial);
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
    if (!form.tshirtSize) e.tshirtSize = "Required";
    if (!form.parentName.trim()) e.parentName = "Required";
    if (!form.parentEmail.trim()) e.parentEmail = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.parentEmail)) e.parentEmail = "Enter a valid email";
    if (!form.parentPhone.trim()) e.parentPhone = "Required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.state.trim()) e.state = "Required";
    if (!form.zip.trim()) e.zip = "Required";
    if (!form.emergencyContactName.trim()) e.emergencyContactName = "Required";
    if (!form.emergencyContactPhone.trim()) e.emergencyContactPhone = "Required";
    if (!form.emergencyContactRelation.trim()) e.emergencyContactRelation = "Required";
    if (!form.primaryDiagnosis.trim()) e.primaryDiagnosis = "Required";
    if (!form.communicationStyle.trim()) e.communicationStyle = "Required";
    // sessionPreference is fixed to full summer — no validation needed
    if (!form.paymentMethod) e.paymentMethod = "Required";
    if (!form.activityConsent) e.activityConsent = "Required to participate";
    if (!form.medicalConsent) e.medicalConsent = "Required";
    if (!form.liabilityAcknowledged) e.liabilityAcknowledged = "Required to enroll";
    if (!form.financialAgreement) e.financialAgreement = "Required";
    return e;
  };

  const submitMutation = trpc.enrollment.submitCommunityEnrollment.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: () => {
      alert("Something went wrong submitting your registration. Please try again or contact us directly.");
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
      childGender: form.gender,
      childDob: form.dateOfBirth,
      diagnosis: [form.primaryDiagnosis, form.otherDiagnoses].filter(Boolean).join("; "),
      autismDiagnosis: form.autismDiagnosis || undefined,
      parentName: form.parentName,
      parentEmail: form.parentEmail,
      parentPhone: form.parentPhone,
      address: [form.address, form.city, form.state, form.zip].filter(Boolean).join(", "),
      sessionPreference: "full",
      tshirtSize: form.tshirtSize,
      allergies: form.allergies,
      medications: form.currentMedications,
      medicalConditions: form.otherDiagnoses,
      physicianName: form.physicianName,
      physicianPhone: form.physicianPhone,
      communicationStyle: form.communicationStyle,
      sensoryNeeds: form.sensoryNeeds,
      behavioralSupports: form.behaviorSupports,
      emergencyName: form.emergencyContactName,
      emergencyPhone: form.emergencyContactPhone,
      emergencyRelationship: form.emergencyContactRelation,
      paymentMethod: form.paymentMethod,
      consentMedia: form.photoConsent ? "yes" : "no",
      consentLiability: form.liabilityAcknowledged ? "yes" : "no",
      additionalNotes: form.dietaryRestrictions,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16" style={{ background: "#fdf4fa" }}>
        <div
          className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl text-center"
          style={{ border: "2px solid #df76b6", animation: "fadeInUp 0.4s cubic-bezier(0.23,1,0.32,1) both" }}
        >
          <img src={SUCCESS_IMG} alt="" className="w-full h-44 object-cover" />
          <div className="p-10">
            <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "rgba(223,118,182,0.12)" }}>
              <CheckCircle2 className="w-10 h-10" style={{ color: "#df76b6" }} />
            </div>
            <h2 className="text-[#355574] text-3xl font-bold mb-2">Registration received!</h2>
            <p className="font-semibold text-sm mb-5" style={{ color: "#df76b6", fontFamily: "'Mango AC', 'Comic Sans MS', cursive" }}>Welcome to the Moja family!</p>
            <p className="text-[#355574]/70 text-base leading-relaxed mb-4">
              Thank you for registering <strong>{form.childFirstName}</strong> for Moja Kids Summer Camp!
            </p>
            <div className="rounded-2xl px-5 py-4 mb-6 text-left" style={{ background: "rgba(223,118,182,0.07)", border: "1px solid rgba(223,118,182,0.25)" }}>
              <p className="text-[#355574] font-bold text-sm mb-2">What happens next</p>
              <ul className="space-y-1.5">
                {[
                  `Our team will review your registration`,
                  `We'll reach out to ${form.parentEmail} within 2–3 business days`,
                  "We'll confirm enrollment and share payment details",
                  "You'll receive a camp prep packet before July 13",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#355574]/70 text-sm">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#df76b6" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <button className="btn-aqua mx-auto" style={{ background: "#df76b6" }} onClick={() => navigate("/")}>
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
          <button onClick={() => navigate("/")} className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <img src={LOGO_URL} alt="Moja" className="h-8 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
        </div>
      </div>

      {/* Form header */}
      <div className="bg-[#df76b6]/10 border-b border-[#df76b6]/30 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <span className="text-[#df76b6] text-lg mb-1 block" style={{ fontFamily: "'Mango AC', 'Comic Sans MS', cursive" }}>
            Moja Kids is a place where every child belongs.
          </span>
          <h1 className="text-[#355574] text-3xl sm:text-4xl font-bold mb-2">Community Camper Registration</h1>
          <p className="text-[#355574]/70 text-base max-w-xl">
            Welcome! This form is for families in the community who are self-paying for camp. Please complete all sections so our team can ensure the best experience for your child.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-[#df76b6]/15 text-[#355574] text-sm font-bold px-4 py-2 rounded-full">
            <span>Camp Tuition: <strong>$600 per week</strong></span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-6 py-10 space-y-10">

        {/* Child Info */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Child Information</h2>
          <div className="h-0.5 bg-[#df76b6] w-16 mb-5 rounded-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="First Name" error={errors.childFirstName}>
              <input className="moja-input" placeholder="Child's first name" value={form.childFirstName} onChange={(e) => set("childFirstName", e.target.value)} data-error={errors.childFirstName ? true : undefined} />
            </Field>
            <Field label="Last Name" error={errors.childLastName}>
              <input className="moja-input" placeholder="Child's last name" value={form.childLastName} onChange={(e) => set("childLastName", e.target.value)} />
            </Field>
            <Field label="Date of Birth" error={errors.dateOfBirth}>
              <input type="date" className="moja-input" value={form.dateOfBirth} onChange={(e) => set("dateOfBirth", e.target.value)} />
            </Field>
            <Field label="Gender Identity (optional)">
              <select className="moja-input" value={form.gender} onChange={(e) => set("gender", e.target.value)}>
                <option value="">Prefer not to say</option>
                <option value="boy">Boy</option>
                <option value="girl">Girl</option>
                <option value="nonbinary">Non-binary</option>
                <option value="other">Other / Self-describe</option>
              </select>
            </Field>
            <Field label="T-Shirt Size" error={errors.tshirtSize}>
              <select className="moja-input" value={form.tshirtSize} onChange={(e) => set("tshirtSize", e.target.value)}>
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
          {/* Autism diagnosis */}
          <div className="mt-5">
            <Field label="Does your child have an autism diagnosis?" error={errors.autismDiagnosis}>
              <select className="moja-input" value={form.autismDiagnosis} onChange={(e) => set("autismDiagnosis", e.target.value)} data-error={errors.autismDiagnosis ? true : undefined}>
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="yes-recent">Yes — diagnosed within the last 3 years</option>
                <option value="suspected">Not formally diagnosed, but suspected</option>
                <option value="no">No</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </Field>
          </div>

          {/* Age eligibility notice */}
          <div className="mt-5 flex items-start gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(223,118,182,0.08)", border: "1px solid rgba(223,118,182,0.35)" }}>
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#df76b6" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-[#355574] text-sm font-semibold">
              Moja Kids Summer Camp serves children ages <strong>2–11 years old</strong>. If your child is outside this range, please contact us directly to discuss options.
            </p>
          </div>
        </section>

        {/* Camp Session */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Camp Session</h2>
          <div className="h-0.5 bg-[#df76b6] w-16 mb-5 rounded-full" />
          <div className="flex items-start gap-4 rounded-2xl px-5 py-4" style={{ background: "rgba(223,118,182,0.08)", border: "1px solid rgba(223,118,182,0.30)" }}>
            <svg className="w-6 h-6 mt-0.5 flex-shrink-0" style={{ color: "#df76b6" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <div>
              <p className="text-[#355574] font-bold text-base">Full Summer — July 13 – August 21, 2026</p>
              <p className="text-[#355574]/65 text-sm mt-1">Community campers enroll for the full 6-week summer program. Tuition is <strong>$600 per week</strong> ($3,600 total). Our team will confirm enrollment and payment details after reviewing your registration.</p>
            </div>
          </div>
        </section>

        {/* Parent/Guardian */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Parent / Guardian</h2>
          <div className="h-0.5 bg-[#df76b6] w-16 mb-5 rounded-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full Name" error={errors.parentName} className="sm:col-span-2">
              <input className="moja-input" placeholder="Parent or guardian's full name" value={form.parentName} onChange={(e) => set("parentName", e.target.value)} />
            </Field>
            <Field label="Email Address" error={errors.parentEmail}>
              <input type="email" className="moja-input" placeholder="email@example.com" value={form.parentEmail} onChange={(e) => set("parentEmail", e.target.value)} />
            </Field>
            <Field label="Phone Number" error={errors.parentPhone}>
              <input type="tel" className="moja-input" placeholder="(555) 000-0000" value={form.parentPhone} onChange={(e) => set("parentPhone", e.target.value)} />
            </Field>
            <Field label="Street Address" error={errors.address} className="sm:col-span-2">
              <input className="moja-input" placeholder="123 Main St" value={form.address} onChange={(e) => set("address", e.target.value)} />
            </Field>
            <Field label="City" error={errors.city}>
              <input className="moja-input" placeholder="City" value={form.city} onChange={(e) => set("city", e.target.value)} />
            </Field>
            <Field label="State" error={errors.state}>
              <input className="moja-input" placeholder="State" value={form.state} onChange={(e) => set("state", e.target.value)} />
            </Field>
            <Field label="ZIP Code" error={errors.zip}>
              <input className="moja-input" placeholder="00000" value={form.zip} onChange={(e) => set("zip", e.target.value)} />
            </Field>
          </div>
        </section>

        {/* Emergency Contact */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Emergency Contact</h2>
          <div className="h-0.5 bg-[#df76b6] w-16 mb-5 rounded-full" />
          <p className="text-[#355574]/60 text-sm mb-5">Please provide a contact other than the parent/guardian listed above.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full Name" error={errors.emergencyContactName}>
              <input className="moja-input" placeholder="Emergency contact name" value={form.emergencyContactName} onChange={(e) => set("emergencyContactName", e.target.value)} data-error={errors.emergencyContactName ? true : undefined} />
            </Field>
            <Field label="Relationship to Child" error={errors.emergencyContactRelation}>
              <input className="moja-input" placeholder="e.g., Grandparent, Aunt" value={form.emergencyContactRelation} onChange={(e) => set("emergencyContactRelation", e.target.value)} />
            </Field>
            <Field label="Phone Number" error={errors.emergencyContactPhone} className="sm:col-span-2">
              <input type="tel" className="moja-input" placeholder="(555) 000-0000" value={form.emergencyContactPhone} onChange={(e) => set("emergencyContactPhone", e.target.value)} />
            </Field>
          </div>
        </section>

        {/* Medical Information */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Medical Information</h2>
          <div className="h-0.5 bg-[#df76b6] w-16 mb-5 rounded-full" />
          <p className="text-[#355574]/60 text-sm mb-5">This information helps our staff provide the safest, most supportive experience for your child.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Primary Diagnosis" error={errors.primaryDiagnosis} className="sm:col-span-2">
              <input className="moja-input" placeholder="e.g., Autism Spectrum Disorder, ADHD" value={form.primaryDiagnosis} onChange={(e) => set("primaryDiagnosis", e.target.value)} data-error={errors.primaryDiagnosis ? true : undefined} />
            </Field>
            <Field label="Other Diagnoses (optional)" className="sm:col-span-2">
              <input className="moja-input" placeholder="Any additional diagnoses" value={form.otherDiagnoses} onChange={(e) => set("otherDiagnoses", e.target.value)} />
            </Field>
            <Field label="Current Medications (optional)" className="sm:col-span-2">
              <textarea className="moja-input min-h-[80px] resize-y" placeholder="List any medications your child takes, including dosage and timing" value={form.currentMedications} onChange={(e) => set("currentMedications", e.target.value)} />
            </Field>
            <Field label="Allergies (optional)" className="sm:col-span-2">
              <input className="moja-input" placeholder="Food, environmental, or medication allergies" value={form.allergies} onChange={(e) => set("allergies", e.target.value)} />
            </Field>
            <Field label="Physician / Pediatrician Name (optional)">
              <input className="moja-input" placeholder="Dr. Name" value={form.physicianName} onChange={(e) => set("physicianName", e.target.value)} />
            </Field>
            <Field label="Physician Phone (optional)">
              <input type="tel" className="moja-input" placeholder="(555) 000-0000" value={form.physicianPhone} onChange={(e) => set("physicianPhone", e.target.value)} />
            </Field>
          </div>
        </section>

        {/* Behavioral Profile */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Behavioral & Support Profile</h2>
          <div className="h-0.5 bg-[#df76b6] w-16 mb-5 rounded-full" />
          <p className="text-[#355574]/60 text-sm mb-5">Help us understand your child's communication style and any support strategies that work well for them. This is not a clinical assessment — just a way for our staff to get to know your child before camp begins.</p>
          <div className="space-y-5">
            <Field label="Communication Style" error={errors.communicationStyle}>
              <select className="moja-input" value={form.communicationStyle} onChange={(e) => set("communicationStyle", e.target.value)} data-error={errors.communicationStyle ? true : undefined}>
                <option value="">Select primary communication style</option>
                <option value="verbal">Primarily verbal</option>
                <option value="limited-verbal">Limited verbal — uses some words/phrases</option>
                <option value="aac">Uses AAC device or picture communication</option>
                <option value="sign">Uses sign language</option>
                <option value="nonverbal">Primarily non-verbal</option>
                <option value="mixed">Mixed / varies by context</option>
              </select>
            </Field>
            <Field label="Sensory Needs (optional)">
              <textarea className="moja-input min-h-[80px] resize-y" placeholder="e.g., sensitive to loud noises, seeks deep pressure, prefers low-light environments" value={form.sensoryNeeds} onChange={(e) => set("sensoryNeeds", e.target.value)} />
            </Field>
            <Field label="Behavior Support Strategies (optional)">
              <textarea className="moja-input min-h-[80px] resize-y" placeholder="What strategies help your child when they're feeling overwhelmed? What should staff know?" value={form.behaviorSupports} onChange={(e) => set("behaviorSupports", e.target.value)} />
            </Field>
            <Field label="Previous Camp or Group Experience (optional)">
              <textarea className="moja-input min-h-[80px] resize-y" placeholder="Has your child attended camp or group programs before? How did it go?" value={form.previousCampExperience} onChange={(e) => set("previousCampExperience", e.target.value)} />
            </Field>
            <Field label="Dietary Restrictions or Allergies (optional)">
              <input className="moja-input" placeholder="e.g., nut allergy, gluten-free, vegetarian" value={form.dietaryRestrictions} onChange={(e) => set("dietaryRestrictions", e.target.value)} />
            </Field>
          </div>
        </section>

        {/* Payment */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Payment Information</h2>
          <div className="h-0.5 bg-[#df76b6] w-16 mb-5 rounded-full" />
          <p className="text-[#355574]/60 text-sm mb-5">Our team will contact you with final tuition details and payment instructions after reviewing your registration. Please indicate your preferred payment method below.</p>
          <Field label="Preferred Payment Method" error={errors.paymentMethod}>
            <select className="moja-input" value={form.paymentMethod} onChange={(e) => set("paymentMethod", e.target.value)} data-error={errors.paymentMethod ? true : undefined}>
              <option value="">Select payment method</option>
              <option value="credit-card">Credit / Debit Card</option>
              <option value="check">Check</option>
              <option value="zelle">Zelle</option>
              <option value="cash">Cash</option>
              <option value="payment-plan">Request a payment plan</option>
            </select>
          </Field>
        </section>

        {/* Consents */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Consents & Agreements</h2>
          <div className="h-0.5 bg-[#df76b6] w-16 mb-5 rounded-full" />
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
              checked={form.medicalConsent}
              onChange={(v) => set("medicalConsent", v)}
              label="I authorize Moja Behavioral Services staff to administer first aid and seek emergency medical care for my child if needed during camp."
              error={errors.medicalConsent}
              required
            />
            <CheckboxField
              checked={form.liabilityAcknowledged}
              onChange={(v) => set("liabilityAcknowledged", v)}
              label="I acknowledge that Moja Behavioral Services will exercise reasonable care for my child's safety and I agree to the camp's participation terms and liability waiver."
              error={errors.liabilityAcknowledged}
              required
            />
            <CheckboxField
              checked={form.financialAgreement}
              onChange={(v) => set("financialAgreement", v)}
              label="I understand that tuition is due prior to the start of the enrolled session and that cancellations made less than 7 days before the session start date may not be eligible for a refund."
              error={errors.financialAgreement}
              required
            />
          </div>
        </section>

        {/* Clarifying footer note */}
        <div className="rounded-2xl px-6 py-5" style={{ background: "rgba(223,118,182,0.07)", border: "1px solid rgba(223,118,182,0.25)" }}>
          <h3 className="text-[#355574] font-bold text-base mb-2">About This Enrollment Path</h3>
          <p className="text-[#355574]/70 text-sm leading-relaxed">
            This form is for families in the community who are <strong>not currently enrolled in Moja Kids ABA services</strong>. Tuition is <strong>$600 per week</strong>, billed directly to families. Our team will review your registration and reach out to confirm enrollment and payment details within 2–3 business days. If you are interested in ABA therapy services in addition to camp, please use the <strong>New Client + Camp Enrollment</strong> path instead.
          </p>
        </div>

        {/* Submit */}
        <div className="pt-4 pb-8">
          <button type="submit" disabled={submitMutation.isPending} className="btn-aqua w-full sm:w-auto justify-center text-lg py-4 px-10 disabled:opacity-60 disabled:cursor-not-allowed" style={{ background: "#df76b6" }}>
            {submitMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting…
              </span>
            ) : "Submit Registration"}
          </button>
          <p className="text-[#355574]/50 text-xs mt-3">
            Our team will review your registration and contact you within 2–3 business days to confirm enrollment and payment details.
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({ label, error, children, className = "" }: {
  label: string; error?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={className} data-error={error ? true : undefined}>
      <label className="block text-[#355574] text-sm font-bold mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1 font-semibold">{error}</p>}
    </div>
  );
}

function CheckboxField({ checked, onChange, label, error, required }: {
  checked: boolean; onChange: (v: boolean) => void; label: string; error?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer">
        <div className="relative mt-0.5 flex-shrink-0">
          <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
          <div className="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
            style={{ borderColor: checked ? "#df76b6" : "#c0cfe0", background: checked ? "#df76b6" : "white" }}>
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
