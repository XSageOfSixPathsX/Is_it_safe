import React, { use, useState } from 'react';
import axios from 'axios';
import "../styles/home.css";

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [apiData, setApiData] = useState(null);
  const API_URL = 'https://api.fda.gov/drug/label.json?search=active_ingredient:';
const AUTH_TOKEN = 'izegcZhoYdXVGfLd4QpMLCaK0it5vhF1qbmW8ipB';
const fields = [
  'purpose',
  'active_ingredient',
  'package_label_principal_display_panel',
  'dosage_and_administration',
  'indications_and_usage',
  'keep_out_of_reach_of_children',
  'warnings'
];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
   
  };


  const handleSearchClick = () => {
    const url = `${API_URL}"${searchTerm}"&limit=1`;

    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`
      }
    })
    .then(response => {
      setApiData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  };

  const renderField = (fieldName, data) => {
    if (!data || !data[fieldName]) return null;

    return (
      <div key={fieldName} className="field">
        <strong>{fieldName.replace('_', ' ')}:</strong> {data[fieldName]}<br /><br />
      </div>
    );
  };

  return (
    <div className="App">
       <div className='title'>Check details of your drug</div>
     <div className="navbar">
        <input
          type="text"
          placeholder="Search for a drug"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      {apiData && (
        <div className="results">
          {fields.map(field => renderField(field, apiData.results[0]))}
        </div>
      )}


    </div>
  );
}

export default Home;
