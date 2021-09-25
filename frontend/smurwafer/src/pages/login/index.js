import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { Container, Section, Form as Frm, Wrapper, Legend, Row, SwitchContainer, SwitchText, SwitchLink } from './styles/login';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import * as actions from '../../store';
import { emailValidator, passwordValidator } from '../../validators/auth/auth-validator';
import { useDispatch, useSelector } from 'react-redux';
import GuestCarousel from '../../components/guest-carousel';
import { keyframes } from 'styled-components';

const photo = './images/jan-jakub-nanista-z9hvkSDWMIM-unsplash.jpg';

const LoginPage = props => {
    const dispatch = useDispatch();
    const history = useHistory();

    const error = useSelector(state => state.ath.error);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const { closeSidebar } = props;

    useEffect(() => {
        closeSidebar();
    }, [closeSidebar]);
    
    const validation = () => {
        const _emailError = emailValidator(email);
        const _passwordError = passwordValidator(password);

        let valid = true;

        if (_emailError) {
            valid = false;
            setEmailError(_emailError);
        }

        if (_passwordError) {
            valid = false;
            setPasswordError(_passwordError);
        }

        return valid;
    }

    const login = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const isValid = validation();

        if (!isValid) {
            setIsLoading(false);
            message.error('Invalid credentials!');
            return;
        }

        dispatch(actions.login({ email, password }))
        .then(result => {
            setIsLoading(false);
            history.push('/');
        }).catch(err => {
            setIsLoading(false);
            message.error(err.response.data.message);
        });
    }

    const toggleRemember = () => {
        setRemember(prevState => !prevState);
    }

    const goToSignUp = () => {
        history.push('/signup');
    }
    // 060540

    return (
        <Container>
            <Wrapper>
                <Section>
                    <GuestCarousel />
                </Section>
                <Section>
                    <Frm onSubmit={login}>
                        <Legend>
                            Login
                        </Legend>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, type: "email", message: 'Please input your email!' }]}
                        >
                            <Input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                placeholder="Email"
                                type="email"
                                autoComplete="off"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
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
                        <Form.Item>
                            <Row>
                                <Form.Item name="remember" valuePropName='remember' noStyle>
                                    <Checkbox onClick={toggleRemember}>Remember me</Checkbox>
                                </Form.Item>

                                <Button type="text" style={{ color: "#1894FF", padding: 0 }} className="login-form-forgot">
                                    Forgot password
                                </Button>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button onKeyDown={login} loading={isLoading} type="primary" htmlType="submit" className="login-form-button" block>
                                Login
                            </Button>
                        </Form.Item>
                        <SwitchContainer>
                            <SwitchText>Not a member ?</SwitchText>
                            <div style={{ width: 7 }}></div>
                            <SwitchLink onClick={goToSignUp}>Sign up</SwitchLink>
                        </SwitchContainer>
                    </Frm>
                </Section>
            </Wrapper>
        </Container>
    );
}

export default LoginPage;