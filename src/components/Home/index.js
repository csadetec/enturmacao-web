import React, { useEffect } from 'react'

function Home() {
  const logged = JSON.parse(localStorage.getItem('logged'))


  useEffect(() => {
    if(logged.courseActual === null){

    }
    document.title = 'Home'
  })
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-10">
          <h2>Home</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-10">
          <p>Aplicação para auxiliar no processo de enturmação.</p>
        </div>
      </div>
         
    </div>

  )
}

export default Home