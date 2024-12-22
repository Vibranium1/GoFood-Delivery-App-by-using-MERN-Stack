const express = require('express');
const router = express.Router();
const Order= require('../models/Orders');
const stripe = require('stripe')('sk_test_51Q1UIrRuIvDcRKJXCUQICDWS6fNOXLHCY7EmdpIeOZgHkiMzAhDQ5LFxYdYIJh1JERVUDgLmM8eHIk0z78BARLja00MrYBtej4');
const endpointSecret = 'whsec_Gx3yxf6AEQ72kkXMO8iH765sIPAcg2lk'; 
const bodyParser = require('body-parser');

router.post('/OrderData', async (req, res) => {
    let email= req.body.email;
    let data = req.body.order_data;
    let address = req.body.address;
    let phonenumber = req.body.phonenumber;
    let orderDate = req.body.order_date;
    let items= req.body.items;
    let id= req.body.id;

    // console.log("phoneni:",phonenumber)//// Get the address from the request body
    // await data.splice(0,0,{Order_date:req.body.order_date})
    // console.log("1231242343242354",req.body.email)

    if (!email || !items || !address || !phonenumber || !id) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    

   // Create a structured order object
   try{
    let newOrder = new Order({
        email:email,
        id:id,
        order_data: [
            {
                order_date: orderDate,
                items: items,
                address: address,
                phonenumber: phonenumber,
            }
        ],
    })
    
    await newOrder.save()
    res.status(201).json({
        message: "Order created successfully!",
      });
    
   }
    //  catch  {
    //     res.status(500).json({ message: "Server error4", error: err.message });
    //   }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
        console.error("Order saving error:", err.message);
    }
    
   

    //if email not exisitng in db then create: else: InsertMany()
    // let email = req.body.email;
    // let eId = await Order.findOne({ email})    
    // data.push({ address: address });  // Append the address to the array
    // data.push({ phonenumber: phonenumber });  // Append the phone number to the array

//     if (eId===null) {
//         try {
//             /// console.log(data)
       
//             await Order.create({
//                 email: req.body.email,
//                 order_data: [data], // Add the order details to order_data array
//             }).then(() => {
//                 res.json({ success: true })
//             })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)

//         }
//     }

//     else {
//         try {
//             await Order.findOneAndUpdate({email:req.body.email},
//                 // push used to append 
//                 { $push:{order_data: data}
//              }).then(() => {
//                     res.json({ success: true })
//                 })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)
//         }
//     }
// })
// if (eId === null) {
//     try {
//         await Order.create({
//             email: req.body.email,
//             order_data: [newOrder],  // Add the structured order
//         }).then(() => {
//             res.json({ success: true });
//         });
//     } catch (error) {
//         console.log(error.message);
//         res.send("Server Error", error.message);
//     }
// // } else {
//     try {
//         await Order.findOneAndUpdate(
//             { email: req.body.email },
//             { $push: { order_data: newOrder } }  // Add the structured order
//         ).then(() => {
//             res.json({ success: true });
//         });
//     } catch (error) {
//         console.log(error.message);
//         res.send("Server Error", error.message);
//     }

// }
 }
)




router.post('/myOrderData', async (req, res) => {
    try {
        // console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});


router.post('/create-checkout-session', async (req, res) => {
    const { email, items, address, phoneNumber, order_date } = req.body;  // items: array of products, email of user

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100, // Stripe expects amounts in the smallest currency unit (e.g., paise for INR)
                },
                quantity: item.qty,
            })),
            mode: 'payment',
            success_url: 'http://localhost:3000/success',  // Redirect after success
            cancel_url: 'http://localhost:3000/cancel',   // Redirect after cancel
            customer_email: email,
            metadata: {
                items: JSON.stringify(items),
                email, // Save email to metadata for webhook access
                address,
                phoneNumber,
                order_date,
            }
        });
    //    let orderData = new Order({
    //     email:email,
    //     order_data: [
    //         {
    //             order_date: order_date,
    //             items: items,
    //             address: address,
    //             phonenumber: phoneNumber,
    //         },
            
    //     ],
    //     id:session.id ,
    //    })
    //    await orderData.save()
        
       res.json({
        // message: "Order successfully created!",
         id:session.id
      });

        // res.json({ id: session.id });  // Send session id to the frontend
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});



