import React,{useState,useEffect,useContext} from 'react';

import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import './Post.css';
import { useHistory,Link } from 'react-router-dom/cjs/react-router-dom.min';

// ... (imports)

function Posts({ searchQuery }) {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const history = useHistory();

  useEffect(() => {
    firebase.firestore().collection('products').get().then((snapshot) => {
      const allPost = snapshot.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      setProducts(allPost);
    });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buttonStyles = {
    justifyContent: 'end',
    borderColor: 'white',
    borderRadius: '5px',
    borderWidth: isHovered ? '5px' : '2px',
    borderStyle: 'solid',
    padding: '10px 15px',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: '#fff',
    transition: 'background-color 0.3s, color 0.3s',
  };

  return (
    <div className="postParentDiv">
      <div className="recommendations">
        <div className="heading">
          <span>Fresh Recomendations</span>
        </div>
        <div className="cards">
          {filteredProducts.map((product) => (
            <div className="card" onClick={() => {
              setPostDetails(product);
              history.push('/view');
            }}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <p className="category">{product.category}</p>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
          <div className="card bg-primary text-center text-white" >
            <span style={{fontWeight:'bolder', paddingTop:'2px'}}>Want to see your stuff here?</span>
            <p style={{fontWeight:'normal' ,fontFamily:'initial',fontSize:'15px', paddingTop:'15px'}}>Make some extra cash by selling things in your community.Go on it's quick and easy.</p>
            <br /><br /><br /><br />
            <div  style={{display:'flex',flexDirection:'column',justifyContent: 'flex-end'}}>

            <button onClick={()=>{
              history.push('/create')
            }}
      style={buttonStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >
      Start selling
    </button>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
