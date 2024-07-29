import React, { useState, useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import UserContext from 'C:/Users/chesh/OneDrive/Desktop/Million/src/Components/Context.js';

function Tasks() {

  const initialItems = [];

  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState('');
  const [newColor, setNewColor] = useState('');

  const { Task, updateTask } = useContext(UserContext);

  const colors = [
    { name: 'Blue', value: '#80A7EF' },
    { name: 'Pink', value: '#ED97B4' },
    { name: 'Peach', value: '#F3BCA5' },
    { name: 'Light Yellow', value: '#FAE99E' },
    { name: 'Yellow', value: '#F0E08D' },
    { name: 'Beige', value: '#EBEBD3' },
    { name: 'Light Olive', value: '#C0C0AD' },
    { name: 'Gray', value: '#949487' },
    { name: 'Dark Gray', value: '#686861' },
    { name: 'Black', value: '#3C3C3B' }
  ];

  const handleAddItem = () => {
    if (newItem.trim() !== '' && newColor !== '') {
      setItems([...items, { name: newItem, color: newColor }]);
      setNewItem('');
      setNewColor('');
    }
  };
  updateTask(items);
  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  return (
    <div className="tasks-container">
      <InputGroup className="mb-3">
        <FormControl
          type="text"
          placeholder="Enter task name"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="task-input"
        />
        <Form.Control
          as="select"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          className="color-select"
        >
          <option value="">Color</option>
          {colors.map((color, index) => (
            <option key={index} value={color.value}>
              {color.name}
            </option>
          ))}
        </Form.Control>
        <Button onClick={handleAddItem} variant="outline-secondary" className="add-button">Add Item</Button>
      </InputGroup>
      <ListGroup>
        {items.map((item, index) => (
           <ListGroup.Item key={index} className="task-item" style={{ backgroundColor: item.color }}>
           <div className="d-flex justify-content-between align-items-center">
             <span>{item.name}</span>
             <Button variant="outline-danger" size="sm" onClick={() => handleRemoveItem(index)}>X</Button>
           </div>
         </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Tasks;


