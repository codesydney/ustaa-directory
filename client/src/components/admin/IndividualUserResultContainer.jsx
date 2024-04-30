import { useState } from 'react'
import { FaCaretRight, FaCaretDown, FaTrashAlt } from 'react-icons/fa'
import { MdModeEditOutline } from 'react-icons/md'
import UserRow from './UserRow'

const IndividualUserResultContainer = ({ user }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [editViewOpen, setEditViewOpen] = useState(false)

  return (
    <div
      className="bg-white pb-4 pt-8 m-2 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-full px-4 flex gap-2 absolute left-0 top-4
          ${isHovered ? 'md:absolute' : 'md:hidden'}
        `}
      >
        <button
          className="border-gray-500 rounded border-[1px] px-2 py-1 hover:ring-gray-300 hover:ring-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <FaCaretDown /> : <FaCaretRight />}
        </button>
        <button
          className="border-gray-500 rounded border-[1px] px-2 py-1 hover:ring-gray-300 hover:ring-4 ml-auto"
          onClick={() => setEditViewOpen(!editViewOpen)}
        >
          <MdModeEditOutline />
        </button>
        <button className="border-gray-500 rounded border-[1px] px-2 py-1 hover:ring-gray-300 hover:ring-4">
          <FaTrashAlt />
        </button>
      </div>

      <div className="pt-6 md:pt-4">
        {Object.entries(user).map(([key, value]) => {
          return (
            <UserRow
              editViewOpen={editViewOpen}
              key={key}
              isExpanded={isExpanded}
              field={key}
              value={value}
            />
          )
        })}
      </div>
      {editViewOpen && (
        <div className="flex justify-end gap-2 p-4 bg-gray-200/50 mt-4">
          <button
            className="border-gray-500 bg-white rounded border-[1px] text-xs px-2 py-1 hover:ring-gray-300 hover:ring-4"
            onClick={() => setEditViewOpen(false)}
          >
            Cancel
          </button>
          <button
            className=" bg-primary text-white border-primary rounded border-[1px] text-xs px-2 py-1 hover:ring-gray-300 hover:ring-4"
            onClick={() => setEditViewOpen(false)}
          >
            Update
          </button>
        </div>
      )}
    </div>
  )
}

export default IndividualUserResultContainer
