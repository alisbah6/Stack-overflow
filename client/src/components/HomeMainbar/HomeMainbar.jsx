import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux';
import './HomeMainbar.css'
import QuestionList from './QuestionList';

function HomeMainbar() {
  const questionList=useSelector(state=>state.questionsReducer);
//   var questionList=[{
//     id:1,
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
//     id:2,
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
//   { id:3,
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
const location=useLocation()
const user=1;
    const navigate=useNavigate();
    const checkAuth=() =>{
      if(user ==null){
      alert("login or signup to ask a question")
      navigate('/Auth')
      }
      else{
        navigate('/AskQuestion')
      }

    }
  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
       {
        location.pathname ==='/' ? <h1>Top Questions</h1> :<h1>All Questions</h1>
       }
       <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
       </div>
       <div >
        { questionList.data === null ? <h1>Loading...</h1>:<><p>{questionList.data.length} questions</p>
        <QuestionList questionList={questionList.data}/>
        </>}
       </div>
    </div>
  )
}

export default HomeMainbar