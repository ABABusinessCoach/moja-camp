/*
 * NEW CLIENT + CAMP ENROLLMENT — Potential/New Clients Needing ABA Services
 * Design: Orange accent (#e66d38), supportive and mission-driven tone
 * Two-part: Camp interest capture + ABA Engine intake redirect
 * Quicksand Bold headers, Aqua focus rings, Orange-tinted CTA
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, ClipboardList, HeartHandshake, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

const LOGO_URL = "/manus-storage/MOJATransparentBG_dfe53c13.png";
const SUCCESS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029578766/9JgjAwZpq3q6CgrVrmg5fu/camp_success_banner-cu83sZ24nunHtf9PCp4HHt.webp";

// ABA Engine intake URL — update this to your actual ABA Engine portal link
const ABA_ENGINE_URL = "https://www.abaengine.com";

type FormData = {
  childFirstName: string;
  childLastName: string;
  dateOfBirth: string;
  childAge: string;
  autismDiagnosis: string;
  autismDiagnosisRecent: string;
  sessionInterest: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  referralSource: string;
  insuranceProvider: string;
  insuranceMemberId: string;
  gender: string;
  primaryConcerns: string;
  servicesInterest: string[];
  additionalNotes: string;
  intakeAcknowledged: boolean;
  contactConsent: boolean;
};

const initial: FormData = {
  childFirstName: "", childLastName: "", dateOfBirth: "", childAge: "",
  autismDiagnosis: "", autismDiagnosisRecent: "", sessionInterest: "",
  parentName: "", parentEmail: "", parentPhone: "",
  referralSource: "", insuranceProvider: "", insuranceMemberId: "",
  gender: "",
  primaryConcerns: "", servicesInterest: [], additionalNotes: "",
  intakeAcknowledged: false, contactConsent: false,
};

export default function NewClientEnrollment() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const toggleService = (val: string) => {
    setForm((f) => ({
      ...f,
      servicesInterest: f.servicesInterest.includes(val)
        ? f.servicesInterest.filter((s) => s !== val)
        : [...f.servicesInterest, val],
    }));
    setErrors((e) => ({ ...e, servicesInterest: undefined }));
  };

  const set = (field: keyof FormData, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.childFirstName.trim()) e.childFirstName = "Required";
    if (!form.childLastName.trim()) e.childLastName = "Required";
    if (!form.dateOfBirth) e.dateOfBirth = "Required";
    if (!form.childAge.trim()) e.childAge = "Required";
    if (!form.autismDiagnosis) e.autismDiagnosis = "Required";
    if (!form.parentName.trim()) e.parentName = "Required";
    if (!form.parentEmail.trim()) e.parentEmail = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.parentEmail)) e.parentEmail = "Enter a valid email";
    if (!form.parentPhone.trim()) e.parentPhone = "Required";
    if (!form.primaryConcerns.trim()) e.primaryConcerns = "Required";
    if (form.servicesInterest.length === 0) e.servicesInterest = "Please select at least one service";
    if (!form.intakeAcknowledged) e.intakeAcknowledged = "Required to proceed";
    if (!form.contactConsent) e.contactConsent = "Required to proceed";
    return e;
  };

  const submitMutation = trpc.enrollment.submitNewClientEnrollment.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: () => {
      alert("Something went wrong submitting your inquiry. Please try again or contact us directly.");
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
      childAge: form.childAge,
      childGender: form.gender,
      childDob: form.dateOfBirth,
      autismDiagnosis: form.autismDiagnosis,
      parentName: form.parentName,
      parentEmail: form.parentEmail,
      parentPhone: form.parentPhone,
      servicesInterest: form.servicesInterest,
      sessionInterest: form.sessionInterest,
      insuranceProvider: form.insuranceProvider,
      insuranceMemberId: form.insuranceMemberId,
      primaryConcerns: form.primaryConcerns,
      additionalNotes: form.additionalNotes,
      consentIntake: form.intakeAcknowledged ? "yes" : "no",
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16" style={{ background: "#fdf8f5" }}>
        <div
          className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl text-center"
          style={{ border: "2px solid #e66d38", animation: "fadeInUp 0.4s cubic-bezier(0.23,1,0.32,1) both" }}
        >
          <img src={SUCCESS_IMG} alt="" className="w-full h-44 object-cover" />
          <div className="p-10">
            <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "rgba(230,109,56,0.10)" }}>
              <CheckCircle2 className="w-10 h-10" style={{ color: "#e66d38" }} />
            </div>
            <h2 className="text-[#355574] text-3xl font-bold mb-2">We've received your interest!</h2>
            <p className="font-semibold text-sm mb-5" style={{ color: "#e66d38", fontFamily: "'Mango AC', 'Comic Sans MS', cursive" }}>Your journey with Moja starts here.</p>
            <p className="text-[#355574]/70 text-base leading-relaxed mb-4">
              Thank you for reaching out about <strong>{form.childFirstName}</strong>. Our team will contact you at <strong>{form.parentEmail}</strong> within 1–2 business days.
            </p>

            {/* Next step: ABA Engine */}
            <div className="bg-[#e66d38]/10 border border-[#e66d38]/30 rounded-2xl p-6 mb-6 text-left">
              <div className="flex items-start gap-3">
                <ClipboardList className="w-6 h-6 mt-0.5 flex-shrink-0" style={{ color: "#e66d38" }} />
                <div>
                  <h3 className="text-[#355574] font-bold text-base mb-1">Your Next Step: Complete the Clinical Intake</h3>
                  <p className="text-[#355574]/70 text-sm leading-relaxed mb-3">
                    To begin the process of receiving ABA services and attending camp, please complete our clinical intake form through ABA Engine. This helps our clinical team understand your child's needs and begin the authorization process.
                  </p>
                  <a
                    href={ABA_ENGINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-aqua inline-flex"
                    style={{ background: "#e66d38" }}
                  >
                    Complete Intake in ABA Engine <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
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
          <button onClick={() => navigate("/")} className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <img src={LOGO_URL} alt="Moja" className="h-8 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
        </div>
      </div>

      {/* Form header */}
      <div className="bg-[#e66d38]/08 border-b border-[#e66d38]/25 px-6 py-8" style={{ background: "rgba(230,109,56,0.06)" }}>
        <div className="max-w-3xl mx-auto">
          <span className="text-[#e66d38] text-lg mb-1 block" style={{ fontFamily: "'Mango AC', 'Comic Sans MS', cursive" }}>
            Our team is here for your family.
          </span>
          <h1 className="text-[#355574] text-3xl sm:text-4xl font-bold mb-2">New Client + Camp Enrollment</h1>
          <p className="text-[#355574]/70 text-base max-w-xl">
            If your child could benefit from ABA therapy services and you'd also like them to attend Moja Kids Summer Camp, you're in the right place. We'll walk you through both processes together.
          </p>
        </div>
      </div>

      {/* How it works banner */}
      <div className="bg-[#355574] px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-white text-lg font-bold mb-5">How This Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: "1", icon: <ClipboardList className="w-5 h-5" />, title: "Complete this form", desc: "Tell us about your child and your interest in camp." },
              { step: "2", icon: <HeartHandshake className="w-5 h-5" />, title: "We contact you", desc: "Our team reaches out within 1–2 business days to discuss services." },
              { step: "3", icon: <ArrowRight className="w-5 h-5" />, title: "Complete ABA intake", desc: "You'll be directed to our portal to begin the clinical intake." },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[#355574] text-sm" style={{ background: "#6dccc2" }}>
                  {s.step}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{s.title}</p>
                  <p className="text-white/60 text-xs mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-6 py-10 space-y-10">

        {/* Child Info */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Child Information</h2>
          <div className="h-0.5 w-16 mb-5 rounded-full" style={{ background: "#e66d38" }} />
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
            <Field label="Child's Current Age" error={errors.childAge}>
              <select className="moja-input" value={form.childAge} onChange={(e) => set("childAge", e.target.value)} data-error={errors.childAge ? true : undefined}>
                <option value="">Select age</option>
                <option value="2">2 years old</option>
                <option value="3">3 years old</option>
                <option value="4">4 years old</option>
                <option value="5">5 years old</option>
                <option value="6">6 years old</option>
                <option value="7">7 years old</option>
                <option value="8">8 years old</option>
                <option value="9">9 years old</option>
                <option value="10">10 years old</option>
                <option value="11">11 years old</option>
              </select>
            </Field>
            <Field label="Gender Identity (optional)" className="sm:col-span-2">
              <select className="moja-input" value={form.gender} onChange={(e) => set("gender", e.target.value)}>
                <option value="">Prefer not to say</option>
                <option value="boy">Boy</option>
                <option value="girl">Girl</option>
                <option value="nonbinary">Non-binary</option>
                <option value="other">Other / Self-describe</option>
              </select>
            </Field>
            <Field label="Does your child have an autism diagnosis?" error={errors.autismDiagnosis} className="sm:col-span-2">
              <select className="moja-input" value={form.autismDiagnosis} onChange={(e) => set("autismDiagnosis", e.target.value)} data-error={errors.autismDiagnosis ? true : undefined}>
                <option value="">Select one</option>
                <option value="yes-recent">Yes — diagnosed within the last 3 years</option>
                <option value="yes-older">Yes — diagnosed more than 3 years ago</option>
                <option value="in-process">In process — evaluation underway</option>
                <option value="no">No autism diagnosis</option>
                <option value="unsure">Not sure</option>
              </select>
            </Field>
          </div>
          {/* Age eligibility notice */}
          <div className="mt-5 flex items-start gap-3 bg-[#6dccc2]/12 border border-[#6dccc2]/40 rounded-xl px-4 py-3" style={{ background: "rgba(109,204,194,0.10)" }}>
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#6dccc2" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-[#355574] text-sm font-semibold">
              Moja Kids Summer Camp serves children ages <strong>2–11 years old</strong>. If your child is outside this range, please contact us directly to discuss options.
            </p>
          </div>
        </section>

        {/* Parent/Guardian */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Parent / Guardian</h2>
          <div className="h-0.5 w-16 mb-5 rounded-full" style={{ background: "#e66d38" }} />
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
          </div>
        </section>

        {/* Insurance */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Insurance Information</h2>
          <div className="h-0.5 w-16 mb-5 rounded-full" style={{ background: "#e66d38" }} />
          <p className="text-[#355574]/60 text-sm mb-5">ABA therapy services are often covered by insurance. Providing this information now helps us begin the authorization process faster.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Insurance Provider (optional)">
              <input className="moja-input" placeholder="e.g., Blue Cross Blue Shield, Aetna" value={form.insuranceProvider} onChange={(e) => set("insuranceProvider", e.target.value)} />
            </Field>
            <Field label="Member ID (optional)">
              <input className="moja-input" placeholder="Insurance member ID" value={form.insuranceMemberId} onChange={(e) => set("insuranceMemberId", e.target.value)} />
            </Field>
          </div>
        </section>

        {/* Referral & Concerns */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">About Your Child</h2>
          <div className="h-0.5 w-16 mb-5 rounded-full" style={{ background: "#e66d38" }} />
          <div className="space-y-5">
            <Field label="How did you hear about Moja? (optional)">
              <select className="moja-input" value={form.referralSource} onChange={(e) => set("referralSource", e.target.value)}>
                <option value="">Select one</option>
                <option value="doctor">Referred by a doctor or therapist</option>
                <option value="school">Referred by school</option>
                <option value="friend">Friend or family member</option>
                <option value="social-media">Social media</option>
                <option value="search">Online search</option>
                <option value="other">Other</option>
              </select>
            </Field>
            <Field label="Primary Concerns or Goals" error={errors.primaryConcerns}>
              <textarea
                className="moja-input min-h-[100px] resize-y"
                placeholder="What are your main concerns or goals for your child? What areas would you most like support with?"
                value={form.primaryConcerns}
                onChange={(e) => set("primaryConcerns", e.target.value)}
                data-error={errors.primaryConcerns ? true : undefined}
              />
            </Field>
            <div>
              <label className="block text-[#355574] text-sm font-bold mb-2">
                What types of services are you looking for? <span className="text-red-400">*</span>
                <span className="text-[#355574]/50 font-normal ml-1">(check all that apply)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { val: "initial-diagnosis", label: "Initial Diagnosis" },
                  { val: "aba", label: "Applied Behavior Analysis (ABA)" },
                  { val: "daytime", label: "Daytime Services (8:00 – 2:30 pm)" },
                  { val: "afterschool", label: "Afterschool Services (3:00 – 6:00 pm)" },
                  { val: "parent-coaching", label: "Parent / Support Coaching" },
                  { val: "not-sure", label: "Not sure yet" },
                  { val: "summer-only", label: "Summer Sessions Only" },
                ].map(({ val, label }) => (
                  <label key={val} className="flex items-center gap-3 cursor-pointer rounded-xl px-3 py-2.5 transition-colors"
                    style={{ background: form.servicesInterest.includes(val) ? "rgba(230,109,56,0.10)" : "rgba(53,85,116,0.04)", border: `1px solid ${form.servicesInterest.includes(val) ? "#e66d38" : "rgba(53,85,116,0.12)"}` }}>
                    <div className="relative flex-shrink-0">
                      <input type="checkbox" className="sr-only" checked={form.servicesInterest.includes(val)} onChange={() => toggleService(val)} />
                      <div className="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
                        style={{ borderColor: form.servicesInterest.includes(val) ? "#e66d38" : "#c0cfe0", background: form.servicesInterest.includes(val) ? "#e66d38" : "white" }}>
                        {form.servicesInterest.includes(val) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-[#355574] text-sm font-semibold">{label}</span>
                  </label>
                ))}
              </div>
              {errors.servicesInterest && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.servicesInterest}</p>}
            </div>
            <Field label="Which camp session(s) are you interested in? (optional)">
              <select className="moja-input" value={form.sessionInterest} onChange={(e) => set('sessionInterest', e.target.value)}>
                <option value="">Select a session (optional)</option>
                <option value="session1">Session 1 — July 13–18</option>
                <option value="session2">Session 2 — July 20–25</option>
                <option value="session3">Session 3 — July 27 – Aug 1</option>
                <option value="session4">Session 4 — August 3–8</option>
                <option value="session5">Session 5 — August 10–15</option>
                <option value="session6">Session 6 — August 17–21</option>
                <option value="full">Full Summer (All 6 Sessions, July 13 – Aug 21)</option>
                <option value="flexible">Flexible — discuss with team</option>
              </select>
            </Field>
            <Field label="Anything else you'd like us to know? (optional)">
              <textarea
                className="moja-input min-h-[80px] resize-y"
                placeholder="Any additional context that would help our team prepare for your call..."
                value={form.additionalNotes}
                onChange={(e) => set("additionalNotes", e.target.value)}
              />
            </Field>
          </div>
        </section>

        {/* Acknowledgments */}
        <section>
          <h2 className="text-[#355574] text-xl font-bold mb-1">Acknowledgments</h2>
          <div className="h-0.5 w-16 mb-5 rounded-full" style={{ background: "#e66d38" }} />
          <div className="space-y-4">
            <CheckboxField
              checked={form.intakeAcknowledged}
              onChange={(v) => set("intakeAcknowledged", v)}
              label="I understand that enrollment in the Moja Kids Summer Camp as a new client requires completion of a clinical intake, and that camp enrollment is contingent on that process."
              error={errors.intakeAcknowledged}
              required
            />
            <CheckboxField
              checked={form.contactConsent}
              onChange={(v) => set("contactConsent", v)}
              label="I consent to being contacted by Moja Behavioral Services at the phone number and email provided above to discuss services and next steps."
              error={errors.contactConsent}
              required
            />
          </div>
        </section>

        {/* Clarifying footer note */}
        <div className="rounded-2xl px-6 py-5" style={{ background: "rgba(230,109,56,0.06)", border: "1px solid rgba(230,109,56,0.22)" }}>
          <h3 className="text-[#355574] font-bold text-base mb-2">About This Enrollment Path</h3>
          <p className="text-[#355574]/70 text-sm leading-relaxed">
            This form is for <strong>families new to Moja Kids</strong> who are interested in both ABA therapy services and summer camp. After submitting, you will be directed to complete a clinical intake through our secure portal. <strong>Camp enrollment is contingent on completing the clinical intake process.</strong> Our team will follow up within 1–2 business days to walk you through next steps. If your child is already a Moja client, please use the Existing Client Enrollment form instead.
          </p>
        </div>

        {/* Submit */}
        <div className="pt-4 pb-8">
          <button type="submit" disabled={submitMutation.isPending} className="btn-aqua w-full sm:w-auto justify-center text-lg py-4 px-10 disabled:opacity-60 disabled:cursor-not-allowed" style={{ background: "#e66d38" }}>
            {submitMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting…
              </span>
            ) : <>{"Submit & Get Next Steps"} <ArrowRight className="w-5 h-5" /></>}
          </button>
          <p className="text-[#355574]/50 text-xs mt-3">
            After submitting, you'll be guided to complete the clinical intake in our secure portal. Our team will also follow up within 1–2 business days.
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
            style={{ borderColor: checked ? "#e66d38" : "#c0cfe0", background: checked ? "#e66d38" : "white" }}>
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
