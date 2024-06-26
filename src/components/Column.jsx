import { useStore } from '../store';
import './Column.css';
import Task from './Task';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';


const  Column = ({state}) => {

    //const tasks = useStore(store => store.tasks.filter((task) => task.state === state), shallow);
    const tasks = useStore(useShallow((store) => store.tasks.filter(task => task.state === state)));

    return (
        <div className="column">
            <p>{state}</p>
            {tasks && tasks.map(task => <Task title={task.title} key={task.title}/>)}
        </div>
    )
}


export default Column;