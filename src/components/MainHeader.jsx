import React, { Component } from 'react';




class MainHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:this.props.data,
            age:''
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
                    <span style={{color:'white',fontSize:15}}>{this.state.data.logoName}</span>
                </div>

                <div style={{float:'right'}}>
                    <div
                        style={{
                            marginTop: "-14%",
                            fontSize: 16,
                            cursor: 'pointer'
                        }}>

                        <div className="d-flex">
                            <span style={{color:'white',fontSize:15,padding:5}}>{this.state.data.text1}</span>
                            <span style={{color:'white',fontSize:15,padding:5}}>{this.state.data.text2}</span>
                            <select style={{background:"transparent",border:'none',color:"white"}}>
                                {this.state.data.option1.map((option, index)=>{
                                    return(
                                        <option key={index} value={option} onChange={(e)=>this.handleChange(e)} >{option}</option>
                                    )
                                })}
                            </select>
                            <span style={{color:'white',fontSize:15,padding:5}}>{this.state.data.logout}</span>


                        </div>


                    </div>
                </div>

            </div>

        );
    }
}

export default MainHeader;
