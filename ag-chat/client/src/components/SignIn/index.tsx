import React from 'react';
import { Dispatch, FC, SetStateAction } from 'react'
import { SIGN_IN_TEXT } from '../../dictionary';

type SignInProps = {
    userName: string;
    setUserNameCallback: Dispatch<SetStateAction<string>>;
    onConnectCallback: () => void;
};

const SignIn: FC<SignInProps> = ({ userName, onConnectCallback, setUserNameCallback }) => (
    <div className='sign_form'>
        <div className='form_container'>
            <div className='form-title'>{SIGN_IN_TEXT.title}</div>

            <input
                className='form-input'
                value={userName}
                onChange={e => setUserNameCallback(e.currentTarget.value)}
                type="text"
                placeholder={SIGN_IN_TEXT.enterName}
            />

            <button className='button' onClick={onConnectCallback}>{SIGN_IN_TEXT.sign}</button>
        </div>
    </div>
);

export default SignIn;