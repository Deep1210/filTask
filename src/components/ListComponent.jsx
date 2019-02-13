import React, { Component } from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import blue from '@material-ui/core/colors/blue';
import icon from '../pdf.svg';
import Visibility from '@material-ui/icons/Visibility';
import Save from '@material-ui/icons/SaveAlt';




class ListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData:this.props.listData.data,
            tab1:this.props.listData.tab1,
            tab2:this.props.listData.tab2,
            listTab:0,
            type:this.props.type
        }

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    _changeTab(v) {
        console.log(v)
        this.setState({
            listTab: v,
            listData:this.state.listData.reverse()
        })
    }

    showAlert(message){
        alert(message);
    }

    render () {

        return (

            <div className="container-fluid" style={{overflowY:'hidden'}}>
                {this.state.type==="tab" &&
                    <Paper style={{ marginTop:10,marginBottom:5}}>
                        <Tabs id={"step22"}

                              value={ this.state.listTab }
                              onChange={ (e, v) => this._changeTab(v) }
                              classes = {{indicator: "tab-indicator"}}
                        >
                            <Tab
                                label={this.state.tab1}
                                classes = {{label: "new-dashboards-label"}}/>
                            <Tab

                                label={this.state.tab2}
                                classes = {{label: "new-dashboards-label"}}/>
                        </Tabs>

                        <div style={{height: "35vh",overflow:'auto'}}>
                            <List>
                                { this.state.listData.map((part, index) => {
                                    return (

                                            <ListItem key = {index} button style = {{paddingTop:7, paddingBottom: 7}}>
                                                <div className="container" >


                                                    <div className = "row" style={{paddingLeft: 5, marginTop: 5}}>
                                                        <img src={icon}  style={{height:30,paddingRight:10}}/> {part.employee_name}
                                                    </div>
                                                    <div className="row" style={{marginLeft:35}}>

                                                            <div className="row" onClick={()=>this.showAlert("Clicked View")} >
                                                                <Visibility  color='primary' style={{height:20}} />
                                                                <span style={{color:"rgb(65,83, 175)",fontSize:13}}>View</span>
                                                            </div>

                                                            <div className='row' style={{marginLeft:35}} onClick={()=>this.showAlert("Clicked Download")}>
                                                                <Save color='primary' style={{height:20}}/>
                                                                <span style={{color:"rgb(65,83, 175)",fontSize:13}}>Download</span>
                                                            </div>


                                                    </div>
                                                </div>
                                            </ListItem>
                                    )
                                }) }
                            </List>
                        </div>
                    </Paper>
                    }

                {this.state.type === "list" &&
                    <Paper style={{marginTop:5,marginBottom:10}}>
                        <div style={{height: "38vh",overflow:'auto'}}>
                        <List>
                            { this.state.listData.map((part, index) => {
                                return (

                                    <ListItem key = {index} button style = {{paddingTop:7, paddingBottom: 7}}>
                                        <div className="container">
                                            <div className = "row" style = {{paddingLeft: 5, marginTop: 5}}>
                                                {part.employee_name}
                                            </div>
                                            <div className="row">
                                                <div className = "col" style = {{marginTop:20}}>

                                                </div>
                                            </div>
                                        </div>
                                    </ListItem>
                                )
                            }) }
                        </List>
                        </div>
                    </Paper>
                }


            </div>

        );
    }
}

export default ListComponent;
