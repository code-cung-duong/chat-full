import { Input, message } from 'antd';
import Form, { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Modal from 'antd/lib/modal/Modal';
import React, { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import { db } from '../firebase/Config';

export default function EditRoom() {
    const [form] = useForm();
    const { isEditRoomVisible, setIsEditRoomVisible, selectedRoom,selectedRoomId } = useContext(AppContext);

    form.setFieldsValue({name: selectedRoom.name, description: selectedRoom.description})

    const handleOk = () => {
        if (form.getFieldValue()?.name && form.getFieldValue()?.description) {
            db.collection('rooms').doc(selectedRoomId).update({
                name: form.getFieldValue('name'),
                description: form.getFieldValue('description')
            })
            form.resetFields();
            setIsEditRoomVisible(false);
            

        } else {
            message.info('Bạn cần nhập đầy đủ thông tin');
        }
    }

    const handleCancel = () => {
        setIsEditRoomVisible(false);
    }

    return (
        <div>
            <Modal title='Sửa thông tin nhóm'
                visible={isEditRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Lưu lại"
                >
                
                <Form layout="vertical"
                    form={form}>
                    <FormItem label="Tên nhóm" name="name">
                        <Input autoFocus="true" name="name" placeholder="Nhập tên nhóm" autoComplete="off"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                            ></Input>
                    </FormItem>
                    <FormItem label="Mô tả" name="description">
                        <Input name="description" placeholder="Nhập mô tả" autoComplete="off"
                            rules={
                                [{
                                    required: true
                                }]
                            }></Input>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    )
}
