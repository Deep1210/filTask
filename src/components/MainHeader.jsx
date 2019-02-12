import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';



class MainHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoName:"Fidelity Internationals",
            text1:"hello",
            text2:"print",
            text3:"options",
            logout:"Logout",
            age:"Options",

        }

    }


    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleChange = event => {
        this.setState({ age: event.target.value });
    };


    render () {

        return (

            <div  style={{height: 35 ,background:'#696969',overflowY:'hidden'}}>

                <div style={{paddingTop:5,paddingLeft:12}}>
                    <span style={{color:'white',fontSize:15}}>{this.state.logoName}</span>
                </div>

                <div style={{float:'right'}}>
                    <div
                        style={{
                            marginTop: "-14%",
                            fontSize: 16,
                            cursor: 'pointer'
                        }}>

                            <div className="d-flex">
                                <span style={{color:'white',fontSize:15,padding:5}}>{this.state.text1}</span>
                                <span style={{color:'white',fontSize:15,padding:5}}>{this.state.text2}</span>
                                <select style={{background:"transparent",marginTop:4,color:"white",border:'none'}}>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="opel">Opel</option>
                                    <option value="audi">Audi</option>
                                </select>
                                <span style={{color:'white',fontSize:15,padding:5}}>{this.state.logout}</span>


                            </div>


                    </div>
                </div>

            </div>

        );
    }
}

export default MainHeader;
