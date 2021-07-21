import Icon from '@ant-design/icons';
import { Button, Collapse, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useContext, useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import styled from 'styled-components';
import { AppContext } from '../../context/AppProvider';
import { AuthContext } from '../../context/AuthProvider';
import { db } from '../../firebase/Config';
import { HeartSvg } from './IconsSVG';

const {Panel} = Collapse

const PanelStyled = styled(Panel)`
  


  &&& {
    .ant-collapse-header
    ,
    p {
      color: blue;
      font-weight: 500;
      user-select: none;
    }

    .ant-collapse-content-box {
      padding: 0 10px;
      max-height: 290px;
      overflow-y: auto;
    }
    .ant-typography:hover {
      textShadow: rgb(222 222 222) 0px 0px 7px;
      background-color: #f1f1f1;
      transition: color 0.2s;
    }

    .ant-typography{
      color: #000;
      font-weight: 400;
      display: flex;
      align-items: center;
      font-weight: 500;
    }

    .add-room {
      color: #456;
      margin: 15px 0 10px 90px;
      padding: 3px 8px 5px 8px;      
      border: 1px solid #aaa;
    }

    .add-room:hover{
      color: #fff;
      background-color: #ccc;
      border: 1px solid #bbb;
      box-shadow: 1px 1px 8px 0px #bbb;
    }

    .tb{
        float: right;
        color: blue;
        font-weight: 500;
        position: absolute;
        right: 5%;
    }

    .tenphong{
        text-overflow: ellipsis;
        max-width: 200px;
        overflow: hidden;
        white-space: nowrap;
    }

 
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: -1px;
  color: #ddd; 
  padding: 7px 10px 9px 10px;
  border-radius: 5px;
  
`;

const CollapseStyled = styled(Collapse)`
    border-bottom: 1px solid #ccc;
    box-shadow: 0px 9px 7px -9px #ccc;

`;


function RoomLists() {
    const {rooms, setIsAddRoomVisible, setSelectedRoomId, selectedRoomId} = useContext(AppContext);
    const {user: {
            uid
        }} = useContext(AuthContext);


    const [roomLists, setRoomsLists] = useState([]);


    useEffect(() => {
        const abc = db.collection('notifys').doc(uid).onSnapshot((snap) => {
            const cde = snap.data()?.roomId;
            setRoomsLists(cde);
            return abc;
        })

        return abc;
    }, [rooms, uid])

    return (

        <CollapseStyled defaultActiveKey="0" ghost>
            <PanelStyled header="Nhóm của bạn" key="1">
                {
                rooms.length !== 0 ? <>{
                    rooms.map((room) => (
                        <LinkStyled key={
                                room.id
                            }
                            onClick={
                                () => setSelectedRoomId(room.id)
                            }
                            style={
                                room.id === selectedRoomId ? {
                                    textShadow: 'rgb(222 222 222) 0px 0px 7px',
                                    backgroundColor: '#f1f1f1',
                                    transition: 'all 0.2s',
                                    color: '#000',
                                    // fontWeight: '500'
                                } : {}
                        }>

                            {
                            < Icon style = {{ margin: '5px 15px 0 0' }}
                            size = {
                                20
                            }
                            
                            component={HeartSvg}
                            />
                        }
                        
                            
                        
                            <div className="tenphong">
                                {
                                room.name
                            }</div>

                            {
                            roomLists?.includes(room.id) ? <Avatar className="tb"
                                style={
                                    {
                                        color: 'white',
                                        backgroundColor: 'blue'
                                    }
                                }
                                src=""
                                size={20}>
                                {
                                roomLists.filter((u) => u === room.id).length < 10 ? '0'+roomLists.filter((u) => u === room.id).length
                                : roomLists.filter((u) => u === room.id).length
                            }</Avatar> : <></>
                        }

                            </LinkStyled>
                    ))
                }</> : <p style={
                    {
                        color: 'gray',
                        margin: '10px 0px 7px 30px'
                    }
                }>Bạn chưa tham gia nhóm nào</p>
            }
                <Button type='text' className='add-room'
                    onClick={
                        () => setIsAddRoomVisible(true)
                }>
                    Tạo nhóm
                </Button>
                <ReactAudioPlayer src="mess.mp3" className="audio"/>

            </PanelStyled>
        </CollapseStyled>
    );
}

export default RoomLists;
