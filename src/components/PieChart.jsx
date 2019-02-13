import React, { Component } from 'react';
import Chart from "./Chart";
import * as Format from '../utils/FormatData';




class PieChart extends Component {
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

            <div className="container-fluid" style={{background:'white',overflowY:'hidden',marginTop:"5%"}}>
                <Chart height={"45vh"} data={Format.formatPieChart(this.state.data)}/>
            </div>

        );
    }
}

export default PieChart;
