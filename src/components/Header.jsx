import React, { Component } from 'react';
import logo from '../logo.png';



class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : this.props.data
        }

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render () {

        return (

            <div className="container-fluid" style={{background:'white',overflowY:'hidden'}}>


                <div className='row'>
                <div className="navbar-header" style={{padding:10}}>
                    <img src={logo} style={{height:100}} />
                </div>
                <ul className="nav navbar-nav-right" style={{position:'absolute',paddingTop:'40px',paddingRight:15,right:0}}>
                    <li style={{paddingLeft:5,paddingRight:5}} className="active"><a href="#">{this.state.data.menu1}</a></li>
                    <li style={{paddingLeft:5,paddingRight:5}} >
                        <select style={{background:"transparent",border:'none'}}>
                            {this.state.data.option1.map((option, index)=>{
                                return(
                                <option key={index} value={option}>{option}</option>
                                )
                            })}


                        </select>
                    </li>
                    <li style={{paddingLeft:5,paddingRight:5}} >
                        <select style={{background:"transparent",border:'none'}}>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                    </li>
                    <li style={{paddingLeft:5,paddingRight:5}} ><a>{this.state.data.menu2}</a></li>
                    <li style={{paddingLeft:5,paddingRight:5}} ><a>{this.state.data.menu3}</a></li>
                    <li style={{paddingLeft:5,paddingRight:5}} ><a>{this.state.data.menu4}</a></li>
                </ul>
                </div>

            </div>

        );
    }
}

export default Header;
