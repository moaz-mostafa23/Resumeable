"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  Clock,
  Download,
  FileText,
  LogOut,
  MousePointerClick,
  Palette,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useAuthContext } from "@/components/auth/AuthProvider";

const navLinks = [
  { href: "/templates", label: "Templates" },
  { href: "/resume-examples", label: "Examples" },
  { href: "/pricing", label: "Pricing" },
];

const proofPillars = [
  {
    icon: FileText,
    title: "Readable in 7-second scans",
    body: "Built for real recruiter behavior: fast heading checks, short bullets, and clean spacing.",
  },
  {
    icon: Shield,
    title: "ATS-safe structure",
    body: "Layouts prioritize semantic hierarchy and parser-friendly content flow.",
  },
  {
    icon: Clock,
    title: "No signup wall",
    body: "Start instantly, export fast, and create an account later only if you want cloud saves.",
  },
];

const workflowSteps = [
  {
    icon: MousePointerClick,
    title: "Choose a direction",
    body: "Pick a proven layout based on your career stage, role type, and application style.",
  },
  {
    icon: Sparkles,
    title: "Refine your story",
    body: "Turn long paragraphs into impact bullets and reorder sections for quick scanning.",
  },
  {
    icon: Download,
    title: "Ship your PDF",
    body: "Download a polished, ATS-ready file that looks precise on desktop and mobile.",
  },
];

const sectionCards = [
  {
    icon: Zap,
    title: "Real-time preview",
    body: "Every change appears immediately so you can edit with confidence.",
    accent: "from-[#0f766e]/25 to-[#0f766e]/5",
  },
  {
    icon: Palette,
    title: "Design control without chaos",
    body: "Adjust type, spacing, and visual rhythm without breaking structure.",
    accent: "from-[#1d4ed8]/20 to-[#1d4ed8]/5",
  },
  {
    icon: FileText,
    title: "Sections that fit real careers",
    body: "From projects to publications, include what matters and hide what does not.",
    accent: "from-[#be123c]/20 to-[#be123c]/5",
  },
];

const faqs = [
  {
    q: "Is this actually free?",
    a: "Yes. You can build and download without a paywall or credit card gate.",
  },
  {
    q: "Will this work for ATS systems?",
    a: "Templates are structured for parser compatibility and easy human scanning.",
  },
  {
    q: "Do I need an account before editing?",
    a: "No. Start building immediately. Create an account later if you want sync features.",
  },
  {
    q: "Can I switch templates later?",
    a: "Yes. Your content stays intact while you try different layouts.",
  },
];

function ResumeBeforeCard() {
  return (
    <div className="rounded-2xl border border-[#e2d7cc] bg-[#fffaf4] p-4 sm:p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8a7666]">
        Before
      </p>
      <h3 className="mt-2 text-base font-semibold text-[#4a3a2f]">
        Dense and hard to skim
      </h3>
      <div className="mt-4 space-y-2">
        <div className="h-2 rounded-full bg-[#d8cec4]" />
        <div className="h-2 rounded-full bg-[#d8cec4]" />
        <div className="h-2 w-[92%] rounded-full bg-[#d8cec4]" />
        <div className="h-2 w-[95%] rounded-full bg-[#d8cec4]" />
        <div className="h-2 w-[89%] rounded-full bg-[#d8cec4]" />
      </div>
      <div className="mt-4 rounded-lg border border-[#e8ded4] bg-[#f7eee5] p-3 text-sm text-[#7f6756]">
        One long paragraph, weak action verbs, and no clear outcomes.
      </div>
    </div>
  );
}

