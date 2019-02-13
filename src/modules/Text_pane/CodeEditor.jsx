import React, { Component } from 'react';
// import Editor from 'react-simple-code-editor';

const EditorStyle = {
    display: "inline-block",
    width: "50%",
    height: "98.25vh",
    resize: "horizontal",
    border: "1px solid black",
    fontSize: "1em",
    fontFamily: "courier",
    spellCheck: "false",
    whiteSpace: "nowrap",
    paddingLeft: ".5em",
};

const LineNumbersStyle = {
    display: "inline-block",
    border: "1px solid red",
    height: "98.25vh",
    verticalAlign: "top",
    fontSize: "1em",
    fontFamily: "courier",
    margin: "none",
    paddingTop: "3px",
    textAlign: "right",
}

class CodeEditor extends Component {
    constructor() {
        super();
        this.state = {
            code: "",
            numberLabels: [<div>1</div>],
            highestLineNumber: 1
        };
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setCodeToState();
            this.evaluateCode();
        }, 1)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    setCodeToState = () => {
        var contents = document.getElementById("codeTextArea").value;
        this.setState({ code: contents })
    }

    evaluateCode = () => {
        var code = this.state.code;
        var lines = 1;

        for (let i = 0; i < code.length; i++) {
            if (code[i] === "\n") {
                lines += 1;
            };
        };

        if (lines > this.state.highestLineNumber) {
            this.addLineNumber(lines-this.state.highestLineNumber);
        } else if (lines < this.state.highestLineNumber) {
            this.removeLineNumber(this.state.highestLineNumber-lines);
        };
    }

    removeLineNumber = (num) => {
        // Doesn't let you remove ALL line numbers
        if (this.state.highestLineNumber > 1) {
            this.setState({ highestLineNumber: this.state.highestLineNumber - num })
            this.setState(prevState => ({
                numberLabels: [...prevState.numberLabels.slice(0, prevState.numberLabels.length - num)]
            }));
        }
    }

    addLineNumber = (num) => {
        var lineLabels = [];

        for (let i = 0; i < num; i++){
            let label = <div>{this.state.highestLineNumber+num}</div>;
            lineLabels.push(label);
        }

        this.setState({ highestLineNumber: this.state.highestLineNumber + 1 })
        this.setState({numberLabels: this.state.numberLabels.concat(lineLabels)});
    }

    render() {
        return (
            <div id={"codeEditor"}>
                <div id="lineNumbersLabel" style={LineNumbersStyle}>
                    {this.state.numberLabels}
                </div>
                <textarea id={"codeTextArea"} style={EditorStyle}></textarea>
                <button onClick={this.setCodeToState}>Contents</button>
                <button onClick={() => this.addLineNumber(1)}>Add One</button>
                <button onClick={() => this.removeLineNumber(1)}>Rmv One</button>
            </div>
        )
    }
}

export default CodeEditor;