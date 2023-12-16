import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append('documents', file);
      }
      const response = await axios.post('http://localhost:8000/api/v1/pharmacist/uploadDocuments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials :true
      });
  
      if (response.data && response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage('Unknown response from the server.');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setMessage('Error uploading files. Please try again.');
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Document:</label>
          <input type="file" name="documents" multiple onChange={handleFileChange} />
        </div>
        <button type="submit">Upload Documents</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}

export default FileUpload;
