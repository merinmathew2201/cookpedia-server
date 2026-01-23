const recipes = require('../model/recipeModel')

// get all recipes
exports.getAllRecipesController = async(req,res)=>{
    console.log("Inside getAllRecipesController");
    try {
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

// view recipe
exports.viewRecipeController = async(req,res)=>{
    console.log("Inside viewRecipeController");
    const {id} = req.params
    try {
        const viewRecipe = await recipes.findById({_id:id})
        res.status(200).json(viewRecipe)
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}