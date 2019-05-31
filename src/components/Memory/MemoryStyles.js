import styled from 'styled-components';

export const MemoryContainer = styled.div`
  display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: content-box;
    justify-content: space-evenly;
    background: #191b21 none repeat scroll 0 0; 
    text-decoration: none;
    
    img {
        width: 25px;
     } 
     
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
    float: left;
    padding: 3px;
    width: 25em;
    height: 50em;
    position: relative;
    z-index: 0;
    overflow: hidden;
    
    
    span, strong {
        font-family: Roboto, sans-serif;
    }
    
    color: white;
    
   
    
    &:hover{
        cursor: pointer;
        text-decoration: none;
        &::before{
            height: 490px;
            left: -62px;
            opacity: 0.15;
            top: -170px;
            width: 490px; 
        }
    }

`;
