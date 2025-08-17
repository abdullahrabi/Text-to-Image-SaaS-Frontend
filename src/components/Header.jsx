import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'motion/react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import CaptchaModal from "./CaptchaModal"; // ✅ import captcha

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const [showCaptcha, setShowCaptcha] = useState(false); // ✅ captcha state
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowCaptcha(true); // ✅ show captcha if not logged in
    }
  };

  const handleCaptchaSuccess = (token) => {
    console.log("Captcha success ✅ Token:", token);
    // After captcha solved, open login/signup modal
    setShowLogin(true);
  };

  return (
    <motion.div
      className='flex flex-col justify-center items-center text-center my-20'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Tagline */}
      <motion.div
        className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt='' />
      </motion.div>

      {/* Heading */}
      <motion.h1
        className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'
      >
        Turn text to{' '}
        <motion.span
          className='text-blue-600'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.4 }}
        >
          image
        </motion.span>
        , in seconds.
      </motion.h1>

      {/* Description */}
      <motion.p
        className='text-center max-w-xl mx-auto mt-5'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Unleash your creativity with AI. Turn your imagination into visual art in
        seconds - just type, and watch the magic happen.
      </motion.p>

      {/* Button */}
      <motion.button
        onClick={onClickHandler}
        className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          default: { duration: 0.5 },
          opacity: { delay: 0.8, duration: 1 },
        }}
      >
        Generate Images
        <img className='h-6' src={assets.star_group} alt='' />
      </motion.button>

      {/* ✅ Captcha Modal */}
      {showCaptcha && (
        <CaptchaModal
          onVerify={handleCaptchaSuccess}
          onClose={() => setShowCaptcha(false)}
        />
      )}

      {/* Sample images */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className='flex flex-wrap justify-center mt-10 gap-3'
      >
        {Array(6)
          .fill('')
          .map((_, index) => (
            <motion.img
              key={index}
              whileHover={{ scale: 1.05 }}
              className='rounded cursor-pointer max-sm:w-10'
              src={
                index % 2 === 0
                  ? assets.sample_img_2
                  : assets.sample_img_1
              }
              alt=''
              width={70}
            />
          ))}
      </motion.div>

      {/* Footer text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className='mt-2 text-neutral-600'
      >
        Generated images from imagify
      </motion.p>
    </motion.div>
  );
};

export default Header;
