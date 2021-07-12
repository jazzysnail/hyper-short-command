let charBuffer = [];
let config = null;
let hasNoConfig = false;

const matchingKeyword = function(char) {
    if (hasNoConfig) return [false, ''];
    if (!config) config = window.config.getConfig().hyperShortCommand;
    if (!config) {
        hasNoConfig = true;
    }
    switch (char) {
        case ' ': {
            console.log(charBuffer.join(''), config);
            const ma = config.transform[charBuffer.join('')];
            if (ma) {
                return [true, ma];
            } else {
                charBuffer = [];
                return [false, ''];
            }
        }
        case '\r': {
            charBuffer = [];
            return [false, ''];
        }
        // case '\b': {
        //     charBuffer.pop();
        //     return [false, ''];
        // }
        default: {
            charBuffer.push(char);
            return [false, ''];
        }
    }
}

exports.middleware = (store) => (next) => (action) => {
    // console.log(action);
    // if (action.type === 'SESSION_ADD_DATA' && action.data.match('\b')[0]) {
    //     charBuffer.pop();
    //     next(action);
    // }
    if (action.type === 'SESSION_USER_DATA') {
        const { data } = action;
        const [match, command] =matchingKeyword(data);
        if (match && data.length < 1000) {
            console.log('match');
            window.rpc.emit('command', 'editor:deletePreviousWord');
            // store.dispatch({
            //     type: 'TRANSFORM_WORD',
            //     command
            // });
        }
    }
    next(action);
}

exports.reduceUI = (state, action) => {
    switch (action.type) {
        case 'TRANSFORM_WORD':
            // console.log('TRANSFORM_WORD', action);
            return state.set('rocketState', (state.rocketState + 1) || 1);
        default:
            return state;
    }
};

exports.mapTermsState = (state, map) => {
    // console.log(map, state);
    return map;
};

exports.decorateTerm = (Term, { React }) => {
    const { Component, createElement } = React;

    const ShortCommandTerm = class extends Component {
      constructor(props, context) {
        super(props, context);
        this._onTerminal = term => {
            // console.log(term);
            if (props && props.onTerminal) props.onTerminal(term);
            if (window.store.getState().sessions.activeUid !== props.uid) return;
            term.io.sendString('hello world');
        };
      }

      render() {
        const { _onTerminal: onTerminal } = this;
        const newProps = Object.assign({}, this.props, { onTerminal });
        return createElement(Term, newProps);
      }
    };
    return ShortCommandTerm;
};

// const passProps = (uid, parentProps, props) => {
//     console.log(parentProps, props);
//     return props;
//     // return Object.assign(props, {
//     //     wowMode: parentProps.wowMode
//     // });
// };

// exports.getTermGroupProps = passProps;
// exports.getTermProps = passProps;

// exports.decorateTerm = (Term, { React, notify }) => {

// }
