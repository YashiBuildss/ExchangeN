'use client';

import { useFormik } from 'formik';
import { motion } from 'framer-motion';

const inputClass =
  'w-full p-3 rounded-lg bg-[#0a0a0a] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-colors text-sm';

export default function Contact() {
  const form = useFormik({
    initialValues: { name: '', email: '', message: '' },
    onSubmit: (values, { resetForm }) => {
      console.log('Contact form:', values);
      alert('Message sent. We\'ll get back to you.');
      resetForm();
    },
  });

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <section className="py-24 px-4 border-b border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-4"
          >
            Get in touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-gray-400"
          >
            Questions, feedback, bug reports — we read everything.
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#161616] border border-amber-500/10 rounded-2xl p-8"
          >
            <form
              onSubmit={(e) => { e.preventDefault(); form.handleSubmit(e); }}
              className="space-y-5"
            >
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Your name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  onChange={form.handleChange}
                  value={form.values.name}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Email address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={form.handleChange}
                  value={form.values.email}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="What's on your mind?"
                  onChange={form.handleChange}
                  value={form.values.message}
                  required
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#0a0a0a] font-semibold text-sm transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          <p className="text-center text-gray-600 text-xs mt-6">
            You can also reach us at{' '}
            <span className="text-gray-400">support@xchangen.com</span>
          </p>
        </div>
      </section>
    </main>
  );
}
