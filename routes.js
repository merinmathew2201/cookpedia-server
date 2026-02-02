const express = require('express')
const recipeController = require('./controller/recipeController')
const userController = require('./controller/userController')
const jwtMiddleware = require('./middlewares/jwtMiddleware')
const downloadController = require('./controller/downloadController')
const saveRecipeController = require('./controller/saveRecipeController')
const feedbackController = require('./controller/feedbackController')
const multerMiddleware = require('./middlewares/multerMiddleware')

const router = new express.Router()

// get all recipes
router.get('/recipes/all',recipeController.getAllRecipesController)

//register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// add feedback
router.post('/feedback',feedbackController.addFeedbackController)

// get approved feedback
router.get('/approve-feedbacks',feedbackController.getFeedbackController)

// ---------------------------Authorised user-------------

// view recipe
router.get('/recipe/:id',jwtMiddleware,recipeController.viewRecipeController)

// all related recipe
router.get('/recipe-related',jwtMiddleware,recipeController.relatedRecipeController)

// download recipe
router.post('/downloads/:id',jwtMiddleware,downloadController.addToDownloadController)

// save recipe
router.post('/save-recipe/:id',jwtMiddleware,saveRecipeController.saveRecipeToCollectionController)

// get all save recipe
router.get('/save-recipes',jwtMiddleware,saveRecipeController.getUserSavedCollectionController)

// remove save recipe
router.delete('/save-recipes/:id',jwtMiddleware,saveRecipeController.removeUserSavedItemController)

// update user picture
router.put('/user/:id',jwtMiddleware,multerMiddleware.single('picture'),userController.updateUserPictureController)

// get all download recipe
router.get('/user-downloads',jwtMiddleware,downloadController.userDownloadController)

module.exports = router