function ResumeAfterCard() {
  return (
    <div className="rounded-2xl border border-[#c4dfda] bg-[#f1fffb] p-4 sm:p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
        After
      </p>
      <h3 className="mt-2 text-base font-semibold text-[#0f172a]">
        Structured and recruiter-friendly
      </h3>
      <div className="mt-4 space-y-2">
        <div className="h-2 w-[96%] rounded-full bg-[#b0e0d8]" />
        <div className="h-2 w-[90%] rounded-full bg-[#b0e0d8]" />
        <div className="h-2 w-[86%] rounded-full bg-[#b0e0d8]" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-[#8fd0c4] bg-[#daf5ee] px-2.5 py-1 text-xs font-semibold text-[#0f766e]">
          Action verbs
        </span>
        <span className="rounded-full border border-[#8fd0c4] bg-[#daf5ee] px-2.5 py-1 text-xs font-semibold text-[#0f766e]">
          Quantified impact
        </span>
        <span className="rounded-full border border-[#8fd0c4] bg-[#daf5ee] px-2.5 py-1 text-xs font-semibold text-[#0f766e]">
          ATS clarity
        </span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { user, signOut } = useAuthContext();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  const showIn = (delay = 0) => ({
    initial: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.55,
      delay: prefersReducedMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <div className="homepage-root min-h-screen overflow-x-hidden bg-[#f5f4ef] text-[#121214]">
      <div className="homepage-grid-bg pointer-events-none fixed inset-0 opacity-80" aria-hidden />

      <motion.nav
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 border-b border-[#ded8cf]/80 bg-[#f5f4ef]/92 backdrop-blur"
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="h-8 w-8 text-[#0f766e]" />
            <span className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-tight">
              Resumeable
            </span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="rounded-full px-4 text-sm font-semibold text-[#3f3c36] hover:bg-[#e7e1d8] hover:text-[#111827]"
                >
                  {item.label}
                </Button>
              </Link>
            ))}

            {user ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="rounded-full px-4 text-sm font-semibold text-[#3f3c36] hover:bg-[#e7e1d8]"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="rounded-full px-4 text-sm font-semibold text-[#3f3c36] hover:bg-[#e7e1d8]"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="rounded-full px-4 text-sm font-semibold text-[#3f3c36] hover:bg-[#e7e1d8]"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/builder/new">
                  <Button className="rounded-full bg-[#0f766e] px-5 text-sm font-semibold text-white hover:bg-[#0b5f59]">
                    Start free
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            {user ? (
              <Link href="/dashboard">
                <Button className="rounded-full bg-[#0f766e] px-4 text-sm font-semibold text-white hover:bg-[#0b5f59]">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/builder/new">
                <Button className="rounded-full bg-[#0f766e] px-4 text-sm font-semibold text-white hover:bg-[#0b5f59]">
                  Start
                </Button>
              </Link>
            )}
          </div>
        </div>
      </motion.nav>

      <main>
        <section className="relative px-4 pb-16 pt-28 sm:pb-20 sm:pt-32">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: "easeOut" }}
            >
              <p className="inline-flex items-center rounded-full border border-[#d8d1c7] bg-[#ede7de] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#4f4b44]">
                Built for real job hunts
              </p>

              <h1 className="mt-6 max-w-2xl font-[family-name:var(--font-fraunces)] text-4xl font-semibold leading-[1.05] tracking-tight text-[#111827] sm:text-5xl lg:text-7xl">
                Stop looking like every other AI-generated resume.
              </h1>

              <p className="mt-6 max-w-xl font-[family-name:var(--font-manrope)] text-lg leading-relaxed text-[#3d3a35] sm:text-xl">
                Resumeable helps you turn rough experience into sharp, ATS-safe applications with a design language that feels human, modern, and memorable.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {user ? (
                  <Link href="/dashboard">
                    <Button className="rounded-full bg-[#0f766e] px-7 py-6 text-base font-semibold text-white hover:bg-[#0b5f59]">
                      Go to dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/builder/new">
                    <Button className="rounded-full bg-[#0f766e] px-7 py-6 text-base font-semibold text-white hover:bg-[#0b5f59]">
                      Build my resume
                    </Button>
                  </Link>
                )}

                <Link href="/templates">
                  <Button
                    variant="outline"
                    className="rounded-full border-[#cbc2b7] bg-[#f8f5ef] px-7 py-6 text-base font-semibold text-[#1f2937] hover:bg-[#ede5d9]"
                  >
                    Explore templates
                  </Button>
                </Link>
              </div>

              <p className="mt-4 text-sm font-semibold text-[#6a665e]">
                No credit card required. No watermark. No account gate.
              </p>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: prefersReducedMotion ? 0 : 0.1 }}
              className="homepage-panel relative overflow-hidden rounded-[28px] border border-[#d8cfc3] bg-[#f7f3eb] p-4 shadow-[0_30px_80px_-60px_rgba(16,24,40,0.6)] sm:p-6"
            >
              <div className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-[#0f766e]/10 blur-3xl" />
              <div className="pointer-events-none absolute -left-10 bottom-0 h-36 w-36 rounded-full bg-[#1d4ed8]/10 blur-3xl" />

              <div className="relative grid gap-4 sm:grid-cols-2">
                <motion.div whileHover={prefersReducedMotion ? undefined : { y: -4 }} transition={{ duration: 0.2 }}>
                  <ResumeBeforeCard />
                </motion.div>
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="homepage-float"
                >
                  <ResumeAfterCard />
                </motion.div>
              </div>

              <div className="relative mt-5 rounded-xl border border-[#cde5df] bg-[#e9f7f3] px-4 py-3 text-sm font-semibold text-[#115e59]">
                Cleaner structure + better wording + stronger hierarchy = a resume that gets read.
              </div>
            </motion.div>
          </div>

          <div className="mx-auto mt-14 grid w-full max-w-7xl gap-4 md:grid-cols-3">
            {proofPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                {...showIn(index * 0.06)}
                className="rounded-2xl border border-[#ded6cb] bg-[#faf7f1] p-5"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e3ddd2] text-[#0f766e]">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-medium text-[#111827]">
                  {pillar.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#4f4b44]">{pillar.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl">
            <motion.div {...showIn()} className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f766e]">Wireframe: Resume clinic</p>
              <h2 className="mt-3 font-[family-name:var(--font-fraunces)] text-3xl font-semibold leading-tight text-[#111827] sm:text-5xl">
                A homepage that proves transformation instead of promising it.
              </h2>
            </motion.div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <motion.article
                {...showIn(0.04)}
                whileHover={prefersReducedMotion ? undefined : { y: -5 }}
                className="rounded-2xl border border-[#ded6cb] bg-[#fcfaf6] p-6"
              >
                <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">Problem</h3>
                <p className="mt-3 text-[#4f4b44]">
                  Most resumes are packed with text and weak outcomes. Recruiters skip them in seconds.
                </p>
              </motion.article>

              <motion.article
                {...showIn(0.09)}
                whileHover={prefersReducedMotion ? undefined : { y: -5 }}
                className="rounded-2xl border border-[#ded6cb] bg-[#fcfaf6] p-6"
              >
                <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">Method</h3>
                <p className="mt-3 text-[#4f4b44]">
                  Force clarity: short bullets, measurable impact, and scannable section hierarchy.
                </p>
              </motion.article>

              <motion.article
                {...showIn(0.14)}
                whileHover={prefersReducedMotion ? undefined : { y: -5 }}
                className="rounded-2xl border border-[#c2ddd6] bg-[#effbf8] p-6"
              >
                <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#0f172a]">Outcome</h3>
                <p className="mt-3 text-[#155e75]">
                  A polished resume that passes automated filters and reads cleanly for humans.
                </p>
              </motion.article>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl">
            <motion.div {...showIn()} className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f766e]">How it works</p>
              <h2 className="mt-3 font-[family-name:var(--font-fraunces)] text-3xl font-semibold leading-tight text-[#111827] sm:text-5xl">
                Three deliberate steps, not a bloated workflow.
              </h2>
            </motion.div>

            <div className="relative mt-10 grid gap-5 lg:grid-cols-3">
              <div className="pointer-events-none absolute left-[16.5%] right-[16.5%] top-7 hidden h-px bg-gradient-to-r from-[#dbd2c7] via-[#0f766e]/60 to-[#dbd2c7] lg:block" />

              {workflowSteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  {...showIn(index * 0.07)}
                  whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                  className="relative rounded-2xl border border-[#ded6cb] bg-[#fbf8f3] p-6"
                >
                  <span className="absolute right-5 top-5 text-xs font-bold uppercase tracking-[0.18em] text-[#8d8579]">
                    0{index + 1}
                  </span>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#e4ddd2] text-[#0f766e]">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[#4f4b44]">{step.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl">
            <motion.div {...showIn()} className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f766e]">Builder quality</p>
              <h2 className="mt-3 font-[family-name:var(--font-fraunces)] text-3xl font-semibold leading-tight text-[#111827] sm:text-5xl">
                Modern, smooth, and purposeful by default.
              </h2>
            </motion.div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {sectionCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  {...showIn(index * 0.06)}
                  whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                  className="rounded-2xl border border-[#ddd5ca] bg-[#fdfaf5] p-6"
                >
                  <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br p-3 ${card.accent}`}>
                    <card.icon className="h-6 w-6 text-[#0f172a]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[#4f4b44]">{card.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 pt-16 sm:pb-24 sm:pt-20">
          <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.article
              {...showIn()}
              className="rounded-[28px] border border-[#cdc4b8] bg-[#eaf7f4] p-8 sm:p-10"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f766e]">Final call</p>
              <h2 className="mt-4 font-[family-name:var(--font-fraunces)] text-3xl font-semibold leading-tight text-[#0f172a] sm:text-5xl">
                Your resume should feel intentional, not generated.
              </h2>
              <p className="mt-4 max-w-xl text-[#14532d]">
                Build your next application with cleaner writing, stronger hierarchy, and output that reads like you mean it.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {user ? (
                  <Link href="/dashboard">
                    <Button className="rounded-full bg-[#0f766e] px-7 py-6 text-base font-semibold text-white hover:bg-[#0b5f59]">
                      Open dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/builder/new">
                    <Button className="rounded-full bg-[#0f766e] px-7 py-6 text-base font-semibold text-white hover:bg-[#0b5f59]">
                      Start building for free
                    </Button>
                  </Link>
                )}

                <Link href="/pricing">
                  <Button
                    variant="outline"
                    className="rounded-full border-[#a7c6be] bg-[#f6fffc] px-7 py-6 text-base font-semibold text-[#115e59] hover:bg-[#e7f6f1]"
                  >
                    See pricing
                  </Button>
                </Link>
              </div>
            </motion.article>

            <motion.article
              {...showIn(0.06)}
              className="rounded-[28px] border border-[#dfd7cc] bg-[#fbf8f3] p-8 sm:p-10"
            >
              <h3 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium text-[#111827]">
                Frequently asked
              </h3>
              <div className="mt-6 space-y-4">
                {faqs.map((item) => (
                  <div key={item.q} className="rounded-xl border border-[#e1d8cd] bg-[#fffdf9] p-4">
                    <h4 className="font-semibold text-[#111827]">{item.q}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#4f4b44]">{item.a}</p>
                  </div>
                ))}
              </div>
            </motion.article>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d8d1c7] px-4 py-9">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 text-sm text-[#615d55] sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Logo className="h-6 w-6 text-[#0f766e]" />
            <span className="font-[family-name:var(--font-fraunces)] text-xl font-semibold tracking-tight">
              Resumeable
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/templates" className="hover:text-[#111827]">
              Templates
            </Link>
            <Link href="/resume-examples" className="hover:text-[#111827]">
              Examples
            </Link>
            <Link href="/pricing" className="hover:text-[#111827]">
              Pricing
            </Link>
            <Link href="/privacy" className="hover:text-[#111827]">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#111827]">
              Terms
            </Link>
          </div>

          <p>&copy; {new Date().getFullYear()} Resumeable</p>
        </div>
      </footer>
    </div>
  );
}
