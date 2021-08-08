import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import Show from './components/Show'
// modal //
import {Modal} from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'

const App = () => {

///////////////////// STATES ////////////////////////
const [newTitle, setNewTitle] = useState('')
const [newCategory, setNewCategory] = useState('Outdoor')
const [newLocation, setNewLocation] = useState('')
const [newImage, setNewImage] = useState('')
const [newDescription, setNewDescription] = useState('')
const [newPrice, setNewPrice] = useState('$')
const [newRating, setNewRating] = useState('1')
const [newAuthor, setNewAuthor] = useState('')
const [newLikes, setNewLikes] = useState(0)
const [newComment, setNewComment] = useState([])
const [recommend, setRecommend] = useState([])
// modal state
const [open, setOpen] = useState(false)

////////////////// EVENT HANDLERS ///////////////////

///// create and edit form /////
// title
const handleNewTitleChange = (event) => {
  setNewTitle(event.target.value)
}

// author
const handleNewAuthorChange = (event) => {
  setNewAuthor(event.target.value)
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

// comments
  const handleNewCommentsChange = (event, comments) => {
    setNewComment(newComment => [...comments, event.target.value])
  }

// create/post new comment
  const postNewComment = (event, commentData) => {
    event.preventDefault()
    axios
      .put(
        `https://ny-guide-backend-rina-tommy.herokuapp.com/nyguide/${commentData._id}`,
        {
          title: commentData.title,
          author: commentData.author,
          category: commentData.category,
          location: commentData.location,
          image: commentData.image,
          description: commentData.description,
          price: commentData.price,
          rating: commentData.rating,
          comments: newComment,
          likes: commentData.likes
        }
      )
      .then(() => {
        axios
          .get('https://ny-guide-backend-rina-tommy.herokuapp.com/nyguide')
          .then((response) => {
            setRecommend(response.data)
          })
      })
  }

// create form submit
const handleNewFormSubmit = (event) => {
    event.preventDefault()
    axios.post(
        'https://ny-guide-backend-rina-tommy.herokuapp.com/nyguide',
        {
            title: newTitle,
            author: newAuthor,
            category: newCategory,
            location: newLocation,
            image: newImage,
            description: newDescription,
            price: newPrice,
            rating: newRating,
            comments: newComment,
            likes: newLikes
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

//Create edit form (only works if all fields are filled in)
const handleEditForm = (event, eventEdit) => {
  event.preventDefault()
  console.log(eventEdit);
    axios
        .put(
            `https://ny-guide-backend-rina-tommy.herokuapp.com/nyguide/${eventEdit._id}`,
            {
                title: newTitle || eventEdit.title,
                author: newAuthor || eventEdit.author,
                category: newCategory || eventEdit.category,
                location: newLocation || eventEdit.location,
                image: newImage || eventEdit.image,
                description: newDescription || eventEdit.description,
                price: newPrice || eventEdit.price,
                rating: newRating || eventEdit.rating,
                comments: newComment || eventEdit.comments,
                likes: newLikes || eventEdit.likes
            }
        ).then(() => {
            axios
                .get('https://ny-guide-backend-rina-tommy.herokuapp.com/nyguide')
                .then((response) => {
                    setRecommend(response.data)
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

// open and close modal functions
const onOpenModal = () => {setOpen(true)}
const onCloseModal = () => {setOpen(false)}

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
      <header>
        <button onClick={onOpenModal}>Open Modal</button>
        <Modal open={open} onClose={onCloseModal} center>
            <h3>Hello this is our modal!</h3>
        </Modal>
      </header>
      <h1>NY Guide</h1>
      <section>
        <h2>Create NY Recommendation</h2>
        <form onSubmit={handleNewFormSubmit}>
          <label for="title">Title </label>
          <input type="text" onChange={handleNewTitleChange} /><br/>
          <label for="author">Author </label>
          <input type="text" onChange={handleNewAuthorChange} /><br/>
          <label for="category">Category </label>
          <select onChange={handleNewCategoryChange}>
            <option value="outdoor">Outdoor</option>
            <option value="food">Food</option>
            <option value="museum">Museum</option>
            <option value="sight-seeing">Sight Seeing</option>
            <option value="night-life">Night Life</option>
          </select><br/>
          <label for="location">Location </label>
          <input type="text" onChange={handleNewLocationChange} /><br/>
          <label for="image-preview">Image Preview </label>
          <img src={newImage} />
          <label for="image">Image URL </label>
          <input type="url" onChange={handleNewImageChange} /><br/>
          <label for="description">Description </label>
          <input type="text" onChange={handleNewDescriptionChange} /><br/>
          <label for="price">Price </label>
          <select onChange={handleNewPriceChange}>
            <option selected value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
            <option value="$$$$">$$$$</option>
            <option value="$$$$$">$$$$$</option>
          </select><br/>
          <label for="rating">Rating </label>
          <select onChange={handleNewRatingChange}>
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
                        <details><summary>Show Comments</summary>
                          <h4>Comments</h4>
                          {
                            guide.comments.map((comment) => {
                              return <li>{comment}</li>
                            })
                          }
                          <h4>Post A Comment</h4>
                          <form onSubmit={ (event) => { postNewComment(event, guide) } }>
                            <input type="text" onChange={ (event) => { handleNewCommentsChange(event, guide.comments) } }/>
                            <input type="submit" value="Comment"/>
                          </form>
                        </details>
                        <details><summary>Edit</summary>
                            <form onSubmit={ (event) => {handleEditForm(event, guide)} }>
                                <label for="title">Title </label>
                                <input type="text" onChange={handleNewTitleChange} defaultValue={guide.title} /><br/>
                                <label for="author">Author </label>
                                <input type="text" onChange={handleNewAuthorChange} defaultValue={guide.author} /><br/>
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
                                <label for="image-preview">Image Preview </label>
                                <img src={newImage} />
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
                        <button onClick={ (event) => {handleDelete(guide)} }>Delete</button>
                    </div>
                    )
                })
            }
      </section>
    </main>
  )
}

export default App;
