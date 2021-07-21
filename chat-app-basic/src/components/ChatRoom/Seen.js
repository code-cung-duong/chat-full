import { Tooltip } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { formatRelative } from 'date-fns';
import { vi } from 'date-fns/locale';
import React from 'react';
import styled from 'styled-components';


const AvatarStyled = styled.span `
    font-size: 13px;
    width: 13px;
    line-height: 13px;
    height: 17px;
    user-select: none;
`;

const DivStyled = styled.div `
    float: right;
    margin-top: -20px;

    .ant-avatar-string{
        line-height: 13px;
    }


`;

function formatDate(seconds) {
    let formattedDate = '';
    if (seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000), new Date(), { locale: vi });
        //formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
}

export default function Seen({users}) {

    return (
        <DivStyled> {
            users.map((item) => (
                <Tooltip style={{fontSize: '10pt'}} key={item.uid} title={item.displayName+' đã xem '+ formatDate(item?.timeSeen?.seconds)} placement="left">
                    <Avatar src={item.photoURL} style={
                            {margin: '2px'}
                        }
                        size={17}>
                        <AvatarStyled>A</AvatarStyled>
                    </Avatar>
                </Tooltip>
            ))
        } </DivStyled>
    )
}
