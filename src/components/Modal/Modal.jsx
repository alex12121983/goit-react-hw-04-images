import { useEffect } from "react";
import propTypes from 'prop-types';
import {
    ModalOverlay,
    ModalWindow,
    ModalImg
  } from './Modal.styled';

export const Modal = ({src, closeModal}) => {
    useEffect(() => {
        window.addEventListener('keydown', onEscPress)
        return () => {
            document.removeEventListener("keydown", onEscPress);
          };
      }, [])
    
    const onEscPress = evt => {
        if( evt.code === 'Escape' ) {
            closeModal()
        }
    }
    const onBackClick = evt => {
        if ( evt.currentTarget === evt.target ) {
            closeModal()
        }
    }
    return (
        <ModalOverlay onClick={onBackClick}>
            <ModalWindow>
                <ModalImg src={src} alt="" />
            </ModalWindow>
        </ModalOverlay>
    )
}

// class Modal extends  Component {
//     componentDidMount(){
//         window.addEventListener('keydown', this.onEscPress)
//     }
//     componentWillUnmount(){
//         window.removeEventListener('keydown', this.onEscPress)
//     }
//     onEscPress = evt => {
//         if( evt.code === 'Escape' ) {
//             this.props.closeModal()
//         }
//     }
//     onBackClick = evt => {
//         if ( evt.currentTarget === evt.target ) {
//             this.props.closeModal()
//         }
//     }
//     render(){
//         const {src} = this.props
//         return (
//             <ModalOverlay onClick={this.onBackClick}>
//                 <ModalWindow>
//                     <ModalImg src={src} alt="" />
//                 </ModalWindow>
//             </ModalOverlay>
//         )
//     }
// }

// export default Modal

Modal.propTypes = {
    src: propTypes.string.isRequired,
    closeModal: propTypes.func.isRequired,
  };