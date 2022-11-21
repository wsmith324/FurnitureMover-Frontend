import Furniture from "../Models/Furniture";
import { useContext, useEffect, useState } from "react";
import FM_API from "../Utils/APIConfig";
import LoadingPage from "../Utils/LoadingPage";
import { useActionData } from "react-router-dom";
import '../Css/Home.css'
import { useNavigate } from "react-router-dom";

const Home = () => {

    const homeId = window.sessionStorage.getItem('homeId')
    const homeName = window.sessionStorage.getItem('homeName')
    const homeSize = Number(window.sessionStorage.getItem('homeSize'))
    const [furnitureList, setFurnitureList] = useState<Furniture[] | null>(null);
    const [fName, setFName] = useState('')
    const [fSize, setFSize] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        getFurnitureList(String(homeId));
    }, [])

    async function getFurnitureList(homeId: string) {
        await FM_API.get('/furniture/viewfurniture',
        {headers : {'home_id': homeId}}
        ).then((response) => {
            setFurnitureList(response.data);
        })
    }

    async function addFurniture(f: any, homeId: string) {
        await FM_API.post('/furniture/addfurniture',
        {
            "name" : fName,
            "size" : fSize
        },
        {headers : {'home_id' : homeId}}
        ).then((response) => {
        }).catch((error) => alert(error.message));
        
    }

    async function goBack() {
        navigate('/allhomes')
        window.location.reload()
    }

    return (
        <>
        <h3 className="homeName">{homeName}</h3>
        <h3 className="homeSize">{homeSize} square feet</h3>
            {furnitureList ?
                <div className="furnlist">
                {furnitureList.map((r) => (
                        <div className="furnbox">
                            <h3 className="text-2xl"><strong>{r.name}</strong></h3>
                            <h3 className="pt-10">{r.size} square feet</h3>
                        </div>
                ))}
                </div>
                : <LoadingPage />}
                <form onSubmit={(f) => addFurniture(f, String(homeId))} className="addfurniture">
                <h3 className="addfurnmessage">Add Furniture</h3>    
                    <textarea className="addfurnituretext" placeholder="Furniture Name" value={fName} onChange={(f) => setFName(f.target.value)} required></textarea>
                    <textarea className="addfurnituresize" placeholder="Size of Furniture" value={fSize} onChange={(f) => setFSize(f.target.value)} required></textarea>
                    <button className="submitfurniture">Add Furniture</button>
                </form>
                <div className="goBack"> 
                    <button className="gobackbutton" onClick={()=>goBack()}>Go Back</button>
                </div>
        </>
    )
}

export default Home