import Icon from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { OkIcon } from './IconsSVG';


const DivStyled = styled.div `
    float: right;
    margin-top: -29px;
    margin-right: -0px;

    .ant-avatar-string{
        line-height: 13px;
    }


`;


export default function ISeen2() {
    return (
        <DivStyled> {
                <Tooltip style={{fontSize: '10pt'}} title="Đã gửi" placement="left">
                    {/* <Avatar src={item.photoURL} style={
                            {margin: '2px'}
                        }
                        size={17}>
                        <AvatarStyled>A</AvatarStyled>
                    </Avatar> */}

                    <Icon component={OkIcon} />
                </Tooltip>
        } </DivStyled>
    )
}
