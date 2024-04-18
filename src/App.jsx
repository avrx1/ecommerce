
import React, { createContext, useContext, useEffect, useState } from 'react'
import "./App.css"

const UserContext = createContext();


const allShoes = [
    {id: 1,name: "Fall Limited Edition Sneakers",
    qty: 2,
    cost: 250,
    company: "Sneaker Company",
    img: "images/image-product-1-thumbnail.jpg",
    description:`These low-profile sneakers are your
        perfect casual weak companion. Featuring a dusable rubber
        outer sole, they'll withstand everything the weather 
        can offer`
    },
    { id:2,name: "Summer Limited Edition Sneakers",
    qty: 1,
    cost: 400,
    img: "images/image-product-2-thumbnail.jpg"
    },
    { id:3,name: "Summer Limited Edition Sneakers",
    qty: 1,
    cost: 12,
    img: "images/image-product-3-thumbnail.jpg"
    },
    {id:4, name: "Summer Limited Edition Sneakers",
    qty: 1,
    cost: 233,
    img: "images/image-product-4-thumbnail.jpg"
    },
]
const Basket = () => {

  const {user, setUser} = useContext(UserContext)
  const basket = user.basket



  return <div className='basket' style={{paddingBottom: "0.5rem"}}
  >
      <h2>Cart</h2>
      <hr/>
      <div >
        {basket.length > 0 ? <div style={{minHeight:"130px"}}>{basket.map(({shoe, qty}, index) => <div className='basket-shoe'

        >
          <img src={shoe.img}/>
          <div>
            <h3>{shoe.name}</h3>
            <p
              style={{fontSize: "0.8rem"}}
            >${shoe.cost} x {qty} <span style={{fontWeight:"bold", marginLeft:"0.6rem"}}> ${shoe.cost*qty}</span></p>
          </div>
          <img className="icon" src="images/icon-delete.svg"
            onClick={()=>{
              setUser(p => {
                const b = p.basket.filter((b, ind) => ind != index  )
                return {...p, basket: b}
              })
            }}
          />
            
        </div>)}
        
        </div>
        : <div
            style={{height:"120px", display: "flex", justifyContent:"center",
            alignItems:"center"}}
        >

          Cart Empty
        </div>  
      }
      
      </div>
     
     {basket.length > 0 && <p className='btn' style={{
        width: "90%", marginInline: "auto", marginBlock: "0", color: "white", fontWeight:"bold",
      backgroundColor: "hsl(26, 100%, 55%)"}}>Checkout</p> }
    </div>
}

const Navbar = ({basketActive, setBasketActive}) =>{



  return <nav className='container'>
    <div className='left'>
      <img src="images/logo.svg" alt="" />
    </div>
    <div className='center'>
      <ul>
        <li><a href="#">Collections</a></li>
        <li><a href="#">Men</a></li>
        <li><a href="#">Women</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
    <div className='right'>
      <img className="icon" src="images/icon-cart.svg"
        onClick={() => setBasketActive(p=>!p)}
      />
      <img className="avatar" src="images/image-avatar.png"/>
    </div>

    {basketActive && <Basket/>}
  </nav>
}

const Sneaker = () => {


  const currentShoe = 0


  const [currentQty, setCurrentQty] = useState(1)

  const [quantity, setQuantity] = useState(0)
  const [currentImgIndex, setCurrentImgIndex] = useState(0)


   const {company, name, description, cost} = allShoes[currentShoe]
   const discount = 0.5;



   
   const allImages = [
      ["images/image-product-1.jpg","images/image-product-1-thumbnail.jpg"],
      ["images/image-product-2.jpg","images/image-product-2-thumbnail.jpg"],
      ["images/image-product-3.jpg","images/image-product-3-thumbnail.jpg"],
      ["images/image-product-4.jpg","images/image-product-4-thumbnail.jpg"],
   ]


   const {user, setUser} = useContext(UserContext)
   

  return <div className='sneaker'>
    <div>
        <div style={{position: "relative"}} className='img-wrapper'>
          <img src={allImages[currentImgIndex][0]}/>
          <img src="images/icon-next.svg" className='next-icon'
            onClick={()=>setCurrentImgIndex(p => p >= 3 ? 0 : p + 1)}
          />
          <img src="images/icon-previous.svg" className='prev-icon'
            onClick={()=>setCurrentImgIndex(p => p <= 0 ? 3 : p - 1)}
          />
        </div>
        
        <div className='img-select'>
          {
            allImages.map((p, index) => 
          <div
            onClick={()=>{
              setCurrentImgIndex(index)
            }}
            className={`${currentImgIndex == index ? "active-img":""}`}
          >
            <img 
              src = {p[1]}
              
            />
          </div>)
          }
    
      

        </div>
    </div>
    <div className='sneaker-inner'>
      <div>
          <h3 className='company-name'>{company}</h3>
          <h2 className='shoes-name'>{name}</h2>
          <p className='shoes-desc'>{description}</p>
          <div className='shoes-price'>${cost}</div>
      </div>
      <div className='sneaker-ui'>
            <div className='tool'>
              <div className='minus' onClick={()=>setCurrentQty(p=>p> 1 ? p-1 : 1)}>-</div>
              <div style={{width: "20px"}}>{currentQty}</div>
              <div className='plus' onClick={()=>setCurrentQty(p=>p+1)}>+</div>
            </div>
            <div className='btn'
            
              onClick={() => {
                setUser(p => {
                  const basket = [...p.basket, {shoe: allShoes[currentShoe], qty: currentQty }]
                  return {...p, basket: basket}

                })
              }}
            >
              Add to cart
            </div>
      </div>
    </div>

  </div>
}



const App = () => {
  const [basketActive, setBasketActive] = useState(false)
  const [user, setUser] = useState({
    basket: [
      {shoe: allShoes[0], qty: 2}
    ]
  })



  
  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className='app'>
        <Navbar basketActive={basketActive} setBasketActive={setBasketActive}/>
        <Sneaker/>
      </div>
    </UserContext.Provider>
  )
}

export default App