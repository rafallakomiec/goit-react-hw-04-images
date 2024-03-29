import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({onClick}) => {
  return (
    <button className={css.button} onClick={onClick}>
      Load More
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
