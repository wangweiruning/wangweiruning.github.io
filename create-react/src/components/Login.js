import React,{Component} from 'react'

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        //数据处理一般在这里处理
    }

    render(){
        return(
            <div style={styles.fill}>
                <p>随便填写</p>
            </div>
        )
    }
}

const styles={};

styles.fill={
    backgroundColor:"red",
    color:"#eee"
}