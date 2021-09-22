import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Image } from 'react-bootstrap';
import {BrowserView, MobileView} from 'react-device-detect';
var _ = require('lodash');

export const ParkPoster = ({ data, setData }) => {

    const setVisited = (name) => {
        const index = data.findIndex((element, index) => {
            if (element.name === name) {
                return true
            }
        })
        let newData = [...data];
        newData[index].visited = !data[index].visited;
        console.log(newData[index].visited)
        setData(newData);
        console.log(`${data[index].name} : ${data[index].visited}`)
    }

    const renderBrowserView = () => {
        const rows = _.chunk(data, 9);
        return (
            <>
            {
                rows.map((row, index1) => {
                    return (
                        <Row>
                            {
                                row.map((col, index2) => {
                                    return (
                                        <Col xl lg md><Image className="p-1" onClick={() => setVisited(col.name)} src={col.url} width="100%"/></Col>
                                    )
                                    
                                })
                            }
                        </Row>
                    )
                    
                })
            }
            </>
        )
    }

    const renderMobileView = () => {
        const rows = _.chunk(data, 21);
        return (
            <>
            {
                rows.map((row) => {
                    return (
                        <Row>
                            {
                                row.map((col) => {
                                    return (
                                        <Col sm={4} xs={4}><Image className="p-1" onClick={() => setVisited(col.name)} src={col.url} width="100%"/></Col>
                                    )
                                    
                                })
                            }
                        </Row>
                    )
                    
                })
            }
            </>
        )
    }

    return (
        <>
        <BrowserView>
            {renderBrowserView()}
        </BrowserView>
        <MobileView>
            {renderMobileView()}
        </MobileView>
        
        

        </>
    )
}