"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import {
  Palette,
  Download,
  Zap,
  MousePointerClick,
  Sparkles,
  FileText,
  Shield,
  Clock,
  LogOut,
} from "lucide-react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { useAuthContext } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";

// ── Animation variants ──────────────────────────────────────────────────

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

const wordRevealVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const singleWordVariant = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, damping: 20, stiffness: 150 },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, damping: 20, stiffness: 100 },
  },
};

// ── 3D tilt card ────────────────────────────────────────────────────────

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  function handleMouse(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Section wrapper with scroll-triggered reveal ────────────────────────

function RevealSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ── Main page ───────────────────────────────────────────────────────────

export default function HomePage() {
  const { user, signOut } = useAuthContext();
  const router = useRouter();
  const heroWords = "Build a resume that".split(" ");

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── Navigation ──────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div
              custom={0}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-2"
            >
              <Logo className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">Resumeable</span>
            </motion.div>

            <div className="flex items-center gap-4">
              <motion.div
                custom={1}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link href="/templates">
                  <Button variant="ghost">Templates</Button>
                </Link>
              </motion.div>
              <motion.div
                custom={1}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link href="/resume-examples">
                  <Button variant="ghost">Examples</Button>
                </Link>
              </motion.div>
              <motion.div
                custom={1}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link href="/pricing">
                  <Button variant="ghost">Pricing</Button>
                </Link>
              </motion.div>
              {user ? (
                <>
                  <motion.div
                    custom={2}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link href="/dashboard">
                      <Button variant="ghost">Dashboard</Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    custom={3}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Button variant="ghost" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </Button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    custom={2}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link href="/login">
                      <Button variant="ghost">Sign in</Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    custom={3}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link href="/builder/new">
                      <Button>Get Started</Button>
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-32 px-4 overflow-hidden grain-overlay">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="gradient-orb gradient-orb-1" />
          <div className="gradient-orb gradient-orb-2" />
          <div className="gradient-orb gradient-orb-3" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Left: text content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              variants={wordRevealVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-2"
            >
              {heroWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={singleWordVariant}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 150,
                delay: 0.5,
              }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              <span className="gradient-text-animated animate-shimmer">
                stands out
              </span>
            </motion.h1>

            <motion.p
              custom={0.6}
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0"
            >
              Create professional, ATS-friendly resumes in minutes.
              Drag-and-drop editor, beautiful templates, instant PDF
              download&nbsp;&mdash; no design skills needed. And yes, it&apos;s free.
            </motion.p>

            <motion.div
              custom={0.8}
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              className="flex gap-4 justify-center lg:justify-start"
            >
              {user ? (
                <Link href="/dashboard">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      size="lg"
                      className="text-lg px-8 glow-primary glow-primary-hover transition-shadow duration-300"
                    >
                      Go to Dashboard
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <>
                  <Link href="/builder/new">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        size="lg"
                        className="text-lg px-8 glow-primary glow-primary-hover transition-shadow duration-300"
                      >
                        Create Your Resume
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/templates">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-lg px-8"
                      >
                        Browse Templates
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </motion.div>

            {/* Lightweight trust signal — no fake numbers */}
            <motion.p
              custom={1.0}
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              className="mt-6 text-sm text-muted-foreground"
            >
              No credit card required&nbsp;&middot;&nbsp;No watermarks&nbsp;&middot;&nbsp;No catch
            </motion.p>
          </div>

          {/* Right: floating resume mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex-1 flex justify-center"
          >
            <div className="animate-float" style={{ perspective: 800 }}>
              <div className="w-[280px] sm:w-[320px] bg-card border border-border rounded-xl shadow-2xl p-6 space-y-4">
                {/* Mockup header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">JD</span>
                  </div>
                  <div>
                    <div className="h-3 w-28 bg-foreground/80 rounded-full" />
                    <div className="h-2 w-20 bg-muted-foreground/40 rounded-full mt-1.5" />
                  </div>
                </div>
                {/* Mockup body lines */}
                <div className="space-y-2.5 pt-2 border-t border-border">
                  <div className="h-2 w-full bg-muted rounded-full" />
                  <div className="h-2 w-5/6 bg-muted rounded-full" />
                  <div className="h-2 w-4/6 bg-muted rounded-full" />
                </div>
                <div className="space-y-2.5 pt-3">
                  <div className="h-2.5 w-24 bg-primary/30 rounded-full" />
                  <div className="h-2 w-full bg-muted rounded-full" />
                  <div className="h-2 w-5/6 bg-muted rounded-full" />
                  <div className="h-2 w-3/6 bg-muted rounded-full" />
                </div>
                <div className="space-y-2.5 pt-3">
                  <div className="h-2.5 w-20 bg-primary/30 rounded-full" />
                  <div className="flex gap-2">
                    <div className="h-5 w-14 bg-primary/15 rounded-md" />
                    <div className="h-5 w-12 bg-primary/15 rounded-md" />
                    <div className="h-5 w-16 bg-primary/15 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────────── */}
      <RevealSection className="py-24 border-t border-border/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeSlideUp}
            custom={0}
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
          >
            Ready in three steps
          </motion.h2>
          <motion.p
            variants={fadeSlideUp}
            custom={0.1}
            className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto text-lg"
          >
            No account needed to get started. Just pick, fill, and download.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-10"
          >
            {[
              {
                step: "01",
                icon: MousePointerClick,
                title: "Pick a template",
                description:
                  "Choose from ATS-friendly layouts designed to pass automated screening and impress real humans.",
              },
              {
                step: "02",
                icon: Sparkles,
                title: "Fill in your details",
                description:
                  "Drag-and-drop sections, reorder bullets, tweak colours and fonts — see changes in real time.",
              },
              {
                step: "03",
                icon: Download,
                title: "Download your PDF",
                description:
                  "Export a clean, perfectly formatted PDF that's ready to submit to any job application.",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={cardVariant}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="block text-xs font-semibold text-primary/60 uppercase tracking-widest mb-1">
                  Step {item.step}
                </span>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </RevealSection>

      {/* ── Features Section ────────────────────────────────────────── */}
      <RevealSection className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeSlideUp}
            custom={0}
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
          >
            Everything you need to land the interview
          </motion.h2>
          <motion.p
            variants={fadeSlideUp}
            custom={0.1}
            className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto text-lg"
          >
            We kept the stuff that matters and ditched everything that gets in
            the way.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Palette,
                title: "Professional Templates",
                description:
                  "ATS-optimized layouts that look great on screen and survive automated resume parsers.",
              },
              {
                icon: Zap,
                title: "Real-time Preview",
                description:
                  "Every edit shows up instantly — no refreshing, no guessing. What you see is exactly what you get.",
              },
              {
                icon: Download,
                title: "Export to PDF",
                description:
                  "One click and your resume downloads as a clean, properly formatted PDF. Done.",
              },
              {
                icon: FileText,
                title: "15+ Section Types",
                description:
                  "Experience, education, skills, projects, certifications, languages, volunteer work, and more.",
              },
              {
                icon: Shield,
                title: "Your Data Stays Yours",
                description:
                  "We don't sell your info. Anonymous drafts live in your browser — sign up only if you want cloud saves.",
              },
              {
                icon: Clock,
                title: "No Signup Required",
                description:
                  "Start building immediately. Create an account later if you want to save or access from other devices.",
              },
            ].map((feature) => (
              <motion.div key={feature.title} variants={cardVariant}>
                <TiltCard>
                  <div className="card-shine p-8 rounded-xl border border-border bg-card hover:shadow-xl transition-shadow duration-300">
                    <motion.div
                      variants={{
                        hidden: { scale: 0.5, opacity: 0 },
                        visible: {
                          scale: 1,
                          opacity: 1,
                          transition: {
                            type: "spring" as const,
                            damping: 10,
                            stiffness: 200,
                          },
                        },
                      }}
                      className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10"
                    >
                      <feature.icon className="h-7 w-7 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </RevealSection>

      {/* ── Why Resumeable (replaces fake stats) ────────────────────── */}
      <RevealSection className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeSlideUp}
            custom={0}
            className="text-3xl sm:text-4xl font-bold text-center mb-14"
          >
            Why people pick Resumeable
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-8"
          >
            {[
              {
                title: "Actually free",
                body: "No sneaky paywall after you spend 20 minutes building your resume. Build it, download it, done.",
              },
              {
                title: "ATS-tested templates",
                body: "Our layouts are designed to pass applicant tracking systems — the robots that filter resumes before a human ever sees them.",
              },
              {
                title: "Built for speed",
                body: "Most people finish a resume in under 10 minutes. Drag sections around, tweak the style, export. That's it.",
              },
              {
                title: "No account wall",
                body: "Start building the second you land on the page. Your draft saves locally. Sign up only when you're ready.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={cardVariant}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </RevealSection>

      {/* ── CTA Section ─────────────────────────────────────────────── */}
      <RevealSection className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 cta-gradient animate-gradient opacity-90" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.h2
            variants={fadeSlideUp}
            custom={0}
            className="text-3xl sm:text-4xl font-bold mb-4 text-white"
          >
            Your resume shouldn&apos;t take all day
          </motion.h2>
          <motion.p
            variants={fadeSlideUp}
            custom={0.15}
            className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Pick a template, fill in your details, and download a polished PDF —
            all in under 10 minutes.
          </motion.p>
          <motion.div variants={fadeSlideUp} custom={0.3}>
            {user ? (
              <Link href="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block"
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-lg px-10 pulse-glow"
                  >
                    Go to Dashboard
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <Link href="/builder/new">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block"
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-lg px-10 pulse-glow"
                  >
                    Start Building — It&apos;s Free
                  </Button>
                </motion.div>
              </Link>
            )}
          </motion.div>
        </div>
      </RevealSection>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <RevealSection className="py-10 border-t border-border">
        <motion.footer
          variants={fadeSlideUp}
          custom={0}
          className="max-w-7xl mx-auto px-4 text-center text-muted-foreground"
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <Link
              href="/templates"
              className="hover:text-foreground transition-colors"
            >
              Templates
            </Link>
            <span>&middot;</span>
            <Link
              href="/resume-examples"
              className="hover:text-foreground transition-colors"
            >
              Examples
            </Link>
            <span>&middot;</span>
            <Link
              href="/pricing"
              className="hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <span>&middot;</span>
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <span>&middot;</span>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
          <p>
            &copy; {new Date().getFullYear()} Resumeable. All rights reserved.
          </p>
        </motion.footer>
      </RevealSection>
    </div>
  );
}
