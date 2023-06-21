import { useEffect } from "react"
import propTypes from 'prop-types'
import {
    ModalOverlay,
    ModalWindow,
    ModalImg
  } from './Modal.styled'

export const Modal = ({src, closeModal}) => {
    useEffect(() => {
        const onEscPress = evt => {
            if( evt.code === 'Escape' ) {
                closeModal()
            }
        } 

        window.addEventListener('keydown', onEscPress)
        return () => {
            document.removeEventListener("keydown", onEscPress);
          }
      }, [closeModal])
    
    
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

Modal.propTypes = {
    src: propTypes.string.isRequired,
    closeModal: propTypes.func.isRequired,
  };