import { motion } from 'framer-motion'
import LoginForm from '../components/auth/LoginForm'
import LoginIllustration from '../components/illustrations/LoginIllustration'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Illustration Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex items-center justify-center"
        >
          <LoginIllustration className="w-full max-w-md h-auto" />
        </motion.div>

        {/* Login Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-white dark:bg-[#112217] rounded-xl p-8 border border-gray-200 dark:border-white/10">
            <div className="text-center mb-8">
              {/* Small illustration for mobile */}
              <div className="lg:hidden flex justify-center mb-4">
                <LoginIllustration className="w-48 h-auto opacity-60" />
              </div>
              <h1 className="text-gray-900 dark:text-white text-3xl font-black mb-2">
                Wellbeing Dashboard
              </h1>
              <p className="text-gray-600 dark:text-[#92c9a4] text-sm">
                Sign in to continue your wellbeing journey
              </p>
            </div>
            <LoginForm />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login