// router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
//     const sig = req.headers['stripe-signature'];

//     let event;

//     try {
//         event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//     } catch (err) {
//         console.log(`⚠️  Webhook signature verification failed.`, err.message);
//         return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     if (event.type === 'checkout.session.completed') {
//         const session = event.data.object;

//         // Retrieve the email, address, and phone number from metadata
//         const email = session.customer_email;
//         const address = session.metadata.address;
//         const phoneNumber = session.metadata.phoneNumber;

//         // Fetch the line items using Stripe API (session ID is in `session.id`)
//         const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });

//         // Transform lineItems into the format you need
//         const items = lineItems.data.map(item => ({
//             name: item.description,
//             qty: item.quantity,
//             price: item.amount_total / 100 // Convert from smallest currency unit
//         }));

//         // Now you can store the order details in MongoDB
//         try {
//             let eId = await Order.findOne({ email });

//             if (eId === null) {
//                 // Create a new order
//                 await Order.create({
//                     email: email,
//                     order_data: [{
//                         order_date: new Date().toDateString(),
//                         items: items,
//                         address: address,
//                         phonenumber: phoneNumber
//                     }]
//                 });
//             } else {
//                 // Add to existing order
//                 await Order.findOneAndUpdate({ email: email }, {
//                     $push: {
//                         order_data: {
//                             order_date: new Date().toDateString(),
//                             items: items,
//                             address: address,
//                             phonenumber: phoneNumber
//                         }
//                     }
//                 });
//             }

//             res.status(200).send({ success: true });
//         } catch (error) {
//             console.log('Error saving order:', error);
//             res.status(500).send({ success: false });
//         }
//     } else {
//         res.status(400).json({ error: 'Unhandled event type' });
//     }
// });




// router.post(
//     '/webhook',
//     bodyParser.raw({ type: 'application/json' }), // Parse raw body
//     async (req, res) => {
//         const sig = req.headers['stripe-signature'];

//         let event;

//         try {
//             event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//         } catch (err) {
//             console.error('Webhook signature verification failed:', err.message);
//             return res.status(400).send(`Webhook Error: ${err.message}`);
//         }

//         // Handle the event
//         if (event.type === 'checkout.session.completed') {
//             const session = event.data.object;

//             // Extract metadata and session details
//             const email = session.customer_email;
//             const address = session.metadata.address;
//             const phoneNumber = session.metadata.phoneNumber;

//             // Retrieve line items for the session
//             const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });

//             // Transform lineItems to match your DB schema
//             const items = lineItems.data.map(item => ({
//                 name: item.description,
//                 qty: item.quantity,
//                 price: item.amount_total / 100, // Convert from smallest unit
//             }));

//             try {
//                 let eId = await Order.findOne({ email });

//                 if (!eId) {
//                     // Create new order
//                     await Order.create({
//                         email: email,
//                         order_data: [
//                             {
//                                 order_date: new Date().toDateString(),
//                                 items: items,
//                                 address: address,
//                                 phonenumber: phoneNumber,
//                             },
//                         ],
//                     });
//                 } else {
//                     // Append to existing orders
//                     await Order.findOneAndUpdate(
//                         { email: email },
//                         {
//                             $push: {
//                                 order_data: {
//                                     order_date: new Date().toDateString(),
//                                     items: items,
//                                     address: address,
//                                     phonenumber: phoneNumber,
//                                 },
//                             },
//                         }
//                     );
//                 }

//                 res.status(200).send({ success: true });
//             } catch (err) {
//                 console.error('Error saving order:', err.message);
//                 res.status(500).send({ success: false });
//             }
//         } else {
//             res.status(400).json({ error: 'Unhandled event type' });
//         }
//     }
// );


module.exports = router









