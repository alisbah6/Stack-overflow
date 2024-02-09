import React, { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { askquestion } from '../../actions/question';
import './AskQuestion.css'
const AskQuestion = () => {
    const [questionTitle,setTitle]=useState('');
    const [questionBody,setBody]=useState('');
    const [questionTags,setTags]=useState();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const User=useSelector((state)=>(state.currentUserReducer));

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(askquestion({questionTitle,questionBody,questionTags,userPosted:User.result.name,userId:User?.result?._id},navigate));
    }
    const handleEnter=(e)=>{
        if(e.key==='Enter'){
            setBody(questionBody+"\n")
        }
    }
    return (
    <div className='ask-qustion'>
        <div className="ask-ques-container">
            <h1>Ask a public Question</h1>
            <form onSubmit={handleSubmit}>
                <div className="ask-form-container">
                    <label htmlFor='ask-ques-title'>
                        <h4>Title</h4>
                        <p>Be specific and imagine you're asking a question to another person</p>
                        <input type='text ' id='ask-ques-title' onChange={(e)=>{setTitle(e.target.value)}} placeholder='e.g. is there an R function for finding the index of an element in a vector?'/>
                    </label>
                    <label htmlFor='ask-ques-body'>
                        <h4>Body</h4>
                        <p>Include all the information someone would need to answer to question</p>
                        <textarea name="" id="ask-ques-title" cols="30" row="10"onChange={(e)=>{setBody(e.target.value)}} onKeyPress={handleEnter}> </textarea>
                    </label>
                    <label htmlFor='ask-ques-tags'>
                        <h4>Tags</h4>
                        <p>Add up to 5 tags to describe what your question in about</p>
                        <input type='text ' id='ask-ques-title' placeholder='e.g. (xml typescript wordpress)' onChange={(e)=>{setTags(e.target.value.split(' '))}}/>
                    </label>
                </div>
                <input type='submit' value='Review your question' className='review-btn'/>
            </form>
        </div>
    </div>
  )
}

export default AskQuestion;