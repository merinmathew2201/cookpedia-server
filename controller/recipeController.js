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

// related recipe 
exports.relatedRecipeController = async(req,res)=>{
    console.log("Inside relatedRecipeController");
    const cuisine = req.query.cuisine
    try {
        const allRelatedRecipe = await recipes.find({cuisine})
        res.status(200).json(allRelatedRecipe)
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

// add - recipe
exports.addRecipeController = async(req,res)=>{
    console.log("Inside addRecipeController");
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = req.body
    try {
        const existingRecipe = await recipes.findOne({name})
        if(existingRecipe){
            res.status(409).json("Recipe Already Exists...Please Add Another!!!")
        }else{
            const newRecipe = await recipes.create({
              name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType  
            })
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

// edit recipe
exports.updateRecipeController = async(req,res)=>{
    console.log("Inside updateRecipeController");
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = req.body
    const {id} = req.params
    try {
        const updateRecipe = await recipes.findByIdAndUpdate({_id:id},{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType},{new:true})
        res.status(200).json(updateRecipe)
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

// remove recipe
exports.removeRecipeController = async(req,res)=>{
    console.log("Inside removeRecipeController");
    const {id} = req.params
    try {
        const removeRecipe = await recipes.findByIdAndDelete({_id:id})
        res.status(200).json(removeRecipe)
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}