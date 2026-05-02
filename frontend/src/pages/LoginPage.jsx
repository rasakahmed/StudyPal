import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: 'demo@studypal.test', password: 'Password123!', remember: true });

  const submit = async (event) => {
    event.preventDefault();
    try {
      await login({ email: form.email, password: form.password });
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-md">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <p className="mt-2 text-sm text-gray-500">Continue to your StudyPal workspace.</p>
      <div className="mt-8 space-y-4">
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} /> Remember me</label>
          <a className="font-semibold text-primary-600" href="mailto:support@studypal.local">Forgot password?</a>
        </div>
        <button className="btn-primary w-full" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
      </div>
      <p className="mt-6 text-center text-sm text-gray-500">New here? <Link className="font-semibold text-primary-600" to="/register">Create an account</Link></p>
    </form>
  );
}
