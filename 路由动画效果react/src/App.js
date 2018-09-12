import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { BrowserRouter , Switch, Route, Link, Redirect } from "react-router-dom";
import {getNews} from './api/api';
import './App.css'

const AnimationRoute = () => (
  <BrowserRouter>
    <Route
      render={({ location }) => (
        <div style={styles.fill}>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/reactanimated/hsl/10/90/50" />} //当在更目录时，重新定向到 /hsl/10/90/50
          />

          <ul style={styles.nav}>
            <NavLink to="/reactanimated/hsl/10/90/50" id="red">赚钱</NavLink>
            <NavLink to="/reactanimated/hsl/120/100/40" id="green">买房</NavLink>
            <NavLink to="/reactanimated/rgb/33/150/243" id="blue">买车</NavLink>
            <NavLink to="/reactanimated/rgb/240/98/146" id="pink">有存款</NavLink>
          </ul>
          <div style={styles.content}>
            {/*和平时使用动画组件没啥区别，*/}
            {/*在渲染的路由的地方加一个用动画组件包着，并添加css属性即可；*/}
            <TransitionGroup>
              <CSSTransition
                // 需要加一个key属性，让react认识每个组件，并进行正确的加载。
                // 这里我改了官方demo的代码， 原来是设置成location.key， 
                // 这样的话每次点击同一个路由链接的时候都会渲染。 location.pathname只会渲染一次
                key={location.pathname}
                // classNames 就是设置给css动画的标示，记得'classNames'带's'的。
                classNames="fade"
                // 动画时间设置为800ms，和css中的需要一致。
                timeout={800}
              >
                <Switch location={location}>
                  <Route exact path="/reactanimated/hsl/:h/:s/:l" component={HSL} />
                  <Route exact path="/reactanimated/rgb/:r/:g/:b" component={RGB} />
                  <Route render={() => <div>这里什么都没有，你是不是走错了啊</div>} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      )}
    />
  </BrowserRouter>
);

const NavLink = props =>{ //公共组件NavLink
  // alert(JSON.stringify(props))
 return  (
  <li style={styles.navItem} className={props.id}>
    <Link {...props} style={{textDecoration:"none" }} className={props ? styles.actives:""} />
  </li>
);
}


//参数接收方式 match : params
// const HSL = ({ match: { params } }) => (
//   <div
//     style={{
//       ...styles.hsl,
//       background: `hsl(${params.h}, ${params.s}%, ${params.l}%)`
//     }}
//   >
//     <div style={styles.fill}>
//       <ul style={styles.ullist}>

//       </ul>
//     </div>
//   </div>
// );

class HSL extends React.Component{
  constructor(props){
    super(props)
    this.state={
      datas:props
    }
  }
 async componentDidMount(){
  const datas = await getNews({type:"top",key:"76db99a8de0bb25da0ea78e8747f4971"});
  console.log(datas)
}
  render(){
const list = () =>{}
    return <div
              style={{
                ...styles.hsl,
                background: `hsl(${this.props.match.params.h}, ${this.props.match.params.s}%, ${this.props.match.params.l}%)`
              }}
            >
              <div style={styles.fill}>
                <ul style={styles.ullist}>
                    {list}
                </ul>
              </div>
            </div>
  }
}


/**
 * this ways:
 * 1
 * **/
class RGB extends React.Component{
  constructor(props){
    super(props)
    this.state={
      datas:props
    }
  }
componentDidMount(){
  const data = JSON.stringify(this.state.datas);
  console.log(data.match.url)
}
  render(){
    return <div
            style={{
              ...styles.rgb,
              background: `rgb(${this.props.match.params.r}, ${this.props.match.params.g}, ${this.props.match.params.b})`
            }}
          >
            rgb({this.props.match.params.r}, {this.props.match.params.g}, {this.props.match.params.b})
          </div>
  }
}
/**
 * this ways:
 * 2
 * **/
// const RGB = ({ match: { params } }) => (
//   <div
//     style={{
//       ...styles.rgb,
//       background: `rgb(${params.r}, ${params.g}, ${params.b})`
//     }}
//   >
//     rgb({params.r}, {params.g}, {params.b})
//   </div>
// );

const styles = {};

styles.fill = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

styles.content = {
  ...styles.fill,
  top: "40px",
  textAlign: "center"
};

styles.nav = {
  padding: 0,
  margin: 0,
  position: "absolute",
  top: 0,
  height: "40px",
  width: "100%",
  display: "flex",
  background:"orange"
};
styles.ullist={
  padding: 0,
  margin: 0,
  position: "absolute",
  top: 0,
  height: "100%",
  width: "100%",
  display: "flex",
};
styles.navItem = {
  textAlign: "center",
  flex: 1,
  listStyleType: "none",
  padding: "10px"
};

styles.hsl = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};

styles.rgb = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};
styles.actives = {
  color:"#000"
}

export default AnimationRoute;