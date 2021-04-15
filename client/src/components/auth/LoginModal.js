import React from 'react';
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, NavLink} from 'reactstrap';
import {useState} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { loginUser } from '../../redux/ducks/authUser';
import {useEffect} from 'react';
import { clear_errors } from '../../redux/ducks/error';
const LoginModal=()=> {
    const [modal,setModal]= useState(false);
    const [user,setUser]= useState({ email:'', password: ''});
    const [msg,setMsg]= useState(null);

    const isAuthenticated= useSelector((state)=> state.auth.isAuthenticated);
    const error= useSelector((state)=> state.error)
    const dispatch= useDispatch();

    const toggle=()=>{
        dispatch(clear_errors());
        setModal(!modal);

    }
    const handleChange=(e)=>{        
        setUser({
                ...user,
                [e.target.name]: e.target.value
        });
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(loginUser(user));
    }

    useEffect(()=>{
        if(error.id==='LOGIN_FAILED'){
            setMsg(error.msg.msg) ;
        }
        else setMsg(null);

        if(isAuthenticated){
            if(modal) toggle();
        }

    },[error,isAuthenticated]) 

    return (
        <div>
            <NavLink
                onClick={toggle}
                href='#'
            >Login</NavLink> 

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Register</ModalHeader>
                <ModalBody>
                    {msg? <Alert color="danger">{msg}</Alert>: null}
                    <Form  onSubmit= {handleSubmit}>
                        <FormGroup> 
                            
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Email"  onChange={handleChange} className="mb-3" />

                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password"  onChange={handleChange}  className="mb-3"/>
                            <Button 
                                color="dark"
                                style={{marginTop:" 2rem"}}
                                block
                                type="submit"
                            >Login</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default LoginModal
