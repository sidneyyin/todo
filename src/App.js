import './App.css';
import axios from 'axios';
import ToDoItems from './ToDoItems';

axios.defaults.baseURL = "http://localhost:5000";

export default ToDoItems;
