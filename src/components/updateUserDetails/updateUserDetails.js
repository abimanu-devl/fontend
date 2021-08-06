import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Swal from 'sweetalert2';

class updateUserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.id,
            userName: '',
            roleName:'',
            empName:'',
            companyName:'',
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
        //console.log(this.state.userId);
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

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onCompanySelect = (e) => {
        //console.log(e.value);
        this.setState({
            selectedCompany: e.value,
        });
    };
    onEmployeeSelect = (e) => {
        //console.log(e.value);
        this.setState({
            selectedEmployee: e.value,
        });
    };
    onUserRoleSelect = (e) => {
        //console.log(e.value);
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
            employee: emp,
            company: com,
            userRoles: userRl

        };
        console.log('DATA TO SEND', user)
        axios.put('http://localhost:8080/api/user/update/'+this.state.userId,user)
            .then(res => {
                Swal.fire({
                    title: 'Do you want to save the changes?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: `Save`,
                    denyButtonText: `Don't save`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      Swal.fire('Saved!', '', 'success')
                      this.props.history.push('/')
                    } else if (result.isDenied) {
                      Swal.fire('Changes are not saved', '', 'info')
                    }
                  })
                
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1>Update User</h1>
                    <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                            <label htmlFor="roleName" className="form-label">Current User Role :</label>
                            <input
                                type="text"
                                className="form-control"
                                id="roleName"
                                name="roleName"
                                value={this.state.roleName}
                                onChange={this.onChange}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userRole" className="form-label">Select New Role :*</label>
                            <Select
                                options={this.state.optionsRl}
                                className="basic-multi-select"
                                name="selectedUserRole"
                                onChange={this.onUserRoleSelect}
                                //value={this.state.roleName}

                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="empName" className="form-label">Current Employee :</label>
                            <input
                                type="text"
                                className="form-control"
                                id="empName"
                                name="empName"
                                value={this.state.empName}
                                onChange={this.onChange}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="employee" className="form-label">Assign New Employee :*</label>
                            <Select
                                options={this.state.optionsEmp}
                                onChange={this.onEmployeeSelect}
                                className="basic-multi-select"
                                //value={this.state.empName}

                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="company" className="form-label">Current Company :</label>
                            <input
                                type="text"
                                className="form-control"
                                id="empName"
                                name="empName"
                                value={this.state.companyName}
                                onChange={this.onChange}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="company" className="form-label">Company :*</label>
                            <Select
                                options={this.state.optionsCom}
                                onChange={this.onCompanySelect}
                                className="basic-multi-select"
                                //value={this.state.companyName}

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
                        <button type="submit" className="btn btn-primary" style={{ width: "120px" }}>Save</button>
                        <button type="reset" className="btn btn-danger" style={{ marginLeft: "10px", width: "120px" }}>Clear</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default updateUserDetails;