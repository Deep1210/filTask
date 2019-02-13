import React, { Component } from 'react';
import './App.css';
import MainHeader from './components/MainHeader';
import Header from './components/Header';
import UserHeader from './components/UserHeader'
import Table from "./components/Table";
import ListComponent from "./components/ListComponent";
import Json from "./jsonfiles/Json";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import Paper from "@material-ui/core/Paper";



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:Json
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


                <div className="black-mountain">
                    <MainHeader data={this.state.data.mainHeader}/>
                    <Header data={this.state.data}/>
                    <UserHeader data={this.state.data.userJson}/>

                    <div className="container-fluid"  >
                        <div className="row">
                            <div className="col-md-8">
                                <Paper style={{marginTop:10}}>
                                    <div className="row">
                                        <LineChart data={this.state.data.chart}/>
                                    </div>
                                    <div className="row">

                                    </div>
                                    <div className="row">
                                        <div className='col-md-6'>
                                            <Table
                                                tableData={this.state.data.listJson}/>
                                        </div>
                                        <div className='col-md-6'>
                                            <PieChart data={this.state.data.chart}/>
                                        </div>

                                    </div>
                                </Paper>
                            </div>


                            <div className="col-md-4">
                                <div className='row'>
                                    <ListComponent
                                        type={"tab"}
                                        listData={this.state.data.listJson}
                                    />
                                </div>

                                <div className='row'>
                                    <ListComponent
                                        type={"list"}
                                        listData={this.state.data.listJson}
                                    />
                                </div>

                            </div>


                        </div>

                    </div>





                </div>

        );
    }
}

export default App;
