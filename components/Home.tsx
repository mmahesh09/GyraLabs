"use client";

/* ============================== IMPORTS ============================== */
import { cn } from "@/lib/utils";
import AnoAI from "@/components/animated-shader-background";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { SocialProofAvatars } from "@/components/ui/social-proof-avatars";
import { LogoCloud } from "@/components/logo-cloud-2";
import { Particles } from "@/components/ui/particles";
import { Features } from "@/components/features-4";
import Bento from "@/components/Bento"
import { TestimonialsSectionDemo } from "@/components/test"

/* ========================== SOCIAL PROOF DATA ========================= */
const avatars = [
  { src: "/avatars/1.jpg", alt: "Alex" },
  { src: "/avatars/2.jpg", alt: "Priya" },
  { src: "/avatars/3.jpg", alt: "Daniel" },
  { src: "/avatars/4.jpg", alt: "Sophia" },
  { src: "/avatars/5.jpg", alt: "Rahul" },
];

/* ============================== COMPONENT ============================= */
export default function Home() {
  return (
    <>
      <main className="relative bg-[#0b0f0c]">
        {/* ============================ HERO ============================ */}
        <div className="relative min-h-screen overflow-hidden">
          {/* Shader */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <AnoAI />
          </div>

          {/* Grid */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-[1]",
              "[background-size:22px_22px]",
              "[background-image:radial-gradient(#1f2a22_1px,transparent_1px)]"
            )}
          />

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,transparent_45%,#0b0f0c)]" />

          {/* ======================== HERO CONTENT ======================== */}
          <section
            className="
              relative z-10 mx-auto
              flex min-h-screen max-w-6xl
              flex-col items-center
              px-6 pt-40 pb-24
              text-center
            "
          >
            {/* Badge */}
            <a
              href="/about"
              className="
                mb-10 inline-flex items-center gap-2
                rounded-full px-4 py-1.5
                text-sm font-medium text-purple-300
                bg-[#0b0f0c]
                transition-all duration-300
                shadow-[inset_3px_3px_6px_#060807,inset_-3px_-3px_6px_#101613]
                hover:shadow-[3px_3px_10px_#060807,-3px_-3px_10px_#101613]
                hover:text-purple-200
              "
            >
              ✨ About GyraLabs
            </a>

            {/* Heading */}
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              AI-Powered
              <span className="mt-4 block">
                <TypingAnimation
                  className="
                    bg-gradient-to-r
                    from-purple-400 via-violet-500 to-purple-600
                    bg-clip-text text-transparent
                  "
                >
                  Agentic Intelligence
                </TypingAnimation>
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-10 max-w-2xl text-base text-neutral-400 md:text-lg">
              Build, deploy, and orchestrate autonomous AI agents with real-time
              intelligence, memory, and decision-making.
            </p>

            {/* Social Proof */}
            <div className="mt-10 flex flex-col items-center gap-3">
              <SocialProofAvatars avatars={avatars} extraCount={70} />
              <p className="text-sm text-neutral-400">
                Trusted by{" "}
                <strong className="font-semibold text-white">
                  70+ teams
                </strong>{" "}
                worldwide
              </p>
            </div>

            {/* CTA */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
              <button
                className="
                  inline-flex items-center gap-2
                  rounded-full bg-purple-600 px-8 py-3
                  text-sm font-medium text-white
                  shadow-[0_10px_30px_rgba(147,51,234,0.35)]
                  transition-all duration-300
                  hover:bg-purple-500
                "
              >
                Start for free →
              </button>

              <button className="text-sm font-medium text-neutral-300 hover:text-white">
                Explore Docs →
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-28 flex flex-col items-center gap-2 text-neutral-400">
              <div className="relative h-10 w-6 rounded-full border border-white/20">
                <span
                  className="
                    absolute left-1/2 top-2
                    h-1.5 w-1.5
                    -translate-x-1/2
                    rounded-full bg-white/60
                  "
                  style={{ animation: "scroll-dot 1.5s infinite ease-in-out" }}
                />
              </div>
              <span className="text-xs tracking-wide">Scroll</span>
            </div>
          </section>
        </div>

        {/* ========================== LOGO CLOUD ========================== */}
        <section className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="mb-8 text-lg font-medium text-neutral-400 md:text-2xl">
            Companies we{" "}
            <span className="font-semibold text-purple-400">
              Collaborate
            </span>{" "}
            with
          </h2>
          <LogoCloud />
        </section>

        {/* =================== FEATURES + PARTICLES =================== */}
        <section className="relative overflow-hidden bg-[#0b0f0c]">
          <div className="pointer-events-none absolute inset-0 z-0">
            <Particles />
          </div>
          <div className="relative z-10">
            <Features />
          </div>
        </section>

        {/* ============================ ABOUT ============================ */}
        <section
          id="about"
          className="mx-auto max-w-5xl px-6 py-32 text-center"
        >
          <h2 className="text-3xl font-semibold text-white">
            About GyraLabs
          </h2>
          <p className="mt-6 text-neutral-400">
            GyraLabs builds agentic AI systems designed for autonomy, memory,
            and real-time intelligence at scale.
          </p>
        </section>
      </main>
<Bento/>
      <TestimonialsSectionDemo />
    </>
  );
}
