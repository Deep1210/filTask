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

            <div className="container-fluid" style={{background:'white',overflowY:'hidden'}}>

                <div style={{paddingTop:5}}>
                    <span style={{color:'black',fontSize:15}}>{this.state.data.name}</span>
                </div>

                <div style={{float:'right'}}>
                    <div
                        style={{
                            marginTop:"-8%",
                            cursor: 'pointer'
                        }}>

                        <span style={{color:'black',fontSize:15}}>{this.state.data.button}</span>
                        <a href="#" style={{marginLeft:10,fontSize:15}} onClick={()=>alert("You pressed button")}>{this.state.data.link} &#8594;</a>


                    </div>
                </div>
                </div>



        );
    }
}

export default UserHeader;
