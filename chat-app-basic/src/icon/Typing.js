import Icon from '@ant-design/icons'
import React from 'react'
import { OneDot } from '../components/ChatRoom/IconsSVG'
import '../typing.css'

export default function Typing() {
    return (
        <div className="load-3">
            <Icon className="line" component={OneDot} />
            <Icon className="line"  component={OneDot} />
            <Icon className="line"  component={OneDot} />        
        </div>
    )
}
