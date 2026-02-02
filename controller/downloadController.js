const downloads = require('../model/downloadModel')

// add to downloads
exports.addToDownloadController = async (req,res)=>{
    console.log("Inside addToDownloadController");
    const {id} = req.params
    const userMail = req.payload
    const {name,cuisine,image} = req.body
    try {
        const existingRecipe = await downloads.findOne({recipeId:id})
        if(existingRecipe){
            existingRecipe.count +=1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }else{
            const newRecipe = await downloads.create({
                recipeId:id,name,image,cuisine,count:1,userMail
            })
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

// get user download recipes
exports.userDownloadController = async (req,res)=>{
    console.log("Inside userDownloadController");
    const userMail = req.payload
    try {
        const allDownloadList = await downloads.find({userMail})
        res.status(200).json(allDownloadList)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}