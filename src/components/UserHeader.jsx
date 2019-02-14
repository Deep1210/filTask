import React, { Component } from 'react';





class UserHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
           data:this.props.data
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

            <div className="container-fluid" style={{background:'#F5FCFF',overflowY:'hidden'}}>

                    <div className='row'>
                        <div className="navbar-header" style={{padding:15}}>
                            <span style={{color:'black',fontSize:15}}>{this.state.data.name}</span>
                        </div>
                        <ul className="nav navbar-nav-right" style={{position:'absolute',paddingTop:'15px',paddingRight:15,right:0}}>
                            <li style={{paddingLeft:5,paddingRight:5}} className="active">
                                <span style={{color:'black',fontSize:15}}>{this.state.data.button}</span>
                            </li>
                            <li style={{paddingLeft:5,paddingRight:5}} >
                                <a href="#" style={{marginLeft:10,fontSize:15}} onClick={()=>alert("You pressed button")}>{this.state.data.link} &#8594;</a>
                            </li>

                        </ul>

                    </div>
                <hr style={{marginTop:"0%"}}/>

            </div>



        );
    }
}

export default UserHeader;
