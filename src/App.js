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
const [newLikes, setNewLikes] = useState()
const [newComment, setNewComment] = useState([])
const [recommend, setRecommend] = useState([])
// modal state
const [signUp, setSignUp] = useState(false)
const [login, setLogin] = useState(false)
const [newCreate, setNewCreate] = useState(false)
const [newEdit, setNewEdit] = useState('')
// signUp and Login
const [newUser, setNewUser] = useState('')
const [newPass, setNewPass] = useState('')
const [userList, setUserList] = useState()

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

// Handle changeUser
  const handleChangeUser = (event) => {
      setNewUser(event.target.value)
  }

// Handle Pasword
  const handleChangePassword = (event) => {
      setNewPass(event.target.value)
  }

// handle like button
  const handleLikeChange = (event, guide) => {
    event.preventDefault()
    guide.likes++
    console.log(guide);
    setNewLikes(guide.likes)
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
      event.currentTarget.reset()
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
    createCloseModal()
}

//Create edit form
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
    editCloseModal()
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


// Sign up Form
const signUpForm = (event) => {
    event.preventDefault()
    axios.post(
        'https://ny-guide-backend-rina-tommy.herokuapp.com/users',
        {
            username: newUser,
            password: newPass
        }
    ).then(() => {
        axios
            .get('https://ny-guide-backend-rina-tommy.herokuapp.com/users')
            .then((response) => {
                setUserList(response.data)
            })
    })
    signUpCloseModal()
}

//Login form (cors moved above app.use session in server.js; still getting cors error, why?)
const loginForm = async event => {
    event.preventDefault()
    const user = {newUser, newPass}
    const response = await axios.post(
        'http://ny-guide-backend-rina-tommy.herokuapp.com/sessions',
        user
    )
    setNewUser(response.data)
    console.log(response.data);
    localStorage.setItem('user', response.data)
    console.log(response.data);
    loginCloseModal()
}

// open and close modal functions
const signUpOpenModal = () => {setSignUp(true)}
const signUpCloseModal = () => {setSignUp(false)}
const loginOpenModal = () => {setLogin(true)}
const loginCloseModal = () => {setLogin(false)}
const createOpenModal = () => {setNewCreate(true)}
const createCloseModal = () => {setNewCreate(false)}
const editOpenModal = (event) => {
    setNewEdit(event.target.value)
}
const editCloseModal = () => {setNewEdit(false)}
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
        <button onClick={signUpOpenModal}>Sign Up</button>
        <Modal open={signUp} onClose={signUpCloseModal} center>
            <h3>Sign Up</h3>
                <form onSubmit={signUpForm}>
                    <label for="username">Username: </label>
                    <input type="text" onChange={handleChangeUser} /><br/>
                    <label for="password">Password: </label>
                    <input type="password" onChange={handleChangePassword} /><br/>
                     <input type="submit" value="Sign Up!" />
                </form>
        </Modal>
        <button onClick={loginOpenModal}>Login</button>
        <Modal open={login} onClose={loginCloseModal} center>
            <h3>Login</h3>
                <form onSubmit={loginForm}>
                    <label for="username">Username: </label>
                    <input type="text" onChange={ ({target}) => setNewUser(target.value)} /><br/>
                    <label for="password">Password: </label>
                    <input type="password" onChange={ ({target}) => setNewPass(target.value)} /><br/>
                     <input type="submit" value="Login" />
                </form>
        </Modal>
      </header>
      <h1>NY Guide</h1>
      { newUser &&
      <>
        <h2>Welcome, {newUser}! </h2>
        <p>Browse recommendations or submit your own!</p>
      </>
      }
      <section>
        <button onClick={createOpenModal}>Create Recommendation</button>
        <Modal open={newCreate} onClose={createCloseModal} center>
            <h2>Create NY Recommendation</h2>
                <form onSubmit={handleNewFormSubmit}>
                <label for="title">Title </label>
                <input type="text" onChange={handleNewTitleChange} /><br/>
                <label for="author">Author </label>
                <input type="text" onChange={handleNewAuthorChange} /><br/>
                <label for="category">Category </label>
                <select onChange={handleNewCategoryChange} defaultValue={newCategory} >
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
                <select onChange={handleNewPriceChange} defaultValue={newPrice} >
                    <option value="$">$</option>
                    <option value="$$">$$</option>
                    <option value="$$$">$$$</option>
                    <option value="$$$$">$$$$</option>
                    <option value="$$$$$">$$$$$</option>
                </select><br/>
                <label for="rating">Rating </label>
                <select onChange={handleNewRatingChange} defaultValue={newRating} >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select><br/>
                <input type="submit" value="Create Recommendation!" />
            </form>
        </Modal>
      </section>
      <section>
        <h3>NY Recommendations</h3>
            {
                recommend.map((guide) => {
                    return (
                    <div>
                        <Show prop={guide} />
                        <h4>Likes: {guide.likes} </h4>
                        <button onClick={(event) => handleLikeChange(event, guide)}>Like</button>
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
                        <button value={guide._id} onClick={editOpenModal}>Edit</button>
                        <Modal open={newEdit === guide._id} onClose={editCloseModal} center>
                            <h3>Edit Recommendation</h3>
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
                            </Modal>
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
