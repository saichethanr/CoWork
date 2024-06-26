import React,{useState} from 'react'
import Axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import './CSS/Login.css'
import {useNavigate} from 'react-router-dom';

const Login =()=>{
  const [email, setName] = useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  
  const [message,setMessage]=useState("");
  function register(){
    
    Axios.post("http://localhost:5600/login",{useremail:email,userpassword:password}).then((response)=>
    {
        console.log(response.data);
        setMessage(response.data);
        console.log(email);

        if(response.data==="Success"){
            if(email==="admin@gmail.com"){
            navigate('/admin');}
            else{
                navigate('/join');
            }
            
        }
    });
   }
  
   return(
     <div>
         <Navbar/>
    <div className='loginsignup'>
        <div className="loginsignup-container">
            <h1>Login </h1>
            
            <form >
            <div className="loginsignup-fields">
         
                <input type="email"  onChange={(event)=>{setName(event.target.value);}} placeholder='Email Address'/>
                <input type="password"  onChange={(event)=>{setPassword(event.target.value);}}placeholder='Password'/>
                
            </div>
            </form>
            
            <button type="submit" onClick={register} >Login</button>
            <h1>{message}</h1>
        </div>

    </div>
    </div>   
)
}

export default Login;