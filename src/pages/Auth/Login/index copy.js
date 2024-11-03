import { Input } from 'antd'
import Password from 'antd/es/input/Password'
import { Button } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../context/AuthContext'

const initialState = {isAuthenticated:false,user:{email:"",password:""}}

export default function Login() {
  const { state, dispatch } = useAuthContext();  
  const [userstate,setuserState ] = useState(initialState)
  const handleChange = (e)=>setuserState((s)=>({...s,[e.target.name]:e.target.value}))
  const handleSubmit = (e)=>{
    e.preventDefault()
    const { email, password } = userstate
    let registerdUser = localStorage.getItem("users")
    let user = registerdUser.find(u =>u.email === email && u.password === password)
    if(user){
      dispatch({type:"SET_LOGGED_IN",payload:{user}})
      localStorage.setItem("isAuthenticated","true")
      localStorage.setItem("user",JSON.stringify(user))

    }
  }
  return (
    <>
    <main className="py-5 ">
        <div className="container">
            <div className="row align-items-center justify-content-center">
                <div className="col col-lg-5 col-md-8 col-sm-10 text-center ">
                    <form action="" className='form-control'>
                        <h1>Login</h1>
                        {/* <Input inputMode='text' placeholder='Enter UserName' name='username' className='p-2 mb-2 mt-2' onChange={handleChange}/> */}
                        <Input inputMode='email' placeholder='Enter Emial' name='email' className='p-2 mb-2 mt-2' onChange={handleChange}/>
                        {/* <input type="text" name="username" placeholder='Enter UserName' id="" /> */}
                        {/* <input type="email" name="email" placeholder='Enter Email' id="" /> */}
                        <Password inputMode='password' placeholder='Enter Password' name='password' className='p-2 mb-2 mt-2' onChange={handleChange}/>
                        <Button onClick={handleSubmit} type='primary' block  className='p-2 mb-2 mt-2 '>Login</Button>
                        <Link to="/auth/login" className='text-black' >Do not have account <span className='text-primary'>Register</span></Link>

                    </form>
                </div>
            </div>
        </div>
    </main>
      
    </>
  )
}
