import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {FirebaseContext,AuthContext} from '../../store/Context'

const Create = () => {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState('')
  const history = useHistory()
  const date = new Date()
  const handleSubmit = (e) =>{
    e.preventDefault()
      firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
        ref.getDownloadURL().then((url)=>{
          console.log(url)
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId:user.uid,
            createdAt:date.toDateString()
          })
          history.push('/')
        })
      })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
      <h1 >POST YOUR AD</h1>
      <br /><br />
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
            required
/>
            <br />
            <label htmlFor="fname">Details</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              required
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" required type="text" value={price} onChange={(e)=>setPrice(e.target.value)} id="fname" name="Price" />
            <br />
          <br />
          <img alt="Image of the AD"  width="200px" height="200px" src={image ? URL.createObjectURL(image): null}></img>
            <br />
            <input type="file" required onChange={(e)=>{
            setImage(e.target.files[0])
          }}/>
            <br />
            <button className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
