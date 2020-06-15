ターミナルに打つ
npx create-react-app sample02
でnodejsのパッケージをインストール

npm run start
で
packege.jsonを作成
ローカルホストを立ち上げる

srcフォルダの
App.jsの
Edit <code>src/App.js</code> and save to reload.
編集するとローカルホスト反映される



Reactは二つやり方がある
htmlで編集React.createElementでやる方法と
   let el = React.createElement(
        'p', {}, num


【JSXを使ったやり方】
Appjsを編集するやり方と
Babelを使うやり方がある
ただCDNだとBabel使わないとできない

Appjsを編集はHTMLを描くことはできるが
複数行書くときはdivで囲ってやらないといけない
属性も弱いのでclassNameとキャメル型で書いてあげる
--------------------------------------------------------
function App() {
  let title = "ReactとJSX" 
  return (
    <div>
      <h1 id="h1" className="main-title">{title}</h1>　//変数を扱う場合{}で囲む
      <p style={{ color: "red" }}>HTMLが書けます。</p>　//styleをインラインでの記述方法
    </div>
  );
}

export default App;
--------------------------------------------------------
Bootstrapを導入する時はpublicのhtmlのheadタグの中に入れる
function App() {
  let items = [　　//配列の中にJSONを作る
    { "name": "いちご", "price": "100" },
    { "name": "りんご", "price": "150" },
    { "name": "ばなな", "price": "230" }
  ]
  return (
    //divタグの中にテーブル
    <div className="App　container">
      <table className="table table-striped">
        <tbody>
          {items.map((value) => (
            <tr>
              <th scope="row">{value.name}</th>
              <td>{value.price}円</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App;
--------------------------------------------------------
コンポーネントとステートで時計
stateはリフレッシュ反映してくれる
function App() {
  return (
    <div className="container text-center">
      <Clock />
    </div>

  )
}

class Clock extends React.Component {
  constructor(props) {
    super(props); //決まり文句　初期化する
    this.now = new Date(); //今の時刻

    //stateを定義
    this.state = {
      time: `${this.now.getHours()}:${this.now.getMinutes()}:${this.now.getSeconds()}`
    }
    //stateを使うために記述
    this.refresh = this.refresh.bind(this);
  }

  //クリックしたらリフレッシュするように
  refresh() {
    this.now = new Date();
    this.setState((state) => ({
      time: `${this.now.getHours()}:${this.now.getMinutes()}:${this.now.getSeconds()}`
    }));
  }

  render() {

    return <p onClick={this.refresh}>{this.state.time}</p>
  }
}

export default App;
--------------------------------------------------------
ルーティング処理で他のページ移動しよう
npm i -S react-router-dom

import { BrowserRouter, Route, Link } from 'react-router-dom'

Linkは
各ページ(コンポーネントconst App = () => ()に
<p><Link to="/about">About</Link></p>で作成できる


リンクのパラメーターの作り方
<Route path="/blog/:id" component={Blog} />


コンポーネント
const Blog = props => {
  const { id } = props.match.params

  return (
    <div>
      <p>{id}番目の記事です。</p>
    </div>
  )
}
--------------------
ホームのページの表記
const App = () => (
  <BrowserRouter>
<Route exact path="/" component={Home} />

const Home = () => {
<h1>Welcome</h1>
--------------------
アバウトのページの表記
const App = () => (
  <BrowserRouter>
<Route path="/about" component={About} />

const About = () => {
<h1>About</h1>
--------------------
import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <div class="container text-center mt-5">
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/blog/:id" component={Blog} />
      <Route path="/sum/:num1/:num2" component={Sum} />

    </div>
  </BrowserRouter>
)

const Home = () => {
  return (
    <div>
      <h1>Welcome</h1>

      <p><Link to="/about">About</Link></p>
    </div>
  )
}

const About = () => {
  return (
    <div>
      <h1>About</h1>

      <p><Link to="/">Home</Link></p>
    </div>
  )
}

const Blog = props => {
  const { id } = props.match.params

  return (
    <div>
      <p>{id}番目の記事です。</p>
    </div>
  )
}
--------------------------------------------------------
Reduxで、値を保持できるステート管理
値は複数のページで共有できないのでステート管理する

npm install --save redux
npm install --save react-redux


import { createStore } from 'redux'


const vote = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return state + 1
    default:
      return state
  }
}

let store = createStore(vote)

const Home = () => {
  store.dispatch({ type: 'ADD' })
  let x = store.getState().toString()

  return (
    <div>
      <h1>Welcome</h1>
      <p>投票数:{x}</p>

      <p><Link to="/about">About</Link></p>
    </div>
  )
}
--------------------------------------------------------