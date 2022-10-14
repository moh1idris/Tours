import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading,setLoading] = useState(true);
  const [tours,setTours] = useState([]);

  const removeTour = (id) =>{
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  }

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);                //-->this will fetch from url
      const tours = await response.json();              //-->this will fetch from the response
      // console.log(tours);
      setLoading(false)                                 //-->this will set the loading page as false 
      setTours(tours)                                   //--> this will set the tours from [] TO response.json     
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }; 
  useEffect(()=>{                                       //--> is used to invoke the fetchTours
    fetchTours();
  },[]);                        

  if(loading){
    return(
    <main>
      <Loading />
    </main>
  )}
  if(tours.length === 0){
    return(
    <main>
      <div className="title">
        <h2>no tours left</h2>
        <button className='btn' onClick={()=>fetchTours()}>Refersh</button>
        {/* <button className='btn' onClick={fetchTours}>Refersh</button> */}
      </div>
    </main>
    )}

    
  return <main>
  <Tours tours={tours} removeTour={removeTour}/>                     {/*Here Tours={tours}   is nothing but props  */}                       
  </main>
}

export default App
