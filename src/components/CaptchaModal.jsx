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
      <div className="bg-transparent p-6 rounded-2xl  max-w-md text-center">
       
        
        <Turnstile
          sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
          onVerify={(token) => {
            onVerify(token);
            onClose(); // close modal after success
          }}
          theme="dark"
        />

        
         
      </div>
    </div>
  );
};

export default CaptchaModal;
