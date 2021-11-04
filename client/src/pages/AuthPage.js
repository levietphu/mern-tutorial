import React from 'react'
import LoginFormComponent from '../components/LoginFormComponent'
import RegisterFormComponent from '../components/RegisterFormComponent'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const AuthPage = ({auth}) => {

    let {authState: {authLoading, isAuthenticated}} =  useContext(AuthContext);

    let showForm = () => {
        if(authLoading){
            return <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info"></Spinner>
            </div>
        }else if(isAuthenticated) {
            return <Redirect to="/dashboard"></Redirect>
        }else{
            return <> {auth ==='login'?<LoginFormComponent />:<RegisterFormComponent />}</>
        }
        
    }

    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Learn It</h1>
                    <h4>Keep track of what you are learning</h4>
                    {showForm()}
                </div>
            </div>
        </div>
    )
}

export default AuthPage
