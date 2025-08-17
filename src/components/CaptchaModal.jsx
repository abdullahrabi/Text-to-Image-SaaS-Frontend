import React, { useEffect } from "react";
import Turnstile from "react-turnstile";

const CaptchaModal = ({ onVerify, onClose }) => {
  // disable scroll when modal opens
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md text-center">
        <h2 className="text-lg font-semibold mb-4">Verify Captcha</h2>
        
        <Turnstile
          sitekey={import.meta.env.CLOUDFLARE__SITE_KEY}
          onVerify={(token) => {
            onVerify(token);
            onClose(); // close modal after success
          }}
          theme="dark"
        />

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CaptchaModal;
