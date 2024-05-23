import { useEffect, useState } from "react";
import axios from "axios";
import Datepicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const DataForm = ()=> {
   const [data, setData] = useState({
      firstName :"",
      lastName :"",
      phoneNumber:"",
      email:"",
      dob:new Date(),
   });
   const [list , setList] = useState([]);
   const [isEditing, setIsEditing] = useState(false);
   const [editId , setEditId] = useState(null);

   useEffect(() =>{
      axios.get('http://localhost:5001/get')
      .then(res => setList(res.data))
      .catch(e =>  console.log(e));
   },[])
   const handleAdd = (e) => {
      e.preventDefault();
      if (isEditing) {
      axios.put(`http://localhost:5001/update/${editId}`, { data })
            .then(res => {
               setList(list.map(item => item._id === editId ? res.data : item));
               setIsEditing(false);
               setEditId(null);
               setData({ firstName: "", lastName: "" , phoneNumber:"",email:"", dob: new Date() });
            })
            .catch(e => console.log(e));
      } else {
         axios.post('http://localhost:5001/add', { data })
            .then(res => {
               setList([...list, res.data]);
               setData({ firstName: "", lastName: "" , phoneNumber:"" , email:"" , dob : new Date()});
            })
            .catch(e => console.log(e));
      }
   }
   
   const handleEdit = (id) => {
      const todo = list.find(item => item._id === id);
      setData({ 
         firstName: todo.firstName , 
         lastName: todo.lastName, 
         phoneNumber:todo.phoneNumber, 
         email:todo.email, 
         dob: new Date(todo.dob)
      });
      setIsEditing(true);
      setEditId(id);
   }

   const handleDelete = (id) => {
      axios.delete(`http://localhost:5001/delete/${id}`)
         .then(() => {
            setList(list.filter(item => item._id !== id));
         })
         .catch(e => console.log(e));
   }

   const onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({...data , [name] : value}))
   }

   const onDateChange = (date) => {
      setData(data => ({ ...data, dob: date.toISOString() }));
   }
   
   const onPhoneChange = (value) => {
      setData(data => ({ ...data, phoneNumber: value }));
   }

   return ( 
      <div className="form">
      <form onSubmit={handleAdd}>
         <label>
            First Name:
            <input type="text" name="firstName" placeholder="First Name" onChange={onInputChange} value={data.firstName} required/>
         </label>
         <label>
            Last Name:
            <input type="text" name="lastName"  placeholder="Last Name" onChange={onInputChange} value={data.lastName} required/>
         </label>
         <label>
            Phone Number:
            <PhoneInput
             placeholder="Enter phone number"
             value={data.phoneNumber}
             onChange={onPhoneChange}
             defaultCountry="US"
         />
         </label>
         <label>
            Email Id:
            <input type="email" name="email" placeholder="Email" onChange={onInputChange} value={data.email} required/>
         </label>
         <label>
            Date Of Birth:
            <Datepicker showIcon selected={data.dob} onChange={onDateChange} dateFormat="yyyy-MM-dd" required/>
         </label>
         <button className="button" type="submit">{isEditing ? "Update" : "Submit"}</button>
      </form>
      
      <div>
         <h2>List of entries</h2>
         <ul>
            {list.map((item) => {
               return (
               <li key={item._id}>
                  <div>First name: {item.firstName}</div>
                  <div>Last name: {item.lastName}</div>
                  <div>Phone number: {item.phoneNumber}</div>
                  <div>Email: {item.email}</div>
                  <div>Date of birth: {new Date(item.dob).toLocaleDateString()}</div>
                  <button onClick={() => handleEdit(item._id)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
               </li>
               );
            })}
         </ul>
      </div>

      </div>
   )
}
export default DataForm;