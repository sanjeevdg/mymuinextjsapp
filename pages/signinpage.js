import React, { useState } from 'react';

import { auth,db } from '../config/firebase-config';
// import {useNavigate} from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";

import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'

//import { app } from '../config/firebase-config';
import toast, { Toaster } from 'react-hot-toast';

import {RecaptchaVerifier, signInWithPhoneNumber, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup} from 'firebase/auth';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();

export default function Signinpage() {


const notifylogin = () => toast.success('Logged in successfully!');

const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState('');
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState('');

//  let navigate = useNavigate();

const signin = () => {

    if (mynumber === "" || mynumber.length < 10) return;
//alert('in method');

  var myn = mynumber.replace(/-/g,'');
      myn = '+'+myn;

// 'recaptcha-container'
    let verify = new RecaptchaVerifier('recaptcha-container', {}, auth);
    // alert('phone'+myn);
    signInWithPhoneNumber(auth, myn, verify).then((result) => {
      setfinal(result);
    //  alert("code sent")
      setshow(true);
    })
      .catch((err) => {
        alert(err);
     //   window.location.reload()
      });
  }

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null)
      return;
    final.confirm(otp).then((result) => {

    //  navigate('/LoggedInPage');
      // success
    }).catch((err) => {
      alert("Wrong code");
    })
  }


const signInWithGoogle = async(e) => {


const googleAuthProvider = new GoogleAuthProvider();

// e.preventDefault();
    try {
      await signInWithPopup(auth, googleAuthProvider);
      notifylogin();
    //  navigate("/",'refresh');
    } catch (error) {
      console.log(error.message);
    }
}


const signInWithFacebook = async() => {

var provider = new FacebookAuthProvider();
// https://58ca-110-224-17-19.ngrok.io/people/auth/facebook/callback


//https://btauth-94c78.firebaseapp.com/__/auth/handler

https://www.facebook.com/v8.0/dialog/oauth?response_type=code%2Cgranted_scopes&client_id=478019230921376&redirect_uri=https%3A%2F%2Fbtauth-94c78.firebaseapp.com%2F__%2Fauth%2Fhandler&state=AMbdmDkex99fUmRM0TTMYk72reb514c1xzuFXUzIs0aiTup1jBi1dK9u1zdArqV7ueEDNniMM3-ahkSjAraDUJ3LNmMjgQuLqqvZEAJiQPSR06sxBrDxdmzw5jY4suKAikUVA7A60gQdjkItQOxpcnPHjB_1uaZ9E0EaPKaI5CT9CKNT0voBFrHvj1nVkDl0wbn0oBgqF0uMlrGaW9-dYL8PiMxBvWI4Q7DPVxBPgL82mmo9661jAOoX78CW4CaVswKYkDF6lWDSCVhbsL0MLmLXrD4ECkFfBPVf47qb9ZAU094cAjcqfxyZ0CMZgfArtjhG5mDI38csUiR7Vfh2&scope=public_profile%2Cemail&context_uri=https%3A%2F%2F58ca-110-224-17-19.ngrok.io

//firebase.auth().
   signInWithPopup(auth, provider)   
   .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
    notifylogin();
      console.log(token)
      console.log(user)
   }).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
   });
}




/*
    
  const SignIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
*/
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Verify your phone
            </Typography>
            <Box component="div" noValidate sx={{ mt: 3,mx:'auto'}}>
        {!show?       
              <Box sx={{mx:'auto',backgroundColor:'#f5f5f5',p:2,m:1,width:340}}><Typography>Phone Number</Typography>
              <PhoneInput
                margin="normal"
                required
                country={'in'}             
                onChange={(e) => {setnumber(e) }}
                value={mynumber}
                label="Phone Number"
                autoFocus
              /><Box  sx={{mt:1,mb:1}} id="recaptcha-container"></Box>
              <Button
               onClick={() => signin()}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
              >
                Get OTP
              </Button></Box>:<></>}
          {show?      
              <Box sx={{mx:'auto',backgroundColor:'#f5f5f5',p:2,m:1,width:340}}><TextField
                margin="normal"
                required
                fullWidth
                onChange={(e) => { setotp(e.target.value) }}
                label="Enter OTP"                
              /><Button
               onClick={() => {ValidateOtp();notifylogin();}}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
              >
                Verify OTP
              </Button></Box>:<></>}
              
              
              
              <Box elevation={1} sx={{width:340,p:2,m:1,backgroundColor:'#f5f5f5',display:'flex',flexDirection:'column'}}>
          <Typography style={{marginTop:0}}>Social Logins &nbsp;</Typography>
<Box><FacebookLoginButton onClick={() => signInWithFacebook()} /></Box>
<Box><GoogleLoginButton style={{backgroundColor:'white'}} onClick={() => signInWithGoogle()} /> </Box>



              </Box>
              <Grid>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}


