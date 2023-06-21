import React from 'react'
import { BtnElement } from './Button.styled'
import PropTypes from 'prop-types';

export const Button = ({children, loadMore}) => {
	return (
		<BtnElement onClick={loadMore}>
			{children}
		</BtnElement>
	)
}

Button.propTypes = {
	children: PropTypes.string.isRequired,
	onClick: PropTypes.func,
  };