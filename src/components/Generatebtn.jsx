import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'motion/react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import CaptchaModal from "./CaptchaModal";
const Generatebtn = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowCaptcha
      setShowLogin(true);
    }
  };
   const handleLoginClick = () => {
    setShowCaptcha(true); // show captcha first
  };

  const handleCaptchaSuccess = (token) => {
    console.log("Captcha success ✅ Token:", token);
    // Now show login modal (or signup) after captcha solved
    setShowLogin(true);
  };


  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='pb-16 text-center'
    >
      <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>
        See the magic. Try now
      </h1>

      <motion.button
        onClick={onClickHandler}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto'
      >
        Generate Images
        <img className='h-6' src={assets.star_group} alt='' />
      </motion.button>
    </motion.div>
    
  );
   {showCaptcha && (
        <CaptchaModal
          onVerify={handleCaptchaSuccess}
          onClose={() => setShowCaptcha(false)}
        />
      )}
};

export default Generatebtn;
