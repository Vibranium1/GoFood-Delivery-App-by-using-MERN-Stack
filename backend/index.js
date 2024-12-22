const express = require("express");
const bodyParser = require("body-parser");
const Stripe = require('stripe');
const Order= require("./models/Orders");
const { Food_item, connectDB } = require("./db");

const stripe = Stripe('sk_test_51Q1UIrRuIvDcRKJXCUQICDWS6fNOXLHCY7EmdpIeOZgHkiMzAhDQ5LFxYdYIJh1JERVUDgLmM8eHIk0z78BARLja00MrYBtej4');



const app = express();
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
);
  next();
})
// app.use(express.json());
// app.use(bodyParser.json());

app.use("/webhook",express.raw({ type: "application/json" }));

// Apply body parser for all routes except `/webhook`
app.use((req, res, next) => {
  if (req.path === "/webhook") {
    return next();
  } 
      express.json()(req, res, next);
  
});



app.get("/", (req, res) => {
  res.send("Hello World!");
}); 

app.use('/api',require("./routes/CreateUser"));
app.use('/api',require("./routes/DisplayData"));
app.use('/api',require("./routes/OrderData"));

app.post("/webhook", async (req, res) => {
  // console.log("Body:", req.body);
  const sig = req.headers["stripe-signature"];
  const endpointSecret = "whsec_Gx3yxf6AEQ72kkXMO8iH765sIPAcg2lk";
   console.log("webhook inside")
  //  console.log("Raw Body:", req.body.toString("utf8"));
  const rawBody = req.body.toString("utf8");

    // console.log("Raw Body as JSON String:", rawBody);  // Log the raw body as a JSON string

  let event;

  try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
      console.log("Webhook verified:", event.type);
  } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Session completed:", session);

      // Extract necessary details from the session
      const email = session.customer_details.email;
      const paymentStatus = session.payment_status;  // Check payment status
      // const orderId = session.id;
      const sessionId = session.id; 
      console.log("stripe session id", sessionId);


      if (paymentStatus === "paid") {

        const orderExists = await Order.findOne({ "order_data.sessionid": sessionId });

        if (orderExists) {
            console.log("Order already processed, skipping...");
            return res.status(200).json({ received: true });  // Return early to avoid duplication
        }
   
        const items = JSON.parse(session.metadata?.items || "[]");
        const orderDate =  new Date().toLocaleString();
        const address = session.metadata?.address || "Not Provided";
        const phoneNumber = session.metadata?.phoneNumber || "Not Provided";

        // Create the order in your database

        let user = await Order.findOne({ email });

        if (!user) {
            // If no user exists, create a new user document
            user = new Order({
                email: email,
                order_data: []
            });
        }
        user.order_data.push({
          order_date: orderDate,
          items: items,
          address: address,
          phonenumber: phoneNumber,
          sessionid: sessionId  // Store the Stripe session ID to avoid duplicates
      });


        try {
            // Save the order to your database
            await user.save();
            console.log("Order saved successfully!");

        } catch (err) {
            console.error("Error saving order:", err);
            return res.status(500).send("Internal Server Error");
        }
    } else {
        console.log("Payment not completed yet.");
    }
}

// Return a 200 response to Stripe
res.status(200).json({ received: true });
});

//       try {
//           // Find or create a user order
//           let order = await Order.findOne({ email });

//           if (!order) {
//               order = new Order({ email, order_data: [] });
//           }

//           // Add the new order to the order_data array
//           order.order_data.push({
//               order_date: orderDate,
//               items,
//               id:orderId,
//               address,
//               phonenumber: phoneNumber,
//           });

//           // Save the updated order
//           await order.save();

//           console.log("Order saved successfully!");
//       } catch (err) {
//           console.error("Error saving order:", err);
//           return res.status(500).send("Internal Server Error");
//       }
//   }

//   res.status(200).json({ received: true });
// });

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
















