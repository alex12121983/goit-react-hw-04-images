import React from 'react'
import PropTypes from 'prop-types';
import { List } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'

export const ImageGallery = ({images, openModal}) => {
    return(
        <List>
            {images.map(el => (
                <ImageGalleryItem 
                    key={el.id}
                    smallImgSrc={el.webformatURL}
                    largeImgSrc={el.largeImageURL}
                    openModal={openModal}
                />
            ))}
        </List>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.object({
            smallImgSrc: PropTypes.string.isRequired,
            largeImgSrc: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        }).isRequired
    ),
    openModal: PropTypes.func.isRequired,
  };