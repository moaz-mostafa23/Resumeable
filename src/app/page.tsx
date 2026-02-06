"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Palette,
  Download,
  Zap,
  Users,
  Star,
  CheckCircle,
} from "lucide-react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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

// ── Animated counter hook ───────────────────────────────────────────────

function useAnimatedCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

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
  const heroWords = "Build a resume that".split(" ");
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const resumeCount = useAnimatedCounter(10000, 2000, statsInView);
  const templateCount = useAnimatedCounter(25, 1500, statsInView);
  const satisfactionRate = useAnimatedCounter(98, 1800, statsInView);

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
              <FileText className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">ResumeBuilder</span>
            </motion.div>

            <div className="flex items-center gap-4">
              <motion.div
                custom={1}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link href="/login">
                  <Button variant="ghost">Sign in</Button>
                </Link>
              </motion.div>
              <motion.div
                custom={2}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link href="/signup">
                  <Button>Get Started</Button>
                </Link>
              </motion.div>
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
            {/* Animated headline */}
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

            {/* Gradient accent word */}
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

            {/* Subtitle */}
            <motion.p
              custom={0.6}
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0"
            >
              Create professional, ATS-friendly resumes in minutes with our
              intuitive drag-and-drop builder. No design skills needed.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              custom={0.8}
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              className="flex gap-4 justify-center lg:justify-start"
            >
              <Link href="/signup">
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
              <Link href="/login">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8"
                  >
                    Sign In
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
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

      {/* ── Features Section ────────────────────────────────────────── */}
      <RevealSection className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeSlideUp}
            custom={0}
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
          >
            Everything you need to land your dream job
          </motion.h2>
          <motion.p
            variants={fadeSlideUp}
            custom={0.1}
            className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto text-lg"
          >
            Powerful tools designed to make resume building effortless and effective.
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
                  "Choose from beautiful, ATS-optimized templates designed by career experts.",
              },
              {
                icon: Zap,
                title: "Real-time Preview",
                description:
                  "See changes instantly as you type. What you see is what you get.",
              },
              {
                icon: Download,
                title: "Export to PDF",
                description:
                  "Download your resume as a perfectly formatted PDF, ready to submit.",
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

      {/* ── Stats / Social Proof Section ────────────────────────────── */}
      <RevealSection className="py-24">
        <div
          ref={statsRef}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.h2
            variants={fadeSlideUp}
            custom={0}
            className="text-3xl sm:text-4xl font-bold text-center mb-14"
          >
            Trusted by thousands of job seekers
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="grid sm:grid-cols-3 gap-8 text-center"
          >
            {[
              {
                icon: Users,
                value: resumeCount,
                suffix: "+",
                label: "Resumes Created",
              },
              {
                icon: Star,
                value: templateCount,
                suffix: "+",
                label: "Pro Templates",
              },
              {
                icon: CheckCircle,
                value: satisfactionRate,
                suffix: "%",
                label: "Satisfaction Rate",
              },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={cardVariant}
                className="p-8 rounded-xl border border-border bg-card"
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-4xl font-bold mb-1">
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
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
            Ready to build your resume?
          </motion.h2>
          <motion.p
            variants={fadeSlideUp}
            custom={0.15}
            className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Join thousands of job seekers who have landed their dream jobs with
            our resume builder. Get started in under a minute.
          </motion.p>
          <motion.div
            variants={fadeSlideUp}
            custom={0.3}
          >
            <Link href="/signup">
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
                  Get Started for Free
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </RevealSection>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <RevealSection className="py-10 border-t border-border">
        <motion.div
          variants={fadeSlideUp}
          custom={0}
          className="max-w-7xl mx-auto px-4 text-center text-muted-foreground"
        >
          <p>&copy; {new Date().getFullYear()} ResumeBuilder. All rights reserved.</p>
        </motion.div>
      </RevealSection>
    </div>
  );
}
