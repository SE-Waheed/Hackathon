import { Button, Input } from 'antd'
import Password from 'antd/es/input/Password'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const ranId = Math.random().toString(36).slice(2)
const initialState = {username:"" ,emial:"", password:"",isAuthenticated:false, id:ranId}
export default function Register() {
    const [user, setuser] = useState(initialState)
    const [users, setusers] = useState([])
    const handleChange = (e)=>setuser((s) =>({...s ,[e.target.name] : e.target.value}))
    const handleSubmit = (e) => {
        e.preventDefault()
        // const {username, email, password} = user
        setusers((prevUsers) => [...prevUsers ,user])
        let oldUsers = users.slice(0)
        oldUsers.push(user)
        const str = JSON.stringify(oldUsers)
        localStorage.setItem('users', str)
        
    }   

  return (
    <>
    <main className="py-5 ">
        <div className="container">
            <div className="row align-items-center justify-content-center">
                <div className="col col-lg-5 col-md-8 col-sm-10 text-center ">
                    <form action="" className='form-control'>
                        <h1>Register</h1>
                        <Input inputMode='text' placeholder='Enter UserName' name='username' className='p-2 mb-2 mt-2' onChange={handleChange}/>
                        <Input inputMode='email' placeholder='Enter Emial' name='email' className='p-2 mb-2 mt-2' onChange={handleChange}/>
                        {/* <input type="text" name="username" placeholder='Enter UserName' id="" /> */}
                        {/* <input type="email" name="email" placeholder='Enter Email' id="" /> */}
                        <Password inputMode='password' placeholder='Enter Password' name='password' className='p-2 mb-2 mt-2' onChange={handleChange}/>
                        <Button onClick={handleSubmit} type='primary' block  className='p-2 mb-2 mt-2 '>Register</Button>
                        <Link to="/auth/login" className='text-black' >Already have account <span className='text-primary'>Login</span></Link>

                    </form>
                </div>
            </div>
        </div>
    </main>

    </>
  )
}
