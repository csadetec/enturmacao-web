import React, { useEffect } from 'react'

function Home() {

  useEffect(() => {
    document.title = 'Home'
  })
  return (
    <div className="container">
      <h2>Home</h2>
      <p>
        Aplicação para Enturmação
      </p>
         
    </div>

  )
}

export default Home