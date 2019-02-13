import React, { Component } from 'react';
import Chart from "./Chart";
import * as Format from '../utils/FormatData';




class LineChart extends Component {
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

    getTotalData(){
        let num=0;
        this.state.data.datasets[0].data.map((number,index)=>{
           num = num+number
        })

        return num;
    }

    render () {

        return (

            <div className="container-fluid" style={{background:'white',overflowY:'hidden',width:"97%"}}>
                <h5 style={{marginTop:15}}>Chart Data</h5>
                <h2>{this.getTotalData()}</h2>
                <Chart  data={Format.formatLineChart(this.state.data)}/>
            </div>

        );
    }
}

export default LineChart;
