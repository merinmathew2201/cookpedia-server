const saveRecipes = require('../model/saveRecipeModel')

// add to downloads
exports.saveRecipeToCollectionController = async (req,res)=>{
    console.log("Inside saveRecipeToCollectionController");
    const {id} = req.params
    const userMail = req.payload
    const {name,image} = req.body
    try {
        const existingRecipe = await saveRecipes.findOne({recipeId:id,userMail})
        if(existingRecipe){
            res.status(409).json("Recipe already in your collection, Add Another")
        }else{
            const newRecipe = await saveRecipes.create({
                recipeId:id,name,image,userMail
            })
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

// get user collection
exports.getUserSavedCollectionController = async (req,res)=>{
    console.log("Inside getUserSavedCollectionController");
    const userMail = req.payload
    try {
        const allRecipes = await saveRecipes.find({userMail})
        res.status(200).json(allRecipes)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}