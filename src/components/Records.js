import React, { useState, useEffect } from 'react';
import { getAllRecords } from '../axios-services/products';
import { Link, Navigate } from 'react-router-dom'

const Records = () => {
    const [allRecords, setAllRecords] = useState([])

    useEffect(() => {
        getAllRecords()
          .then(allRecords => {
            console.log(allRecords)
            setAllRecords(allRecords)
          })
      }, [])

     return(
        <div>
      <h1>Records Page</h1>
      <div className='products-container'>

        {
          allRecords.map((record, idx) => {
            return (
              <section className="product-card" key={idx}>
                <span className="product-img">
                  <img src={record.img_url} alt="album-cover" width="150" height="150"></img><br></br>
                </span><br></br>
                <Link className="product-link" to={`/products/${record.id}`} >{record.name}</Link><br></br>
                <span>${record.price}</span><br></br>
              </section>
            )
          })
        }


      </div>
    </div>
     ) 
}

export default Records;