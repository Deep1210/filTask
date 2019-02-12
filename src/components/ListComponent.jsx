import React, { Component } from 'react';
import ListData from "../jsonfiles/ListData";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";



class ListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData:ListData.data,
            tab1:ListData.tab1,
            tab2:ListData.tab2,
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

    render () {

        return (

            <div className="container-fluid" style={{background:'white',overflowY:'hidden'}}>
                {this.state.type==="tab" &&
                    <Paper style={{ height: "40vh",marginTop:10,marginBottom:5}}>
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

                        <div style={{overflow:'auto'}}>
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

                {this.state.type === "list" &&
                    <Paper style={{height: "38vh",marginTop:5,marginBottom:10}}>
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
                    </Paper>
                }


            </div>

        );
    }
}

export default ListComponent;
