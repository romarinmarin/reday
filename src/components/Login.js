import React from 'react';

const Login = (props) => {
    return (
        <div>
            Login
            <nav>
                <button onClick={() => props.authentificate('Facebook')}>Facebook</button>
                <button onClick={() => props.authentificate('Twitter')}>Twitter</button>
                <button onClick={() => props.authentificate('Github')}>Github</button>
            </nav>

        </div>

    );
};



export default Login;