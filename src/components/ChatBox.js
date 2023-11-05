import Bubble from "../global/Bubble"
export default function ChatBox(){
    return (
        <div style={{maxHeight:'68vh', overflowY:'auto'}}>
            <Bubble direction='left'/>
            <Bubble direction='right'/>
            <Bubble direction='left'/>
            <Bubble direction='right'/>
            <Bubble direction='left'/>
            <Bubble direction='right'/>
            <Bubble direction='left'/>
            <Bubble direction='right'/>
            <Bubble direction='left'/>
            <Bubble direction='right'/>
            <Bubble direction='left'/>
            <Bubble direction='right'/>
        </div>
    )
}