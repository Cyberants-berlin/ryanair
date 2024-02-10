import { useParams } from 'react-router-dom';



export default function DetailComponent() {
    const { city } = useParams();
    return (
        <div>
            <h1>Hello in {city}</h1>
        </div>
    );
}