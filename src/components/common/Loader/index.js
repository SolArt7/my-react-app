import React from 'react';
import './styles.css';
import loaderImg from './loaderImg.gif';

const Loader = () => {
    return (
        <div className="text-center py-5">
            <img src={loaderImg} alt="Loader"/>
        </div>
    );
};

export default Loader;