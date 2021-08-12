const express = require("express");
const app =  express();
const mongoose = require("mongoose");
const cors = require("cors");
const CartModel = require("./models/CartAnimation")

app.use(express.static('dist'));
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://cartanimate:cartanimate@addtocart.58hlw.mongodb.net/animation?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then((res)=>{console.log(res)});

//saving animation
app.post("/saving",async(request,response)=>{

    var trig = "";
    if(request.body.trigger==1)
    {
        trig="always";
    }
    else
    {
        trig="hover";
    }

    if(request.body.publish==null)
    {
        request.body.publish="unpublished";
    }

    if(request.body.publish=="unpublished")
    {
        const save = CartModel.saveAnimation(request.body.shop,"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",request.body.name,trig,request.body.speed,request.body.publish);
        save.then(function(result){
            response.send("inserted")
        })
    }
    else
    {
        const c = CartModel.countDocuments(request.body.shop,"published");
        c.then(function(result){
            if(result==0)
            {
                const save = CartModel.saveAnimation(request.body.shop,"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",request.body.name,trig,request.body.speed,request.body.publish);
                save.then(function(result){
                    response.send("inserted");
                })
            }
            else
            {
                const edit = CartModel.setAnimation(request.body.shop,request.body.publish,request.body.name,trig,request.body.speed);
                edit.then(function(result){
                    response.send("updated;")
                })
            }
        })
    }
})

//delete the application
app.post("/deleteapp",async(request,response)=>{

    const deleteapp = CartModel.deleteApp(request.body.shop);
    deleteapp.then(function(result){
        response.send(result)
    })
    
})

app.get("/:shop",async(request,response)=>{

    const p = CartModel.getAnimation(request.params.shop);
    p.then(function(result){
        response.send(result);
    })
})

app.listen(8080, () => {
    console.log("Yes, your server is running on port 8080");
});