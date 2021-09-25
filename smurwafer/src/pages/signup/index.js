import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Checkbox, Upload, message } from 'antd';
import { Container, Section, SwitchContainer, SwitchLink, SwitchText, Form as Frm, Wrapper, PageNavigator, ProfileContainer, ProfilePhoto, Legend, UploadText, HelperContainer, Helper, Row } from './styles/signup';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, MailOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { userNameValidator, emailValidator, nameValidator, ageValidator, passwordValidator, passwordConfirmValidator } from '../../validators/auth/auth-validator';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as actions from '../../store';
import GuestCarousel from '../../components/guest-carousel';

const defaultProfile = './images/profile/default_profile.jpg';

const SignupPage = props => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState(process.env.PUBLIC_URL + defaultProfile);
    const [age, setAge] = useState();
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [remember, setRemember] = useState(false);

    const [file, setFile] = useState();

    // const [userNameError, setUserNameError] = useState('');
    // const [emailError, setEmailError] = useState('');
    // const [nameError, setNameError] = useState('');
    // const [imageUrlError, setImageUrlError] = useState('');
    // const [ageError, setAgeError] = useState(0);
    // const [passwordError, setPasswordError] = useState('');
    // const [passwordConfirmError, setPasswordConfirmError] = useState('');
    const [error, setError] = useState('');
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const { closeSidebar } = props;

    useEffect(() => {
        closeSidebar();
    }, [closeSidebar]);
    
    const validation = () => {
        const _userNameError = userNameValidator(userName);
        const _emailError = emailValidator(email);
        const _nameError = nameValidator(name);
        const _ageError = ageValidator(age);
        const _passwordError = passwordValidator(password);
        const _passwordConfirmError = passwordConfirmValidator(passwordConfirm, password);

        if (_userNameError) {
            setError(_userNameError);
            return false;
        }

        if (_emailError) {
            setError(_emailError);
            return false;
        }

        if (_nameError) {
            setError(_nameError);
            return false;
        }

        if (_ageError) {
            setError(_ageError);
            return false;
        }

        if (_passwordError) {
            setError(_passwordError);
            return false;
        }

        if (_passwordConfirmError) {
            setError(_passwordConfirmError);
            return false;
        }

        return true;
    }

    const signup = (e) => {
        e.preventDefault();

        setIsLoading(true);

        const isValid = validation();

        if (!isValid) {
            setIsLoading(false);
            message.error(error);
            return;
        }

        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('email', email);
        formData.append('name', name);
        formData.append('age', age);
        formData.append('image', file);
        formData.append('password', password);

        dispatch(actions.signup(formData))
            .then(res => {
                setIsLoading(false);
                history.push('/');
            }).catch(err => {
                setIsLoading(false);
                message.error(err.response.data.message);
            });
    }

    const next = () => {
        if (index < 2) {
            setIndex(prevState => prevState + 1);
        }
    }

    const prev = () => {
        if (index > 0) {
            setIndex(prevState => prevState - 1);
        }
    }
    
    const handleUpload = (e) => {
        const f = e.target.files[0];
        if (!f) {
            return;
        }

        const url = URL.createObjectURL(f);
        setImageUrl(url);
        setFile(f);
    }

    const goToLogin = () => {
        history.push('/login');
    }

    const pages = [
        <>
            <Legend>
                Join Today
            </Legend>
            <Form.Item
                name="username"
                valuePropName='username'
                rules={[{ required: true, min: 2, message: 'Please input your Username!' }]}
                help={<HelperContainer>
                    <Helper>Username must be atleast 2 characters long.</Helper>
                </HelperContainer>}
            >
                <Input value={userName} onChange={e => setUserName(e.target.value)} autoComplete="off" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <div style={{ height: 10 }}></div>
             <Form.Item
                name="email"
                valuePropName='email'
                rules={[{ required: true, type: 'email', message: 'Please input your Email!' }]}
            >
                <Input value={email} onChange={e => setEmail(e.target.value)} autoComplete="off" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <SwitchContainer>
                <SwitchText>Already a member ?</SwitchText>
                <div style={{ width: 7 }}></div>
                <SwitchLink onClick={goToLogin}>Login</SwitchLink>
            </SwitchContainer>
        </>,
        <>
            <ProfileContainer>
                <ProfilePhoto src={imageUrl} />
            </ProfileContainer>
            <Form.Item
                name="image"
                valuePropName='fileList'
            >
                <Row>
                    <label htmlFor="uploadInput">
                        <input type="file" onChange={handleUpload} aria-hidden="true" id="uploadInput" hidden />
                        {/* <Button  icon={<UploadOutlined />} style={{ margin: "auto" }}>Upload image</Button> */}
                        <UploadText>upload image <UploadOutlined style={{ margin: "auto" }} htmlFor="uploadInput" /></UploadText>
                    </label>
                </Row>
            </Form.Item>
            <Form.Item
                name="name"
                valuePropName='name'
                rules={[{ required: true, message: 'Please input your Name!' }]}
                help={<HelperContainer>
                    <Helper>Provide your full name.</Helper>
                </HelperContainer>}
            >
                <Input value={name} onChange={e => setName(e.target.value)} autoComplete="off" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
            </Form.Item>
            <Form.Item
                name="age"
                valuePropName='age'
            >
                <InputNumber value={age} onChange={e => setAge(e.target.value)} autoComplete="off" min={0} max={150} placeholder="Age" onChange={setAge} />
            </Form.Item>
        </>,
        <>
            <Legend>
                Password Setup
            </Legend>
            <Form.Item
                name="password"
                valuePropName='password'
                rules={[{ required: true, message: 'Please input your Password!' }]}
                help={<HelperContainer>
                    <Helper>Password length must be atleast 8 characters.</Helper>
                </HelperContainer>}
            >
                <Input.Password
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>
            <Form.Item
                name="passwordConfirm"
                valuePropName='passwordconfirm'
                rules={[{ required: true, message: 'Please confirm your Password!' }]}
            >
                <Input.Password
                    value={passwordConfirm}
                    onChange={e => setPasswordConfirm(e.target.value)}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirm Password"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>
            <Form.Item
                name="remember"
                valuePropName='remember'
            >
                <Checkbox onChange={e => setRemember(prevState => !prevState)}>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
                <Button loading={isLoading} type="primary" htmlType="submit" block>
                    Signup
                </Button>
            </Form.Item>
        </>,
    ];

    return (
        <Container>
            <Wrapper>
                <Section>
                    <GuestCarousel />
                </Section>
                <Section>
                    <Frm onSubmit={signup}>
                        {/* <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                        > */}
                            {pages[index]}
                            <PageNavigator>
                                <Button type="text" disabled={index === 0} style={{ color: "#1894FF" }} onClick={prev}>
                                    prev
                                </Button>
                                <Button type="text" disabled={index === 2} style={{ color: "#1894FF" }} onClick={next}>
                                    next
                                </Button>
                            </PageNavigator>
                        {/* </Form> */}
                    </Frm>
                </Section>
            </Wrapper>
        </Container>
    );
}

export default SignupPage;