const mongoose = require("mongoose");

const CartAnimationSchema = new mongoose.Schema({
    id_store : {
        type : String,
        required : true,
    },
    accessToken : {
        type : String,
        required : true,
    },
    name_animation : {
        type : String,
        required : true,
    },
    trigger : {
        type : String,
        required : true,
    },
    speed : {
        type : Number,
        required : true,
    },
    publish : {
        type : String,
        required : true,
    }
});

const CartAnimation = mongoose.model("cartanim",CartAnimationSchema);

module.exports ={
    async getAnimation(idstore)
    {
        const p = await CartAnimation.findOne({id_store: idstore,publish:"published"});
        return p;
    },
    
    async saveAnimation(idstore,accessToken,nameanimation,trigger,speed,publish)
    {
        const cart = new CartAnimation({id_store : idstore,accessToken:accessToken,name_animation : nameanimation, trigger : trigger, speed :speed , publish : publish});
        return await cart.save();
    },

    async deleteApp(idStore)
    {
        return await CartAnimation.deleteMany({id_store : idStore});
    },

    async countDocuments(idStore,publish)
    {
        const c =  await CartAnimation.countDocuments({id_store:idStore,publish:publish});  
        return c;
    },

    async setAnimation(idStore,publish,nameanimation,trigger,speed)
    {
        const p = await CartAnimation.findOne({id_store: idStore,publish:publish},(err,update)=>{
            update.name_animation=nameanimation;
            update.trigger=trigger,
            update.speed=speed,
            update.save();
        });
        return p;
    }
}