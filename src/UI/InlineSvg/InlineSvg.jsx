import PropTypes from 'prop-types';

export const InlineSvg = ({href}) => (
  <svg>
    <use href={href} />
  </svg>
);

InlineSvg.propTypes = {
  href: PropTypes.string,
};
