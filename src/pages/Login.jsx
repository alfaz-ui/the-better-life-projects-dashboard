import { motion } from 'framer-motion'
import LoginForm from '../components/auth/LoginForm'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#112217] rounded-xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl font-black mb-2">
              Wellbeing Dashboard
            </h1>
            <p className="text-[#92c9a4] text-sm">
              Sign in to continue your wellbeing journey
            </p>
          </div>
          <LoginForm />
        </div>
      </motion.div>
    </div>
  )
}

export default Login

