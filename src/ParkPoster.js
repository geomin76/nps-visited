import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Image } from 'react-bootstrap';
import img from "./crater-lake-national-park_250x.jpg";
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
        setData(newData);
        console.log(`${data[index].name} : ${data[index].visited}`)
    }

    const renderBrowserView = () => {
        const rows = _.chunk(data, 7);
        return (
            <>
            {
                rows.map((row, index1) => {
                    return (
                        <Row>
                            {
                                row.map((col, index2) => {
                                    return (
                                        <Col xl lg md sm xs><div onClick={() => setVisited(col.name)}><Image className="p-1" style={{ filter: col.visited ? "" : "grayscale(100%)" }}  src={img} width="100%"/></div></Col>
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
            {renderBrowserView()}
        </>
    )
}