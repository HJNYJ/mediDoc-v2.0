import React from "react";

interface ButtonProps {
    type? : 'submit' | 'button';
    size? : 'base' | 'lg';
    label? : string;
    onClick? : React.MouseEventHandler<HTMLButtonElement>;
    classes? : string;
    diabled? : boolean;
    children: any;
}

const Button = ({type, size, label, onClick, disabled, children} : ButtonProps) => {
  
  return (
    <button type={type || 'button'} className={`flex flex-row justify-center gap-[4px] absolute`} onClick={onClick} disabled={disabled}>
      {label}{children}
    </button>
  );
};

export default Button;

/* button=filled, status=selected, size=Default */

/* Auto layout */
// display: flex;
// flex-direction: row;
// justify-content: center;
// align-items: center;
// padding: 0px 4px;
// gap: 4px;

// position: absolute;
// width: 358px;
// height: 50px;
// left: 8px;
// top: 8px;

// background: #FEA51D;
// border-radius: 8px;


/* button=filled, status=selected, size=Default */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 4px;
gap: 4px;

position: absolute;
width: 358px;
height: 50px;
left: 8px;
top: 8px;

background: #FEA51D;
border-radius: 8px;
