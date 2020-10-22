import React, { useState } from "react";
import {ComposableMap, Geographies, Geography, Graticule, Sphere} from "react-simple-maps";
import {Progress, Button, InputNumber} from "antd"; // progress bar
import {N2YO_API_KEY, N2YO_BASE_URL} from "../constantsURL";

export const POSITION_API_BASE_URL = `${N2YO_BASE_URL}/positions`;

// Request positions/{id}/{observer_lat}/{observer_lng}/{observer_alt}/{seconds}
// Response see below.

// ComposableMap: wrapper for every mapchart.
// Graphies:      returns geograohic array, map over to svg shapes/


const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const progressStatus = {
  Idle: 'Idle',
  Tracking: 'Tracking...',
  Complete: 'Complete'
}

//const WorldMap = ({selelectedSatllites}) => {
//function WorldMap(props)
//onTracking = <Main.stateHook setTracking>
//observerInfo: from ObserverInfo --> Main  --> WorldMap

const WorldMap = (
  {selelectedSatllites, disabled, onTracking,observerInfo}
  )=> {
 
  //selelectedSatllites

  const [duration, setDuration] = useState(1);                             // init: 1s, -from- duration from <InputNumber>
  const [progressPercentage, setProgressPercentage] = useState(0);         // init: 0%, - to - ProgressBar
  const [progressText, setProgressText] = useState(progressStatus.Idle);   // init: Idle,
  const [timerId, setTimerId]  = useState(undefined);                      // used for Abort


  const fetchPositions = ()=>{
    const {longtitude, latitude, altitude} = observerInfo;

    // each var 'sat' in selelctedSatellites list 
    return selelectedSatllites.map((sat) =>{
      const id = sat.satid;
      // positions/{id}/{observer_lat}/{observer_lng}/{observer_alt}/{seconds}
      return fetch(`${POSITION_API_BASE_URL}/${id}/${latitude}/${longtitude}/${altitude}/${duration*60}&apiKey=${N2YO_API_KEY}`)
             .then(response => response.json());
    })
  }


  const abortOnclick = () =>{
    // if ther is a timerId running

    if (timerId)
    {
      clearInterval(timerId); //kill this timerId
      setProgressPercentage(0);
      setProgressText(progressStatus.Idle);
      onTracking(false);
      setTimerId(undefined);
    }
  }

  const startTracking = ()=>{
   
    // fetchPositions();  // move to OnclickTracking

    let curMin = 0;

    return setInterval(  ()=>{
      setProgressPercentage(  (curMin/duration)*100);   // set progress%  to {curMin/duration*100} every second, 1000 

      if (curMin === duration)
      {
        setProgressText(progressStatus.Complete);
        onTracking(false);  // set boolean onTracking to be false
        clearInterval(timerId);
      }

      curMin++;

    }, 1000);
  }



  const trackOnclick = () =>{
    
    setProgressText(`Tracking for ${duration} minutes`);
    // start Over every time after CLICK,  good practice  
    setProgressPercentage(0);
    onTracking(true);

    // Promise.all() to deal with The Array of Promises objects
    Promise.all(fetchPositions()).then( (data)=>{
      console.log(data);
      setTimerId(startTracking());
    }).catch( ()=>{
        // When api call fails

    })


  }

  return (
    <>
    {/* 1. Progress Bar */}
      <div className="track-info-panel">
        <Button type="primary" 
                onClick={trackOnclick} 
                disabled={selelectedSatllites.length===0 || disabled}>
          Track Selected Satellites
        </Button>
        
        <span style={ {marginLeft:"10px", marginRight:"10px" } }>for</span>
        <InputNumber min={1} max={50} defaultValue={1} onChange={ (value)=>setDuration(value)} disabled={disabled} />           {/* userInput slot to duration */}
        <span style={ {marginLeft:"10px", marginRight:"30px"}}>minutes</span>

        <Progress strokeColor={{from: '#108ee9', to: '#87d068',}}
                style ={{width:"500px",marginRight:"150px"}} 
                percent={progressPercentage} 
                format={ ()=>progressText} />

        {/* conditional rendering */}
        {timerId  && 
          <Button type="primary" onClick={abortOnclick}>Abort</Button>
        }

      </div>


    {/* // 2.Globe Map */}
    <ComposableMap projectionConfig={{ scale: 137 }} style={{ height: "700px", marginLeft: "100px" }}>
      <Graticule stroke="#DDD" strokeWidth={0.5}/>
      <Sphere stroke="#DDD" strokeWidth={0.5}/>
      <Geographies geography={geoUrl}>
        {
          ({geographies}) => (
            geographies.map(geo=>(
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#DDD"
                stroke="#FFF"
              />
            ))
          )
        }

      </Geographies>
    </ComposableMap>
  </>

  )
}


export default WorldMap;

// Position Response
//{
//   "info": {
//     "satname": "SPACE STATION",
//     "satid": 25544,
//     "transactionscount": 5
//   },
//   "positions": [
//     {
//       "satlatitude": -39.90318514,
//       "satlongitude": 158.28897924,
//       "sataltitude": 417.85,
//       "azimuth": 254.31,
//       "elevation": -69.09,
//       "ra": 44.77078138,
//       "dec": -43.99279118,
//       "timestamp": 1521354418
//     },
//     {
//       "satlatitude": -39.86493451,
//       "satlongitude": 158.35261287,
//       "sataltitude": 417.84,
//       "azimuth": 254.33,
//       "elevation": -69.06,
//       "ra": 44.81676119,
//       "dec": -43.98086419,
//       "timestamp": 1521354419
//     }
//   ]
// }