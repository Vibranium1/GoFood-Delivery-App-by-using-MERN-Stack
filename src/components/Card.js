import React, { useState,useEffect,useRef } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';
export default function Card(props) {

  let dispatch = useDispatchCart();
  let data = useCart()
 let options= props.options;
 let priceOptions=Object.keys(options);
 const [qty,setQty]=useState(1)
 const [size,setSize]= useState("")
 const priceRef=useRef();


 const handleAddtoCart = async()=>{

  let food=[]
  for (const item of data){
  if(item.id===props.foodItem._id){
    food=item;
    
    break;
  }
  }
  if(food!==[]){
    if(food.size===size){
      await dispatch ({type:"UPDATE",id:props.foodItem._id,price:finalPrice,qty:qty}) 
      return 
    }
    else if (food.size!==size){
      await dispatch({type:"ADD",id:props.foodItem._id,name: props.foodItem.name, price:finalPrice, qty:qty,size:size })
      return 
    }
    return
  }
  await dispatch({type:"ADD",id:props.foodItem._id,name: props.foodItem.name, price:finalPrice, qty:qty,size:size })
  // console.log(data) 
}
 let finalPrice = qty*parseInt(options[size]);
 useEffect(()=>{
  setSize(priceRef.current.value)
 },[])

  return (
    <div>
        <div>
        <div
          className="card mt-5"
          style={{ width: "18rem"}}
        >
          <img src={props.foodItem.img} className="card-img-top img-fluid" alt="..." style={{ height: '200px', objectFit: 'fill' }}/>
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            {/* <p className="card-text">Card text </p> */}
            <div className="container w-100">
              <select className="m-2 h-100  bg-success" onChange={(e)=> setQty(e.target.value)}>
                {" "}
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select className="m-2 h-100  bg-success rounded" ref= {priceRef} onChange={(e)=> setSize(e.target.value)}>
                  {priceOptions.map((data)=>{
                    return <option key={data} value={data}>{data}</option>
                  })}
              </select>

              <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            </div>
          </div>
          <hr>
          </hr>
          <button className={`btn btn-sm btn-success justify-center ms-5 mb-2 me-5`} onClick ={handleAddtoCart}>Add to Cart</button>
        </div>
      </div>

    </div>
  )
}
