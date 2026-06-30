/*
 * HOME — CAMP HUB
 * Design: Joyful Editorial — Summer Camp Energy
 * Blue hero → pathway cards → what is camp → activities → why camp → details → testimonial → CTA → footer
 * Content sourced from camp.mojakids.com original site
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Star, Heart, Sparkles, MapPin, Clock, Calendar, CheckCircle2, ChevronDown } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029578766/9JgjAwZpq3q6CgrVrmg5fu/camp_hero_bg-kcc5pXRbD8VY3GxgTznP56.webp";
const KIDS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029578766/9JgjAwZpq3q6CgrVrmg5fu/camp_kids_activity-Xuu9pg9dgoberBXhhmZ3G9.webp";
const LOGO_URL = "/manus-storage/MOJATransparentBG_dfe53c13.png";

const pathways = [
  {
    id: "client",
    icon: <Star className="w-7 h-7" />,
    label: "Already with Moja?",
    title: "Existing Client Enrollment",
    description:
      "Your child is already part of the Moja family! Reserve their spot at camp with our quick enrollment form — we already have your clinical details on file.",
    cta: "Enroll My Child",
    ctaSub: "For current Moja clients",
    href: "/enroll/client",
    accentColor: "#6dccc2",
    accentLight: "rgba(109,204,194,0.12)",
    borderColor: "#6dccc2",
    tagColor: "text-[#355574]",
    tagBg: "bg-[#6dccc2]/20",
  },
  {
    id: "community",
    icon: <Heart className="w-7 h-7" />,
    label: "New to Moja?",
    title: "Community Camper Enrollment",
    description:
      "Is your neurodiverse child looking for a welcoming, affirming summer experience? Our camp is open to the whole community — no prior Moja services needed.",
    cta: "Register for Camp",
    ctaSub: "Non-Moja families, self-pay",
    href: "/enroll/community",
    accentColor: "#df76b6",
    accentLight: "rgba(223,118,182,0.10)",
    borderColor: "#df76b6",
    tagColor: "text-[#355574]",
    tagBg: "bg-[#df76b6]/20",
  },
  {
    id: "new-client",
    icon: <Sparkles className="w-7 h-7" />,
    label: "Need ABA services too?",
    title: "New Client + Camp Enrollment",
    description:
      "If your child could benefit from ABA therapy and you'd love for them to attend camp, we'll walk you through both — starting with our clinical intake process.",
    cta: "Start the Journey",
    ctaSub: "Interested in ABA services + camp",
    href: "/enroll/new-client",
    accentColor: "#e66d38",
    accentLight: "rgba(230,109,56,0.08)",
    borderColor: "#e66d38",
    tagColor: "text-[#355574]",
    tagBg: "bg-[#e66d38]/15",
  },
];

const activities = [
  {
    emoji: "🌿",
    title: "Local Adventures",
    description:
      "We explore the best of the Monadnock region — parks, nature spots, and community favorites — with small groups and familiar staff by their side.",
  },
  {
    emoji: "🏕️",
    title: "Classic Camp Games",
    description:
      "From relay races to scavenger hunts, our camp games are all about teamwork, laughter, and celebrating every win — big and small.",
  },
  {
    emoji: "🎨",
    title: "Arts & Crafts",
    description:
      "Creative expression through painting, building, and making — activities that let kids explore their imaginations at their own pace.",
  },
  {
    emoji: "🚌",
    title: "Local Field Trips",
    description:
      "We explore the best of the Monadnock region — parks, nature spots, and community favorites — with small groups and familiar staff.",
  },
  {
    emoji: "🎵",
    title: "Music & Movement",
    description:
      "Sensory-friendly music, rhythm, and movement activities that bring energy, fun, and a whole lot of dancing.",
  },
  {
    emoji: "🤝",
    title: "Social Skills & Friendship",
    description:
      "Structured social activities woven naturally into every day — building friendships in a safe, supportive environment.",
  },
];

const pillars = [
  {
    number: "01",
    title: "Expert ABA Support",
    description:
      "BCBAs and trained RBTs on-site every day, providing individualized support built around your child — not a one-size-fits-all model.",
    color: "#6dccc2",
  },
  {
    number: "02",
    title: "Low Staff-to-Child Ratios",
    description:
      "Small groups mean every camper gets real attention and care — your child is never just another face in the crowd.",
    color: "#df76b6",
  },
  {
    number: "03",
    title: "Neurodiversity-Affirming",
    description:
      "We celebrate how your child's brain works. Our programming is designed to meet kids where they are and help them grow with joy.",
    color: "#e66d38",
  },
  {
    number: "04",
    title: "Rooted in Keene, NH",
    description:
      "Local field trips, local staff, local heart. We're part of this community — and Camp Moja is built to reflect that.",
    color: "#355574",
  },
];

const campDetails = [
  { icon: <Calendar className="w-5 h-5" />, label: "Start Date", value: "July 13, 2026" },
  { icon: <Calendar className="w-5 h-5" />, label: "End Date", value: "August 21, 2026" },
  { icon: <Clock className="w-5 h-5" />, label: "Hours", value: "Mon–Fri · 8:00 AM – 4:00 PM" },
  { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "25 Avon St., Keene, NH 03431" },
  { icon: <Star className="w-5 h-5" />, label: "Duration", value: "6 Weeks" },
];

const ctaChecklist = [
  "Expert ABA support woven into every camp day",
  "Field trips to local Keene-area parks, nature spots, and community favorites",
  "Trained RBTs & BCBAs with your child all day, every day",
  "Low staff-to-child ratios for genuine individualized attention",
  "Neurodiversity-affirming, strength-based environment",
  "6 weeks of structured fun, July 13 – August 21",
];

const faqs = [
  {
    q: "Who is Camp Moja for?",
    a: "Camp Moja is designed for children ages 2–11 who are on the autism spectrum or are neurodiverse. We welcome current Moja Kids clients, self-paying community families, and families who are new to Moja and interested in ABA services.",
  },
  {
    q: "What does a typical day at camp look like?",
    a: "Each day is structured but fun — mornings typically include group activities, arts and crafts, or music and movement, while afternoons may feature outdoor play, social skills activities, or local field trips. Our BCBAs and RBTs are present throughout the day to support each child's individual goals.",
  },
  {
    q: "What are the staff-to-child ratios?",
    a: "We keep our groups intentionally small to ensure every child receives genuine attention and care. Trained RBTs and BCBAs are on-site every day, and ratios are planned carefully based on each child's support needs — which is why we ask about planned absences in advance.",
  },
  {
    q: "What should my child bring to camp?",
    a: "A full packing list will be sent after enrollment is confirmed. Generally, campers should bring a labeled water bottle, a nut-free snack, sunscreen, and comfortable clothing. We'll let you know about anything specific for field trip days.",
  },
  {
    q: "Is ABA therapy provided during camp?",
    a: "Yes — for current Moja clients and new clients enrolled in our ABA program, individualized ABA support is woven into every camp day. For community self-pay campers, our trained staff provide a supportive, neurodiversity-affirming environment, though formal ABA programming is not included in the community camp rate.",
  },
  {
    q: "What is the tuition for camp?",
    a: "For community (self-pay) campers, tuition is $600 per week. For current Moja clients, camp enrollment is part of your existing service plan — please complete the client enrollment form and your care team will follow up with details. For families new to Moja seeking both ABA services and camp, tuition and insurance coverage will be discussed during the intake process.",
  },
  {
    q: "Can I enroll for just a few weeks?",
    a: "Yes! Community campers can register for individual sessions (weekly). Current clients are expected to attend the full summer program, though we understand that planned travel happens — which is why we ask you to note any absences during enrollment.",
  },
  {
    q: "What if my child has never been to camp before?",
    a: "That's completely okay — many of our campers are first-timers. Our team is experienced in supporting children through new transitions. We'll work with your family before camp starts to make sure your child feels prepared and comfortable.",
  },
  {
    q: "How do I know which enrollment form to use?",
    a: "If your child is currently receiving ABA services at Moja Kids, use the Existing Client form. If your family is new to Moja and you're interested in ABA services along with camp, use the New Client + Camp form. If you're looking for a great summer camp experience without ABA services, use the Community Camper form.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 px-4 relative overflow-hidden">
      <div className="moja-blob w-56 h-56 top-0 -right-10 opacity-[0.06]" style={{ background: "#6dccc2" }} />
      <div className="moja-blob w-44 h-44 bottom-0 -left-8 opacity-[0.05]" style={{ background: "#df76b6" }} />

      <div className="relative max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-[#6dccc2] text-xl mb-2"
            style={{ fontFamily: "'Mango AC', 'Comic Sans MS', cursive" }}
          >
            Got questions?
          </p>
          <h2 className="text-[#355574] text-3xl sm:text-4xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-[#355574]/65 mt-3 text-base max-w-xl mx-auto">
            Everything families want to know before enrolling. Don't see your question?{" "}
            <a href="mailto:hello@mojakids.com" className="text-[#6dccc2] font-bold hover:underline">Email us</a>.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#6dccc2]/25 overflow-hidden"
              style={{ boxShadow: openIndex === i ? "0 4px 20px -4px rgba(109,204,194,0.2)" : "0 1px 6px -2px rgba(53,85,116,0.06)" }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-[#6dccc2]/5 transition-colors duration-150"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-[#355574] font-bold text-base leading-snug">{faq.q}</span>
                <ChevronDown
                  className="w-5 h-5 text-[#6dccc2] flex-shrink-0 transition-transform duration-200"
                  style={{ transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 bg-white">
                  <p className="text-[#355574]/70 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useAuth();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white font-[Quicksand,sans-serif]">

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden min-h-[520px] flex flex-col"
        style={{
          background: "#355574",
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#355574]/70" />

        <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full">
          <img
            src={LOGO_URL}
            alt="Moja Behavioral Services"
            className="h-10 object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <span className="text-white/70 text-sm font-semibold hidden sm:block">
            Summer Camp 2026 Enrollment
          </span>
        </nav>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16 max-w-4xl mx-auto w-full">
          <p
            className="text-[#6dccc2] text-2xl mb-3"
            style={{ fontFamily: "'Mango AC', 'Comic Sans MS', cursive" }}
          >
            A summer for every kid.
          </p>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            Camp Moja
          </h1>
          <p className="text-white/85 text-lg sm:text-xl max-w-2xl leading-relaxed">
            A summer full of adventure, connection, and joy — built for kids who thrive when they're truly understood.
          </p>

          {/* Camp dates badge */}
          <div className="mt-7 flex items-center gap-3 bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl px-6 py-3.5">
            <svg className="w-5 h-5 text-[#6dccc2] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-white font-bold text-base sm:text-lg tracking-wide">
              July 13 – August 21, 2026
            </span>
            <span className="hidden sm:block text-white/50 text-sm font-medium">&bull; 6 Weekly Sessions</span>
          </div>

          <div className="mt-10 flex flex-col items-center gap-2">
            <span className="text-white/60 text-sm font-semibold tracking-wide uppercase">
              Find your path
            </span>
            <div className="w-px h-8 bg-white/30 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── PATHWAY SELECTOR ── */}
      <section className="relative bg-white py-16 px-4">
        <div
          className="moja-blob w-72 h-72 -top-16 -left-16 opacity-[0.08]"
          style={{ background: "#6dccc2" }}
        />
        <div
          className="moja-blob w-56 h-56 top-8 right-0 opacity-[0.07]"
          style={{ background: "#df76b6" }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-[#6dccc2] text-xl mb-2"
              style={{ fontFamily: "'Mango AC', 'Comic Sans MS', cursive" }}
            >
              Which path is right for you?
            </p>
            <h2 className="text-[#355574] text-3xl sm:text-4xl font-bold">
              Choose Your Enrollment Path
            </h2>
            <p className="text-[#355574]/70 mt-3 text-base max-w-xl mx-auto">
              We've made it simple. Select the option that best describes your family's situation.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-[#355574] text-white text-sm font-bold px-4 py-2 rounded-full">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Serving children ages 2–11 years old
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pathways.map((p, i) => (
              <div
                key={p.id}
                className={`pathway-card bg-white rounded-2xl border-2 overflow-hidden flex flex-col cursor-pointer`}
                style={{
                  borderColor: p.borderColor,
                  boxShadow: `0 4px 24px -4px ${p.accentColor}30`,
                }}
                onClick={() => { window.scrollTo({ top: 0, behavior: "instant" }); navigate(p.href); }}
              >
                <div className="h-2 w-full" style={{ background: p.accentColor }} />
                <div className="p-7 flex flex-col flex-1">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: p.accentLight, color: p.accentColor }}
                  >
                    {p.icon}
                  </div>
                  <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${p.tagBg} ${p.tagColor}`}>
                    {p.label}
                  </span>
                  <h3 className="text-[#355574] text-xl font-bold mb-3 leading-snug">{p.title}</h3>
                  <p className="text-[#355574]/70 text-sm leading-relaxed flex-1">{p.description}</p>
                  <button
                    className="mt-6 btn-aqua w-full justify-center"
                    style={{ background: p.accentColor }}
                    onClick={(e) => { e.stopPropagation(); window.scrollTo({ top: 0, behavior: "instant" }); navigate(p.href); }}
                  >
                    <span className="flex flex-col items-start gap-0.5">
                      <span>{p.cta}</span>
                      <span className="text-white/70 text-xs font-normal">{p.ctaSub}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS CAMP MOJA ── */}
      <section className="bg-[#355574] py-20 px-4 relative overflow-hidden">
        <div className="moja-blob w-80 h-80 -bottom-20 -right-20 opacity-[0.15]" style={{ background: "#6dccc2" }} />
        <div className="moja-blob w-48 h-48 top-0 left-10 opacity-[0.12]" style={{ background: "#df76b6" }} />

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p
              className="text-[#6dccc2] text-xl mb-2"
              style={{ fontFamily: "'Mango AC', 'Comic Sans MS', cursive" }}
            >
              Where every kid belongs.
            </p>
            <h2 className="text-white text-3xl sm:text-4xl font-bold mb-5 leading-snug">
              What is Camp Moja?
            </h2>
            <p className="text-white/85 text-base leading-relaxed mb-4">
              Camp Moja is a 6-week summer program from Moja Kids, designed specifically for children on the autism spectrum. We combine the fun of traditional summer camp — games, field trips, crafts, and new friendships — with the expert, individualized support your child deserves.
            </p>
            <p className="text-white/80 text-base leading-relaxed mb-6">
              Our team of trained Behavior Technicians and BCBAs are with your child every step of the way, making sure this summer is one they'll talk about for years.
            </p>
            <p
              className="text-[#6dccc2] text-lg font-bold"
              style={{ fontFamily: "'Mango AC', 'Comic Sans MS', cursive" }}
            >
              A summer they'll never forget.
            </p>
            <p className="text-white/70 text-sm mt-1">
              From camp games in the sunshine to local adventures, every activity is designed to build confidence, friendships, and the kind of joy that lasts all year.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Sensory-Aware Activities", "Trained RBTs & BCBAs", "Small Group Ratios", "Inclusive Environment"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full text-sm font-bold text-[#355574] bg-[#6dccc2]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={KIDS_IMG}
              alt="Children enjoying Camp Moja activities"
              className="w-full h-72 lg:h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── ACTIVITIES GRID ── */}
      <section className="bg-white py-20 px-4 relative overflow-hidden">
        <div className="moja-blob w-64 h-64 top-0 -right-12 opacity-[0.07]" style={{ background: "#df76b6" }} />
        <div className="moja-blob w-48 h-48 bottom-0 -left-10 opacity-[0.06]" style={{ background: "#6dccc2" }} />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-[#6dccc2] text-xl mb-2"
              style={{ fontFamily: "'Mango AC', 'Comic Sans MS', cursive" }}
            >
              No two days look alike.
            </p>
            <h2 className="text-[#355574] text-3xl sm:text-4xl font-bold">
              Days Packed with Adventures
            </h2>
            <p className="text-[#355574]/70 mt-3 text-base max-w-xl mx-auto">
              We explore locally, play together, and always make sure every child has the support they need to shine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((a) => (
              <div
                key={a.title}
                className="bg-white rounded-2xl border border-[#6dccc2]/30 p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                style={{ boxShadow: "0 2px 12px -2px rgba(53,85,116,0.08)" }}
              >
                <div className="text-4xl mb-4">{a.emoji}</div>
                <h3 className="text-[#355574] text-lg font-bold mb-2">{a.title}</h3>
                <p className="text-[#355574]/65 text-sm leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CAMP MOJA ── */}
      <section className="bg-[#f7fbfc] py-20 px-4 relative overflow-hidden">
        <div className="moja-blob w-72 h-72 -top-10 -left-16 opacity-[0.07]" style={{ background: "#6dccc2" }} />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-[#6dccc2] text-xl mb-2"
              style={{ fontFamily: "'Mango AC', 'Comic Sans MS', cursive" }}
            >
              The care your child deserves.
            </p>
            <h2 className="text-[#355574] text-3xl sm:text-4xl font-bold">
              Why Camp Moja?
            </h2>
            <p className="text-[#355574]/70 mt-3 text-base max-w-xl mx-auto">
              We're not just a day camp. We're Moja Kids — an ABA clinic rooted in our community that believes neurodivergent kids deserve a summer that's genuinely made for them.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p) => (
              <div
                key={p.number}
                className="bg-white rounded-2xl p-8 flex gap-5 items-start"
                style={{ boxShadow: "0 2px 16px -4px rgba(53,85,116,0.10)" }}
              >
                <div
                  className="text-3xl font-black leading-none flex-shrink-0 mt-1"
                  style={{ color: p.color, opacity: 0.35 }}
                >
                  {p.number}
                </div>
                <div>
                  <h3 className="text-[#355574] text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-[#355574]/65 text-sm leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAMP DETAILS BAR ── */}
      <section className="bg-[#355574] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {campDetails.map((d) => (
              <div key={d.label} className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#6dccc2]/20 flex items-center justify-center text-[#6dccc2]">
                  {d.icon}
                </div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest">{d.label}</p>
                <p className="text-white font-bold text-sm leading-snug">{d.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-6" style={{ color: "#6dccc2" }}>&ldquo;</div>
          <blockquote className="text-[#355574] text-xl sm:text-2xl font-semibold leading-relaxed mb-6">
            Moja Kids has been a game-changer for our family. The team genuinely knows our son — what makes him tick, what he loves, and how to bring out his best. We can't wait to see what this summer brings.
          </blockquote>
          <p className="text-[#355574]/50 text-sm font-bold uppercase tracking-widest">
            — A Moja Kids Family, Keene NH
          </p>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#6dccc2]/12 py-20 px-4 relative overflow-hidden">
        <div className="moja-blob w-64 h-64 -bottom-16 -right-16 opacity-[0.15]" style={{ background: "#df76b6" }} />

        <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p
              className="text-[#6dccc2] text-xl mb-2"
              style={{ fontFamily: "'Mango AC', 'Comic Sans MS', cursive" }}
            >
              Spaces are limited.
            </p>
            <h2 className="text-[#355574] text-3xl sm:text-4xl font-bold mb-4 leading-snug">
              Reserve Your Child's Spot Today
            </h2>
            <p className="text-[#355574]/70 text-base leading-relaxed mb-6">
              We keep our groups intentionally small so every child gets the attention they deserve. Choose your enrollment path above and our team will be in touch with next steps.
            </p>
            <ul className="space-y-3">
              {ctaChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#6dccc2] flex-shrink-0 mt-0.5" />
                  <span className="text-[#355574]/80 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            {pathways.map((p) => (
              <button
                key={p.id}
                className="btn-aqua justify-between px-6 py-4 rounded-xl text-base font-bold"
                style={{ background: p.accentColor }}
                onClick={() => navigate(p.href)}
              >
                <span>{p.cta}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQ />

      {/* ── FOOTER ── */}
      <footer className="bg-[#355574] py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <img
              src={LOGO_URL}
              alt="Moja Behavioral Services"
              className="h-8 object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-white/40 text-xs mt-1">25 Avon St., Keene, NH 03431</p>
          </div>
          <p className="text-white/50 text-sm text-center">
            © 2026 Moja Kids · Questions?{" "}
            <a href="mailto:hello@mojakids.com" className="text-[#6dccc2] hover:underline font-bold">
              hello@mojakids.com
            </a>
          </p>
        </div>
      </footer>

    </div>
  );
}
