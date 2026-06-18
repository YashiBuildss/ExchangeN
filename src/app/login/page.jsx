'use client';
import { useFormik } from 'formik';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await login(values.email, values.password);
        router.push('/profile');
      } catch (err) {
        setFieldError('password', err.message || 'Login failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-8 sm:p-10 rounded-xl bg-gray-900 shadow-2xl space-y-6 text-center">
        <h1 className="text-2xl font-bold text-white leading-snug">
          Log in to XchangeN
        </h1>
        <p className="text-gray-400 text-sm">
          Access your account and continue exchanging skills.
        </p>

        <form onSubmit={loginForm.handleSubmit} className="space-y-4 pt-4">
          <input
            type="email"
            placeholder="Email Address"
            id="email"
            name="email"
            onChange={loginForm.handleChange}
            value={loginForm.values.email}
            required
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div>
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {loginForm.errors.password && (
              <p className="text-red-400 text-xs mt-1 text-left">{loginForm.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loginForm.isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-150 shadow-lg"
          >
            {loginForm.isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="pt-4 space-y-3">
          <div className="flex items-center justify-center gap-2 border border-white py-2 px-4 rounded shadow-sm hover:bg-gray-800 transition cursor-pointer">
             <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="h-5 w-5"
                alt="Google Icon"
              />
            <span className="text-sm text-white font-medium">Continue with Google</span>
          </div>

          <button className="flex items-center justify-center gap-2 border border-white bg-gray-900 text-white w-full py-2 rounded hover:bg-gray-800 transition">
            <img
              src="https://imgs.search.brave.com/vCdtYxKx6gX9OeegOZkJaFuzNEZWW2H8Y8fZIr0fPLA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91eHdp/bmcuY29tL3dwLWNv/bnRlbnQvdGhlbWVz/L3V4d2luZy9kb3du/bG9hZC9icmFuZHMt/YW5kLXNvY2lhbC1t/ZWRpYS9mYWNlYm9v/ay1hcHAtcm91bmQt/d2hpdGUtaWNvbi5z/dmc"
              className="h-5 w-5"
              alt="Facebook Icon"
            />
            <span className="text-sm text-white font-medium">Continue with Facebook</span>
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center pt-2">
          By logging in, I declare that I have read and accepted{' '}
          <a href="#" className="text-blue-500 underline">
            XchangeN's Terms of Use
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-500 underline">
            Privacy Policy
          </a>
          .
        </p>

        <p className="text-center text-white text-sm">
          Need an account?{' '}
          <a href="/signup" className="text-blue-500 underline font-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;