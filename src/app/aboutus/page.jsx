'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const values = [
  {
    title: 'No money.',
    desc: 'Skill swaps are purely time-for-time. No credits, no payments, no subscriptions. Ever.',
  },
  {
    title: 'Real people.',
    desc: 'Profiles show real skills, not curated highlights. You see what someone actually wants to teach and learn.',
  },
  {
    title: 'Community first.',
    desc: 'There are no ads, no algorithm pushing people with more followers. Every swap is equally visible.',
  },
  {
    title: 'Keep it small.',
    desc: "We'd rather build something genuinely useful for a small community than scale aggressively and lose what makes it work.",
  },
];

const revealCard = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};
const revealStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function About() {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">

      {/* Hero */}
      <section className="py-24 px-4 border-b border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-5"
          >
            Built for people who&apos;d rather{' '}
            <span className="text-amber-400">trade than pay.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            XchangeN is a peer-to-peer skill exchange platform. You teach what you know.
            You learn what you need. No money changes hands.
          </motion.p>
        </div>
      </section>

      {/* What we're building */}
      <section className="py-20 px-4 border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold mb-5">What we&apos;re building</h2>
            <div className="text-gray-400 space-y-4 leading-relaxed">
              <p>
                Most platforms that promise to connect learners with teachers end up charging for the connection.
                We think that&apos;s backwards. Knowledge isn&apos;t a product — it&apos;s something people have always shared with each other.
              </p>
              <p>
                XchangeN is a simple tool: post what you can teach, post what you want to learn, find someone who wants the opposite,
                and work something out directly. We don&apos;t take a cut. We don&apos;t intermediate. We just make the matching easier.
              </p>
              <p>
                Right now it&apos;s early. The community is small. That&apos;s fine — we&apos;re building something we&apos;d use ourselves.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold mb-10"
          >
            What we care about
          </motion.h2>

          <motion.div
            variants={revealStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={revealCard}
                whileHover={{ y: -4 }}
                className="bg-[#161616] border border-white/5 rounded-2xl p-7 hover:border-amber-500/20 transition-all duration-300"
              >
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-amber-400 mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold mb-3">Want to be part of it?</h2>
          <p className="text-gray-500 text-sm mb-7">It&apos;s free. Sign up and post your first skill.</p>
          <Link
            href="/signup"
            className="inline-block px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a0a0a] font-semibold text-sm transition-colors shadow-lg shadow-amber-500/20"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

    </main>
  );
}
