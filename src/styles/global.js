import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root{
    height: 100%;
   
  }
  .container {
    min-height: 90%;
    border: 5px solid black;
    margin-bottom: 1px;


  }
  .container-fluid{
    min-height: 100%;
    border: 5px solid black;

  }

  body::-webkit-scrollbar{
    display:none;

  }
  .md-form label {
    font-size: 0.8rem;
    transform: translateY(-35%);
  }

  .select-form-control{
    border: none;
    border-bottom: 1px solid #4950575c;
    border-radius: 0 ;
  }
  

`
