'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-violet-100">
        <div className='justify-center border-2 border-indigo-300 rounded-lg shadow-xl w-96 px-6 py-6 '>
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
            Sign in to your account
          </h2>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-black" >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder=' Enter your email'
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-md border-2 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 border-indigo-300 text-black px-2"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
                    Password
                  </label>
                  <div className="text-sm">
                    <div onClick={() => router.push('/forgot-password')} className="cursor-pointer font-semibold text-indigo-400 hover:text-indigo-300">
                      Forgot password?
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="email"
                    placeholder=' Enter your password'
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        signIn('credentials', { email, password, redirect: false, callbackUrl: '/' })
                          .then(async () => {
                            await router.push("/");
                          })
                          .catch((error) => {
                            toast("Credentials do not match!", { type: "error" });
                          });
                      }
                    }}
                    required
                    className="block w-full rounded-md border-2 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6  border-indigo-300 text-black px-2"
                  />

                </div>
              </div>

              <div>
                <button
                  onClick={() => signIn('credentials', { email, password, redirect: false, callbackUrl: '/' }).then(async () => {
                    await router.push("/");
                  })
                    .catch((e) => {
                      toast("Credentials do not match!", { type: "error" });
                    })}
                  disabled={!email || !password}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-violet-500 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}