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
    onChange,
    title = ""
}) => {
    return (
        <div className={`flex align-center flex-wrap`}>
            _______________________________________
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
                      <div key={name} className={`flex align-center`}>
                        <div className={`w-100-p bold mb-5 mr-15 fz-20`}>{title}</div>
                          <div className={`flex align-center w-100-p`}>
                              <select name="" id="" className={`ml-10`}>
                                  <option value={name} label={name} />
                              </select>
                              <FaRegWindowClose onClick={() => _delete(name)} size={20} className={`mr-10 ml-10 min-w-20`}/>
                              {value[name]};

                              {fileSelectable && (
                                <Tooltip
                                  trigger={['hover']}
                                  overlay={<FileSelector onChange={onFileChange} />}
                                  placement={`top`}
                                >
                                    <button className={`black`}> File?</button>
                                </Tooltip>
                              )}
                          </div>
                      </div>
                    )
                })}
            _______________________________________
        </div>
    );
};

export default ObjectEditor