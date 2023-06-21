import { useState, useEffect } from 'react'
import Notiflix from 'notiflix';

import { getSearchImages } from '../api/getSearchImages';

import { Searchbar } from './Searchbar/Searchbar'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from './Button/Button'
import { Modal } from './Modal/Modal'
import { Loader } from  './Loader/Loader'
import { Container } from './App.styled';

export const App = () => {
	const [images, setImages] = useState([])
	const [searchText, setSearchText] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [isShowModal, setIsShowModal] = useState(false)
	const [largeImageURL, setLargeImageURL] = useState('')

	const [isShowLoadMoreBtn, setIsShowLoadMoreBtn] = useState(false)
	

	useEffect(() => {
		if(!searchText) {
			return;
		}
	setIsLoading(true)
    fetchImages( searchText, page )
	}, [searchText, page])

	const handleSearch = (searchText) => {
		setSearchText(searchText)
		setPage(1)
		setImages([])
	}

	const handleLoadMoreButton = () => {
		setPage(prev => prev + 1)
    }

	const openModal = (largeImageURL) => {
		setIsShowModal(true)
		setLargeImageURL(largeImageURL)
	}

	const closeModal = () => {
		setIsShowModal(false)
		setLargeImageURL('')
	}

	const fetchImages = async (text, page) => { 
		try {
			await getSearchImages(text, page).then((data) => {
				const images = data.hits
				const total = data.total
				const finalPage = Math.ceil(Number(total) / 12)
				if ( images.length === 0 ) {
					setIsShowLoadMoreBtn(false)
					Notiflix.Notify.failure(
						'Sorry, there are no images matching your search query. Please try again.',
					  )
					  return
				}else{
					setImages(prev => {
						return [
							...prev,
							...images,
							]
						})
				}
				if ( images.length > 0 && page === 1 ) {
					Notiflix.Notify.success(
						`Hooray! We found ${total} images.`,
					  )
				}
				finalPage > page 
				? setIsShowLoadMoreBtn(true)
				: setIsShowLoadMoreBtn(false)
			})
		} catch (error) {
			console.log(error)
			Notiflix.Notify.failure(
			'Sorry, something went wrong, please try again later',
		  );
		} finally {
			setIsLoading(false)
		}
	} 

	return (
		<>
			<Searchbar handleSearch={handleSearch} />
			<Container>
				<ImageGallery 
					images={images}
					openModal={openModal}
				/>
				{isShowLoadMoreBtn && 
					<Button 
						loadMore={handleLoadMoreButton}
					>
						load more
					</Button>
				}
			</Container>
			{isLoading && (<Loader />)}
			{isShowModal && (
				<Modal
					src={largeImageURL}
					closeModal={closeModal}
				/>)
			}
		</>
	)
}
