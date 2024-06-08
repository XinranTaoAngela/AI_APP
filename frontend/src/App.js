import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please upload a file.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    // Send the file to the backend
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    alert('File uploaded! Detected: ' + result.description);
  };

  return (
    <div className="App">
      <h1>Image Detection App</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
}

export default App;
