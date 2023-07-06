const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://gofood:rajaisgreat@cluster0.kwm7glo.mongodb.net/gofoodmern?retryWrites=true&w=majority'

    const mongoDB = async () => {
        await mongoose.connect(mongoURI,{useNewUrlParser:true},async(err,result)=>{
            if(err) console.log("---",err)
            else{
                console.log('connected')
                const fetched_data= await mongoose.connection.db.collection("food_items");
                fetched_data.find({}).toArray(function(err,data){
                    if(err)
                     console.log(err);
                    else 
                     console.log(data);
                })
            }
        });
            // mongoose.set('strictQuery', false)
            
            
        }

module.exports=mongoDB;

    // const mongoDB = async () => {
    //     await mongoose.connect(mongoURI,{useNewUrlParser:true},async(err,result)=>{
    //         if(err) console.log("---",err)
    //         else{
    //             console.log('connected')
    //             const fetched_data= await mongoose.connection.db.collection("food_items");
    //             fetched_data.find({}).toArray(function(err,data){
    //                 if(err)
    //                  console.log(err);
    //                 else 
    //                  console.log(data);
    //             })
    //         }
    //     });
    //         // mongoose.set('strictQuery', false)
            
            
    //     }

// module.exports=mongoDB;

