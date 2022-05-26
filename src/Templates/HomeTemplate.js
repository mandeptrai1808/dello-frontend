import React from 'react'
import MenuHeader from '../Components/MenuHeader'

export default function HomeTemplate(props) {
  return (
    <div>
        <MenuHeader/>
        {props.component}
    </div>
  )
}
