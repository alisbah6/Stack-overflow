import './App.css';
import Navbar from './components/Navbar/Navbar';
// import AllRoutes from './AllRoutes';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Questions from './pages/Questions/Questions'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import { DisplayQues } from './pages/Questions/DisplayQues'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'
import {BrowserRouter as Router} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {fetchAllQuestions} from './actions/question.js'
import { fetchAllUsers } from './actions/users.js';
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  },[dispatch])
  return (
    <div className="App">  
    <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/Auth' element={<Auth/>}></Route>
      <Route path='/Questions' element={<Questions/>}/>
      <Route path='/AskQuestion' element={<AskQuestion/>}/>
      <Route path='/Questions/:id' element={<DisplayQues/>}></Route>
      <Route path='/Tags' element={<Tags/>}/>
      <Route path='/Users' element={<Users/>}/>
      <Route path='/Users/:id' element={<UserProfile/>}/>
    </Routes>
    </Router> 
    </div>
  );
}

export default App;
