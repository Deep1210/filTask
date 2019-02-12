import React, { Component } from 'react';
import './App.css';
import MainHeader from './components/MainHeader';
import Header from './components/Header';
import UserHeader from './components/UserHeader'
import Table from "./components/Table";
import ListComponent from "./components/ListComponent";
import Paper from "@material-ui/core/Paper";



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
                    <MainHeader/>
                    <Header/>
                    <UserHeader/>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">

                                </div>
                                <div className="row">

                                </div>
                                <div className="row">
                                    <div className='col-md-6'>
                                        <Table/>
                                    </div>
                                    <div className='col-md-6'>
                                    </div>

                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className='row'>
                                    <ListComponent type={"tab"}/>
                                </div>

                                <div className='row'>
                                    <ListComponent type={"list"}/>
                                </div>

                            </div>


                        </div>

                    </div>





                </div>

        );
    }
}

export default App;
