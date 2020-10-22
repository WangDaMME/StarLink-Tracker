import React from "react";
import Title from "antd/lib/typography/Title";
import {List, Checkbox, Avatar} from "antd";
import satelliteImage from '../images/satellite.svg';

// multiple param func   // props
const SatelliteList = ({
    satList,
    updateSatelliteList,
    loading, // loading spinner
    disabled
  }) => {
    
    // callback func for CheckBox Selection
    const onSelectionChange = (checked, targetSatllite) => {
      const nextSatlliteList = satList.map((satllite) => {
        if (satllite.satid === targetSatllite.satid) {
          return {
            ...satllite,
            selected: checked  // satellite original data + selelcted: checked
          }
        }
        else {
          return {
            ...satllite
          }
        }
      });
  
      updateSatelliteList(nextSatlliteList);
    }

    return (
        <div className="satellite-list-container">
            <Title level={5}>Nearby Satellites ({satList? satList.length:0})</Title>  {/* satList isEmpty */}
            <p>Please select the satellites you wanna track on the world map at the right side.</p>
            <hr/>
            <List
                className="sat-list"
                itemLayout="horizontal"
                dataSource={satList}
                loading={loading}
                renderItem={ item=>(
                    <List.Item
                        actions={ [<Checkbox onChange={ (e)=> onSelectionChange(e.target.checked, item)} checked={item.selected} disabled={disabled} />]}>
                        <List.Item.Meta
                            avatar={
                                 <Avatar src={satelliteImage} size= "large" alt="satellite"/>}
                            title={<p>{item.satname}</p>}
                            description={`Lauch Date: ${item.lauchDate}`} />
                    </List.Item>
                )}
            />
        </div>
    )
}

 

export default SatelliteList;


// AntD List with Action
// renderItem={item => (
//     <List.Item
//       actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
// <List.Item.Meta
// avatar={
//     <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
//   }
//   title={<a href="https://ant.design">{item.name.last}</a>}
//   description="Ant Design, a design language for background applications, is refined by Ant UED Team"
// />


// Checkbox

// function onChange(e) {
//     console.log(`checked = ${e.target.checked}`);
//   }
  
//   ReactDOM.render(<Checkbox onChange={onChange}>Checkbox</Checkbox>, document.getElementById('container'));



// Observer Info Response
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