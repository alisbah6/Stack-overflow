import React,{useState}from 'react';
import { Link, useParams,useNavigate,useLocation } from 'react-router-dom';
import moment from 'moment';
import uparrow from '../../assets/up.png';
import downarrow from '../../assets/down.png';
import copy from 'copy-to-clipboard'
import './Questions.css';
import Avatar from '../../components/Avatar/Avatar';
import { DisplayAnswer } from './DisplayAnswer';
import {postAnswer,deleteQuestion,voteQuestion} from '../../actions/question.js'
import { useSelector,useDispatch } from 'react-redux';
export const QuestionDetails = () => {
    const questionList=useSelector(state=>state.questionsReducer);
    const location=useLocation();
    const url='http://localhost:3000';

    // var questionList=[{
    //     id:'1',
    //     upvote:3,
    //     downvote:2,
    //     noOfAnswers:2,
    //     questionTitle:"What is a function?",
    //     questionBody:"It meant to be ",
    //     questionTags:["java","node.js","react.js","mongodb"],
    //     userPosted:"mano",
    //     userId:1,
    //     askedOn:"jan 1",
    //     answer:[{
    //       answerbody:"Answer",
    //       userAnswered:"kumar",
    //       answerOn:"Jan 2",
    //       userId:2,
    //     }],
    //   },{
    //     id:'2',
    //     upvote:3,
    //     downvote:2,
    //     noOfAnswers:0,
    //     questionTitle:"What is a function?",
    //     questionBody:"It meant to be ",
    //     questionTags:["javascript","R","python"],
    //     userPosted:"mano",
    //     userId:1,
    //     askedOn:"jan 1",
    //     answer:[{
    //       answerbody:"Answer",
    //       userAnswered:"kumar",
    //       answerOn:"Jan 2",
    //       userId:2,
    //     }],
    //   },
    //   { id:'3',
    //     upvote:3,
    //     downvote:2,
    //     noOfAnswers:0,
    //     questionTitle:"What is a function?",
    //     questionBody:"It meant to be ",
    //     questionTags:["javascript","R","python"],
    //     userPosted:"mano",
    //     userId:1,
    //     askedOn:"jan 1",
    //     answer:[{
    //       answerbody:"Answer",
    //       userAnswered:"kumar",
    //       answerOn:"Jan 2",
    //       userId:2,
    //     }],
    //   }
    // ]
    const {id}=useParams();
    const dispatch=useDispatch();
    const navigator=useNavigate();
    const [Answer,setAnswer]=useState('');
    const User=useSelector((state)=>(state.currentUserReducer))

    const handlePostAns=(e,answerLength)=>{
        e.preventDefault();
        if(User===null){
            alert('Login or SignUp to answer a question');
            navigator('/Auth');
        }
        else{
            if(Answer === ''){
                alert('Enter an answer before submitting');
            }
            else{
                dispatch(postAnswer({id,noOfAnswers:answerLength + 1,answerBody:Answer,userAnswered:User.result.name,userId:User.result._id}));
            }
        }
    }

    const handleShare=()=>{
        copy(url+location.pathname)
        alert('Copied url:'+url+location.pathname)
    }
    const handleDelete=()=>{
        dispatch(deleteQuestion(id,navigator))
    }
    const handleUpVote=()=>{
        dispatch(voteQuestion(id,'upVote',User.result._id)) 
    }
    const handleDownVote=()=>{
        dispatch(voteQuestion(id,'downVote',User.result._id)) 
    }
  return (
    
    <div className='question-details-page'>
        {
            questionList.data === null?<h1>Loading...</h1>:
            <>{
                questionList.data.filter(question => question._id===id).map(question =>(
                    <div key={question._id}>
                        <section className='question-details-container'>
                            <h1>{question.questionTitle}</h1>
                            <div className='question-details-container-2'>
                                <div className="question-votes">
                                    <img src={uparrow} alt='' width='18' className="votes-icon" onClick={handleUpVote}/>
                                    <p>{question.upVote.length-question.downVote.length}</p>
                                    <img src={downarrow} alt='' width='18' className="votes-icon" onClick={handleDownVote}/>
                                </div>
                                <div style={{width:"100%"}}>
                                    <p className='question-body'>{question.questionBody}</p>
                                    <div className="question-details-tags">
                                        {
                                            question.questionTags.map((tags)=>(
                                                <p key={tags}>{tags}</p>
                                            ))
                                        }
                                </div>
                                <div className='questions-action-user'>
                                    <div>
                                        <button type='button' onClick={handleShare}>Share</button>
                                        {
                                            User?.result?._id===question?.userId && (
                                            <button type='button' onClick={handleDelete}>Delete</button>)
                                        }
                                    </div>
                                </div>
                                </div>
                                <div className='question-action-user'>
                                    <p>asked {moment(question.askedOn).fromNow()}</p>
                                    <Link to={`/Users/${question.userId}`}className='user-link' style={{color:'#0086d8'}}>
                                    <Avatar backgroundColor="orange" px="8px" py="5px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                    <div>
                                        {question.userPosted}
                                    </div>
                                    </Link>
                                </div>
                            </div>
                        </section>
                        {
                            question.noOfAnswers !== 0 && (
                                <section>
                                    <h3> {question.noOfAnswers} Answers</h3>
                                    <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                                </section>
                            )

                        }
                        <section className='post-ans-container'>
                            <h3>Your Answer</h3>
                            <form onSubmit={ (e) => { handlePostAns (e,question.answer.length) } }>
                                <textarea name='' id='' cols="30" rows="10" onChange={e=>setAnswer(e.target.value)}></textarea>
                                <input type='submit' className='post-ans-btn' value="Post Your answer"></input>
                            </form>
                            <p>Browse other question tagged
                                { question.questionTags.map((tag)=>(
                                    <Link to="/Tags" key={tag} className='ans-tags'>{tag}</Link>
                                ))}
                                <Link to='/AskQuestion' style={{textDecoration:"none",color:"##009dff"}}> or Ask your own question</Link>
                            </p>
                        </section>
                    </div>
                ))
            }
            </>
        }
    </div>
  )
}
