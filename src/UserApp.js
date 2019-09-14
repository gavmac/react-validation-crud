import React, {Component} from 'react';
import InputForm from './InputForm';
import UserTable from './UserTable';
import { Container, Row, Col } from 'react-bootstrap';


class UserApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.userData,
            editUser: {
                id: "",
                fullname: "",
                email: "",
                number: undefined,
            },
            editing: false
        };

        this.addUser = this.addUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    userData = [
        { id:1, fullname: "Gavin Macken", number: "123-444-5555", email: "gav@gavmacken.com" },
        { id:2, fullname: "Cynthia Nguyen", number: "123-444-6666", email: "cynth@cynthianguyen.com" }
    ];

    addUser = (user) => {
        if(this.state.editing){
            let ans = this.state.users.map(map_user=> map_user.id === user.id ? user : map_user)
            this.setState({
                users: ans
            })
        }
        else {
            user.id = this.state.users.length + 1;
            this.setState({
                users: [...this.state.users, user]
            });
        }
        this.setState({editing: false});
    };

    deleteUser = (user_id) => {
        let filteredUsers = this.state.users.filter(user => user.id !== user_id);
        this.setState({
            users: filteredUsers
        })
    };

    updateUser = (user) => {
        this.setState({editing: true});
        this.setState({editUser: user})
    }

    render() {
        return (
            <Container className="mt-5">
                <Row>
                    <Col>
                        <InputForm
                            editing={this.state.editing}
                            addUser={this.addUser}
                            editUser={this.state.editUser}
                        />
                    </Col>
                    <Col>
                        <UserTable
                            users={this.state.users}
                            deleteUser={this.deleteUser}
                            updateUser={this.updateUser}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default UserApp;

