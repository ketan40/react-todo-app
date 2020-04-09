import React from 'react';

const Title = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    );
}

class Component1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.title = 'Parent is calling child'
    }

    render() {
        return (
            <div>
                <Title title={this.title} />
                <h2> Component 1 loaded</h2>
            </div>
        )
    }
}

export default Component1;



