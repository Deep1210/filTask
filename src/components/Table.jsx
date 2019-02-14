import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData:this.props.tableData.data,
            value1:this.props.tableData.label1,
            value2:this.props.tableData.label2
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
                <div style={{height:"50vh",overflow:'auto'}}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{this.state.value2}</TableCell>
                            <TableCell>{this.state.value1}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.tableData.map((part, index) => {
                            return(
                                <TableRow key={index} style={{background:index%2===0?"#C0C0C0":"#D3D3D3"}}>
                                    <TableCell>{part.employee_id}</TableCell>

                                    <TableCell>{part.employee_name}</TableCell>
                                </TableRow>
                            )

                        })}

                    </TableBody>

                </Table>
                </div>

            </div>

        );
    }
}

export default TableComponent;
