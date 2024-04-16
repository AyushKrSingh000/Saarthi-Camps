/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../components/AuthProvider2'
import axios from 'axios'
import api_url from '../config'
import { Navigate, useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { Snackbar } from '@mui/joy'
import hidePassword from '../assets/icons/hidePassword.png'
import viewPassword from '../assets/icons/viewPassword.png'

const url = api_url + 'user/login/'

const Login = () => {
  const navigate = useNavigate()
  const userRef = useRef()
  const errRef = useRef()
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [isErr, setIsErr] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const [passType, setPassType] = useState('password')
  const authCtx = useContext(AuthContext)
  const { setAuth } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])
  useEffect(() => {
    setErrMsg('')
  }, [email, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setIsErr(false)
    axios
      .post(url, {
        email: email.trim(),
        password: pwd.trim(),
      })
      .then((response) => {
        if (!response.data.error) {
          authCtx.login(response.data.accessToken)
          authCtx.admin(response.data.user.role)
          navigate('/home', { replace: true })
          setPwd('')
          setEmail('')
          setIsErr(false)
          setLoading(false)
        }
      })
      .catch((error) => {
        setLoading(false)
        setErrMsg(error.response.data.message)
        setIsErr(true)
      })
  }

  const handleForgotPwd = () => navigate('/forgot-password')
  const handlePassType = () => {
    if (passType === 'password') {
      setPassType('text')
    } else {
      setPassType('password')
    }
  }

  return (
    <div className="w-[100vw] h-[100vh] m-0 p-0 flex bg-family bg-cover bg-right md:bg-top">
      {success ? (
        <section className="text-left p-10 outline w-[350px] m-auto">
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link to="/home">Go to Home</Link>
          </p>
        </section>
      ) : (
        <section className="text-left p-10 w-[350px] m-auto md:mr-[10vw] bg-white ">
          <h1 className="pb-8 text-center font-semibold">SIGN IN</h1>
          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="username" className="font-regular">
              EMAIL
            </label>
            <br />
            <input
              type="email"
              id="username"
              ref={userRef}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="p-2 w-full border-b-2 mb-8 focus:outline-none"
            />
            <br />
            <label htmlFor="password" className="font-regular">
              PASSWORD
            </label>
            <br />
            <div className="flex">
              <input
                type={passType}
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                className=" p-2 w-full border-b-2 mb-8 focus:outline-none"
              />
              <div className="opacity-[80%]" onClick={handlePassType}>
                <img
                  src={passType === 'password' ? hidePassword : viewPassword}
                  className="h-[35px]"
                />
              </div>
            </div>
            <br />
            <button
              id="login"
              className="p-2 px-10 w-full bg-yellow font-semibold hover:outline transition-colors duration-150 rounded-none mb-3"
            >
              {loading ? (
                <CircularProgress color="inherit" size="22px" />
              ) : (
                'SIGN IN'
              )}
            </button>
            <div className="text-right underline" onClick={handleForgotPwd}>
              Forgot Password?
            </div>
          </form>
        </section>
      )}
      <Snackbar
        autoHideDuration={2000}
        color="danger"
        variant="solid"
        onClose={() => {
          setIsErr(false)
          return
        }}
        open={isErr}
      >
        {errMsg}
      </Snackbar>
    </div>
  )
}

export default Login
