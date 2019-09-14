import React, {Component} from 'react';
import { Table, Button } from 'react-bootstrap';

class UserTable extends Component {
    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Phone No.</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.users.map((user, index) =>(
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.fullname}</td>
                            <td>{user.number}</td>
                            <td>{user.email}</td>
                            <td>
                                <Button onClick={()=>this.props.updateUser(user)} varient="outline-secondary">Update</Button>
                                <Button onClick={()=>this.props.deleteUser(user.id)} varient="outline-danger">Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default UserTable;