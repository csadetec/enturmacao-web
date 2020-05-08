import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import {loadUsers, loadProfiles, loadCourses} from './utils/load'
import GlobalStyle from './styles/global'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './components/Home'
import Login from './components/Login'

import Course from './components/Course'

import User from './pages/User'
import UserForm from './pages/User/form'

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
            
            <Route exact={true} path='/curso' component={Course}/>
            {/*}
            <Route path='/servicos/editar/:id' component={ServiceForm}/>
            <Route path='/servicos/cadastrar' component={ServiceForm}/>
            <Route path='/servicos/teste' component={ServiceForm}/>
                        
            <Route exact={true} path='/relatorios' component={ReportList} />
            */}
            <Route exact={true} path='/usuarios' component={User} />
            <Route path='/usuarios/editar/:id' component={UserForm} />            
            <Route path='/usuarios/cadastrar' component={UserForm} />
           {/*}
            <Route exact={true} path='/colaboradores' component={EmployeeList} />

            <Route exact={true} path='/perfis' component={ProfileList} />
            <Route path='/perfis/editar/:id' component={ProfileForm} />
            <Route path='/perfis/cadastrar' component={ProfileForm} />
            
            <Route exact={true} path='/teste' component={Teste} />
            

            {/*<Redirect path='*' to='/' />*/}

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
