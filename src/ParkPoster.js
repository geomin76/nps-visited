import 'bootstrap/dist/css/bootstrap.min.css';
import img from "./crater-lake-national-park_250x.jpg";
import './Poster.css'
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

    const renderView = () => {
        const rows = _.chunk(data, 7);
        return (
            <div className="poster">
                {
                    rows.map((row, index1) => {
                        return (
                            <div className="inner">
                                {
                                    row.map((col, index2) => {
                                        return (
                                            <div onClick={() => setVisited(col.name)}><img className="posterImage" style={{ filter: col.visited ? "" : "grayscale(100%)" }}  src={img}/></div>
                                        )
                                        
                                    })
                                }
                            </div>
                        )
                    })
                } 
            </div>
        )
    }

    return (
        <>
            {renderView()}
        </>
    )
}