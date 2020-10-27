import React, {useState} from "react";
import {Col, Row} from "antd";  /* AntD Grid Frame Arrangemnt*/
import ObserverInfo from "./ObserverInfo";
import {N2YO_API_KEY, N2YO_BASE_URL,SAT_CATEGORY} from "../constantsURL";
import SatelliteList from "./SatelliteList";
import WorldMap from "./WorldMap";


/*Main Component*/
// hosts the contents of this webpage.
// divide webpage 20%-80% L-R


//The "above" API : return all objects within a given search radius above observer's location. 
//radius (0,90);  0: exactly above the observer, 90 degrees above the horizon.
//Req: https://api.n2yo.com/rest/v1/satellite/above/ 41.702/-76.014/0/70/  18/&apiKey=589P8Q-SDRYX8-L842ZD-5Z9
//Response: See below.

export const ABOVE_API_BASE_URL = `${N2YO_BASE_URL}/above`;

const Main = () =>
{
    const [loading, setLoading] = useState(false);  // loading intial as false
    const [satList, setSatList] = useState([]);     //useState Hook, intially [] empty list of SatList flows down to ObserverInfo sync
    const [tracking,setTracking] = useState(false); // Main flows down tO WorldMap&ObserverInfo to be disable them when Tracking
    const [observerInfo, setObserverInfo] = useState({}); //get from Obeserver info to call N2y0_positon api & pass to WorldMap


    // func Declaration
    const findSatellitesOnClick = (nextObserverInfo)=>{

        setObserverInfo(nextObserverInfo);

        const { longtitude , latitude, altitude, radius } = nextObserverInfo; //destructing

        // obtained data
        setLoading(true);

        // fetch ajax Based on  ES6 'Promise' mechanism
         
        fetch(`${ABOVE_API_BASE_URL}/${latitude}/${longtitude}/${altitude}/${radius}/${SAT_CATEGORY}&apiKey=${N2YO_API_KEY}`)
            .then(response => response.json())
            .then(
                //a=>{xxx} single param Arrow Func  single param (x) =>
                // satellite: let arr = [3, 5, 1, 2, 8];  let arr1 = arr.map(function(a) {return a * 2;})
                // satellite is each object of the returned data.above Array
                // add a "boolean selected" return to response
                data=>{
                    setSatList(data.above.map((satellite)  =>{
                        return { 
                        ...satellite,
                        selected: false,
                    }
                    }));

                    setLoading(false);
                }
            )
            .catch(  ()=>{
                    // When API call fails

                    setLoading(false);
                });
    };


    
    return (
        <Row>
            <Col span ={8}>
                {/* Satellites Section  */}

                <ObserverInfo findSatellitesOnClick ={findSatellitesOnClick} loading={loading} disabled={tracking}/>

                <SatelliteList satList={satList} updateSatelliteList ={setSatList} loading={loading} disabled={tracking}/>
            </Col>

            <Col span={16}>
               <WorldMap selelectedSatllites={satList.filter(sat => sat.selected)} 
                          onTracking={setTracking} 
                          disabled={tracking}
                          observerInfo={observerInfo}/>    
            </Col>

        </Row>
    )
}

export default Main;



//======================================================================================//
/*
{
    "info": {
      "category": "Amateur radio",
      "transactionscount": 17,
      "satcount": 3
    },
    "above": 
      {
        "satid": 20480,
        "satname": "JAS 1B (FUJI 2)",
        "intDesignator": "1990-013C",
        "launchDate": "1990-02-07",
        "satlat": 49.5744,
        "satlng": -96.7081,
        "satalt": 1227.9326
      },
       
         ...
    ]
  }
  */





/// SateLite List Comp
// const SatelliteList = ({satList,updateSatelliteList})


