import { motion } from 'framer-motion';

const AnimatedSection = ({ 
  children, 
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 0.8
}) => {
  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration, delay, ease: [0.16, 1, 0.3, 1] } }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration, delay, ease: 'easeOut' } }
    },
    slideInRight: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0, transition: { duration, delay, ease: [0.16, 1, 0.3, 1] } }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={variants[animation]}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
