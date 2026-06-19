'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import DotGridBackground from '@/components/DotGridBackground';

const prompts = [
  '"guitar lessons for web design help"',
  '"Spanish tutoring for Python coaching"',
  '"photography skills for cooking lessons"',
  '"UI/UX feedback for yoga sessions"',
  '"video editing for English practice"',
];

const features = [
  {
    title: 'Real profiles.',
    desc: 'List what you can teach and what you want to learn. No fake ratings, no paid boosts.',
  },
  {
    title: 'Live chat & calls.',
    desc: 'Message directly, share files, hop on a voice or video call — everything in one place.',
  },
  {
    title: 'Browse by skill.',
    desc: 'Filter the Exchange board by category. Find your match and start a conversation.',
  },
];

const steps = [
  { num: '01', title: 'Post a skill', desc: 'Tell the community what you can teach and what you want to learn in return.' },
  { num: '02', title: 'Find a match', desc: 'Browse the Exchange board. When someone fits, message them directly.' },
  { num: '03', title: 'Swap and connect', desc: 'Arrange your sessions however works for you. No platform cut, no fees.' },
];

const faqs = [
  {
    q: 'Is XchangeN free?',
    a: 'Yes — completely free. No subscription, no transaction fees, no hidden costs.',
  },
  {
    q: 'How does a skill swap work?',
    a: 'Post what you can teach and what you want to learn. Browse for people who want the opposite. Message them, agree on a format, and go.',
  },
  {
    q: 'What kinds of skills can I exchange?',
    a: 'Anything teachable — coding, languages, music, cooking, fitness, photography, design, writing. If you can explain it, you can swap it.',
  },
  {
    q: "Do I need to be an expert?",
    a: "No. You just need to know more about something than the person you're swapping with. Beginners teach beginners all the time.",
  },
];

const wordAnim = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const revealCard = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const revealStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } };

export default function Home() {
  const [promptIdx, setPromptIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setPromptIdx((i) => (i + 1) % prompts.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="bg-[#0a0a0a] text-white">

      {/* Hero */}
      <DotGridBackground>
        <section className="min-h-[92vh] flex flex-col items-center justify-center px-4 text-center py-24">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-medium tracking-wide mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Free · No fees · Community-driven
          </motion.div>

          <motion.h1
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="font-[family-name:var(--font-space-grotesk)] text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
          >
            {['Trade', 'skills,'].map((w, i) => (
              <motion.span key={i} variants={wordAnim} className="inline-block mr-[0.2em]">{w}</motion.span>
            ))}
            <br />
            {['not', 'money.'].map((w, i) => (
              <motion.span key={i} variants={wordAnim} className="inline-block mr-[0.2em] text-amber-400">{w}</motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="text-gray-400 text-lg max-w-xl mb-4"
          >
            XchangeN connects people who want to teach something with people who want to learn something. No money changes hands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="h-7 mb-10 text-sm text-gray-500"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={promptIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="block italic"
              >
                e.g. {prompts[promptIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/signup"
              className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a0a0a] font-semibold text-sm transition-colors shadow-lg shadow-amber-500/20"
            >
              Start Swapping Free
            </Link>
            <Link
              href="/exchange"
              className="px-7 py-3.5 rounded-xl border border-white/10 text-gray-300 hover:border-white/25 hover:text-white text-sm font-medium transition-colors"
            >
              Browse Skills
            </Link>
          </motion.div>
        </section>
      </DotGridBackground>

      {/* Features */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-14 text-center"
          >
            Built for real exchanges.
          </motion.h2>

          <motion.div
            variants={revealStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={revealCard}
                whileHover={{ y: -4 }}
                className="bg-[#161616] border border-white/5 rounded-2xl p-8 hover:border-amber-500/20 hover:shadow-[0_0_28px_rgba(245,158,11,0.08)] transition-all duration-300"
              >
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-14 text-center"
          >
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-3">How it works.</h2>
            <p className="text-gray-500 text-sm">Three steps. No setup fee. No catch.</p>
          </motion.div>

          <motion.div
            variants={revealStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {steps.map((s) => (
              <motion.div
                key={s.num}
                variants={revealCard}
                whileHover={{ y: -4 }}
                className="bg-[#161616] border border-white/5 rounded-2xl p-8 hover:border-amber-500/20 transition-all duration-300"
              >
                <p className="text-amber-400/50 font-mono text-sm font-semibold mb-5">{s.num}</p>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-white mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-12 text-center"
          >
            Common questions.
          </motion.h2>

          <motion.div
            variants={revealStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-3"
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={revealCard} className="border border-white/5 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-white hover:bg-white/3 transition-colors"
                >
                  <span className="font-medium text-sm">{faq.q}</span>
                  <span className={`text-amber-400 text-lg leading-none transition-transform duration-200 ml-4 flex-shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-4">Ready to start swapping?</h2>
            <p className="text-gray-400 mb-8">Join a community of people trading skills, not money. It takes 30 seconds to sign up.</p>
            <Link
              href="/signup"
              className="inline-block px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a0a0a] font-semibold transition-colors shadow-lg shadow-amber-500/20"
            >
              Create Your Free Account
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
