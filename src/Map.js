import NPSMap from './nps.png'
import DeleteIcon from '@mui/icons-material/Delete';

export const Map = () => {
    return (
        <>
            <div style={{ position: "relative" }}>
                <img src={NPSMap} width={"100%"} height={"50%"} style={{position: 'static'}}/>
                {/* <svg viewBox="0 0 100 100" style={{ position: "absolute", top: "0.4%", left: "30%" }}>
                    <DeleteIcon width="5%" />
                </svg>
                <svg viewBox="0 0 100 100" style={{ position: "absolute", top: "23.4%", left: "30%" }}>
                    <DeleteIcon width="5%" />
                </svg> */}
                <svg viewBox="0 0 100 100" style={{ position: "absolute", top: "5%", left: "50%" }}>
                    <DeleteIcon width="5%" />
                </svg>

                <svg viewBox="0 0 100 100" style={{ position: "absolute", top: "10%", left: "5%"}}>
                    <DeleteIcon width="5%" />
                </svg>

            </div>

        </>
    )
}