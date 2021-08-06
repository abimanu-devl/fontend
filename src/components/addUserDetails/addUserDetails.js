import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
//import Swal from 'sweetalert2';

const initialState = {
    userName: '',
    password: '',
    conPassword: '',
    userRoles: [],
    employee: [],
    company: [],
    selectedUserRole: '',
    selectedEmployee: '',
    selectedCompany: '',
    optionsRl: '',
    optionsEmp: '',
    optionsCom: ''
}
class addUserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    componentDidMount() {
        axios.get('http://localhost:8080/api/userRoles/all')
            .then(res => {
                this.setState({ userRoles: res.data }, () => {
                    const rolData = [];
                    this.state.userRoles.forEach((item, index) => {
                        const roles = {
                            value: item.roleId,
                            label: item.roleName
                        }
                        rolData.push(roles);
                    })
                    this.setState({ optionsRl: rolData })
                })
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            })

        axios.get('http://localhost:8080/api/company/all')
            .then(res => {
                this.setState({ company: res.data }, () => {
                    const comData = [];
                    this.state.company.forEach((item, index) => {
                        const companies = {
                            value: item.id,
                            label: item.companyName
                        }
                        comData.push(companies);
                    })
                    this.setState({ optionsCom: comData })
                })
                console.log(res.data);

            })
            .catch(error => {
                console.log(error);
            })

        axios.get('http://localhost:8080/api/employee/all')
            .then(res => {
                this.setState({ employee: res.data }, () => {
                    const empData = [];
                    this.state.employee.forEach((item, index) => {
                        const employees = {
                            value: item.empId,
                            label: item.empName
                        }
                        empData.push(employees);
                    })
                    this.setState({ optionsEmp: empData })
                })
                console.log(res.data);
                console.log(this.state.optionsEmp)
            })
            .catch(error => {
                console.log(error);
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onCompanySelect = (e) => {
        console.log(e.value);
        this.setState({
            selectedCompany: e.value,
        });
    };
    onEmployeeSelect = (e) => {
        console.log(e.value);
        this.setState({
            selectedEmployee: e.value,
        });
    };
    onUserRoleSelect = (e) => {
        console.log(e.value);
        this.setState({
            selectedUserRole: e.value,
        });
    };

    onSubmit(e) {
        e.preventDefault();
        const userRl = {
            roleId: this.state.selectedUserRole
        }
        const emp = {
            empId: this.state.selectedEmployee
        }
        const com = {
            id: this.state.selectedCompany
        }
        const user = {
            userName: this.state.userName,
            password: this.state.password,
            conPassword: this.state.conPassword,
            employee: emp,
            company: com,
            userRoles: userRl

        };
        //console.log('DATA TO SEND', user)
        axios.post('http://localhost:8080/api/user/add', user)
            .then(res => {
                console.log(res.status);
                if(res.status === 404){
                    alert('password mismatch')
                }
                alert('Data successfully inserted')
                // Swal.fire('Data Successfully inserted',
                //     this.props.history.push('/')
                // )
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }


    restData = () => {
        this.setState({
            selectedUserRole: '',
        })
        console.log('button click')
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1>Add New User</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="UserRole" className="form-label">Select Role :*</label>
                            <Select
                                options={this.state.optionsRl}
                                className="basic-multi-select"
                                name="selectedUserRole"
                                onChange={this.onUserRoleSelect}

                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="employee" className="form-label">Select Employee :*</label>
                            <Select
                                options={this.state.optionsEmp}
                                onChange={this.onEmployeeSelect}
                                className="basic-multi-select"

                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="company" className="form-label">Company :*</label>
                            <Select
                                options={this.state.optionsCom}
                                onChange={this.onCompanySelect}
                                className="basic-multi-select"

                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username :*</label>
                            <input
                                type="text"
                                className="form-control"
                                id="userName"
                                name="userName"
                                value={this.state.userName}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password :*</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="conPassword" className="form-label">Confirm Password :*</label>
                            <input
                                type="password"
                                className="form-control"
                                id="conPassword"
                                name="conPassword"
                                value={this.state.conPassword}
                                onChange={this.onChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: "120px" }}>Save</button>
                        <button type="reset" className="btn btn-danger" onClick={this.restData} style={{ marginLeft: "10px", width: "120px" }}>Clear</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default addUserDetails;