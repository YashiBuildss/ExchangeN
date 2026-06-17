'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const { signup } = useAuth();
  const router = useRouter();

  const signupForm = useFormik({
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-8 sm:p-10 rounded-xl bg-gray-900 shadow-2xl space-y-6 text-center">
        <h1 className="text-2xl font-bold text-white leading-snug">Join XchangeN Today</h1>
        <p className="text-gray-400 text-sm">
          Create your free account and start exchanging skills with others.
        </p>

        <form onSubmit={signupForm.handleSubmit} className="space-y-4 pt-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              onChange={signupForm.handleChange}
              value={signupForm.values.name}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {signupForm.errors.name && (
              <p className="text-red-400 text-xs mt-1 text-left">{signupForm.errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={signupForm.handleChange}
              value={signupForm.values.email}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {signupForm.errors.email && (
              <p className="text-red-400 text-xs mt-1 text-left">{signupForm.errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={signupForm.handleChange}
              value={signupForm.values.password}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {signupForm.errors.password && (
              <p className="text-red-400 text-xs mt-1 text-left">{signupForm.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={signupForm.isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-150 shadow-lg"
          >
            {signupForm.isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-gray-400 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-blue-400 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;