import React from 'react'
import { BtnElement } from './Button.styled'
import PropTypes from 'prop-types';

export const Button = ({children, loadMore}) => {
	return (
		<BtnElement 
			onClick={loadMore}
		>
			{children}
		</BtnElement>
	)
}

// class Button extends Component {
// render(){
// 	const {children, loadMore} = this.props
// 	return (
// 			<BtnElement 
// 				onClick={loadMore}
// 			>
// 				{children}
// 			</BtnElement>
// 		)
// 	}
// }

// export default Button

Button.propTypes = {
	children: PropTypes.string.isRequired,
	onClick: PropTypes.func,
  };