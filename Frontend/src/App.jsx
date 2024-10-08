import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import Student from "./Components/Students/Student";
import Faculty from "./Components/Faculty/Faculty";
import AddCourse from "./Components/Courses/AddCourse";
import AddFaculty from "./Components/Faculty/AddFaculty";
import Course from "./Components/Courses/Course";
import AddStudent from "./Components/Students/AddStudent";
import StudentPage from "./Components/Students/StudentPage";
import FacultyPage from "./Components/Faculty/FacultyPage";
import CoursePage from "./Components/Courses/CoursePage";
import Register from "./Components/Register/Register";
import Profile from "./Components/Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from './Components/store/auth';
import EditCourse from "./Components/Courses/EditCourse";
import EditFaculty from "./Components/Faculty/EditFaculty";
import EditStudent from "./Components/Students/EditStudent";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(()=>{
    if(
      localStorage.getItem("token") &&
      localStorage.getItem("role") 
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[])

  return (
    <>
      <Navbar />
        {/* <Themes /> */}
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student" element={<Student />}>
            <Route index element={<StudentPage />} />
            <Route path="/student/add-student" element={<AddStudent />} />
            <Route path="/student/edit-student/:id" element={<EditStudent />} />
          </Route>
          <Route path="/faculty" element={<Faculty />}>
            <Route index element={<FacultyPage />} />
            <Route path="/faculty/add-faculty" element={<AddFaculty />} />
            <Route path="/faculty/edit-faculty/:id" element={<EditFaculty />} />
          </Route>
          <Route path="/course" element={<Course />}>
            <Route index element={<CoursePage />} />
            <Route path="/course/add-course" element={<AddCourse />} />
            <Route path='/course/edit-course/:id' element={<EditCourse/>}/>
          </Route>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
        

    </>
  );
}

export default App;
