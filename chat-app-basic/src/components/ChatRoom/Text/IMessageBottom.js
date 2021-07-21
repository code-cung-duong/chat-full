import { Tooltip, Typography } from 'antd';
import { formatRelative } from 'date-fns';
import { vi } from 'date-fns/locale';
import React from 'react';
import styled from 'styled-components';


const Div1Styled = styled.div`
  margin-bottom: 17px;
  margin-left: 9px;
  display: flex;
  width: 99%;
  justify-content:flex-end;
  position: relative;

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    overflow-y: visible;
    color: #fff;
    max-width: 400px;
    min-width: 20px;
    word-wrap:break-word;
    font-size: 15px;
    text-align: justify;
  }

  .ant-tooltip-inner{
      magrin-left: -20px;
  }

  .ant-avatar{
      margin: 1px;
  }
`;


const Div3Styled = styled.div`
    max-width: 800px;
    background-color: #0099ff;
    border: 1px solid #ddd;
    border-radius: 40px 10px 40px 40px;
    padding: 3px 20px 5px 20px;
    min-width: 40px;
    text-align: justify;
    margin-right : 15px
`;

function formatDate(seconds) {
    let formattedDate = '';
    if (seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000), new Date(), { locale: vi });
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
}


function IMessageBottom({ text, createdAt }) {
    return (
        <Div1Styled>
            <Div3Styled>
                <Tooltip placement="left"
                    title={
                        formatDate(createdAt?.seconds)
                    }>
                    <Typography.Text className='content'>
                        {text}</Typography.Text>
                </Tooltip>
            </Div3Styled>

        </Div1Styled>

    );
}

export default IMessageBottom;
