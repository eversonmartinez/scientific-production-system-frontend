import React from 'react';
import { useLocation } from 'react-router-dom';

export const withLocation = (Component) => {
  return (props) => {
    const location = useLocation();
    return <Component {...props} location={location}/>
  };
};