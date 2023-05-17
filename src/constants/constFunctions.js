
import React,{ useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const constFunctions=()=>{
    const navigateTo=useNavigate();

    useEffect(() => {
        navigateTo("/dashboard");
    }, []);

}

export default constFunctions;