import React, { useState } from "react";
import DefaultLayout from "../Layout/default.layout";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from "react-router-dom";

const RegistrationPage = ()=>{

    const [inputField,setInputFields] = useState({
        username:'',
        usermail:'',
        usernumber:'',
        userpassword:'',
        userconfirmpassword:''

    });
    let navigate = useNavigate();
    const [errorField,setErrorFields] = useState({
        usernameError:'',
        usermailError:'',
        usernumberError:'',
        userpasswordError:'',
        userconfirmpasswordError:''

    });

    const inputHandeler = (e)=>{
        setInputFields({...inputField,[e.target.name]:e.target.value});
    }

    const submitbutton = async()=>{
        setErrorFields({
            usernameError:'',
            usermailError:'',
            usernumberError:'',
            userpasswordError:'',
            userconfirmpasswordError:''
        })
        if(validForm()){

            let url = 'http://localhost:4000/signup';
            let options = {
                method:'post',
                url:url,
                Headers:{
                },
                data:inputField
            }
            try {

                let response = await axios.post("http://localhost:4000/signup",inputField);
                // let response = await axios(options);
                console.log(response);
                if(response.status===200){
                    toast.success("user added");
                    setTimeout(() => {
                        navigate("/login");
                    }, 1500);
                }
                
            } catch (e) {
                toast.error("user not added");
                let response = await axios.post("http://localhost:4000/signup",inputField);
                // let response = await axios(options);
                console.log(response);
            }
            
        }
        else{
            toast.error("invalid user");
        }
    }

    const validForm = () =>{
        let formIsValid = true;
        if(inputField.username === ''){
            formIsValid = false;
            setErrorFields(prevState=>({
                ...prevState,usernameError:"please enter your name",
            }));
        }
        if(inputField.usermail === ''){
            formIsValid = false;
            setErrorFields(prevState=>({
                ...prevState,usermailError:"please enter your mail",
            }));
        }
        if(inputField.usernumber === ''){
            formIsValid = false;
            setErrorFields(prevState=>({
                ...prevState,usernumberError:"please enter your Mobile Number",
            }));
        }
        if(inputField.userpassword === ''){
            formIsValid = false;
            setErrorFields(prevState=>({
                ...prevState,userpasswordError:"please enter your password",
            }));
        }
        if(inputField.userconfirmpassword === ''){
            formIsValid = false;
            setErrorFields(prevState=>({
                ...prevState,userconfirmpasswordError:"please enter your confirm password",
            }));
        }
        if(inputField.username !== '' && inputField.userpassword!==inputField.userconfirmpassword){
            formIsValid = false;
            setErrorFields(prevState=>({
                ...prevState,userconfirmpasswordError:"password not match",
            }));
        }
        return formIsValid;
    }


    return(
    <>
        <div>
            <DefaultLayout />
            <div className="container mx-auto py-2 bg-red-200 h-80 w-96 rounded-md gap-3 flex flex-col px-3">
                <div>
                    <label>Username 
                    <input type="text" name="username" required value={inputField.name} onChange={inputHandeler}/>
                    <br />
                    {
                        errorField.usernameError.length > 0 && <span>{errorField.usernameError}</span>
                    }
                    </label>
                </div>
                <div>
                    <label>UserEmail 
                    <input type="email" name="usermail" required value={inputField.usermail} onChange={inputHandeler}/>
                    <br />
                    {
                        errorField.usermailError.length > 0 && <span>{errorField.usermailError}</span>
                    }
                    </label>
                </div>
                <div>
                    <label>Phone number 
                    <input type="number" name="usernumber" value={inputField.usernumber} onChange={inputHandeler}/>
                    <br />
                    {
                        errorField.usernumberError.length > 0 && <span>{errorField.usernumberError}</span>
                    }
                    </label>
                </div>
                <div>
                    <label>Password 
                    <input type="password" name="userpassword" required value={inputField.userpassword} onChange={inputHandeler}/>
                    <br />
                    {
                        errorField.userpasswordError.length > 0 && <span>{errorField.userpasswordError}</span>
                    }
                    </label>
                </div>
                <div>
                    <label>confirm Password
                    <input type="password" name="userconfirmpassword" required value={inputField.userconfirmpassword} onChange={inputHandeler}/>
                    <br />
                    {
                        errorField.userconfirmpasswordError.length > 0 && <span>{errorField.userconfirmpasswordError}</span>
                    }
                    </label>
                </div>
                <div className="bg-yellow-200 rounded-r-sm text-black border-2 border-black flex ">
                <button type="submit" className="bg-red-500 mx-3 my-1 px-3 py-1 w-full text-black cursor-pointer rounded-md" onClick={submitbutton}>SignUp</button>
                    <NavLink to="/login" className="bg-red-500 mx-3 my-1 px-3 py-1 w-full text-black cursor-pointer rounded-md"><button type="submit" id="addUserBtn" >Login</button></NavLink>
                </div>
            </div>
        </div>
        <ToastContainer />
    </>
    );
}

export default RegistrationPage;