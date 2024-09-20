import React from 'react';

const TodoItem = ({ id, title, text, date, timeFrom, timeUpto, isComplete, deleteTodo, toggle }) => {
    return (
        <tr className={`border-b-2 ${isComplete ? 'line-through' : ''}`}>
            {/* Title */}
            <td className="p-4 text-slate-700 font-semibold text-center">{title}</td>

            {/* Task Details */}
            <td className="p-4 text-center">{text}</td>

            {/* Date */}
            <td className="p-4 text-center">{date}</td>

            {/* Time (From - Upto) */}
            <td className="p-4 text-center">{timeFrom} - {timeUpto}</td>

            {/* Actions: Complete/Unmark and Delete buttons */}
            <td className="p-4 text-center">
                <button onClick={() => toggle(id)} className='text-green-500 mr-2'>
                    {isComplete ? 'Unmark' : 'Complete'}
                </button>
                <button onClick={() => deleteTodo(id)} className='text-red-500'>
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default TodoItem;
