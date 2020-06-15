'use strict'

let dom = document.getElementById('display');
let refresh = () => {
    let num = Math.floor(Math.random() * 6) + 1;
    let el = React.createElement(
        'p', {}, num
    )
    ReactDOM.render(el, dom);
}


