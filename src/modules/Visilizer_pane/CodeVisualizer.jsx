import React, { Component } from 'react';
import FunctionWidget from "./widgets/FunctionWidget"

const VisualizerStyle = {
    display: "inline-block",
    width: "60%",
    height: "99vh",
    verticalAlign: "top",
    border: "1px solid black",
};

class CodeVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: [<FunctionWidget></FunctionWidget>],
        };
    };

    componentDidMount(){
        console.log("VISUALIZER:", this.props.widgets)
        this.createWidgets();
    };

    createWidgets = () => {
        var widgetStrings = this.props.widgets;
        var widgets = [];

        for (let i = 0; i < widgetStrings.length ; i++) {
            if (widgetStrings[i] === "def") {
                widgets += <FunctionWidget></FunctionWidget>;
            };
        };

        this.setState({widgets: widgets})
    };

    render() {
        return(
            <div id={"CodeVisualizer"} style={VisualizerStyle}>
                {this.state.widgets}
            </div>
        );
    };
};

export default CodeVisualizer;