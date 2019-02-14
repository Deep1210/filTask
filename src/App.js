import React, { Component } from 'react';
import './App.css';
import MainHeader from './components/MainHeader';
import Header from './components/Header';
import UserHeader from './components/UserHeader'
import PageHeader from './components/PageHeader'
import Table from "./components/Table";
import ListComponent from "./components/ListComponent";
import Json from "./jsonfiles/Json";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import Paper from "@material-ui/core/Paper";
import { fetchJson } from "./redux/Actions";
import { connect } from "react-redux";



class App extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            data : Json,
            ref:''

        }

    }


    componentDidMount() {
        this.props.dispatch(fetchJson());
    }

    componentWillUnmount() {

    }

    render () {

        const { error, loading, jsonData } = this.props;

        console.log("Data",this.props)


        if (error) {
            return <div>Error! {error.message}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }


        if(!loading) {
            return (
                <div className="black-mountain">
                    <MainHeader data={jsonData.mainHeader}/>
                    <Header data={jsonData}/>
                    <div style={{paddingRight:10,paddingLeft:10}}>
                        <UserHeader data={jsonData.userJson}/>
                        <PageHeader data={jsonData.userJson} downloadData={jsonData.listJson}/>

                        <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">
                                <Paper style={{marginTop: 10,height:"95vh",marginBottom:10}}>
                                    <div className="row">
                                        <LineChart data={jsonData.chart}/>
                                    </div>
                                    <div className="row">

                                    </div>
                                    <div className="row">
                                        <div className='col-md-6'  ref={this.myRef} style={{height:'50vh'}} >
                                            <Table
                                                tableData={jsonData.listJson}/>
                                        </div>
                                        <div className='col-md-6'>
                                            <PieChart data={jsonData.chart}/>
                                        </div>

                                    </div>
                                </Paper>
                            </div>


                            <div className="col-md-4">
                                <div className='row'>
                                    <ListComponent
                                        type={"tab"}
                                        listData={jsonData.listJson}
                                    />
                                </div>

                                <div className='row'>
                                    <ListComponent
                                        type={"list"}
                                        listData={jsonData.listJson}
                                    />
                                </div>

                            </div>


                        </div>

                    </div>
                    </div>


                </div>

            );
        }
    }
}

const mapStateToProps = state => ({
    jsonData: state.test.jsonData,
    loading: state.test.loading,
    error: state.test.error
});

export default connect(mapStateToProps)(App);


