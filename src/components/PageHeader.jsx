import React, { Component } from 'react';
import Save from '@material-ui/icons/SaveAlt';
import DownArrow from '@material-ui/icons/KeyboardArrowDown';
import {CSVLink, CSVDownload} from 'react-csv';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as Actions from '../redux/Actions';
var jsPDF = require('jspdf');
require('jspdf-autotable');





class PageHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data:this.props.data,
            isShareMenuOpen:false,
            imgUrl:''
        }

        this.handleMenuClose = this.handleMenuClose.bind(this);

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    handleShareMenuClick(e) {
        e.preventDefault();
        this.setState({
            anchorEl: e.currentTarget,
            isShareMenuOpen: true,
        });
    }



    handleMenuClose() {
        this.setState({
            anchorEl: null,
            isShareMenuOpen: false,
        });
    }




    makePdf(data){
        const input = this.state.ref;
        let doc = new jsPDF();
        const fields = [];
        const csvData = [];

        for(let k in data[0])
            fields.push(k);


        for(var j=0;j<data.length;j++){
            const dataValue=[];
            for(var k=0;k<fields.length;k++){
                const headerName = fields[k];
                dataValue.push(data[j][headerName]);
            }
            csvData.push(dataValue);
        }



// Example usage of columns property. Note that America will not be included even though it exist in the body since there is no column specified for it.
        doc.autoTable({
            head: [fields],
            body: csvData
        })

        doc.save("download.pdf");






    }

    render () {

        return (

            <div className="container-fluid" style={{background:'#F5FCFF',overflowY:'hidden'}}>

                <Menu
                    id="share-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.isShareMenuOpen}
                    style={{top:'5%',left:'0'}}
                    onClose={this.handleMenuClose}
                >
                    <MenuItem
                        style={{backdropColor:'#009688'}}
                        onClick={()=>this.handleMenuClose()}
                    >

                        <span style={{color:'black',fontFamily:"ObjectiveMK1-Rg",fontSize:'0.875rem'}} onClick={()=>this.makePdf(this.props.downloadData.data)}>EXPORT TO PDF</span>

                    </MenuItem>
                    <MenuItem
                        onClick={()=>this.handleMenuClose()}>
                        <CSVLink filename="reports.csv" data={Actions.downloadData(this.props.downloadData.data, 'csv')} headers={[this.props.downloadData.label1,this.props.downloadData.label2]}>
                            <span style={{color:'black',fontFamily:"ObjectiveMK1-Rg",fontSize:'0.875rem'}}>EXPORT TO CSV</span>
                        </CSVLink>
                    </MenuItem>
                </Menu>


                    <div className='row'>
                        <div className="navbar-header" style={{padding:15}}>
                            <span style={{color:'black',fontSize:15}}>{this.state.data.name}</span>
                        </div>
                        <ul className="nav navbar-nav-right" style={{position:'absolute',paddingTop:'15px',paddingRight:15,right:0}} onClick={(e)=>this.handleShareMenuClick(e)}>
                            <li style={{paddingLeft:5,paddingRight:5}} >
                                <Save color='primary' style={{height:30}}/>
                            </li>
                            <li style={{paddingLeft:5,color:"blue"}}  >
                                <span style={{color:"rgb(65,83, 175)",fontSize:18,cursor: 'pointer'}}>{this.state.data.download}</span>
                            </li>
                            <li style={{color:"blue"}} >
                                <DownArrow color='primary' style={{height:28}}/>
                            </li>

                        </ul>


                    </div>

            </div>



        );
    }
}

export default PageHeader;
