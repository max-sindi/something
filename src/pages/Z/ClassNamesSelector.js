import React from 'react'
import {FaRegWindowClose} from 'react-icons/fa'
import classNames from '../../classNames.json'

console.log('classNames',classNames)

const ClassNamesSelector = ({ value = '', onChange }) => {
  const deconstructed = value.trim().split(' ')
  const _delete = cls => onChange(deconstructed.filter(i => i !== cls).join(' '))


  return (
    <div className={`flex align-center`}>
      {value && deconstructed.map(cls => {
        return (
          <div className={`mr-5 flex align-center`} key={cls}>
            {cls}
            <FaRegWindowClose onClick={() => _delete(cls)} size={20} style={{marginLeft: 3}} />
          </div>
        )
      })}
    </div>
  )
}

export default ClassNamesSelector