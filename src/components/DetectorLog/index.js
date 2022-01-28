import React from 'react';
import axios from 'axios';
import { ListGroup, ListGroupItem, Pagination, Table } from "react-bootstrap";
import '../../css/DetectorLog.css'
class DetectorLog extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnClickDetectorLog = this.handleOnClickDetectorLog.bind(this);
        this.state = {
            detectorLogs: [],
            sensorLogs: [],
            selectedDetectorUnitId: 0,
            currentPage: 1,
            totalPages: 0,
            pageSize: 10
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/prmts/log/all", {
            params: {
                pageNumber: this.state.currentPage,
                pageSize: this.state.pageSize
            }
        })
            .then(res => {
                const parsedLogs = res.data.content.map(log => ({
                    id: log.id,
                    macAddress: log.macAddress,
                    timeRecorded: log.timeRecorded
                }));
                this.setState({ 
                    detectorLogs: parsedLogs, 
                    selectedDetectorUnitId: parsedLogs[0].id,
                    totalPages: res.data.totalPages,
                    currentPage: res.data.pageable.pageNumber
                });
            this.handleOnClickDetectorLog(this.state.selectedDetectorUnitId);
            console.log(this.state.selectedDetectorUnitId);
            });
    }
    render() {
        return <div className='card'>
            <div className='row m-5'>
                <div className='col-6'>
                    <h1>Detector Logs</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Log ID</th>
                                <th>Mac Address</th>
                                <th>Time Recorded</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderDetectorLogs()}
                        </tbody>
                    </Table>
                </div>
                <div className='col-6'>
                    <h1>
                        SensorLogs
                    </h1>
                    <ListGroup as='ul'>
                        {this.renderSensorLogs()}
                    </ListGroup>
                </div>
            </div>
            <div className='footer mx-auto'>
                <Pagination className='mx-auto'>
                    <Pagination.First/>
                    <Pagination.Prev/>
                    <Pagination.Item active key={1}>{1}</Pagination.Item>
                    {this.renderPagination()}
                    <Pagination.Item>{this.state.totalPages}</Pagination.Item>
                    <Pagination.Next/>
                    <Pagination.Last/>
                </Pagination>
            </div>
        </div>
    }

    renderDetectorLogs() {
        console.log(this.state.detectorLogs);
        console.log(this.state.selectedDetectorUnitId);
        return this.state.detectorLogs.map(log => {
            return (
                <tr key={log.id} onClick={this.handleOnClickDetectorLog.bind(this, log.id)}>
                    <td>{log.id}</td>
                    <td>{log.macAddress}</td>
                    <td>{log.timeRecorded}</td>
                </tr>
            );
        })
    }

    handleOnClickDetectorLog(id) {
        console.log("Fetching data of " + id);
        axios.get("http://localhost:8080/prmts/log/sensor", {
            params: {
                detectorUnitLogId: id
            }
        })
            .then(res => {
                this.setState({ sensorLogs: res.data });
            });
    }

    renderPagination() {
        var pageItem = []
        for(var i = 1; i < this.state.pageSize; i++) {
            pageItem.push(<Pagination.Item key={i+1}>{i+1}</Pagination.Item>)
        }
        return pageItem;
    }

    renderSensorLogs() {
        return this.state.sensorLogs.map(log => {
            return (
                <ListGroupItem as='li' className='d-flex justify-content-between align-items-start' key={log.id}>
                    <div className="ms-2 me-auto">
                        <div className='fw-bold'>{log.name}</div>
                        <ul>
                            {log.type === 'DHT' ? <this.renderDhtLog dht={log} />
                                : log.type === 'MQ' ? <this.renderMqLog mq={log} />
                                    : ""
                            }
                        </ul>
                    </div>
                </ListGroupItem>
            );
        })
    }

    renderDhtLog(props) {
        return <div>
            <li>
                <span>Type: {props.dht.type}</span>
            </li>
            <li>
                <span>Temperature: {props.dht.temperature}</span>
            </li>
            <li>
                <span>Humidity: {props.dht.humidity}</span>
            </li>
        </div>
    }

    renderMqLog(props) {
        return <div>
            <li>
                <span>Type: {props.mq.type}</span>

            </li>
            <li>
                <span>MqValue: {props.mq.mqValue}</span>
            </li>
        </div>
    }
}
export default DetectorLog;