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