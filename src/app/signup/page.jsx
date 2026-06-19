'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const inputClass =
  'w-full p-3 rounded-lg bg-[#0a0a0a] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-colors text-sm';

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();

  const form = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Min 6 characters').required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await signup(values.name, values.email, values.password);
        router.push('/profile');
      } catch (err) {
        setFieldError('email', err.message || 'Signup failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-amber-600/4 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-[#161616] border border-amber-500/15 rounded-2xl p-8 shadow-2xl space-y-6"
      >
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white mb-1">Join XchangeN</h1>
          <p className="text-gray-500 text-sm">Create your free account and start swapping skills.</p>
        </div>

        <form onSubmit={form.handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              onChange={form.handleChange}
              value={form.values.name}
              className={inputClass}
            />
            {form.errors.name && form.touched.name && (
              <p className="text-red-400 text-xs mt-1">{form.errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={form.handleChange}
              value={form.values.email}
              className={inputClass}
            />
            {form.errors.email && form.touched.email && (
              <p className="text-red-400 text-xs mt-1">{form.errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              onChange={form.handleChange}
              value={form.values.password}
              className={inputClass}
            />
            {form.errors.password && form.touched.password && (
              <p className="text-red-400 text-xs mt-1">{form.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={form.isSubmitting}
            className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#0a0a0a] font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {form.isSubmitting ? 'Creating account…' : 'Create Free Account'}
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-amber-400 hover:text-amber-300 transition-colors">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
