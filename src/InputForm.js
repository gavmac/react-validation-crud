import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';

class InputForm extends Component {
    constructor (props) {
        super(props);

        this.state = {
            user: this.props.editUser,
            errors: {
                fullname: "",
                email: "",
                number: ""
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.validation = this.validation.bind(this);
        this.formValid = this.formValid.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.editUser!== this.props.editUser) {
            this.setState({user: this.props.editUser},()=>this.state.user);
        }
    }

    validation = (name, value) => {
        let state = this.state.errors;
        switch(name) {
            case "fullname":
                state.fullname = value.length < 3
                    ? "invalid"
                    : "" ;
                break;
            case "email":
                const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
                state.email = pattern.test(value)
                    ? ""
                    : "invalid";
                break;
            case "number":
                state.number = value.length === 9
                    ? "invalid"
                    : "";
                break;
            default:
                return console.log("no match")
        }

        this.setState({state, [name]:value}, ()=> console.log(this.state.errors))
    };

    formValid = (errors) => {
        let isValid = true
        Object.values(this.state.errors).forEach(error => error.length > 0 && (isValid = false))
        return isValid
    }


    handleInputChange = (e) => {
       const { name, value } = e.target;
       this.setState({
           user: {...this.state.user, [name]:value}}
           , ()=> this.validation(name, value))
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        if(this.formValid(this.state.errors)) {
            this.props.addUser(this.state.user);
        } else {
            return console.log("form invalid")
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group controlId="formFullName">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.user.fullname}
                            name="fullname"
                            placeholder="Enter Full name"
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={this.state.user.email}
                            name="email"
                            placeholder="Enter email"
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.user.number}
                            name="number"
                            placeholder="Phone Number"
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default InputForm;