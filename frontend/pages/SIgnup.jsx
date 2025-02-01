import React from 'react';

const Signup = () => {
  return (
    <>
    {/* Sign Up Form */}
    <h1 className="text-3xl font-semibold mb-5 text-black">Create Account</h1>
    <input type="text" placeholder="Name" className="bg-[#c3bef0] w-72 h-10 p-3 rounded-lg mb-2" />
    <input type="text" placeholder="Username" className="bg-[#c3bef0] w-72 h-10 p-3 rounded-lg mb-2" />
    <input type="email" placeholder="Email" className="bg-[#c3bef0] w-72 h-10 p-3 rounded-lg mb-2" />
    <input type="password" placeholder="Password" className="bg-[#c3bef0] w-72 h-10 p-3 rounded-lg mb-2" />
    <button className="mt-4 h-10 w-24 bg-gradient-to-r from-[#430f58] to-[#6643b5] text-white rounded-lg uppercase font-semibold">
      Sign Up
    </button>
  </>
  );
};

export default Signup;