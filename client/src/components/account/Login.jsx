import {useState, useContext} from 'react';
import { Box , TextField, Button, styled, Typography} from '@mui/material';
import image from '../images/TechVerse.png';
import { API } from '../../service/api';
import { API_URL } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    width: 500px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);`;

const Image= styled('img')({
    width: 400, 
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0',
})

const Wrapper= styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1; 
    flex-direction: column;
    & > div, & > button , & > p{
        margin-top: 20px;}
`;

const LoginButton = styled(Button)`
text-transform: none;
height: 48px;
border-radius: 2px;
`;

const SignupButton = styled(Button)`
text-transform: none;
backgriund: #fff;
color: #0073b1;
height: 48px;
border-radius: 2px;
box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Error= styled(Typography)`
        color: red;
        font-size: 14px;
        line-height: 0;
        margin-top: 10px;
        font-weight: 600;
`;
const Text= styled(Typography)`
color= #878787;
font-size: 16px;
`;

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
}   

const LoginInitialValues = {
    username: '',
    password: '',
}

const Login =({isUserAuthenticated}) => {
    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const[login, setLogin] = useState(LoginInitialValues); // [login, setLogin
    const[error, showError] = useState('');

    const{setAccount} = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = () => {
       account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

   const onInputChange = (e) => {
        setSignup({...signup, [e.target.name]: e.target.value});
    }

    const signupUser = async () => {
        console.log('Sending signup request to:', `${API_URL}/signup`);
        try {
            let response = await API.userSignup(signup);
            console.log('Response received:', response);
     
            if (response.isSuccess) {
                showError('');
                setSignup(signupInitialValues);
                toggleAccount('login');
            } else {
                showError('Something went wrong! Please try again');
            }
        } catch (error) {
            console.error('An error occurred while signing up:', error);
            showError('An error occurred while signing up. Please try again.');
        }
     }
     
     const onvalueChange = (e) => {
        setLogin({...login, [e.target.name]: e.target.value});
     }
     
     const loginUser = async () => {
       let response= await API.userLogin(login);
       if(response.isSuccess){
           showError('');
           sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
           sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

           setAccount ({username: response.data.username, name: response.data.name });

            isUserAuthenticated(true);
           navigate('/');
        }
        else{
            showError('Something went wrong! Please try again');
        }
     }

    
    return (
        <Component> 
            <Box>
                <Image src={image} alt= "login" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant='standard' value={login.username} onChange={(e)=> onvalueChange(e)} name='username' label="Enter username"/>
                            <TextField variant='standard' value={login.password} onChange={(e)=> onvalueChange(e)} name='password' label="Enter password"/>

                            {error && <Error>{error}</Error>}
                            <LoginButton variant='contained' onClick={()=> loginUser()}>Login</LoginButton>
                            <Text style ={{textAlign: 'center'}}>OR</Text>
                            <SignupButton onClick={()=> toggleSignup()}>Create an account</SignupButton>
                        </Wrapper>
                        :
                        <Wrapper>
                            <TextField variant='standard' onChange={(e)=> onInputChange(e)} name='name' label="Enter Name"/>
                            <TextField variant='standard' onChange={(e)=> onInputChange(e)} name='username' label="Enter username"/>
                            <TextField variant='standard' onChange={(e)=> onInputChange(e)} name='password' label="Enter password"/>

                            {error && <Error>{error}</Error>}
                            <SignupButton onClick={()=> signupUser()}>Signup</SignupButton>
                            <Text style ={{textAlign: 'center'}}>OR</Text>
                            <LoginButton variant='contained' onClick={()=> toggleSignup()}>Already have an account</LoginButton>
                        </Wrapper>
}               
            </Box>
        </Component>
    )
}
export default Login;