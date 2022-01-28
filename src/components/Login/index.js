import React from "react";
import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) =>{
        e.preventDefault();

        if(!username){
            alert('Please enter username');
            return null;
        }
        if(!password){
            alert('Please enter password');
            return null;
        }
    }

    return(
        <form className='container' onSubmit={onSubmit}>
            <div className='form-control'>
                <div className='input-container'>
                    <input
                        type='text'
                        style={inputStyle}
                        onChange={(e) => setUsername(e.target.value)}
                        //required
                        placeholder="Username"/>
                </div>
                <div className="input-container">
                    <input
                        type='password'
                        style={inputStyle}
                        onChange={(e) => setPassword(e.target.value)}
                        //required
                        placeholder="Password"/>
                </div>
                <div className="button-container">
                    <input
                        type='submit'/>
                </div>
            </div>
        </form>
    );
};

const inputStyle = {
    width: '100%',
    height: '40px',
    margin: '5px',
    padding: '3px 7px',
    fontSize: '17px'
}

export default Login;
