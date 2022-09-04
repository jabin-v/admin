import { useRef, useState, useEffect, useContext } from 'react';
import "./style.css"
import {useDispatch} from 'react-redux';
import {setCredentials} from '../../features/auth/authSlice';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { Link,useNavigate,useLocation } from 'react-router-dom';






const Login = () => {
    
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate=useNavigate();
    const location=useLocation();

    //heading back the user to the page they actually wanted to go before login

    const from =location.state?.from?.pathname || "/";


    const [login,{isLoading}]=useLoginMutation();
    const dispatch=useDispatch();
   

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData=await login({username:user,password:pwd}).unwrap();
            // console.log(user)
            // console.log(userData);
            dispatch(setCredentials({...userData,user}))
            setUser('');
            setPwd('');
            
            navigate(from,{replace:true})
        } catch (err) {
            // console.log("error")
            // console.log(err)
            if (!err?.orginalStatus) {
                setErrMsg('No Server Response');
            } else if (err.orginalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.orginalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
      
                <div className='app'>
                    <section className='wrapper'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h6>SIGN IN</h6>
                    <form onSubmit={handleSubmit} >
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <Link to="/register">Sign Up</Link>
                        </span>
                    </p>
                </section>
                </div>
            
    
    )
}

export default Login