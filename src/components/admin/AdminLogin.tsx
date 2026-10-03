import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ArrowRight,
  Shield,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react';
import { getBrowserSupabaseClient } from '../../lib/supabase';

interface AdminLoginProps {
  onSuccess: () => void;
  onBackToWebsite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToWebsite }) => {
  // Requirement: Admin email must NOT be pre-filled or displayed anywhere
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Forgot password flow
  const [viewMode, setViewMode] = useState<'login' | 'forgot_password'>('login');
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccessMsg, setResetSuccessMsg] = useState('');
  const [resetErrorMsg, setResetErrorMsg] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setErrorMsg('Please enter both your administrator email and password.');
      return;
    }

    const supabase = getBrowserSupabaseClient();
    if (!supabase) {
      setErrorMsg('Supabase client is not available. Please verify environment settings.');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes('invalid login credentials')) {
          setErrorMsg('Invalid credentials. Please check your email and password.');
        } else if (error.message.toLowerCase().includes('email not confirmed')) {
          setErrorMsg('Email address not yet confirmed. Please verify your Supabase user account.');
        } else {
          setErrorMsg(error.message || 'Invalid credentials. Login failed.');
        }
        setIsLoading(false);
        return;
      }

      if (data?.session) {
        setIsLoading(false);
        onSuccess();
      } else {
        setErrorMsg('Authentication did not return a valid session.');
        setIsLoading(false);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Invalid credentials or connection error. Please try again.');
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetErrorMsg('');
    setResetSuccessMsg('');

    const cleanEmail = resetEmail.trim();
    if (!cleanEmail) {
      setResetErrorMsg('Please enter your administrator email address.');
      return;
    }

    const supabase = getBrowserSupabaseClient();
    if (!supabase) {
      setResetErrorMsg('Supabase client is not available.');
      return;
    }

    setResetLoading(true);
    try {
      // Supabase real email-based password reset
      const redirectUrl = `${window.location.origin}/admin`;
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: redirectUrl,
      });

      if (error) {
        console.error('Supabase password reset error:', error);
        setResetErrorMsg(error.message || 'Unable to send reset instructions.');
      } else {
        setResetSuccessMsg(
          'Password reset email sent! Please check your inbox for instructions to reset your administrator password.'
        );
      }
    } catch (err: any) {
      setResetErrorMsg(err.message || 'Failed to dispatch reset email.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F1] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-[#E2E8E0] selection:text-[#1E3A2B]">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(156,175,136,0.12)_0%,rgba(30,58,43,0.04)_50%,transparent_70%)] blur-3xl" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* School Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white p-2 shadow-xs border border-[#9CAF88]/30 mb-4">
            <img
              src="/little-noor-logo.svg"
              alt="Little Noor Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E3A2B] tracking-tight">
            Little Noor Montessori School
          </h1>
          <p className="text-xs sm:text-sm text-[#1E3A2B]/70 font-medium mt-1">
            Bhuj, Kutch · Staff Administration Portal
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white py-8 px-6 sm:px-10 shadow-botanical-lg rounded-3xl border border-[#9CAF88]/30 relative overflow-hidden">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#1E3A2B] via-[#C8A96B] to-[#9CAF88]" />

          {viewMode === 'login' ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#1E3A2B] flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#9CAF88]" />
                    <span>Staff Portal Sign In</span>
                  </h2>
                  <p className="text-xs text-[#1E3A2B]/60 mt-0.5">
                    Authorized staff & admin credentials required
                  </p>
                </div>
              </div>

              {errorMsg && (
                <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4" autoComplete="off">
                <div>
                  <label className="block text-xs font-bold text-[#1E3A2B] uppercase tracking-wider mb-1.5">
                    Staff Email
                  </label>
                  <div className="relative rounded-2xl shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="staff@littlenoor.com"
                      autoComplete="off"
                      className="block w-full pl-10 pr-4 py-3 text-sm text-[#1E3A2B] bg-[#FAF8F1]/60 border border-[#9CAF88]/40 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9CAF88] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#1E3A2B] uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setViewMode('forgot_password');
                        setErrorMsg('');
                        setResetErrorMsg('');
                        setResetSuccessMsg('');
                      }}
                      className="text-xs text-[#C8A96B] hover:text-[#b49354] font-medium transition-colors cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative rounded-2xl shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      autoComplete="current-password"
                      className="block w-full pl-10 pr-11 py-3 text-sm text-[#1E3A2B] bg-[#FAF8F1]/60 border border-[#9CAF88]/40 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9CAF88] focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-2xl text-sm font-bold text-[#FAF8F1] bg-[#1E3A2B] hover:bg-[#284f3a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E3A2B] transition-all transform active:scale-[0.99] disabled:opacity-60 cursor-pointer shadow-botanical-md"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#FAF8F1] border-t-transparent rounded-full animate-spin" />
                        <span>Verifying Session...</span>
                      </span>
                    ) : (
                      <>
                        <span>Sign In to Staff Portal</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              {/* Forgot Password Flow */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('login');
                    setResetErrorMsg('');
                    setResetSuccessMsg('');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A2B]/70 hover:text-[#1E3A2B] mb-3 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </button>
                <h2 className="text-lg font-bold text-[#1E3A2B] flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-[#C8A96B]" />
                  <span>Reset Administrator Password</span>
                </h2>
                <p className="text-xs text-[#1E3A2B]/60 mt-0.5">
                  Enter your admin email to receive a secure recovery link via Supabase Auth.
                </p>
              </div>

              {resetErrorMsg && (
                <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{resetErrorMsg}</span>
                </div>
              )}

              {resetSuccessMsg ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{resetSuccessMsg}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setViewMode('login')}
                    className="w-full py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors"
                  >
                    Return to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E3A2B] uppercase tracking-wider mb-1.5">
                      Registered Admin Email
                    </label>
                    <div className="relative rounded-2xl shadow-xs">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="admin@school.com"
                        className="block w-full pl-10 pr-4 py-3 text-sm text-[#1E3A2B] bg-[#FAF8F1]/60 border border-[#9CAF88]/40 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9CAF88] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold text-[#FAF8F1] bg-[#1E3A2B] hover:bg-[#284f3a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E3A2B] transition-all disabled:opacity-60 cursor-pointer shadow-botanical-md"
                  >
                    {resetLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Reset Instructions...</span>
                      </span>
                    ) : (
                      <span>Send Password Reset Email</span>
                    )}
                  </button>
                </form>
              )}
            </>
          )}

          {/* Bottom link to Return to Website */}
          <div className="mt-6 pt-5 border-t border-[#9CAF88]/20 text-center">
            <button
              type="button"
              onClick={onBackToWebsite}
              className="inline-flex items-center gap-1.5 text-xs text-[#1E3A2B]/75 hover:text-[#1E3A2B] font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public School Website</span>
            </button>
          </div>
        </div>

        {/* Security watermark */}
        <div className="text-center mt-6 text-[11px] text-[#1E3A2B]/50 font-sans flex items-center justify-center gap-1.5">
          <Shield className="w-3 h-3 text-[#9CAF88]" />
          <span>Encrypted with Supabase JWT & Row Level Security</span>
        </div>
      </div>
    </div>
  );
};
