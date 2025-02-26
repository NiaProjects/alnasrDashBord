import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material'
import React from 'react'
import img from "../../assets/images/signin-image.jpg"
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };
  return <> 
  
  
  <section className='bg-login'>



        <div className="container mx-auto flex items-center justify-center px-6 py-12 h-screen">


            <div className=' p-8 shadow-xl  bg-white rounded-[40px] w-11/12 h-3/4 grid md:grid-cols-2'>

                <div className='flex  items-center justify-center'>
                <form className='w-full'>

                <div className='my-10 w-full '>

                    <div className='mb-6'>
                    <h1 className='text-2xl font-bold mb-4'>Welcome Back</h1>
                    <p>Today is a new day. It's your day. You shape it. 
                    Sign in to start managing your projects.</p>
                    </div>


                <TextField fullWidth  sx={{

    ".MuiFilledInput-root:after": {
      borderBottomColor: "#F48120", 
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#F48120", 
    } ,      "&:focus-within + .icon, &:focus-within .MuiSvgIcon-root": {
        color: "#F48120",
      },}}
                
        id="input-with-icon-textfield"
        label="TextField"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          },
        }}
        variant="filled"
      />               
                </div>
                <div className='my-10'>
                <FormControl fullWidth variant="filled">
  <InputLabel
    htmlFor="filled-adornment-password"
    sx={{
      '&.Mui-focused': {
        color: '#F48120', 
      },
    }}
  >
    Password
  </InputLabel>
  <FilledInput
    fullWidth
    id="filled-adornment-password"
    type={showPassword ? 'text' : 'password'}
    sx={{
      '&:before': {
        borderBottom: '2px solid gray',
      },
      '&:after': {
        borderBottom: '2px solid #F48120', 
      }
    }}
    endAdornment={
      <InputAdornment position="end">
        <IconButton
          aria-label={
            showPassword ? 'hide the password' : 'display the password'
          }
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          onMouseUp={handleMouseUpPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    }
  />
</FormControl>

                </div>
                <div className='my-10'>

                <Button variant="contained" sx={ { width:"60%", margin:"auto"  , display:"block", background : "#F48120" , color : "white" , fontSize:"18px" , borderRadius:"8px" }}>Login</Button>

                </div>
                
                </form>


                </div>

                <div className='flex justify-center items-center flex-col'>
                    <h1 className='text-4xl text-left font-bold mb-4 text-orange-500'>Login Now </h1>
                    <img   src={img} alt="" />
                </div>
            </div>

        </div>

  </section>
  
  </>
}
