import React from 'react';

const Login = () => {
  return (
    <>
    {/* Sign In Form */}
      <h1 className="text-3xl font-semibold mb-5">Sign In</h1>
      <span className="text-xl mb-3">or use your email & password</span>
      <input type="email" placeholder="Email" className="bg-[#c3bef0] w-72 h-10 p-3 my-2 rounded-lg" />
      <input type="password" placeholder="Password" className="bg-[#c3bef0] w-72 h-10 p-3 my-2 rounded-lg" />
      <button className="mt-4 h-10 w-24 bg-gradient-to-r from-[#430f58] to-[#6643b5] text-white rounded-lg uppercase font-semibold">
        Sign In
      </button>
    </>
  );
};

export default Login;
