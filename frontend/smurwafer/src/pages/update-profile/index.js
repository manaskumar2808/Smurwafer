import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Checkbox, Tabs, DatePicker, message } from 'antd';
import { Container, Wrapper, Display, Photo, Section, UserInfo, UploadText, BioContainer, ThemeBox, ThemeWrapper, ThemeContainer, Theme, BioWrapper, DateWrapper, PasswordWrapper } from './styles/update-profile';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, MailOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { userNameValidator, emailValidator, nameValidator, ageValidator, passwordValidator, passwordConfirmValidator } from '../../validators/auth/auth-validator';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store';

import { baseUrl } from '../../utility/base-url';

const defaultProfile = './images/profile/default_profile.jpg';

const UpdateProfilePage = props => {
    const { closeSidebar } = props;
    
    useEffect(() => {
        closeSidebar();
    }, [closeSidebar]);
    
    const { TabPane } = Tabs;
    const { TextArea } = Input;
    
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const id = useSelector(state => state.ath.id);
    const currentUser = useSelector(state => state.usr.currentUser);
    const profile = useSelector(state => state.prf.profile);

    const [userName, setUserName] = useState(currentUser.userName);
    const [email, setEmail] = useState(currentUser.email);
    const [name, setName] = useState(currentUser.name ? currentUser.name : "");
    const [imageUrl, setImageUrl] = useState(currentUser.imageUrl ? baseUrl + currentUser.imageUrl : "");
    const [age, setAge] = useState(currentUser.age);
    
    const [bio, setBio] = useState(profile.bio ? profile.bio : "");
    const [dob, setDob] = useState(profile.dob ? profile.dob : "");
    const [themeUrl, setThemeUrl] = useState(profile.themeUrl ? baseUrl + profile.themeUrl : "");

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    // const [remember, setRemember] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [imageFile, setImageFile] = useState();
    const [themeFile, setThemeFile] = useState();

    const [userNameError, setUserNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [imageUrlError, setImageUrlError] = useState('');
    const [ageError, setAgeError] = useState(0);
    const [passwordError, setPasswordError] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');

    const validation = () => {
        const _userNameError = userNameValidator(userName);
        const _emailError = emailValidator(email);
        const _nameError = nameValidator(name);
        const _ageError = ageValidator(age);
        // const _passwordError = passwordValidator(password);
        // const _passwordConfirmError = passwordConfirmValidator(passwordConfirm, password);

        let valid = true;

        if (_userNameError) {
            valid = false;
            setUserNameError(_userNameError);
        }

        if (_emailError) {
            valid = false;
            setEmailError(_emailError);
        }

        if (_nameError) {
            valid = false;
            setNameError(_nameError);
        }

        if (_ageError) {
            valid = false;
            setAgeError(_ageError);
        }

        // if (_passwordError) {
        //     valid = false;
        //     setPasswordError(_passwordError);
        // }

        // if (_passwordConfirmError) {
        //     valid = false;
        //     setPasswordConfirmError(_passwordConfirmError);
        // }

        return valid;
    }

    const updateUser = () => {
        setIsLoading(true);
        const isValid = validation();
        
        if (!isValid) {
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('email', email);
        formData.append('name', name);
        formData.append('age', age);
        formData.append('image', imageFile);
        dispatch(actions.updateUser(token, id, formData))
            .then(result => {
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
            });
    }

    const updateProfile = () => {
        setIsLoading(true);

        const formData = new FormData();

        formData.append('bio', bio);
        formData.append('dob', dob);
        if (themeFile) {
            formData.append('image', themeFile);
        }

        dispatch(actions.updateProfile(token, id, formData))
            .then(result => {
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
            });
    }

    const updatePassword = () => {
        setIsLoading(true);
        
        const _newPasswordError = passwordValidator(newPassword);
        const _newPasswordConfirmError = passwordConfirmValidator(newPasswordConfirm, newPassword);

        if (_newPasswordError || _newPasswordConfirmError) {
            setIsLoading(false);
            return;
        }

        const passwordData = {
            oldPassword,
            newPassword,
        };

        dispatch(actions.updatePassword(token, id, passwordData))
            .then(result => {
                setIsLoading(false);
                message.success({
                    content: 'Your password updated successfully!',
                });
            }).catch(err => {
                const errMsg = err.response && err.response.data ? err.response.data.message : 'Cannot update password!';

                setIsLoading(false);
                message.error({
                    content: errMsg,
                });
            });
    }


    const handleUpload = (e, theme = false) => {
        const f = e.target.files[0];
        if (!f) {
            return;
        }

        const url = URL.createObjectURL(f);

        if (theme) {
            setThemeUrl(url);
            setThemeFile(f);
        } else {
            setImageUrl(url);
            setImageFile(f);
        }
    }


    const pages = [
        <>
            <Form.Item
                name="username"
                valuePropName='username'
                rules={[{ required: true, min: 2, message: 'Please input your Username!' }]}
            >
                <Input value={userName}  onChange={e => setUserName(e.target.value)} autoComplete="off" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
             <Form.Item
                name="email"
                valuePropName='email'
                rules={[{ required: true, type: 'email', message: 'Please input your Email!' }]}
            >
                <Input value={email} onChange={e => setEmail(e.target.value)} autoComplete="off" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
        </>,
        <>
            {/* <Form.Item
                name="image"
                valuePropName='fileList'
            >
                <label htmlFor="uploadInput">
                    <input type="file" onChange={handleUpload} aria-hidden="true" id="uploadInput" hidden />
                    <UploadText>upload image <UploadOutlined style={{ margin: "auto" }} htmlFor="uploadInput" /></UploadText>
                </label>
            </Form.Item> */}
            <Form.Item
                name="name"
                valuePropName='name'
                rules={[{ required: true, message: 'Please input your Name!' }]}
            >
                <Input value={name} onChange={e => setName(e.target.value)} autoComplete="off" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
            </Form.Item>
            <Form.Item
                name="age"
                valuePropName='age'
            >
                <InputNumber value={age} onChange={e => setAge(e.target.value)} autoComplete="off" min={0} max={150} placeholder="Age" onChange={setAge} />
            </Form.Item>
            <Form.Item>
                <Button loading={isLoading} onClick={updateUser} type="primary" htmlType="button" block>
                    Update
                </Button>
            </Form.Item>
        </>,
        <>
            <Form.Item
                name="oldpassword"
                valuePropName='oldpassword'
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input.Password
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Old password"
                    autoComplete="off"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>
            <Form.Item
                name="newpassword"
                valuePropName='newpassword'
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input.Password
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="New password"
                    autoComplete="off"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>
            <Form.Item
                name="newpasswordConfirm"
                valuePropName='newpasswordconfirm'
                rules={[{ required: true, message: 'Please confirm your Password!' }]}
            >
                <Input.Password
                    value={newPasswordConfirm}
                    onChange={e => setNewPasswordConfirm(e.target.value)}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirm new password"
                    autoComplete="off"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>
            <Form.Item>
                <Button loading={isLoading} onClick={updatePassword} type="primary" htmlType="button" block>
                    Update
                </Button>
            </Form.Item>
        </>,
    ];


    return (
        <Container>
            <Wrapper>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="User info" key="1">
                        <UserInfo>
                            <Section width={30}>
                                <Display>
                                    {imageUrl && <Photo src={imageUrl} alt="profile photo" />}
                                </Display>
                                <div style={{ height: 20 }}></div>
                                <label htmlFor="uploadInput">
                                    <input type="file" onChange={handleUpload} aria-hidden="true" id="uploadInput" hidden />
                                    {/* <Button  icon={<UploadOutlined />} style={{ margin: "auto" }}>Upload image</Button> */}
                                    <UploadText>upload image <UploadOutlined style={{ margin: "auto" }} htmlFor="uploadInput" /></UploadText>
                                </label>
                            </Section>
                            <Section width={40}>
                                {pages[0]}
                                {pages[1]}
                            </Section>
                        </UserInfo>
                    </TabPane>
                    <TabPane tab="Theme" key="2">
                        <ThemeContainer>
                            <ThemeWrapper>
                                <ThemeBox>
                                   { themeUrl.length > 0 && <Theme src={themeUrl} />}
                                </ThemeBox>
                                <div style={{ height: 20 }}></div>
                                <label htmlFor="uploadThemeInput">
                                    <input type="file" onChange={e => handleUpload(e, true)} aria-hidden="true" id="uploadThemeInput" hidden />
                                    <UploadText>upload image <UploadOutlined style={{ margin: "auto" }} htmlFor="uploadThemeInput" /></UploadText>
                                </label>
                                <div style={{ height: 70 }}></div>
                                <Button loading={isLoading} onClick={updateProfile} type="primary" htmlType="button" block>
                                    Update
                                </Button>
                            </ThemeWrapper>
                        </ThemeContainer>
                    </TabPane>
                    <TabPane tab="Bio" key="3">
                        <BioContainer>
                            <BioWrapper>
                                <TextArea value={bio} onChange={e => setBio(e.target.value)} rows={14} placeholder="Add your bio here..." />
                                <div style={{ height: 20 }}></div>
                                <Button loading={isLoading} onClick={updateProfile} type="primary" htmlType="button" block>
                                    Update
                                </Button>
                            </BioWrapper>
                        </BioContainer>
                    </TabPane>
                    <TabPane tab="Date of Birth" key="4">
                        <DateWrapper>
                            <DatePicker onChange={e => setDob(e.toDate().toISOString())} placeholder="Date of birth" />
                            <div style={{ height: 20 }}></div>
                            <Button loading={isLoading} onClick={updateProfile} type="primary" htmlType="button" block>
                                Update
                            </Button>
                        </DateWrapper>
                    </TabPane>
                    <TabPane tab="Change password" key="5">
                        <PasswordWrapper>
                            {pages[2]}
                        </PasswordWrapper>
                    </TabPane>
                </Tabs>
            </Wrapper>
        </Container>
    );
}

export default UpdateProfilePage;