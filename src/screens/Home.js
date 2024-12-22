import React,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";





export default function Home() {

  const [foodCat,setfoodCat] = useState([]);
  const [foodItem,setfoodItem] = useState([]);
  const [search,setSearch]=useState([]);

  const loadData = async () =>{
    let response = await fetch("http://localhost:5000/api/foodData",{
    method:"POST",
    headers:{
      'Content-Type': 'application/json'
    }
  });

  response = await response.json();

   setfoodItem(response[0])
   setfoodCat(response[1])
  // console.log(response[0],response[1]);
  }


  useEffect(()=>{
    loadData()
  },[])


  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          {/* Search Bar Overlay */}
          <div className="carousel-caption" style={{ zIndex: "9" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Search in here..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn text-white bg-danger" onClick={() => setSearch('')}>X</button>
            </div>
          </div>

          {/* Carousel Items */}
          <div className="carousel-item active">
            <img
              src="https://www.seriouseats.com/thmb/_c-xbP-tch4dpSTxKE1zY16sHo8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20231204-SEA-VeganBurger-FredHardy-00-dbf603c78b694bfd99489b85ab44f4c4.jpg"
              height="600"
              className="d-block w-100"
              style={{ filter: "brightness(30%)", objectFit:"fill" }}
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTexLQVDf1lWdrHAyi0FfgpeA688BpyxhMhKg&s"
              height="600"
             
              className="d-block w-100"
              style={{ filter: "brightness(30%)",  objectFit:"fill" }}
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDHJxxrvqb0jR4LQmBqWLFlhpty1DKFP12FQ&s"
              height="600"
              className="d-block w-100"
              style={{ filter: "brightness(30%)", objectFit:"fill" }}
              alt="Third slide"
            />
          </div>
        </div>

        {/* Previous Button */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        {/* Next Button */}
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>


      {/* <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

          <div className="carousel-inner" id='carousel'>
            <div className=" carousel-caption" style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">  
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
            <div className="carousel-item active" >
              <img src="https://www.seriouseats.com/thmb/_c-xbP-tch4dpSTxKE1zY16sHo8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20231204-SEA-VeganBurger-FredHardy-00-dbf603c78b694bfd99489b85ab44f4c4.jpg" height="900" width="700"className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="First slide" />
            </div>
            <div className="carousel-item">
              <img src="https://j6e2i8c9.rocketcdn.me/wp-content/uploads/2021/05/Eggless-Black-forest-Pastry-recipe-1.jpg" height="900" width="700" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img src="https://bbqatyourhome.com/wp-content/uploads/2021/02/barbeque_1.jpg" height="900" width="700" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="Second slide" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div> */}
{/* <div>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
  <div className=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">  
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
    <div className="carousel-item active">
      <img className="d-block w-100" src="https://www.seriouseats.com/thmb/_c-xbP-tch4dpSTxKE1zY16sHo8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20231204-SEA-VeganBurger-FredHardy-00-dbf603c78b694bfd99489b85ab44f4c4.jpg" height="500" width="700" alt="First slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://j6e2i8c9.rocketcdn.me/wp-content/uploads/2021/05/Eggless-Black-forest-Pastry-recipe-1.jpg" height="500" width="700" alt="Second slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://bbqatyourhome.com/wp-content/uploads/2021/02/barbeque_1.jpg" height="500" width="700" alt="Third slide"/>
    </div>
  </div>
  <a className="carousel-control-prev"  role="button" href="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
   
  </a>
  <a className="carousel-control-next"  role="button" href="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
 
  </a>
</div>
</div> */}

      <div className="container">
        {
          foodCat!==[]
          ? foodCat.map((data)=>{
            return ( <div className="row mb-3">
              <div key={data._id} className="fs-3 m-3">
                {data.CategoryName}
                
               </div>
                <hr />

                {foodItem !==[]? foodItem.filter( (item)=>(item.CategoryName === data.CategoryName) &&(item.name.toLowerCase().includes(search.toLocaleString())) ).map(filterItems=>{
                  return (
                    <div key = {filterItems._id} className="col-12 col-md-6 col-lg-3">
                        <Card foodItem = {filterItems}
                        options={filterItems.options[0]}
  
                        
                        
                        ></Card>
                      </div>
                  )                  
                })
               : <div> No such data found</div>}
                </div> 
            )
          })
          : ""
        }
        

      </div>
      <div>
        <Footer />
      </div>


    </div>
  );
}
