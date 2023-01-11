import NPSMap from './nps.png'

export const Map = () => {
    return (
        <>
            <div style={{display: "inline-block", position: "relative"}}>
                <img src={NPSMap} width={"100%"} height={"100%"} />
                <svg viewBox="0 0 200 200" style={{position: "absolute", top: "20%", left: "50.5%"}}>
                    <circle cx="10" cy="10" r="10" fill="rebeccapurple" />
                </svg>
                <svg viewBox="0 0 200 200" style={{position: "absolute", top: "20%", left: "40%"}}>
                    <circle cx="10" cy="10" r="5" fill="rebeccapurple" />
                </svg>
                <svg viewBox="0 0 200 200" style={{position: "absolute", top: "50.52%", left: "50.2%"}}>
                    <circle cx="10" cy="10" r="5" fill="rebeccapurple" />
                </svg>
            </div>

        </>
    )
}