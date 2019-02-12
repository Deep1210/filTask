import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Select';




class UserHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName:"Deepanshu Rustagi"
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

                <div style={{paddingTop:5}}>
                    <span style={{color:'black',fontSize:15}}>{this.state.userName}</span>
                </div>

                <div style={{float:'right'}}>
                    <div
                        style={{
                            marginTop:"-8%",
                            cursor: 'pointer'
                        }}>

                        <span style={{color:'black',fontSize:15}}>{this.state.userName}</span>
                        <a href="#" style={{marginLeft:10,fontSize:15}}>{this.state.userName} &#8594;</a>


                    </div>
                </div>
                </div>



        );
    }
}

export default UserHeader;
