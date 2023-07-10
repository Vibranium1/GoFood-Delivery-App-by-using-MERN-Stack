const mongoose = require("mongoose");
const { Schema } = mongoose;

const foodSchema = new Schema({
  CategoryName: String,
  name: String,
  img: String,
  options: Array,
  description: String,
});

const foodCatSchema = new Schema({
  CategoryName: String,
});

const Food_item = mongoose.model("Food_item", foodSchema);
const FoodCat =  mongoose.model("Food_categorie", foodCatSchema);

const connectDB = async () => {
  try {
    const MONGO_URL =
      "mongodb+srv://gofood:rajaisgreat@cluster0.kwm7glo.mongodb.net/gofoodmern?retryWrites=true&w=majority";
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.log(err);
  }
};


const createDocument = async() =>{
    try {
        const rdFood=new Food_item({
        CategoryName: "Veg", 
        name: "Samosa",
        img: "https://images.unsplash.com/photo-1685790988463-301f5d5ed2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODU5Mzg1OA&ixlib=rb-4.0.3&q=80&w=1080",
        description: "Only potato and masala",
      })
      const result = await rdFood.save();
      console.log(result);
    }catch(err){
      console.log(err);
    }
  }
//    createDocument();



const getDocument = async() =>{
    const result = await Food_item.find({})

    // console.log(result);
    global.rdFood_items = result;
  //  console.log(global.rdFood_items)
  }
  
  getDocument();

  const getCatDocument = async() =>{
    const result = await FoodCat.find({})

    // console.log(result);
    global.rdFoodCats = result;

  }
  
  getCatDocument();


module.exports = { Food_item, connectDB };


























// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const PORT = 5000;
// const MONGO_URL =
//   "mongodb+srv://gofood:rajaisgreat@cluster0.kwm7glo.mongodb.net/gofoodmern?retryWrites=true&w=majority";

// const foodSchema = new Schema({
//   CategoryName: String,
//   name: String,
//   img: String,
//   options:Array,
//   description: String,

// });
// const Food_item = mongoose.model('Food_item', foodSchema);


// const createDocument = async() =>{
//     try {
//         const rdFood=new Food_item({
//         CategoryName: "Veg", 
//         name: "Samosa",
//         img: "https://images.unsplash.com/photo-1685790988463-301f5d5ed2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODU5Mzg1OA&ixlib=rb-4.0.3&q=80&w=1080",
//         description: "Only potato and masala",
//       })
//       const result = await rdFood.save();
//       console.log(result);
//     }catch(err){
//       console.log(err);
//     }
// }
// module.exports = createDocument();

// mongoose
//   .connect(MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     // app.listen(PORT, () => 
//       console.log(`Server Port: ${PORT}`);

//   })
//   .catch((error) => console.log(`${error} did not connect`));

// module.exports = createDocument();

// // const getDocument = async() =>{
// //     const result = await Food_item.find({})
// //     console.log(result);
// //   }
  
// //   getDocument();




