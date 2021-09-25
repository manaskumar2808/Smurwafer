import React, { useState, useEffect } from 'react';
import { Container, Wrapper, Menu, MenuItem, MenuPhoto } from './styles/report';
import { Button, Input } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store';
import { baseUrl } from '../../utility/base-url';
import { FiX } from 'react-icons/fi';

const Report = props => {
    const dispatch = useDispatch();
    const { TextArea } = Input;

    
    const token = useSelector(state => state.ath.token);
    const galleries = useSelector(state => state.gly.galleries);
    const repGalleries = useSelector(state => state.gly.memGalleries);

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    
    const [displayId, setDisplayId] = useState();
    const [displayUrl, setDisplayUrl] = useState();
    const [uploading, setUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        setUploading(true);

        if (!file) {
            setUploading(false);
            return;
        }

        const formData = new FormData();
        formData.append('type', 'image');
        formData.append('image', file);
        dispatch(actions.addGallery(token, formData));
    }

    const handleMenuPhotoClick = (id, url) => {
        setDisplayId(id);
        setDisplayUrl(url);
    }

    const handleMenuRemoveClick = (id) => {
        dispatch(actions.deleteGallery(token, id))
            .then(result => {
                if (displayId === id) {
                    setDisplayId('');
                    setDisplayUrl('');
                }
            }).catch(err => {
                // handle error
                console.log(err);
            });
    }

    const validation = () => {
        if (title.trim().length === 0) {
            return false;
        }

        if (text.trim().length === 0) {
            return false;
        }

        return true;
    }   

    const handleSubmit = () => {
        setIsLoading(true);

        if (!validation()) {
            setIsLoading(false);
            return;
        }
        
        const reportData = {
            title,
            text,
            gallery: galleries,
        };

        dispatch(actions.addReport(token, reportData))
            .then(result => {
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
            });
    }


    return (
        <Container>
            <Wrapper>
                <Input placeholder="Report title" value={title} onChange={e => setTitle(e.target.value)} />
                <div style={{ height: 20 }}></div>
                <Menu>
                    {
                        repGalleries.map(f => {
                            return (
                                <MenuItem isActive={displayId === f.id} key={f.id}>
                                    <MenuPhoto src={baseUrl + f.imageUrl} onClick={() => handleMenuPhotoClick(f.id, f.imageUrl)} />
                                    <FiX onClick={() => handleMenuRemoveClick(f.id)} style={{ cursor: "pointer", position: "absolute", top: 5, right: 5, color: "#fff" }}  />
                                </MenuItem>
                            );
                        })
                    }
                    <MenuItem>
                        <label>
                            <input type="file" onChange={handleUpload} aria-hidden="true" id="uploadInput" hidden />
                            <AppstoreAddOutlined htmlFor="uploadInput" style={{ cursor: "pointer", fontSize: 20, color: "#808080", position: 'absolute', top: "35%", left: "35%" }} />
                        </label>
                    </MenuItem>
                </Menu>
                <div style={{ height: 20 }}></div>
                <TextArea placeholder="Report description" value={text} onChange={e => setText(e.target.value)} style={{ height: 400 }} />
                <div style={{ height: 20 }}></div>
                <Button loading={isLoading} type="primary" block onClick={handleSubmit}>Submit</Button>
            </Wrapper>
        </Container>
    );
}

export default Report;