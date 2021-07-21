import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import MenuItem from 'antd/lib/menu/MenuItem';
import Modal from 'antd/lib/modal/Modal';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/AppProvider';
import { AuthContext } from '../context/AuthProvider';

const LinkStyled = styled(Typography.Text)`
  display: block;
  margin-bottom: 5px;
  color: blue;
`;

const DivStyled = styled.div`
    display: flex;
    margin: 15px 10px 10px 0px;
    align-item: center;
    .user{
        color: #123;
        margin: 7px 15px 9px 15px;
        font-weight: 500;
    }
    .status{
      color: #123;
      position: absolute;
      right: 8%;
    }
    p{
        margin-top:6px;
    }

    .baChamIcon{
        font-size:'15pt';
        margin-top:'3px';
    }
`;

export default function ListMember() {

    const { members, setUserCallId, setIsShowMembersVisible, isShowMembersVisible ,isVideoCall, setIsVideoCall} = useContext(AppContext);
    const { user: {
        uid
    } } = useContext(AuthContext);
    const handleOk = () => {
        setIsShowMembersVisible(false);
    }

    const handleCall = (user)=>{
        setIsVideoCall(true);
        setUserCallId(user.uid)
        setIsShowMembersVisible(false)
    }

    const menu = (user) =>(
        <Menu>
          <MenuItem onClick={()=>handleCall(user)}>Gọi video
          </MenuItem>
          <MenuItem>
            Thêm làm quản trị viên
          </MenuItem>
          <MenuItem>
            Đuổi khỏi nhóm
          </MenuItem>
        </Menu>
      );

    return (
        <Modal closeIcon={<></>} closable={false} title={
            "Danh sách thành viên (" + Array.from(members).length + ")"
        }
            visible={isShowMembersVisible}
            onCancel={handleOk}
            onOk={handleOk}
            okButtonProps={{style: {display: 'none'}}}
            >
            {
                Array.from(members).map((user) => (
                    <DivStyled key={
                        user.uid
                    }>
                        <Avatar size="large"
                            src={
                                user.photoURL
                            }>
                            {
                                user.photoURL ? '' : user.displayName.charAt(0)
                            }</Avatar>
                        <LinkStyled className="user">
                            {
                                uid === user.uid ? 'Bạn' : user.displayName
                            }</LinkStyled>
                        <Dropdown overlay={menu(user)} placement="bottomRight">
                            <Button style={
                            {
                                borderRadius: '50%',
                                float: 'right',
                                position: 'absolute',
                                left: '85%',
                                marginTop: '2px'
                            }
                        }
                            icon={
                                <EllipsisOutlined size={40}
                                    className="baChamIcon" />
                            }></Button>
                        </Dropdown>
                        
                        { } </DivStyled>
                ))
            } </Modal>
    )
}
