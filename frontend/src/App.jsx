import FloatingShape from "./components/FloatingShape"
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore } from './store/authStore.js';
import { useEffect } from "react"
import Dashboard from "./pages/Dashboard.jsx"
import { Toaster } from "react-hot-toast";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx"
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx"
import LoadingSpinner from "./components/LoadingSpinner.jsx"



//redirect authenticated users to home page
const RedirectAuthenticatedUser =  ({children}) => {
  const {isAuthenticated,user} = useAuthStore();

  if(isAuthenticated && user.isVerified){
    return <Navigate to="/" replace/>
  }
  return children;
};
//protect routes that require authentication 
const ProtectedRoute = ({children})=>{
  const { isAuthenticated,user } =useAuthStore();
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}
  return children;
}
function App() {
  const { isCheckingAuth,checkAuth } = useAuthStore();
  useEffect(()=>{
    checkAuth()
  },[checkAuth]);
  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-800 to emerald-200 flex items-center justify-center relative overflow-hidden">
        <FloatingShape color="bg-red-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
        <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
		    <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
                <Dashboard/>
            </ProtectedRoute>}/>
          <Route path='/signup' element={
            <RedirectAuthenticatedUser>
              <SignUpPage/>
            </RedirectAuthenticatedUser>
            }/>
          <Route path='/login' element={
            <RedirectAuthenticatedUser>
                  <LoginPage/>
              </RedirectAuthenticatedUser>}/>
          <Route path='/verify-email' element={<EmailVerificationPage/>}/>
          <Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
          <Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
				{/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />

        </Routes>
        <Toaster />
    </div>
  )
}

export default App