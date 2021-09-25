import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../axios-config';
import { Button, Image, Input, Select, Tag, message, Spin, Modal } from 'antd';
import { FiX } from 'react-icons/fi';
import { AppstoreAddOutlined, LoadingOutlined } from '@ant-design/icons';
import { Container, Wrapper, Editor, Preview, Section, TitleSection, Board, Photo, Menu, Display, TagSection, TagLegend, MenuItem, MenuPhoto, ButtonSection, ModalContainer, ModalWrapper, ModalDisplay, ModalForm, ModalPhoto, ModalSection, ModalUploadText } from './styles/create';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store';
import { header } from '../../utility/header';
import { baseUrl } from '../../utility/base-url';
import { titleValidator, textValidator } from '../../validators/story/story-validator';
import { galleryUrl } from '../../utility/media-url';
import ReactPlayer from 'react-player';

function tagRender(props) {
  const { label, field, value, closable, onClose } = props;
  const onPreventMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
}


const CreatePage = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const galleries = useSelector(state => state.gly.galleries);
    const memGalleries = useSelector(state => state.gly.memGalleries);

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [tags, setTags] = useState([]);
    const [file, setFile] = useState();

    const { closeSidebar } = props;

    useEffect(() => {
        closeSidebar();
    }, [closeSidebar]);

    
    const { TextArea } = Input;
    const { Option } = Select;
    
    const tagOptions = [
        { value: 'gold', label: 'horror' },
        { value: 'orange', label: 'mystery' },
        { value: 'green', label: 'theory' },
        { value: 'cyan', label: 'history' },
        { value: 'lime', label: 'report' },
        { value: 'blue', label: 'sighting' },
        { value: 'pink', label: 'plot' },
    ];
    
    const [displayId, setDisplayId] = useState();
    const [displayUrl, setDisplayUrl] = useState();
    const [displayType, setDisplayType] = useState('image');
    const [uploading, setUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [modalUrl, setModalUrl] = useState('');
    const [modalType, setModalType] = useState('image');

    useEffect(() => {
        const length = memGalleries.length;
        if (length > 0) {
            const gallery = memGalleries[length - 1];
            setDisplayId(gallery.id);
            setDisplayUrl(galleryUrl(gallery));
            setDisplayType(gallery.type);
            setUploading(false);
        }
    }, [memGalleries]);

    const validation = () => {
        const _titleError = titleValidator(title);
        const _textError = textValidator(text);

        if (_titleError) {
            message.error(_titleError);
            return false;
        }

        if (_textError) {
            message.error(_textError);
            return false;
        }

        return true;
    }

    const handleStoryPost = () => {
        setIsLoading(true);

        const isValid = validation();

        if (!isValid) {
            setIsLoading(false);
            return;
        }

        const storyData = {
            title,
            text,
            gallery: galleries,
            hashtags: tags,
        };

        dispatch(actions.postStory(token, storyData)).then(result => {
            setIsLoading(false);
            message.success('Story posted succesfully');
        }).catch(err => {
            setIsLoading(false);
            if (err.response) {
                message.error(err.response.data.message);
            } else {
                message.error('Error posting the story to server!');
            }
        });
    }
    
    const handleUpload = (e) => {
        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file);

        if (!file) {
            return;
        }

        setFile(file);
        setModalUrl(fileUrl);
    }

    const handleSave = () => {
        setUploading(true);

        const formData = new FormData();
        formData.append('type', modalType);
        formData.append('url', modalUrl);
        formData.append('image', file);

        dispatch(actions.addGallery(token, formData))
            .then(result => {
                handleCancel();
                setUploading(false);
            }).catch(err => {
                setUploading(false);
                if (err.response) {
                    message.error(err.response.data.message);
                } else {
                    message.error('Error sending uploaded gallery to server!');
                }
            });
    }

    const handleMenuPhotoClick = (id, gallery) => {
        setDisplayId(id);
        setDisplayUrl(galleryUrl(gallery));
        setDisplayType(gallery.type);
    }

    const handleMenuRemoveClick = (id) => {
        dispatch(actions.deleteGallery(token, id))
            .then(result => {
                if (displayId === id) {
                    setDisplayId('');
                    setDisplayUrl('');
                }
            }).catch(err => {
                if (err.response) {
                    message.error(err.response.data.message);
                } else {
                    message.error('Error removing uploaded gallery from server!');
                }
            });
    }

    const handleAddTag = (t) => {
        const tag = tagOptions.find(tg => tg.value === t).label;
        setTags(prevState => [...prevState, tag]);
    }

    const handleRemoveTag = (t) => {
        const tag = tagOptions.find(tg => tg.value === t).label;
        setTags(prevState => prevState.filter(tg => tg !== tag));
    }

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCancel = () => {
        setFile(null);
        setModalType('image');
        setModalUrl('');
        setShowModal(false);
    }

    const display = displayUrl && displayUrl.trim().length > 0 ?
                        displayType === 'image' ?
                        <Photo src={displayUrl} /> :
                        <ReactPlayer
                            url={displayUrl}
                            width={300}
                            height={400}
                            controls
                        />
                    : null;

    return (    
        <Container>
            <Wrapper>
                <Section>
                    <TitleSection>
                        <Input value={title} onChange={e => setTitle(e.target.value)} size="large" placeholder="Title" />
                    </TitleSection>
                    <Preview>
                        <Board>
                            <Display>
                                { uploading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24, position: "absolute", top: "45%", left: "45%" }} />} /> : display }
                            </Display>
                        </Board>
                        <Menu>
                            {
                                memGalleries.map(f => {
                                    return (
                                        <MenuItem isActive={displayId === f.id} key={f.id}>
                                            {
                                                f.type === 'image' ?
                                                    <MenuPhoto src={galleryUrl(f)} onClick={() => handleMenuPhotoClick(f.id, f)} /> :
                                                    <ReactPlayer
                                                        url={galleryUrl(f)}
                                                        width={75}
                                                        height={71}
                                                    />
                                            }
                                            <FiX onClick={() => handleMenuRemoveClick(f.id)} style={{ cursor: "pointer", position: "absolute", top: 5, right: 5, color: "#fff" }}  />
                                        </MenuItem>
                                    );
                                })
                            }
                            <MenuItem>
                                <AppstoreAddOutlined onClick={handleOpenModal} style={{ cursor: "pointer", fontSize: 20, color: "#808080", position: 'absolute', top: "35%", left: "35%" }} />
                            </MenuItem>
                        </Menu>
                    </Preview>
                </Section>
                <Section>
                    <Editor>
                        <TextArea value={text} onChange={e => setText(e.target.value)} style={{ height: "75%" }} placeholder="Content goes here ..." />
                        <TagSection>
                            <TagLegend>Add Tags to your content:</TagLegend>
                            <Select mode="multiple" showArrow onSelect={t => handleAddTag(t)} onDeselect={t => handleRemoveTag(t)} tagRender={tagRender} options={tagOptions} style={{ width: '100%' }} placeholder="Tags here" />
                        </TagSection>
                        <ButtonSection>
                            <Button loading={isLoading} type="primary" onClick={handleStoryPost} block>Post</Button>
                        </ButtonSection>
                    </Editor>
                </Section>
            </Wrapper>
            <Modal
                title="Upload File"
                visible={showModal}
                okText={'Save'}
                cancelText={'Cancel'}
                onOk={handleSave}
                onCancel={handleCancel}
            >
                <ModalContainer>
                    <ModalWrapper>
                        <ModalSection>
                            <ModalDisplay>
                                {
                                    modalUrl && modalUrl.trim().length !== 0 &&
                                    (
                                        modalType === 'image' ?
                                            <ModalPhoto src={modalUrl} alt={'modal image'} /> :
                                            <ReactPlayer
                                                url={modalUrl}
                                                width={200}
                                                height={200}
                                                controls
                                            />
                                    )
                                }
                            </ModalDisplay>
                        </ModalSection>
                        <ModalSection>
                            <ModalForm>
                                <Input value={modalUrl} onChange={e => setModalUrl(e.target.value)} placeholder="Media URL" />
                                <div style={{ height: 10 }} />
                                <label>
                                    <input type="file" onChange={handleUpload} aria-hidden="true" id="uploadInput" hidden />
                                    <ModalUploadText htmlFor="uploadInput">Upload</ModalUploadText>
                                </label>
                                <div style={{ height: 30 }} />
                                <Select defaultValue={'image'}  value={modalType} onChange={setModalType}>
                                    <Option value="image">Image</Option>
                                    <Option value="video">Video</Option>
                                </Select>
                            </ModalForm>
                        </ModalSection>
                    </ModalWrapper>
                </ModalContainer>
            </Modal>
        </Container>
    );
}

export default CreatePage;