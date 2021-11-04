import React from 'react';
import { Redirect } from 'react-router-dom';

const HomePage = () => {
    return (
        <>
        <Redirect to="/login"></Redirect>
        <div>Đyâ là trang chủ</div>
        </>
    )
}

export default HomePage
