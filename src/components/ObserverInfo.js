import React from "react";
import {InputNumber, Form, Button} from "antd";
import Title from "antd/lib/typography/Title";

// InputNumber: lon, lat, alt, radius : from n2yo api

// <Form {...layout} / onFinish={}
// Form.Items: input slots  (label,name, rules=[ required/ message])

// InputNumber: bound the Range  

const ObserverInfo = (props) => {

    //*** input param (observerInfo) provided by User Input when they submit the form. ***//

    const onFormFinish = (observerInfo) => {
      // TO DO: call N2YO api to get nearby satellites information
      props.findSatellitesOnClick(observerInfo); // *** from Main *** flows down
    }
  
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 24 },
      };
    
    const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
    };
    
    return (
    <div className="observer-info-container">
        <Title level={5}>Observer Info </Title>
        <Form
        {...layout}
        initialValues={{ 
            longitude: "0",
            latitude: "0",
            altitude: "0",
            radius: "0",
        }}
        onFinish={onFormFinish}
        >
        <Form.Item
            label="Longitude"
            name="longitude"
            rules={[{ 
            required: true,
            message: 'Please enter a valid longitude!',
            }]}
        >
            <InputNumber min={-180} max={180} style={{ width: "40%" }} disabled={props.disabled}/>
        </Form.Item>

        <Form.Item
            label="Latitude"
            name="latitude"
            rules={[{ 
            required: true,
            message: 'Please enter a valid latitude!',
            }]}
        >
            <InputNumber min={-90} max={90} style={{ width: "40%" }} disabled={props.disabled}/>
        </Form.Item>

        <Form.Item
            label="Altitude(meters)"
            name="altitude"
            rules={[{ 
            required: true,
            message: 'Please enter a valid altitude!',
            }]}
        >
            <InputNumber min={-413} max={8850} style={{ width: "40%" }} disabled={props.disabled} />
        </Form.Item>

        <Form.Item
            label="Radius"
            name="radius"
            rules={[{ 
            required: true,
            message: 'Please enter a valid radius!',
            }]}
        >
            <InputNumber min={0} max={90} style={{ width: "40%" }} disabled={props.disabled} />
        </Form.Item>

        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" disabled={props.loading || props.disabled}>
            Find nearby satellites
            </Button>
        </Form.Item>
        </Form>
    </div>
    )
}
    
export default ObserverInfo;
    
  

//     Comments       
//  {/* The observer's altitude -413 ~ 8850 Mount Everest */}
//  {/* spread The labelCol/wrapper col to Form slots */}
//  {/* And set intial values */}
//  {/* 5 is the font size */}
//  taillayout: for ""Ok"" Button 
