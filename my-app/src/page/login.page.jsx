import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import DefaultLayout from "../Layout/default.layout";
import {NavLink} from 'react-router-dom';

const LoginPage = ()=>{
    const [inputField,setInputFields] = useState({
        usermail:'',
        userpassword:''

    });
    let navigate = useNavigate();
    const [errorField,setErrorFields] = useState({
        usermailError:'',
        userpasswordError:''

    });

    const inputHandeler = (e)=>{
        setInputFields({...inputField,[e.target.name]:e.target.value});
    }

    const submitbutton = async()=>{
        setErrorFields({
            usermailError:'',
            userpasswordError:''
        })
        if(validForm()){
            let url = 'http://localhost:4000/login';
            let options = {
                method:'post',
                url:url,
                Headers:{

                },
                data:inputField
            }
            try {
                let response = await axios(options);
                console.log(response);
                if(response.statusText == 'OK'){
                    toast.success("Login Success");
                    localStorage.setItem('token',response.data.token);
                    setTimeout(() => {
                        navigate("/");
                    }, 1500);
                }
                else{
                    toast.error("Login Not  Success");
                }
                
            } catch (e) {
                toast.error("Login Not success");
            }
            
        }
        else{
            toast.error("invalid user");
        }
    }

    const validForm = () =>{
        let formIsValid = true;

        if(inputField.usermail === ''){
            formIsValid = false;
            setErrorFields(prevState=>({
                ...prevState,usermailError:"please enter your mail",
            }));
        }
        if(inputField.userpassword === ''){
            formIsValid = false;
            setErrorFields(prevState=>({
                ...prevState,userpasswordError:"please enter your password",
            }));
        }
        return formIsValid;
    }

    return(
    <>
        <div>
            <DefaultLayout />
            <div>
            <div className="container mx-auto py-2 bg-red-200 h-48 w-80 rounded-md gap-3 flex flex-col px-3">
                <div>
                    <label>Username</label>
                    <input type="text" name="usermail" required value={inputField.usermail} onChange={inputHandeler} />
                    <br />
                    {
                        errorField.usermailError.length > 0 && <span>{errorField.usermailError}</span>
                    }
                    
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="userpassword" required value={inputField.userpassword} onChange={inputHandeler}/>
                    <br />
                    {
                        errorField.userpasswordError.length > 0 && <span>{errorField.userpasswordError}</span>
                    }
                    
                </div>
                <div className="bg-yellow-200 rounded-r-sm text-black border-2 border-black flex ">
                    <button type="submit" className="bg-red-500 mx-3 my-1 px-3 py-1 w-full text-black cursor-pointer rounded-md" onClick={submitbutton}> Login</button>
                    <NavLink to="/registration" className="bg-red-500 mx-3 my-1 px-3 py-1 w-full text-black cursor-pointer rounded-md"><button type="submit" id="addUserBtn" >Add User</button></NavLink>
                </div>
            </div>
            </div>
        </div>
        <ToastContainer />
    </>
    );
}

export default LoginPage;