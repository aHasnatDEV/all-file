import React, { useRef } from 'react';

const FormWithValidation = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const message = messageRef.current.value.trim();

    // Perform validation
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
    } else if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
    } else {
      // Do something with the form data (e.g., submit it to a server)
      alert('Form submitted successfully!');
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <form className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          className="w-full border rounded-lg p-2"
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          className="w-full border rounded-lg p-2"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
          Message:
        </label>
        <textarea
          id="message"
          ref={messageRef}
          className="w-full border rounded-lg p-2"
          rows="4"
          placeholder="Enter your message"
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormWithValidation;
