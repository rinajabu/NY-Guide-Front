import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';

const App = () => {

///////////////////// STATES ////////////////////////
const [newTitle, setNewTitle] = useState('')
const [newCategory, setNewCategory] = useState('')
const [newLocation, setNewLocation] = useState('')
const [newImage, setNewImage] = useState('')
const [newDescription, setNewDescription] = useState('')
const [newPrice, setNewPrice] = useState('')
const [newRating, setNewRating] = useState('')

////////////////// EVENT HANDLERS ///////////////////

///// create form /////
// title
const handleNewTitleChange = (event) => {
  setNewTitle(event.target.value)
}

// category
const handleNewCategoryChange = (event) => {
  setNewCategory(event.target.value)
}

// location
const handleNewLocationChange = (event) => {
  setNewLocation(event.target.value)
}

// image
const handleNewImageChange = (event) => {
  setNewImage(event.target.value)
}

// description
const handleNewDescriptionChange = (event) => {
  setNewDescription(event.target.value)
}

// price
const handleNewPriceChange = (event) => {
  setNewPrice(event.target.value)
}

// rating
const handleNewRatingChange = (event) => {
  setNewRating(event.target.value)
}

// create form submit
const handleNewFormSubmit = (event) => {
  event.preventDefault()
  axios.post(
    'http://localhost:3000/nyguide',
    {
      title: newTitle,
      category: newCategory,
      location: newLocation,
      image: newImage,
      description: newDescription,
      price: newPrice,
      rating: newRating
    }
  )
}

///////////////////// RETURN ///////////////
  return (
    <main>
      <h1>NY Guide</h1>
      <section>
        <h2>Create NY Recommendation</h2>
        <form onSubmit={handleNewFormSubmit}>
          <label for="title">Title </label> 
          <input type="text" onChange={handleNewTitleChange} /><br/>
          <label for="category">Category </label>
          <select onChange={handleNewCategoryChange} >
            <option value="outdoor">Outdoor</option>
            <option value="food">Food</option>
            <option value="museum">Museum</option>
            <option value="sight-seeing">Sight Seeing</option>
            <option value="night-life">Night Life</option>
          </select><br/>
          <label for="location">Location </label> 
          <input type="text" onChange={handleNewLocationChange} /><br/>
          <label for="images">Image </label> 
          <input type="url" onChange={handleNewImageChange} /><br/>
          <label for="description">Description </label> 
          <input type="text" onChange={handleNewDescriptionChange} /><br/>
          <label for="price">Price </label>
          <select onChange={handleNewPriceChange} >
            <option value="price-1">$</option>
            <option value="price-2">$$</option>
            <option value="price-3">$$$</option>
            <option value="price-4">$$$$</option>
            <option value="price-5">$$$$$</option>
          </select><br/>
          <label for="rating">Rating </label>
          <select onChange={handleNewRatingChange} >
            <option value="rating-1">1</option>
            <option value="rating-2">2</option>
            <option value="rating-3">3</option>
            <option value="rating-4">4</option>
            <option value="rating-5">5</option>
          </select><br/>
          <input type="submit" value="Create Recommendation!" />
        </form>
      </section>
    </main>
  )
}

export default App;
