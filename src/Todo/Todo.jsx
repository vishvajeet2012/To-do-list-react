import { useEffect, useState } from "react";
import TodoCss from "./todo.module.css";
import { toast } from 'react-hot-toast';
import deleteAudio from "./media/deleteAudio.mp3";
import addAudio from "./media/addAudio.mp3";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { BsBrightnessHigh } from "react-icons/bs";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Todo() {
    const [darkMode, setDarkMode] = useState(() => 
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        const theme = darkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [darkMode]);

    const handleToggle = () => {
        setDarkMode(!darkMode);
    };

    const [task, setTask] = useState("");
    const [editMode, setEditMode] = useState(null);
    const [comTask, setComTask] = useState(0);
    const [remaTask, setRemaTask] = useState(0);

    const allTasks = [
        { ProductName: "Buy Laptop", complete: true }, 
        { ProductName: "Buy iPhone", complete: false },
        { ProductName: "Buy Bike", complete: true }
    ];

    const [toto, setToto] = useState(allTasks);

    function handleForm(e) {
        e.preventDefault();
    }

    function handleTask(e) {
        setTask(e.target.value);
    }

    function addOrUpdateTask() {
        if (task.trim() === "") return; // Prevent empty tasks

        const audio = new Audio(addAudio);
        audio.play().catch(error => {
            console.error('Failed to play audio:', error);
        });

        const updatedTasks = [...toto];

        if (editMode !== null) {
            // Updating existing task
            updatedTasks[editMode].ProductName = task.trim();
            setEditMode(null);
            toast.success("Task updated...", { position: 'top-center' });
        } else {
            // Adding new task
            updatedTasks.push({ ProductName: task.trim(), complete: false });
            toast.success("Task added...", { position: 'top-center' });
        }

        setToto(updatedTasks);
        setTask(""); // Clear the input after add/update
    }

    function handleDelete(index) {
        const audio = new Audio(deleteAudio);
        audio.play().catch(error => {
            console.error('Failed to play audio:', error);
        });

        const updatedTasks = toto.filter((_, idx) => idx !== index);
        setToto(updatedTasks);
        toast.error("Task deleted...", { position: 'top-center', duration: 4000 });
    }

    function handleChecked(index) {
        const updatedTasks = [...toto];
        updatedTasks[index].complete = !updatedTasks[index].complete;
        setToto(updatedTasks);

        updateTaskCounts(updatedTasks);
    }

    function updateTaskCounts(updatedTasks) {
        const completedTasks = updatedTasks.filter(task => task.complete);
        const remainingTasks = updatedTasks.filter(task => !task.complete);
        setComTask(completedTasks.length);
        setRemaTask(remainingTasks.length);
    }

    useEffect(() => {
        updateTaskCounts(toto);
    }, [toto]);

    return (
        <>
            <button onClick={handleToggle} style={buttonStyle}>
                {darkMode ? <BsBrightnessHigh size={24} /> : <BsFillBrightnessHighFill size={24} />}
            </button>  
            <div className={`mx-auto mt-5 ${TodoCss.todomaindiv}`}>
                <h3>To-do List 🗒</h3>
                <form className={`mx-auto mt-4 ${TodoCss.todoparentform}`} onSubmit={handleForm}>
                    <input 
                        type="text" 
                        value={task} 
                        onChange={handleTask} 
                        placeholder={editMode !== null ? "Edit Task" : "Add Task"} 
                        required  maxLength={25}
                    />
                    <button 
                        type="button" 
                        onClick={addOrUpdateTask} 
                        className={`btn ${TodoCss.addbtn}`}
                    >
                        {editMode !== null ? "Update" : "Add"}
                    </button>
                </form>

                <div className={`mt-4`}>
                    {
                        toto.map((value, index) => (
                            <ul key={index}>
                                <li>
                                    <input 
                                        type="checkbox" 
                                        checked={value.complete}
                                        onChange={() => handleChecked(index)}
                                    />
                                    <span 
                                        style={{ textDecoration: value.complete ? "line-through" : "none", color: value.complete ? "#b2b2b2" : "inherit" }}
                                    >
                                        {value.ProductName}
                                    </span>
                                    <span className={`${TodoCss.icondelete}`}>
                                        <i className="bi bi-trash3-fill" onClick={() => handleDelete(index)}></i>
                                    </span>
                                    <span className={`${TodoCss.icondelete}`}>
                                        <i className="bi bi-pencil-fill" onClick={() => { 
                                            setTask(value.ProductName); 
                                            setEditMode(index); 
                                        }}></i>
                                    </span>
                                </li>
                            </ul>
                        ))
                    }
                </div>
                <div className={`mt-5 ${TodoCss.threeTask}`}>
                    <span className={`${TodoCss.totale}`}>Total → {toto.length}</span>
                    <span className={`${TodoCss.Completed}`}>Completed → {comTask}</span>
                    <span className={`${TodoCss.Remaining}`}>Remaining → {remaTask}</span>
                </div>
            </div>
        </>
    );
}

const buttonStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    fontSize: '24px'
};

export default Todo;
