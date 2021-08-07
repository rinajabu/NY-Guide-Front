import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import Show from './components/Show'

const App = () => {

///////////////////// STATES ////////////////////////
const [newTitle, setNewTitle] = useState('')
const [newCategory, setNewCategory] = useState('')
const [newLocation, setNewLocation] = useState('')
const [newImage, setNewImage] = useState('')
const [newDescription, setNewDescription] = useState('')
const [newPrice, setNewPrice] = useState('')
const [newRating, setNewRating] = useState('')
const [newComment, setNewComment] = useState('')
const [recommend, setRecommend] = useState([])

////////////////// EVENT HANDLERS ///////////////////

///// create and edit form /////
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
        'https://ny-guide-backend-rina-tommy.herokuapp.com/nyguide',
        {
            title: newTitle,
            category: newCategory,
            location: newLocation,
            image: newImage,
            description: newDescription,
            price: newPrice,
            rating: newRating
        }
    ).then(() => {
        axios
            .get('https://ny-guide-backend-rina-tommy.herokuapp.com/nyguide')
            .then((response) => {
                setRecommend(response.data)
            })
    })
    event.currentTarget.reset()
}

//Create edit form
const handleEditForm = (eventEdit) => {
  console.log(eventEdit);
    axios
        .put(
            `https://ny-guide-backend-rina-tommy.herokuapp.com/nyguide/${eventEdit._id}`,
            {
                title: newTitle || eventEdit.title,
                category: newCategory || eventEdit.category,
                location: newLocation || eventEdit.location,
                image: newImage || eventEdit.image,
                description: newDescription || eventEdit.description,
                price: newPrice || eventEdit.price,
                rating: newRating || eventEdit.rating,
                comments: newComment || eventEdit.comments
            }
        ).then(() => {
            axios
                .get('https://ny-guide-backend-rina-tommy.herokuapp.com/nyguide')
                .then((response) => {
                    recommend(response.data)
                })
        })
}

//Create delete button
const handleDelete = (eventDelete) => {
    axios
        .delete(`https://ny-guide-backend-rina-tommy.herokuapp.com/nyguide/${eventDelete._id}`)
        .then(() => {
            axios
                .get('https://ny-guide-backend-rina-tommy.herokuapp.com/nyguide')
                .then((response) => {
                    setRecommend(response.data)
                })
        })
}

//================useEffect================//
useEffect(() => {
    axios
        .get('https://ny-guide-backend-rina-tommy.herokuapp.com/nyguide')
        .then((response) => {
            setRecommend(response.data)
        })
}, [])


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
          <label for="image">Image </label>
          <input type="url" onChange={handleNewImageChange} /><br/>
          <label for="description">Description </label>
          <input type="text" onChange={handleNewDescriptionChange} /><br/>
          <label for="price">Price </label>
          <select onChange={handleNewPriceChange} >
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
            <option value="$$$$">$$$$</option>
            <option value="$$$$$">$$$$$</option>
          </select><br/>
          <label for="rating">Rating </label>
          <select onChange={handleNewRatingChange} >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select><br/>
          <input type="submit" value="Create Recommendation!" />
        </form>
      </section>
      <section>
        <h3>NY Recommendations</h3>
            {
                recommend.map((guide) => {
                    return (
                    <div>
                        <Show prop={guide} />
                        <button onClick={ (event) => {handleDelete(guide)} }>Delete</button>
                        <details><summary>Edit</summary>
                            <form onSubmit={ (event) => {handleEditForm(guide)} }>
                                <label for="title">Title </label>
                                <input type="text" onChange={handleNewTitleChange} defaultValue={guide.title} /><br/>
                                <label for="category">Category </label>
                                <select onChange={handleNewCategoryChange} defaultValue={guide.category} >
                                    <option value="outdoor">Outdoor</option>
                                    <option value="food">Food</option>
                                    <option value="museum">Museum</option>
                                    <option value="sight-seeing">Sight Seeing</option>
                                    <option value="night-life">Night Life</option>
                                </select><br/>
                                <label for="location">Location </label>
                                <input type="text" onChange={handleNewLocationChange} defaultValue={guide.location} /><br/>
                                <label for="image">Image </label>
                                <input type="url" onChange={handleNewImageChange} defaultValue={guide.image} /><br/>
                                <label for="description">Description </label>
                                <input type="text" onChange={handleNewDescriptionChange} defaultValue={guide.description} /><br/>
                                <label for="price">Price </label>
                                <select onChange={handleNewPriceChange} defaultValue={guide.price} >
                                    <option value="$">$</option>
                                    <option value="$$">$$</option>
                                    <option value="$$$">$$$</option>
                                    <option value="$$$$">$$$$</option>
                                    <option value="$$$$$">$$$$$</option>
                                </select><br/>
                                <label for="rating">Rating </label>
                                <select onChange={handleNewRatingChange} defaultValue={guide.rating} >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select><br/>
                                <input type="submit" value="Edit" />
                            </form>
                        </details>
                    </div>
                    )
                })
            }
      </section>
    </main>
  )
}

export default App;
