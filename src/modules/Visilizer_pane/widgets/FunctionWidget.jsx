import React, { Component } from 'react';

const functionStyle = {
    position: "absolute",
    width: "50px",
    height: "50px",
    border: "5px solid orange",
};

class FunctionWidget extends Component {
    constructor() {
        super();
    };

    render() {
        return (
            <div style={functionStyle}></div>
        )
    };
};

export default FunctionWidget;
