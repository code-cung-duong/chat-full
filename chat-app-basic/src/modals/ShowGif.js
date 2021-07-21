import { LoadingOutlined } from '@ant-design/icons';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Input } from 'antd';
import Form, { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Modal from 'antd/lib/modal/Modal';
import { Button } from 'antd/lib/radio';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppProvider';
import { AuthContext } from '../context/AuthProvider';
import firebase, { db } from '../firebase/Config';
import { addDocuments } from '../firebase/Service';


export default function ShowGif() {
    const { isShowGif, setIsShowGif } = useContext(AppContext);

    const { selectedRoomId, members } = useContext(AppContext);
    const [form1] = useForm();

    const {
        user: {
            uid,
            displayName,
            photoURL
        }
    } = useContext(AuthContext);


    const gf = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");
    var [keyword, setKeyword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        var a = gf.trending({ limit: 100 }).then((snap) => (snap.data));
        a.then((v)=>{
            setData(v);
            setIsLoading(false);
        })
    }, [])


    const search = ()=>{
        setIsLoading(true);
        var a = keyword === '' ? gf.trending({ limit: 100 }).then((snap) => (snap.data)) : gf.search(keyword, { limit: 100 }).then((snap) => (snap.data));
        a.then((v)=>{
            setData(v);
            setIsLoading(false);
        })
    }

    const change = (e) => {
        if(e.target.value !== ""){
            setKeyword(e.target.value);
        }
    }

    const handleCancel = () => {
        setIsShowGif(false);
        setKeyword('');
        form1.setFieldsValue({ kw: '' });
    }

    const handelSubmit = (a) => {
        addDocuments('messages', {
            text: "",
            image: a.target.currentSrc,
            uid,
            photoURL,
            displayName,
            roomId: selectedRoomId,
            userSeen: [
                {
                    uid: uid,
                    displayName: displayName,
                    photoURL: photoURL,
                    timeSeen: new Date()
                }
            ]
        });


        members?.filter((u) => u.uid !== uid).forEach((user) => {
            db.collection('notifys')?.doc(user.id).get().then((doc) => {
                db.collection('notifys')?.doc(user.id).update({
                    roomId: [
                        ...doc.data().roomId,
                        selectedRoomId
                    ],
                    createAt: firebase.firestore.FieldValue.serverTimestamp()
                })
            });
        })

        setIsShowGif(false);
    }

    const close = ()=>{
        setIsShowGif(false);
        setKeyword('');
    }


    return (
        <div>


            <Modal afterClose={close} bodyStyle={{backgroundColor: '#1890ff47'}} closable={false} footer={null}
                closeIcon={
                    <></>
                }
                visible={isShowGif}
                width={800}
                onCancel={handleCancel}
                okButtonProps={
                    {
                        style: {
                            display: 'none'
                        }
                    }
                }
               
                cancelButtonProps={
                    {
                        style: {
                            display: 'none'
                        }
                    }
                }
                style={
                    { top: '2%' }
                }>
                    
                    <Form form={form1}
                    style={{
                        padding: '0px',
                        margin: '0px'
                    }}
                    >
                        <FormItem  name="kw">
                        <Input name="kw"
                    style={
                        {
                            marginBottom: '-20px',
                            marginTop: '-10px',
                            width:'90%'
                        }
                    }
                    placeholder="Nhập từ khóa"
                    onChange={change} /> 
                        </FormItem><Button style={{position:'absolute', top:'24px', right: '27px'}} onClick={search}>Search</Button>
                    </Form>
                    
                       
                    {
                    isLoading ? <LoadingOutlined style={
                        {
                            fontSize: '56px',
                            color: '#08c',
                            position: 'absolute',
                            top: '45%',
                            left: '50%'
                        }
                    } /> : <div style={
                        {
                            display: 'flex',
                            width: '750px',
                            flexWrap: 'wrap',
                            justifyContent: 'space-evenly',
                            overflow: 'auto',
                            backgroundColor: 'rgb(242 247 250)',
                            boxShadow: '0px 1px 10px #1e1616',
                            borderRadius: '10px',
                            height: '69vh'
                        }
                    }>
                        {
                            data?.map((i) => (
                                <img className="anh" onClick={handelSubmit}
                                    style={
                                        {
                                            borderRadius: '3px',
                                            margin: '1px',
                                            cursor: 'pointer',
                                            marginTop: '5px',
                                            
                                        }
                                    }
                                    key={
                                        i.url
                                    }
                                    src={
                                        i.images.fixed_height.url
                                    }
                                    alt=""
                                    width={
                                        i.images.fixed_height.width
                                    } />
                            ))
                        } </div>
                } </Modal>
        </div>
    )
}
