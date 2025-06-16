import React from 'react';
import styled from 'styled-components';

const Button = ({ children, ...props }) => {
  return (
    <StyledWrapper>
      <button {...props}  >
        <span> { children }
        </span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* From uiverse.io by @Ali-Tahmazi99 */
  button {
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 3.5rem;
   padding: 0.75rem 3rem; /* px-8 py-3 */
   font-size: 1rem; /* text-base */
   background:#000
   font-weight: 500;
   border-radius: 0.375rem;
   border: 1px solid #03045e;
   position: relative;
   overflow: hidden;
   transition: all 0.5s ease-in;
   z-index: 1;
  }


  button::before,
  button::after {
   content: '';
   position: absolute;
   top: 0;
   width: 0;
   height: 100%;
   transform: skew(15deg);
   transition: all 0.5s;
   overflow: hidden;
   z-index: -1;
  }

  button::before {
   left: -7px;
   background: #dc2626;
  }

  button::after {
   right: -6px;
   background: #C70039;
  }

  button:hover::before,
  button:hover::after {
   width: 58%;
  }

  button:hover span {
   color: #fff;
   transition: 0.3s;
  }

  button span {
   color: ghostwhite;
   font-size: 1.4rem;
   transition: all 1s ease-in;
  }
 
  @media (min-width: 375px) {
  button {
    width: 120px;
  }

   @media (min-width: 1024px) {
  button {
    width: 135px;
    height: 3.2rem;
  }

  @media (min-width: 768px) {
  button {
    padding: 1rem 2.5rem;
    font-size: 1.125rem; 
  }
  `;
    

export default Button;
