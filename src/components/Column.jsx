import { useStore } from '../store';
import './Column.css';
import Task from './Task';
import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';



const  Column = ({state}) => {

    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);

    //const tasks = useStore(store => store.tasks.filter((task) => task.state === state), shallow);
    const tasks = useStore(useShallow((store) => store.tasks.filter(task => task.state === state)));

    const addTask = useStore((store) => store.addTask);
    const setDraggedTask = useStore(store => store.setDraggedTask);
    const draggedTask = useStore(store => store.draggedTask);
    const moveTask = useStore(store => store.moveTask);

    return (
        <div className="column" 
                onDragOver={e => {e.preventDefault()}}
                onDrop={
                    (e) => {
                        moveTask(draggedTask, state);
                        setDraggedTask(null);
                    }
                }
                >
            <div className='titleWrapper'>
                <p>{state}</p>
                <button onClick={() => setOpen(true)}>Add</button>
            </div>
            {tasks && tasks.map(task => <Task title={task.title} key={task.title}/>)}
            {open && <div className='modal'>
                <div className='modalContent'>
                    <input onChange={e => setText(e.target.value)}  value={text}/>
                    <button onClick={() => {
                        addTask(text, state);
                        setText('');
                        setOpen(false);
                    }}>Add</button>
                </div>
            </div>}
        </div>
    )
}


export default Column;