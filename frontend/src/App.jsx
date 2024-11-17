
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomeComponent  from './components/homeComponent/HomeComponent'
import StudentForm from './components/studentForm/StudentForm'
import  StudentList from './components/studentList/StudentList'
import UserForm from './components/userfrom/userFrom'
import UserList from './components/userfrom/Userlist'
import LoginForm from './components/userfrom/loginFrom'

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<LoginForm/>}/> */}
        <Route path="/" element={<HomeComponent/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path='/studentform' element={<StudentForm/>}/>
        <Route path='/studenList' element={<StudentList/>}/>
        <Route path='/userform' element={<UserForm/>}/>
        <Route path='/userlist' element={<UserList/>}/>
        
        
      </Routes>



    </BrowserRouter>
      
    </>
  )
}

export default App
