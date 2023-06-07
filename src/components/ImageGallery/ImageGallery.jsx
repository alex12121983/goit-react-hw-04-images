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

// class ImageGallery extends Component {

//     render(){
//         const {images, openModal} = this.props
//         return(
//                 <List>
//                     {images.map(el => (
//                         <ImageGalleryItem 
//                             key={el.id}
//                             smallImgSrc={el.webformatURL}
//                             largeImgSrc={el.largeImageURL}
//                             openModal={openModal}
//                         />
//                     ))}
//                 </List>
//             )
//     }
// }

// export default ImageGallery

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    openModal: PropTypes.func.isRequired,
  };