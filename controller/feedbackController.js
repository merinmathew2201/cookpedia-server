const feedbacks = require('../model/feedbackModel')

// add feedbacks
exports.addFeedbackController = async (req,res)=>{
    console.log("Inside addFeedbackController");
    const {name,email,message} = req.body
    try {
        const newFeedback = await feedbacks.create({
            name,email,message
        })
        res.status(200).json(newFeedback)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
    
}

// get approved feedback
exports.getFeedbackController = async (req,res)=>{
    console.log("Inside getFeedbackController");
    try {
        const approveFeedbacks = await feedbacks.find({status:{$eq:"approve"}})
        res.status(200).json(approveFeedbacks)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

// get all feedbacks
exports.getAllfeedBacksController = async (req,res)=>{
    console.log("Inside getAllfeedBacksController");
    try {
        const allFeedbackList = await feedbacks.find()
        res.status(200).json(allFeedbackList)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

//  update feedbacks
exports.updateFeedBackController = async (req,res)=>{
    console.log("Inside updateFeedBackController");
    const {id} = req.params
    const {status} = req.body
    try {
        const updateFeedback = await feedbacks.findById({_id:id})
        updateFeedback.status = status
        await updateFeedback.save()
        res.status(200).json(updateFeedback)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}