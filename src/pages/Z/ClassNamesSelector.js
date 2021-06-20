import React from 'react'
import {FaRegWindowClose} from 'react-icons/fa'
import classNames from '../../stylotron/styles.json'

const selectGroups = classNames.classBranches.map(branch =>
  <optgroup label={branch.name}>
    {branch.classNames.map(className =>
        <option value={className.name} label={className.name}/>
    )}
  </optgroup>
)

const ClassNamesSelector = ({ value = '', onChange }) => {
  const deconstructed = value.trim().split(' ')
  const _delete = cls => onChange(deconstructed.filter(i => i !== cls).join(' '))

  return (
    <div className={`d-flex align-center`}>
      <select onChange={evt => onChange(value + ' ' + evt.target.value)} className={`mr-20`}>
        {selectGroups}
      </select>
      {value && deconstructed.map(cls =>
          (
              <div className={`mr-5 flex align-center`} key={cls}>
                  {cls}
                  <FaRegWindowClose onClick={() => _delete(cls)} size={20} style={{marginLeft: 3}}/>
              </div>
          ))}
    </div>
  )
}

export default ClassNamesSelector