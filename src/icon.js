import './icon.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

const Icon = ({img, a}) => {
	return (
	  <div className="icon">
		<img className="icon_img" src={img} alt="icon" />
		<ProgressBar completed={a} />
	  </div>
	);
}



Icon.propTypes = {
	// You can declare that a prop is a specific JS primitive. By default, these
	// are all optional.
	name: PropTypes.string,
	img: PropTypes.string.isRequired
};
export default Icon;
