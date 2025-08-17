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
    <div className="">
      
       
        
        <Turnstile
          sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
          onVerify={(token) => {
            onVerify(token);
            onClose(); // close modal after success
          }}
          theme="dark"
        />

       
      
    </div>
  );
};

export default CaptchaModal;
