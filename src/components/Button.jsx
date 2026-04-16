import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ 
  children, 
  to, 
  variant = 'primary', 
  className = '', 
  onClick, 
  type = 'button' 
}) => {
  const classes = `btn btn-${variant} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
