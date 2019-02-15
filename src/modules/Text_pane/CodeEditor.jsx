import React, { Component } from 'react';
import CodeVisualizer from "../Visilizer_pane/CodeVisualizer"

const EditorInputStyle = {
    display: "inline-block",
    width: "90%",
    fontSize: "1em",
    fontFamily: "consolas, monospace",
    spellCheck: "false",
    whiteSpace: "nowrap",
    paddingLeft: ".25em",
    border: "1px solid green",
    overflowX: "auto",
    overflowY: "visible",
};

const LineNumbersStyle = {
    display: "inline-block",
    width: "5%",
    verticalAlign: "top",
    fontSize: "1em",
    fontFamily: "consolas, monospace",
    margin: "none",
    paddingLeft: ".2em",
    paddingRight: ".1em",
    textAlign: "right",
    backgroundColor: "#bbbbbb",
    border: "1px solid green",
};

const EditorStyle = {
    display: "block",
    width: "100%",
    padding: "0px",
    height: "99vh",
}

class CodeEditor extends Component {
    constructor() {
        super();
        this.state = {
            code: "",
            numberLabels: [<div>1</div>],
            highestLineNumber: 1,
            widgetsNeeded: [],
            visualizer: <CodeVisualizer widgets={[]}></CodeVisualizer>,
        };
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setCodeToState();
            this.evaluateCode();
            this.updateVisualizer();
        }, 10);

        console.log(this.state.visualizer)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    setCodeToState = () => {
        var contents = document.getElementById("codeTextArea").innerText;
        this.setState({ code: contents })
    };

    evaluateCode = () => {
        var code = this.state.code;
        var lines = 0;

        for (let i = 0; i < code.length; i++) {
            if (code[i] === "\n") {
                lines += 1;
            };
        };

        if (lines > this.state.highestLineNumber) {
            this.addLineNumber(lines - this.state.highestLineNumber);
        } else if (lines < this.state.highestLineNumber) {
            this.removeLineNumber(this.state.highestLineNumber - lines);
        };

        
        var codeList = code.split(" ");
        var functions = [];

        // console.log(codeList)
        for (let i = 0; i < codeList.length; i++) {
            if (codeList[i] === "def") {
                functions = functions.concat(codeList[i]);
            };
        };
        
        this.setState({widgetsNeeded: functions});
        // console.log("Widgets:",this.state.widgetsNeeded);
    };

    updateVisualizer = () => {
        this.setState({visualizer: <CodeVisualizer widgets={this.state.widgetsNeeded}></CodeVisualizer>})
    }

    removeLineNumber = (num) => {
        // Doesn't let you remove ALL line numbers
        if (this.state.highestLineNumber > 1) {
            this.setState({ highestLineNumber: this.state.highestLineNumber - num });
            this.setState(prevState => ({
                numberLabels: [...prevState.numberLabels.slice(0, prevState.numberLabels.length - num)]
            }));
        };
    };

    addLineNumber = (num) => {
        var lineLabels = [];

        for (let i = 0; i < num; i++) {
            let label = <div>{this.state.highestLineNumber + num}</div>;
            lineLabels.push(label);
        };

        this.setState({ highestLineNumber: this.state.highestLineNumber + 1 });
        this.setState({ numberLabels: this.state.numberLabels.concat(lineLabels) });
    };

    render() {
        return (
            <div>
                <div style={{ display: "inline-block", width: "39%" }}>
                    <div id={"codeEditor"} style={EditorStyle}>
                        <div style={{ overflowY: "auto", border: "1px solid purple", height: "100%" }}>
                            <div id="lineNumbersLabel" style={LineNumbersStyle}>
                                {this.state.numberLabels}
                            </div>
                            <div id={"codeTextArea"} style={EditorInputStyle} contentEditable="true" spellCheck="false"></div>
                        </div>
                    </div>
                </div>
                {this.state.visualizer}
            </div>
        )
    }
}

export default CodeEditor;