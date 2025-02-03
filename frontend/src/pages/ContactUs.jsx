import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";



const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (

    <div
    className="w-150 bg-[#c3bef0]  text-black  px-4 py-2 rounded-lg text-lg font-semibold opacity-100  transition-all duration-300"
    style={{ boxShadow: "0 0 1rem #ffffff, inset 0 0 1rem #ffffff" }}
  >
    <h1 className="text-4xl font-extrabold text-center text-black mt-6 mb-8">
      Contact Us
    </h1>
  
    <form onSubmit={handleSubmit} className="space-y-1">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-black"
          aria-label="Your Name"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="px-2 w-full px-4 py-2 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 placeholder:text-xl placeholder-opacity-50"
          placeholder="Enter your name"
        />
      </div>
  
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-black"
          aria-label="Your Email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 placeholder:text-xl placeholder-opacity-50"
          placeholder="Enter your email"
        />
      </div>
  
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-black"
          aria-label="Your Message"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white text-black border rounded-lg focus:ring-2 focus:ring-blue-500 placeholder:text-xl placeholder-opacity-50"
          rows="4"
          placeholder="Your message"
        ></textarea>
      </div>
  
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#edb1f1] to-blue-900 hover:from-blue-600 hover:to-blue-800 text-black px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-300"
      >
        Send Message
      </button>
    </form>
  
    <div className="mt-8  text-center">
      <h3 className="text-black font-semibold space-y-20 text-lg">Follow Us:</h3>
      <div className="flex flex gap-8 justify-center space-y-20 mt-4 space-x-6">
        <a
          href="https://instagram.com"
          target="_blank"
          aria-label="Instagram"
          className="text-white hover:text-pink-500 transition-all"
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          aria-label="Twitter"
          className="text-white hover:text-blue-500 transition-all"
        >
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          aria-label="GitHub"
          className="text-white hover:text-gray-500 transition-all"
        >
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
      </div>
    </div>
  </div>
    );
};

export default ContactUs;