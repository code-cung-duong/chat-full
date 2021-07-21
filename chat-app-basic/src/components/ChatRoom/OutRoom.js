import { LogoutOutlined } from '@ant-design/icons';
import { Menu, Popconfirm } from 'antd';
import React, { useCallback, useContext } from 'react';
import { AppContext } from '../../context/AppProvider';
import { AuthContext } from '../../context/AuthProvider';
import { db } from '../../firebase/Config';

export default function OutRoom() {
    const { selectedRoom, selectedRoomId, setSelectedRoomId } = useContext(AppContext);
    const { user: {
        uid
    } } = useContext(AuthContext);

    const handleOutRoom = useCallback(() => {
        setSelectedRoomId('');
        db.collection('rooms').doc(selectedRoomId).update({
            members: selectedRoom.members.filter((u) => u !== uid)
        })
    }, [selectedRoomId, uid])

    return (
        <Popconfirm placement="left" title="Bạn chắc chắn muốn rời nhóm chứ ?"
            onConfirm={handleOutRoom}
            okText="Có"
            cancelText="Không">
            <Menu.Item icon={<LogoutOutlined />}
                key="4">Rời khỏi nhóm</Menu.Item>
        </Popconfirm>
    )
}
