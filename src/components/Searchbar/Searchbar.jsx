import { useState } from 'react'
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import { 
    Header, 
    SearchForm, 
    SearchFormButton, 
    SearchFormButtonLabel, 
    SearchFormInput 
} from './Searchbar.styled';

export const Searchbar = ({handleSearch}) => {
    const [value, setValue] = useState('')

    const handleChange = ({ target: { value } }) => {
        setValue(value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        if (value.trim() === '') {
            return Notiflix.Notify.warning(
              'Please enter key words for search.',
            );
          }
        handleSearch(value)
        setValue('')
    }

    return (
        <>
            <Header>
                <SearchForm onSubmit={handleSubmit}>
                    <SearchFormButton type="submit">
                        <SearchFormButtonLabel>
                            Search
                        </SearchFormButtonLabel>
                    </SearchFormButton>
                    <SearchFormInput
                        className="input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleChange}
                        value={value}
                    />
                </SearchForm>
            </Header>
        </>
    )
}

Searchbar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
  };