import React from 'react'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css'
import FileSelector from './FileSelector'
import {FaRegWindowClose} from 'react-icons/fa'

// { name: '', fileSelectable: false, fileValueCreator }
const ObjectEditor = ({
    fields = [],
    allowCreateNewFields = false,
    value = {},
    onChange
}) => {
    return (
        <div className={`flex align-center`}>
                {fields.map(({
                     name = '',
                     fileSelectable = false,
                     fileValueCreator
                 }) => {
                    const onFileChange = fileName => onChange({
                        ...value,
                        [name]: fileValueCreator(fileName)
                    })

                    const _delete = () => {
                        const clone = {...value}
                        delete clone[name]
                        onChange(clone)
                    }

                    return (
                      <React.Fragment key={name}>
                        Property
                        <select name="" id="">
                          <option value={name} label={name} />
                        </select>
                          {value[name]};

                          <FaRegWindowClose onClick={() => _delete(name)} size={20}/>
                          {/*<div>*/}
                              {fileSelectable && (
                                <Tooltip
                                  trigger={['hover']}
                                  overlay={<FileSelector onChange={onFileChange} />}
                                  placement={`top`}
                                >
                                  <button className={`black`}> File?</button>
                                </Tooltip>
                              )}
                          {/*</div>*/}
                      </React.Fragment>
                    )
                })}
        </div>
    );
};

export default ObjectEditor