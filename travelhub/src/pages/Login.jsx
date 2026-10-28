import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { getUserProfile } from '../services/authService';

const requestedPathIsAdmin = (location) => location.state?.from?.pathname?.startsWith('/admin');

const Login = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [platformRole, setPlatformRole] = useState(() => (
    requestedPathIsAdmin(location) ? 'cms-admin' : 'student'
  ));
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    let signedInUid = null;

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      signedInUid = user.uid;
      const profile = await getUserProfile(user.uid);
      const selectedAdminPortal = platformRole !== 'student';
      const accountIsAdmin = profile?.role === 'admin';

      if (!profile || selectedAdminPortal !== accountIsAdmin) {
        await signOut(auth);
        signedInUid = null;
        setError(!profile
          ? 'Your account profile could not be found. Please contact an administrator.'
          : selectedAdminPortal
            ? 'This account is not authorized for the selected staff portal. Choose Student / Traveler or use an authorized admin account.'
            : 'This account is assigned to an admin portal. Select Faculty / Admin or CMS Admin to continue.');
        return;
      }

      const requestedPath = location.state?.from?.pathname;
      const requestedPathIsAdminPortal = requestedPath?.startsWith('/admin') ?? false;
      const canReturnToRequestedPath = requestedPath
        && requestedPath !== '/login'
        && requestedPath !== '/register'
        && requestedPathIsAdminPortal === selectedAdminPortal;
      navigate(canReturnToRequestedPath ? requestedPath : selectedAdminPortal ? '/admin' : '/dashboard', { replace: true });
    } catch (authError) {
      if (signedInUid && auth.currentUser?.uid === signedInUid) {
        try {
          await signOut(auth);
        } catch (signOutError) {
          console.error('Unable to sign out after role verification failed.', signOutError);
        }
      }
      setError(authError.code === 'auth/invalid-credential'
        ? 'Email or password is incorrect.'
        : authError.code
          ? 'Unable to sign in or verify your platform role. Check your connection and account permissions.'
          : 'Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-wrapper login-role-login">
      
      {/* Header Section */}
      <div className="login-header">
        <div className="brand-logo">
          <div className="logo-circle">
            <svg className="globe-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </div>
          <span className="brand-name">TravelHub</span>
        </div>
        <h1>Welcome Back</h1>
        <p>Sign in to continue planning your adventures</p>
      </div>

      {/* Main Login Card */}
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          {error && <p role="alert">{error}</p>}

          <fieldset className="login-role-picker">
            <legend>Choose your platform role</legend>
            <label className={platformRole === 'student' ? 'is-selected' : ''}>
              <input
                type="radio"
                name="platformRole"
                value="student"
                checked={platformRole === 'student'}
                onChange={(event) => setPlatformRole(event.target.value)}
              />
              <span><strong>Student / Traveler</strong><small>Plan trips and manage your itinerary</small></span>
            </label>
            <label className={platformRole === 'faculty-admin' ? 'is-selected' : ''}>
              <input
                type="radio"
                name="platformRole"
                value="faculty-admin"
                checked={platformRole === 'faculty-admin'}
                onChange={(event) => setPlatformRole(event.target.value)}
              />
              <span><strong>Faculty / Admin</strong><small>Staff access to CMS and trip reviews</small></span>
            </label>
            <label className={platformRole === 'cms-admin' ? 'is-selected' : ''}>
              <input
                type="radio"
                name="platformRole"
                value="cms-admin"
                checked={platformRole === 'cms-admin'}
                onChange={(event) => setPlatformRole(event.target.value)}
              />
              <span><strong>CMS Admin</strong><small>Manage destinations and TravelHub content</small></span>
            </label>
            {platformRole !== 'student' && (
              <p className="login-role-note">Staff access is verified against your existing account role. Choosing an option here does not grant admin permissions.</p>
            )}
          </fieldset>
          
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button 
                type="button" 
                className="toggle-password" 
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit-btn" disabled={isSubmitting}>
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>

      {/* Footer Link */}
      <div className="login-footer">
        Don't have an account? <Link to="/register">Create one free</Link>
      </div>
      
    </div>
  );
};

export default Login;