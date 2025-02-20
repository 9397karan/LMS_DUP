import React from 'react';
import styled from 'styled-components';

const Spinner = () => {
  return (
    <StyledWrapper>
      <svg xmlns="http://www.w3.org/2000/svg" height="200px" width="200px" viewBox="0 0 200 200" className="pencil">
        <defs>
          <clipPath id="pencil-eraser">
            <rect height={30} width={30} ry={5} rx={5} />
          </clipPath>
        </defs>
        <circle transform="rotate(-113,100,100)" strokeLinecap="round" strokeDashoffset="439.82" strokeDasharray="439.82 439.82" strokeWidth={2} stroke="currentColor" fill="none" r={70} className="pencil__stroke" />
        <g transform="translate(100,100)" className="pencil__rotate">
          <g fill="none">
            <circle transform="rotate(-90)" strokeDashoffset={402} strokeDasharray="402.12 402.12" strokeWidth={30} stroke="hsl(220,90%,40%)" r={64} className="pencil__body1" />
            <circle transform="rotate(-90)" strokeDashoffset={465} strokeDasharray="464.96 464.96" strokeWidth={10} stroke="hsl(220,90%,50%)" r={74} className="pencil__body2" />
            <circle transform="rotate(-90)" strokeDashoffset={339} strokeDasharray="339.29 339.29" strokeWidth={10} stroke="hsl(220,90%,30%)" r={54} className="pencil__body3" />
          </g>
          <g transform="rotate(-90) translate(49,0)" className="pencil__eraser">
            <g className="pencil__eraser-skew">
              <rect height={30} width={30} ry={5} rx={5} fill="hsl(220,90%,60%)" />
              <rect clipPath="url(#pencil-eraser)" height={30} width={5} fill="hsl(220,90%,50%)" />
              <rect height={20} width={30} fill="hsl(220,10%,30%)" />
              <rect height={20} width={15} fill="hsl(220,10%,20%)" />
              <rect height={20} width={5} fill="hsl(220,10%,25%)" />
              <rect height={2} width={30} y={6} fill="hsla(220,10%,10%,0.2)" />
              <rect height={2} width={30} y={13} fill="hsla(220,10%,10%,0.2)" />
            </g>
          </g>
          <g transform="rotate(-90) translate(49,-30)" className="pencil__point">
            <polygon points="15 0,30 30,0 30" fill="hsl(33,90%,50%)" />
            <polygon points="15 0,6 30,0 30" fill="hsl(33,90%,40%)" />
            <polygon points="15 0,20 10,10 10" fill="hsl(220,10%,5%)" />
          </g>
        </g>
      </svg>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #121212;
  color: #ffffff;
  
  .pencil {
    display: block;
    width: 10em;
    height: 10em;
  }

  .pencil__body1,
  .pencil__body2,
  .pencil__body3,
  .pencil__eraser,
  .pencil__eraser-skew,
  .pencil__point,
  .pencil__rotate,
  .pencil__stroke {
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  .pencil__rotate {
    animation-name: pencilRotate;
  }

  @keyframes pencilRotate {
    from {
      transform: translate(100px,100px) rotate(0);
    }
    to {
      transform: translate(100px,100px) rotate(720deg);
    }
  }
`;

export default Spinner;
