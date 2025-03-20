import React, { useState } from 'react';

interface Props {
    type: string;
    id: string;
    className: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    submitFunction: () => void;
    ariaLabel: string
} 

const AuthenticationFields = (props: Props) => {

    const [alias, setAlias] = useState("");
    const [password, setPassword] = useState("");

    const checkSubmitButtonStatus = (): boolean => {
        return !alias || !password;
      };
    
    const loginOrRegister = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key == "Enter" && !checkSubmitButtonStatus()) {
          props.submitFunction();
        }
    };

    return (
        <div className="form-floating mb-3">
          <input
            type={props.type}
            className="form-control"
            id={props.id}
            aria-label={props.ariaLabel}
            placeholder={props.placeholder}
            onChange={props.onChange} 
            onKeyDown={loginOrRegister}
          />
          <label htmlFor={props.id}>{props.placeholder}</label>
        </div>
      );

}

export default AuthenticationFields;