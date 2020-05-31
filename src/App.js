import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import {loadUsers, loadProfiles, loadCourses} from './utils/load'
import GlobalStyle from './styles/global'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './components/Home'
import Login from './components/Login'

import Course from './components/Course'
import CourseForm from './components/CourseForm';

import MyCourse from './components/MyCourse'

import User from './components/User'
import UserForm from './components/UserForm'



function App() {

  const token = localStorage.getItem('token')
  
  useEffect(() => {
    if(token){
     loadUsers()
     loadProfiles()     
     loadCourses()
    }

  },[token])
  /** */
  return (
    <>
      {token ?
        <Router>
          <Navbar />
          
          <Switch>
            <Route exact={true} path='/' component={Home} />
            <Route path='/home' component={Home} />

            <Route path='/meucurso' component={MyCourse} />

            <Route exact={true} path='/cursos' component={Course}/>
            <Route path='/cursos/editar/:id' component={CourseForm} />            
            <Route path='/cursos/cadastrar' component={CourseForm} />
        
            <Route exact={true} path='/usuarios' component={User} />
            <Route path='/usuarios/editar/:id' component={UserForm} />            
            <Route path='/usuarios/cadastrar' component={UserForm} />
         
            

            <Redirect path='*' to='/' />

          </Switch>
    
          <Footer />
        </Router>
        :
        <Router>
          <Route exact={true} path='/' component={Login} />
          <Redirect path='*' to='/' />
        </Router>
      }
      <GlobalStyle />
    </>
  );
}

export default App
