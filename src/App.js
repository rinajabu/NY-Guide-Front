import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import Show from './components/Show'
// modal //
import {Modal} from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
// bootstrap //
import 'bootstrap/dist/css/bootstrap.css'

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
const [userList, setUserList] = useState({})

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

// handle logout
  const handleLogout = () => {
    setUserList({})
  }

// handle like button (likes only updated state if something else is edited or a comment is posted)
  const handleLikeChange = (event, guide) => {
    event.preventDefault()
    // make it so you can only like a post once
    if (guide.likes === 0) {
    guide.likes++
    } else {
      guide.likes--
    }
    console.log(guide);
    setNewLikes(guide.likes)
  }

// post new like click
    const postNewLikes = (event, likeData) => {
    event.preventDefault()
    axios
      .put(
        `https://ny-guide-backend-rina-tommy.herokuapp.com/nyguide/${likeData._id}`,
        {
          title: likeData.title,
          author: likeData.author,
          category: likeData.category,
          location: likeData.location,
          image: likeData.image,
          description: likeData.description,
          price: likeData.price,
          rating: likeData.rating,
          comments: likeData.comments,
          likes: newLikes
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
    closeNav()
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

// Login form
  const loginForm = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    let userObj = {
      username: newUser,
      password: newPass
    }
    setNewUser('')
    setNewPass('')
    axios.put('https://ny-guide-backend-rina-tommy.herokuapp.com/users/login', userObj).then((response) => {
      if(response.data.username){
        console.log(response);
        setUserList(response.data)
      } else {
        console.log(response);
      }
    })
    loginCloseModal()
  }

// open and close modal functions
const signUpOpenModal = () => {setSignUp(true)}
const signUpCloseModal = () => {setSignUp(false)}
const loginOpenModal = () => {setLogin(true)}
const loginCloseModal = () => {setLogin(false)}
const editOpenModal = (event) => {
    setNewEdit(event.target.value)
}
const editCloseModal = () => {setNewEdit(false)}

// side nav functions //
const openNav = () => {
  document.getElementById('mySideNav').style.width = "400px";
  document.getElementById('root').style.backgroundColor = "rgba(0,0,0,0.5)";
}

const closeNav = () => {
  document.getElementById('mySideNav').style.width = "0";
  document.getElementById('root').style.backgroundColor = "white";
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
      <img class="banner-img" src="https://m.media-amazon.com/images/I/613m9MTkn6L._AC_SL1023_.jpg"/>
      <header id="top-nav">
        <div>
          <h1 class="site-name">NY Guide</h1>
        </div>
        <div>
          {/*////////////////// WELCOME USER (AUTH) MESSAGE //////////////*/}
          { userList.username &&
          <div class="welcome-container">
            <div class="user-welcome">
              <h2>Welcome, {userList.username}! </h2>
              <p>Browse recommendations or submit your own!</p>
            </div>
            <button class="auth-btn" onClick={handleLogout}>Logout</button>
          </div>
          }
          {/*////////////////// SIGN UP FORM /////////////////*/}
          { !userList.username &&
          <button class="auth-btn" onClick={signUpOpenModal}>Sign Up</button>
          }
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
          {/*//////////////////// LOGIN FORM /////////////////*/}
          { !userList.username &&
          <button class="auth-btn" onClick={loginOpenModal}>Login</button>
          }
          <Modal open={login} onClose={loginCloseModal} center>
              <h3>Login</h3>
                  <form onSubmit={loginForm}>
                      <label for="username">Username: </label>
                      <input type="text" onChange={ (event) => setNewUser(event.target.value)} /><br/>
                      <label for="password">Password: </label>
                      <input type="password" onChange={ (event) => setNewPass(event.target.value)} /><br/>
                      <input type="submit" value="Login" />
                  </form>
          </Modal>
        </div>
      </header>
      {/*//////////////// CREATE RECOMMENDATION FORM /////////////////*/}
      <section id="mySideNav" class="sidenav">
          <a href="#" class="closebtn" onClick={closeNav}>&#8678;</a> 
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
            <img class="image-preview" src={newImage} /><br/>
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
              <option value="1">&#x2B50;</option>
              <option value="2">&#x2B50;&#x2B50;</option>
              <option value="3">&#x2B50;&#x2B50;&#x2B50;</option>
              <option value="4">&#x2B50;&#x2B50;&#x2B50;&#x2B50;</option>
              <option value="5">&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;</option>
            </select><br/>
            <input type="submit" value="Create Recommendation!" />
        </form>
      </section>
      {/*///////////////// OPEN LEFT SIDE NAV ////////////////*/}
      <div id="body">
        <div class="open-nav" onClick={openNav}>&#8680;</div>
        <section id="main">
          <h3 class="title">NY Recommendations</h3>
              {
                  recommend.map((guide) => {
                      return (
                      <div class="recommendation-container">
                          <Show prop={guide} />
                          {/*////////////// COMMENTS ///////////////*/}
                          <details><summary>Show Comments</summary>
                            <h4>Comments</h4>
                            {
                              guide.comments.map((comment) => {
                                return <li>{comment}</li>
                              })
                            }
                            <h4>Post A Comment</h4>
                            <form onSubmit={ (event) => { postNewComment(event, guide) } }>
                              <textarea class="u-full-width" onChange={ (event) => { handleNewCommentsChange(event, guide.comments) } }></textarea>
                              <input type="submit" value="Comment"/>
                            </form>
                          </details>
                          {/*//////////////// LIKES /////////////////////*/}
                          <h4>Likes: {guide.likes} </h4>
                          <form onSubmit={ (event) => {postNewLikes(event, guide) }}>
                          { guide.likes === 0 
                            ? <input class="like-btn center-btn" type="submit" value="&#128077;" onClick={ (event) => handleLikeChange(event, guide)} />
                            : <input class="unlike-btn center-btn" type="submit" value="&#128078;" onClick={ (event) => handleLikeChange(event, guide)} />
                          }
                          </form>
                          {/*//////////////// EDIT FORM //////////////////*/}
                          <div class="edit-delete-container">
                            <button value={guide._id} onClick={editOpenModal}>&#x270f;</button>
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
                                    <img class="image-preview" src={newImage} />
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
                                        <option value="1">&#x2B50;</option>
                                        <option value="2">&#x2B50;&#x2B50;</option>
                                        <option value="3">&#x2B50;&#x2B50;&#x2B50;</option>
                                        <option value="4">&#x2B50;&#x2B50;&#x2B50;&#x2B50;</option>
                                        <option value="5">&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;</option>
                                    </select><br/>
                                    <input class="center-btn" type="submit" value="Edit" />
                                </form>
                                </Modal>
                            {/*///////////////////// DELETE ///////////////*/}
                            <button onClick={ (event) => {handleDelete(guide)} }>&#128465;&#65039;</button>
                          </div>
                      </div>
                      )
                  })
              }
        </section>
        {/*////////////////// RIGHT SIDE NAV (HANDLES) /////////////////*/}
        <div class="social-media-container right-sidenav">
          <h5 class="our-name">Created By &#xA9;</h5>
          <div class="our-social-section">
            <h5 class="our-name">Tommy Chung &#127464;&#127475;</h5>
            <div class="logos-container">
              <a href="https://github.com/tommyc93" target="_blank"><img class="social-logo" src="https://image.flaticon.com/icons/png/512/38/38401.png" alt="Github logo"/></a>
              <a href="https://www.linkedin.com/in/tommy-chung93" target="_blank"><img class="social-logo" src="https://image.flaticon.com/icons/png/512/61/61109.png" alt="LinkedIn logo"/></a>
              <a></a>
            </div>
          </div>
          <div class="our-social-section">
            <h5 class="our-name">Rina Joy Abu &#127477;&#127469;</h5>
            <div class="logos-container">
              <a href="https://github.com/rinajabu" target="_blank"><img class="social-logo" src="https://image.flaticon.com/icons/png/512/38/38401.png" alt="Github logo"/></a>
              <a href="https://www.linkedin.com/in/rinajoyabu" target="_blank"><img class="social-logo" src="https://image.flaticon.com/icons/png/512/61/61109.png" alt="LinkedIn logo"/></a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App;
