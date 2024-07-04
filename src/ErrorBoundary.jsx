import React, { Component } from 'react'

export default class ErrorBoundary extends Component {


    constructor(props) {
        super(props);
        this.state = { error: null };
      }

      static getDerivedStateFromError(error) {    
        console.log("errorBoundary") 
        return { error }; 
      }
       componentDidCatch(error, errorInfo) {       
        console.log(error, errorInfo);
      }
      render() {
        const { error } = this.state;
        if (error) {     
          return <h4 style={{color: 'red', textAlign:'center'}}>{error?.message}</h4>     
        }
        return this.props.children;
      }
}