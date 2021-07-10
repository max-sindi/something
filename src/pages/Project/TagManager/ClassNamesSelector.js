import React from 'react'
import {FaRegWindowClose} from 'react-icons/fa'
import classNames from '../../../stylotron/styles.json'
import DropDownMenuSelect from 'react-nested-menu-selector'

// const selectGroups = classNames.classBranches.map(branch =>
//   <optgroup label={branch.name}>
//     {branch.classNames.map(className =>
//         <option value={className.name} label={className.name}/>
//     )}
//   </optgroup>
// )

const options = {
    placeholder: "Class",
    options: classNames.classBranches.map(branch => ({
        label: branch.name,
        options: branch.classNames.map(className => ({
            value: className.name,
            label: className.name,
            key: className.name
        })),
        key: branch.name
    }))
}

const ClassNamesSelector = ({ value = '', onChange, ...props }) => {
    const deconstructed = value.trim().split(' ')
    const _delete = cls => onChange(deconstructed.filter(i => i !== cls).join(' '))
    const onClick = newValue => onChange(value + ' ' + newValue)
    return (
        <div className={`d-flex align-center`}>
            <DropDownMenuSelect
                values={options}
                handleOnClick={onClick}
                className={"max-h-200"}
            />
          {/*<select onChange={evt => onChange(value + ' ' + evt.target.value)} className={`mr-20`}>*/}
          {/*  {selectGroups}*/}
          {/*</select>*/}
          {value && deconstructed.map(cls =>
              (
                  <div className={`mr-5 flex align-center text-no-wrap`} key={cls}>
                      .{cls}
                      <FaRegWindowClose onClick={() => _delete(cls)} size={20} style={{marginLeft: 3}}/>
                  </div>
              ))}
        </div>
    )
}

export default ClassNamesSelector