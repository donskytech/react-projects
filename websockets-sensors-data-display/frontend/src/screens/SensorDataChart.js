import React, { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Row, Container } from "react-bootstrap";

const SensorChart = () => {
  const ws = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    //Send request to our websocket server using the "/request" path
    ws.current = new WebSocket("ws://localhost:8080/request");

    ws.current.onmessage = (ev) => {
      const message = JSON.parse(ev.data);
      console.log(`Received message :: ${message.sensorData}`);
      // Upon receiving websocket message then add it to the list of data that we are displaying
      let newDataArray = [
        ...data,
        {
          id: message.date,
          sensorData: message.sensorData,
        },
      ];
      console.log(newDataArray);
      setData((currentData) => limitData(currentData, message));
    };
    ws.current.onclose = (ev) => {
      console.log("Client socket close!");
    };

    //We limit the number of reads to the last 24 reading and drop the last read
    function limitData(currentData, message) {
      if (currentData.length > 24) {
        console.log("Limit reached, dropping first record!");
        currentData.shift();
      }
      return [
        ...currentData,
        {
          id: message.date,
          sensorData: message.sensorData,
        },
      ];
    }

    return () => {
      console.log("Cleaning up! ");
      ws.current.close();
    };
  }, []);

  //Display the chart using rechart.js
  return (
    <Container className="p-3">
      <Row className="justify-content-md-center">
        <h1 className="header">Real time IOT Sensor Data Using Websockets</h1>
      </Row>
      <Row className="justify-content-md-center">
        <div style={{ width: 1000, height: 400 }}>
          <ResponsiveContainer>
            <LineChart
              width={800}
              height={400}
              data={data}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              {/* <XAxis dataKey="date" /> */}
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sensorData"
                stroke="#8884d8"
                activeDot={{ r: 24 }}
                strokeWidth="4"
              />
              {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Row>
    </Container>
  );
};

export default SensorChart;
