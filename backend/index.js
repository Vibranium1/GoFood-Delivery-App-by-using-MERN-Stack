const express = require("express");
const { Food_item, connectDB } = require("./db");


const app = express();
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
);
  next();
})
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api',require("./routes/CreateUser"));
app.use('/api',require("./routes/DisplayData"));
app.use('/api',require("./routes/OrderData"));



const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
});








































// const express = require("express");
// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const foodSchema = new Schema({
//   CategoryName: String,
//   name: String,
//   img: String,
//   options:Array,
//   description: String,

// });
// const Food_item = mongoose.model('Food_item', foodSchema);

// // app.use()

// const createDocument = async() =>{
//   try {
//       const rdFood=new Food_item({
//       CategoryName: "Veg", 
//       name: "Samosa",
//       img: "https://images.unsplash.com/photo-1685790988463-301f5d5ed2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODU5Mzg1OA&ixlib=rb-4.0.3&q=80&w=1080",
//       description: "Only potato and masala",
//     })
//     const result = await rdFood.save();
//     console.log(result);
//   }catch(err){
//     console.log(err);
//   }
// }
// //  createDocument();



// const getDocument = async() =>{
//   const result = await Food_item.find({})
//   console.log(result);
// }

// getDocument();

// const app = express();
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// const PORT = 5000;
// const MONGO_URL =
//   "mongodb+srv://gofood:rajaisgreat@cluster0.kwm7glo.mongodb.net/gofoodmern?retryWrites=true&w=majority";

// mongoose
//   .connect(MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => 
//       console.log(`Server Port: ${PORT}`));

//   })
//   .catch((error) => console.log(`${error} did not connect`));
















