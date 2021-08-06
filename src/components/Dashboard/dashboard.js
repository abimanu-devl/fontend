import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
//import viewUserDetails from '../viewUserDetails/viewUserDetails';

class dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: []
        }
        this.addNewUser=this.addNewUser.bind(this);
        this.deleteUserDetail=this.deleteUserDetail.bind(this);
        this.updateUser=this.updateUser.bind(this);
        this.viewUser=this.viewUser.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/user/all').then(res => {
            console.log(res.data);
            this.setState({ userDetails: res.data });
        }).catch(error => {
            console.log(error);
        })
    }

    addNewUser() {
        this.props.history.push('/add-user');
    }

    updateUser(id){
        this.props.history.push(`/update-user/${id}`)
    }

    viewUser(id){
       this.props.history.push(`/view-user/${id}`);
    }

    deleteUserDetail(id){
        axios.delete('http://localhost:8080/api/user/'+id).then(res =>{
            this.setState({
                userDetails:this.state.userDetails.filter(userDetail => userDetail.userId !== id)
            })
        }).catch(error =>{
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <div className="container" style={{ marginTop: "100px" }}>
                    <div className="card">
                        <div className="card-header">
                            <h4> User Details</h4>
                        </div>
                        <div>
                            <AddCircleIcon 
                            onClick={this.addNewUser}
                            fontSize="large" 
                            style={{color:"#26b558",marginLeft:"95%",marginTop:"10px"}}
                            />
                        </div>
                        <hr/>
                        <div className="card-body">
                            <table className="table table-striped table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">User Role</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">Employee</th>
                                        <th scope="col">Compnay</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.userDetails.length > 0 && this.state.userDetails.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.userRoles.roleName}</td>
                                            <td>{item.userName}</td>
                                            <td>{item.employee.empName}</td>
                                            <td>{item.company.companyName}</td>
                                            <td>
                                                <VisibilityIcon 
                                                    style={{color:"#55ff00"}}
                                                    onClick={() => this.viewUser(item.userId)}
                                                />
                                                <EditIcon 
                                                    style={{color:"#00d5ff",marginLeft:"10px"}}
                                                    onClick={() => this.updateUser(item.userId)}
                                                />
                                                <DeleteIcon
                                                    onClick={() =>{Swal.fire({
                                                        title: 'Are you sure?',
                                                        text: "You won't be able to revert this!",
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        confirmButtonText: 'Yes, delete it!'
                                                      }).then((result) => {
                                                        if (result.isConfirmed) {
                                                          Swal.fire(
                                                            'Deleted!',
                                                            'Your file has been deleted.',
                                                            'success',
                                                            this.deleteUserDetail(item.userId)
                                                          )
                                                        }
                                                      })}} 
                                                    style={{color:"#ed0e0e",marginLeft:"10px"}}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default dashboard;