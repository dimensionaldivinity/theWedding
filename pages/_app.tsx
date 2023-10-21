'use client';
import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import '../styles/global.scss'
import {AuthContextProvider} from './api/authcontext'


function handleExitComplete() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 })
  }
}

// loader component


function MyApp({ Component, pageProps }: any) {
  const router = useRouter()
  return (
    
    <AuthContextProvider>
    <div>
      <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </div>
    </AuthContextProvider>
    
  )
}

export default MyApp
