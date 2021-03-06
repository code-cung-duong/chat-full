import { Tooltip } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import styled from 'styled-components';
import Typing from '../../icon/Typing';


const Div1Styled = styled.div`
  margin-bottom: 17px;
  margin-left: 5px;
  display: flex;
  width: 900px;
  justify-content:flex-start;

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {  
    overflow-y: visible;
    color: #123;
    max-width: 400px;
    min-width: 20px;
    word-wrap:break-word;
    font-size: 15px;
    text-align: justify;
  }
`;

const Div2Styled = styled.div`
  magrin: 5px;
  padding-right: 15px;
`;

const Div3Styled = styled.div`
    max-width: 800px;
    background-color: rgb(228 230 235);
    border: 1px solid #ddd;
    border-radius: 40px;
    padding: 3px 15px 5px 15px;
    min-width: 40px;
    text-align: justify;
`;



function OnTyping({ photoURL, displayName }) {

    return (
        <Div1Styled>
            <Div2Styled>
                <Tooltip title={displayName}
                    placement="left">
                    <Avatar size='default'
                        src={photoURL}>
                        {
                            photoURL ? '' : displayName.charAt(0)
                        } </Avatar>
                </Tooltip>
            </Div2Styled>
            <Div3Styled>
                <Tooltip placement="left" style={{marginLeft: '10px'}}
                    title="">
                    <Typing/>
                </Tooltip>
            </Div3Styled>
        </Div1Styled>
    );
}

export default OnTyping;
