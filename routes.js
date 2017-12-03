'use strict'
const express = require('express');
const router = express.Router();

//GET questions
//Route for questions collection
router.get("/" ,( req , res ) =>{
    res.json({
        response : " you sent me a GET request "
      });
});


//POST questions
//Route for Creating  questions
router.post("/" ,( req , res ) =>{
    //Return all the questions
    res.json({
         response : " you sent me a POST request " ,
         body : req.body
    });
});


//GET questions/:id
//Route for specific question
router.get("/:qID" ,( req , res ) =>{
    res.json({
        response : " you sent me a GET request  for a specific ID"
      });
});


//POST /questions/:qID/answers
//Route for Creating  answers
router.post("/:qID/answers" ,( req , res ) =>{
    //Return all the questions
    res.json({
         response : " you sent me a POST request to /answers" ,
         questionId : req.params.qID,
        body : req.body
    });
});


//PUT /questions/:id/answers/:aID
// Edit a specific answer
router.put("/:qID/answers/:aID" , ( req , res ) =>{
    //Return all the questions
    res.json({
         response : " you sent me a PUT request to /answers" ,
         questionId : req.params.qID,
         answerID : req.params.aID,
         body : req.body
    });
});


//DELETE /questions/:id/answers/:aID
// delete a specific answer
router.delete("/:qID/answers/:aID" , ( req , res ) =>{
    //Return all the questions
    res.json({
         response : " you sent me a DELETE request to /answers" ,
         questionId : req.params.qID,
         answerID : req.params.aID
    });
});


//POST /questions/:id/answers/:aID/vote-up
//POST /questions/:id/answers/:aID/vote-down
// vote on a  specific answer
router.post("/:qID/answers/:aID/vote-:dir" , ( req , res , next ) =>{
      if(req.params.dir.search(/^(up|down)$/) === -1 ){
            var err = new Error('Oups Wrong vote Url');
            err.status = 404 ;
             next(err);
      }else{
            next();
      }
} ,( req , res ) =>{
    res.json({
         response : " you sent me a POST request to /vote" + req.params.dir ,
         questionId : req.params.qID,
         answerID  : req.params.aID,
         vote : req.params.dir
    });
});

module.exports = router ;
