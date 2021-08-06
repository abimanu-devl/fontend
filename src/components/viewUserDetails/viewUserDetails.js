import axios from 'axios';
import React, { Component } from 'react';
//import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';


class viewUserDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.match.params.id,
            roleName: '',
            userName: '',
            empName: '',
            companyName: ''
        }
        console.log(this.state.userId);

    }

    componentDidMount() {
        axios.get(`http://localhost:8080/api/user/${this.state.userId}`)
            .then(res => {
                this.setState({
                    roleName: res.data.userRoles.roleName,
                    userName: res.data.userName,
                    empName: res.data.employee.empName,
                    companyName: res.data.company.companyName
                })
                console.log(res.data)
            }).catch(error => {
                console.log(error);
            })
    }


    render() {
        return (
            <div className="container">
                <div className="card" style={{ width: "40%", marginTop: "50px" }}>
                    <div className="card-header">
                        <h4>User Details</h4>
                    </div>
                    <div className="card-body">
                        <h5>User Role: {this.state.roleName}</h5>
                        <h5>Username : {this.state.userName}</h5>
                        <h5>Employee : {this.state.empName}</h5>
                        <h5>Company  : {this.state.companyName}</h5>
                    </div>
                </div>
            </div>
        )
    }
}
export default viewUserDetails;