import Icon from '@ant-design/icons';
import { Avatar, Collapse, Tooltip, Typography } from 'antd';
import { formatDistance } from 'date-fns';
import { vi } from 'date-fns/locale';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthProvider';
import UseFirestore from '../../hooks/UseFirestore';
import { OfflineSVG, OnlineSVG } from './IconsSVG';

const { Panel } = Collapse

const PanelStyled = styled(Panel)`
  
  &&& {
    .ant-collapse-header{
        color: blue;
        font-weight: 500;
        user-select: none;
    }
    p {
      font-weight: 500;
      color: gray
      
    }

    .ant-collapse-content-box {
      padding: 0 30px;
      max-height: 290px;
      overflow-y: auto;
    }

    .add-room {
      color: #123;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: blue;
  
`;

const DivStyled = styled.div`
    display: flex;
    margin: 15px 10px 10px 0px;
    position: relative;
    .user{
        color: #123;
        margin-left: 10px;
    }
    .status{
      color: blue;
      position: absolute;
      right: 8%;
    }

    .tb{
        position:absolute;
        top: 2px;
        left: 105%;
    }
    .tb2{
        float: right;
        position: absolute;
        right: -10%;
        user-select: none;
    }
`;

const CollapseStyled = styled(Collapse)`
border-bottom: 1px solid #ccc;
box-shadow: 0px 9px 7px -9px #ccc;

`;

function UserLists() {

    const { user: {
        uid
    } } = useContext(AuthContext);

    const users = UseFirestore('users', '');

    function formatDate(seconds) {
        let formattedDate = '';
        if (seconds) {
            formattedDate = formatDistance(new Date(seconds * 1000), new Date(), {
                addSuffix: true,
                locale: vi
            });
            formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
            formattedDate = formattedDate.replace('minutes', 'phút');
            formattedDate = formattedDate.replace('hours', 'giờ');
            formattedDate = formattedDate.replace('ago', 'trước');
            formattedDate = formattedDate.replace('trước', '');
            formattedDate = formattedDate.replace('day', 'ngày');
            formattedDate = formattedDate.replace('hour', 'giờ');
            formattedDate = formattedDate.replace('Khoảng', '');
            formattedDate = formattedDate.replace('Dưới', '');
        }
        return formattedDate;
    }

    return (
        <CollapseStyled defaultActiveKey="1" ghost>
            <PanelStyled header="Danh sách bạn bè" key="1">
                {
                    Array.from(users).filter(user => user.uid !== uid).map((user) => {

                        return (
                            <DivStyled key={
                                user.uid
                            }>

                                <Avatar size="small"
                                    src={
                                        user.photoURL
                                    }>
                                    {
                                        user.photoURL ? '' : user.displayName.charAt(0)
                                    }</Avatar>
                                <LinkStyled className="user">
                                    {
                                        user.displayName
                                    }</LinkStyled>

                                {
                                    user.status === 'a' ? <Tooltip title="Online" placement="right"><Icon className="tb"
                                        component={OnlineSVG} /></Tooltip> : <></>
                                }

                                {
                                    user.status === 'c' ? <Tooltip placement="right"
                                        title={
                                            'Hoạt động ' + formatDate(user.last_changed.seconds) + ' trước'
                                        }>

                                        <p className="tb2">
                                            {
                                                formatDate(user.last_changed.seconds)
                                            }</p>
                                    </Tooltip> : <></>
                                }
                                {
                                    user.status === 'b' ? <Tooltip title="Sleep" placement="right"><Icon className="tb"
                                        component={OfflineSVG} /></Tooltip> : <></>
                                } </DivStyled>
                        )
                    })
                } </PanelStyled>
        </CollapseStyled>
    );
}

export default UserLists;
