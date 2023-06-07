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
	const [searchText, setSearchText] = useState('')
	const [page, setPage] = useState(1)
	const [images, setImages] = useState([])
	const [largeImageURL, setLargeImageURL] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isShowLoadMoreBtn, setIsShowLoadMoreBtn] = useState(false)
	const [isShowModal, setIsShowModal] = useState(false)

	useEffect((prevProps, prevState) => {
		const text = searchText.trim()
		const page = page
		if (prevState.searchText !== text || 
            prevState.page !== page)
			{
				setIsLoading(true)
            	fetchImages( text, page )
        	}
	}, [searchText, page])

	const handleSearch = (searchText) => {
		setSearchText(searchText)
		setPage(1)
		setImages([])
		// this.setState({
		// 	searchText, 
		// 	page: 1,
		// 	images: [],
		// })
	}

	const handleLoadMoreButton = () => {
		setPage(prev => prev + 1)
        // this.setState(prevState => ({
        //     page: prevState.page + 1}))
    }

	const openModal = (largeImageURL) => {
		setIsShowModal(true)
		setLargeImageURL(largeImageURL)
		// this.setState({
		// 	isShowModal: true, 
		// 	largeImageURL,
		// })
	}

	const closeModal = () => {
		setIsShowModal(false)
		setLargeImageURL('')
		// this.setState({
		// 	isShowModal: false,
		// 	largeImageURL: '',
		// })
	}

	const fetchImages = async (text, page) => { 
		try {
			await getSearchImages(text, page).then((data) => {
				const images = data.hits
				const total = data.total
				const finalPage = Math.ceil(Number(total) / 12)
				if ( images.length === 0 ) {
					setIsShowLoadMoreBtn(false)
					// this.setState({isShowLoadMoreBtn: false})
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
					// this.setState((prevState) => ({
					// 	images: [...prevState.images, ...images]
					// }))
				}
				if ( images.length > 0 && page === 1 ) {
					Notiflix.Notify.success(
						`Hooray! We found ${total} images.`,
					  )
				}
				finalPage > page 
				? setIsShowLoadMoreBtn(true)
				: setIsShowLoadMoreBtn(false)
				// ? this.setState({isShowLoadMoreBtn: true})
				// : this.setState({isShowLoadMoreBtn: false})
			})
		} catch (error) {
			console.log(error)
			Notiflix.Notify.failure(
			'Sorry, something went wrong, please try again later',
		  );
		} finally {
			setIsLoading(false)
			// this.setState({isLoading: false})
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
				{this.state.isShowLoadMoreBtn && 
					<Button 
						loadMore={handleLoadMoreButton}
					>
						load more
					</Button>
				}
			</Container>
			{ isLoading && (<Loader />) }
			{isShowModal && (
				<Modal
					src={largeImageURL}
					closeModal={closeModal}
				/>)
			}
		</>
	)
}
// export class App extends Component {
// 	state = { 
// 		searchText: '', 
// 		page: 1,
// 		images: [],
// 		largeImageURL: '',
// 		isLoading: false,
//         isShowLoadMoreBtn: false, 
// 		isShowModal: false,  
// 	}

// 	componentDidUpdate(prevProps, prevState){
//         const text = this.state.searchText.trim()
//         const page = this.state.page
// 		if (prevState.searchText !== text || 
//             prevState.page !== page) {
//             this.setState({isLoading: true})
//             this.fetchImages( text, page )
//         }
//     }

// 	handleSearch = (searchText) => {
// 		this.setState({
// 			searchText, 
// 			page: 1,
// 			images: [],
// 		})
// 	}

// 	handleLoadMoreButton = () => {
//         this.setState(prevState => ({
//             page: prevState.page + 1}))
//     }

// 	openModal = (largeImageURL) => {
// 		this.setState({
// 			isShowModal: true, 
// 			largeImageURL,
// 		})
// 	}

// 	closeModal = () => {
// 		this.setState({
// 			isShowModal: false,
// 			largeImageURL: '',
// 		})
// 	}
// 	async  fetchImages (text, page) { 
// 		try {
// 			await getSearchImages(text, page).then((data) => {
// 				const images = data.hits
// 				const total = data.total
// 				const finalPage = Math.ceil(Number(total) / 12)
// 				if ( images.length === 0 ) {
// 					this.setState({isShowLoadMoreBtn: false})
// 					Notiflix.Notify.failure(
// 						'Sorry, there are no images matching your search query. Please try again.',
// 					  )
// 					  return
// 				}else{
// 					this.setState((prevState) => ({
// 						images: [...prevState.images, ...images]
// 					}))
// 				}
// 				if ( images.length > 0 && this.state.page === 1 ) {
// 					Notiflix.Notify.success(
// 						`Hooray! We found ${total} images.`,
// 					  )
// 				}
// 				finalPage > page 
// 				? this.setState({isShowLoadMoreBtn: true})
// 				: this.setState({isShowLoadMoreBtn: false})
// 			})
// 		} catch (error) {
// 			console.log(error)
// 			Notiflix.Notify.failure(
// 			'Sorry, something went wrong, please try again later',
// 		  );
// 		} finally {
// 			this.setState({isLoading: false})
// 		}
// 	} 
// 	render(){
// 		return (
// 			<>
// 				<Searchbar handleSearch={this.handleSearch} />
// 				<Container>
// 					<ImageGallery 
// 						images={this.state.images}
// 						openModal={this.openModal}
// 					/>
// 					{this.state.isShowLoadMoreBtn && 
// 						<Button 
// 							loadMore={this.handleLoadMoreButton}
// 						>
// 							load more
// 						</Button>
// 					}
// 				</Container>
// 				{ this.state.isLoading && (<Loader />) }
// 				{this.state.isShowModal && (
// 					<Modal
// 						src={this.state.largeImageURL}
// 						closeModal={this.closeModal}
// 					/>)
// 				}
// 			</>
// 		)
// 	}
// }

// export default App
