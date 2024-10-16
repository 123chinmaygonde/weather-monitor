import React,{useState,useEffect} from 'react'
import axios from "axios"

const App = () => {
  const [summaries,setSummaries]= useState([])
  const fetchWeatherSummaries = async()=>{
    try {
      const response = await axios.get('http://localhost:4000/api/weather/summary')
      setSummaries(response.data)
    } catch (error) {
      console.log('error fetching weather summaries',error)
    }
  }

  useEffect(()=>{
    fetchWeatherSummaries()
    const interval = setInterval(fetchWeatherSummaries,60000)
    return ()=>clearInterval(interval)
  },[])
  return (
    <div className='App'>
      <h1>Weather Summariess</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Avg Temp (C)</th>
            <th>Max Temp (C)</th>
            <th>Min Temp (C)</th>
            <th>Dominant Condition</th>
          </tr>
        </thead>
        <tbody>
          {summaries.map((summary,index)=>(
            <tr key={index}>
              <td>{new Date(summary.date).toLocaleDateString()}</td>
              <td>{summary.avgTemp.toFixed(2)}</td>
              <td>{summary.maxTemp.toFixed(2)}</td>
              <td>{summary.minTemp.toFixed(2)}</td>
              <td>{summary.dominantCondition}</td>

            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  )
}

export default App
