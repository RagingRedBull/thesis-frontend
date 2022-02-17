import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { sortableHandle } from 'react-sortable-hoc'

const DragHandle = sortableHandle(() => <div className='col'><FontAwesomeIcon icon={ faBars }/></div>)

export default DragHandle