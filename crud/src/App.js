import React, { useState, useEffect } from 'react';
import { data } from './employedata';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [Data, setData] = useState([]);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [update, setUpdate] = useState(false); 

  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const dt = Data.filter(item => item.id !== id); 
      setData(dt); 
    }
  };

  
  const handleEdit = (id) => {
    setUpdate(true);
    const dt = Data.find(item => item.id === id); 
    if (dt) {
      setId(dt.id); 
      setFirstname(dt.firstname);
      setLastname(dt.lastname);
      setAge(dt.age);
    }
  };

  
  const handleSave = (e) => {
    e.preventDefault();
    let error = '';

    if (firstname === '') 
      error += 'Firstname is required. ';
    if (lastname === '')
       error += 'Lastname is required. ';
    if (age <= 0)
       error += 'Age is required. ';

    if (error === '') {
      const newObject = {
        id: Data.length + 1, 
        firstname,
        lastname,
        age
      };

      setData([...Data, newObject]); 
      alert('Record Saved');

      handleClear();
      
    } else {
      alert(`Error: ${error}`);
    }
  };

  
  const handleUpdate = () => {
    const updatedData = Data.map(item =>
      item.id === id ? { ...item, firstname, lastname, age } : item
    );
    setData(updatedData); 
    setUpdate(false); 
    handleClear(); 
  };


  const handleClear = () => {
    alert("Record Clear")
    setFirstname('');
    setLastname('');
    setAge(0);
    setUpdate(false); 
  };

  useEffect(() => {
    setData(data); 
  }, []);

  return (
    <div>
      <label>Enter your first name:</label>
      <input
        type='text'
        placeholder='Enter your first name'
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />

      <label>Enter your second name:</label>
      <input
        type='text'
        placeholder='Enter your second name'
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />

      <label>Enter your age:</label>
      <input
        type='number'
        placeholder='Enter your age'
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />

      {update ? (
        <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
      ) : (
        <button className="btn btn-primary" onClick={handleSave}>Save</button>
      )}

      <button className="btn btn-danger" onClick={handleClear}>Clear</button>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Id</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.age}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

