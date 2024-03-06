import PlantCards from "../../components/MyPlants/PlantCards"
import AddPlant from "../../components/MyPlants/AddPlant"
import 'bootstrap/dist/css/bootstrap.min.css';



export const Index = () => {
    return (<div style={{maxWidth: "70rem", marginLeft: "auto", marginRight: "auto", marginTop: "200px"}}>
        <PlantCards />
        <AddPlant user_plants={['1']} style={{marginLeft: "100px"}} />
        </div>);
    };