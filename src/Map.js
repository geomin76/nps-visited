import NPSMap from './nps.png'
import DeleteIcon from '@mui/icons-material/Delete';

export const Map = () => {
    return (
        <>
            <div style={{display: "inline-block", position: "relative"}}>
                <img src={NPSMap} width={"100%"} height={"50%"} />
                <svg viewBox="0 0 100 100" style={{position: "absolute", top: "13.4%", left: "40%"}}>
                    <DeleteIcon width="5%" />
                </svg>
                <svg viewBox="0 0 100 100" style={{position: "absolute", top: "13.4%", left: "50%"}}>
                    <DeleteIcon width="5%" />
                </svg>
                <svg viewBox="0 0 100 100" style={{position: "absolute", top: "20.4%", left: "30%"}}>
                    <DeleteIcon width="5%" />
                </svg>
            </div>

        </>
    )
}