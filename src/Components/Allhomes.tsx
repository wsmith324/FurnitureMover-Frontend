import { useContext, useEffect, useState } from "react";
import Home from "../Models/Home";
import FM_API from "../Utils/APIConfig";
import LoadingPage from "../Utils/LoadingPage";
import { useNavigate } from "react-router-dom";
import '../Css/Allhomes.css'

const Allhomes = () => {

    const [newName, setNewName] = useState('')
    const [newSize, setNewSize] = useState('')
    const [homeList, setHomeList] = useState<Home[] | null>(null);
    const navigate = useNavigate()
    const [item, setItem] = useState('')

    useEffect(() => {
        getHomeList();
    }, []);

    async function getHomeList() {
        await FM_API.get('/home/viewhomes'
        ).then((response) => {
            setHomeList(response.data);
        })
    }

    async function viewHome() {
        navigate('/viewhome')
        window.location.reload()
    }

    async function addHome(e: any) {
        e.preventDefault()
        await FM_API.post('/home/createhome', {
            "name" : newName,
            "size" : newSize
        })
        window.location.reload()
    }
    
    async function itemQuantity(i: any) {
        i.preventDefault()
        await FM_API.get('/furniture/itemquantity', 
            {headers : {'item': item}}
        ).then((response) => {
            alert('This item appears ' + response.data + ' times in the system!')
        })
    }

    return (
        <>
        <h3 className="houselisttitle">All Homes</h3>
        {homeList ?
            <div className="houselist">
            {homeList.map((r) => (
                    <div className="housebox">
                        <h3 className="text-2xl"><strong>{r.name}</strong></h3>
                        <h3 className="pt-10">{r.size} square feet</h3>
                        <button className="viewHome" onClick={()=>{
                            sessionStorage.setItem('homeId', r.id)
                            sessionStorage.setItem('homeName', r.name)
                            sessionStorage.setItem('homeSize', r.size.toString())
                            viewHome()
                        }}>View Home</button>
                    </div>
             ))}
            </div>
            
            : <LoadingPage />}
            <form onSubmit={(e) => addHome(e)} className="addhome">
                <h3 className="submitmessage">Submit Your Home!</h3>
                    <textarea className="addhometext" placeholder="Home Name" value={newName} onChange={(e) => setNewName(e.target.value)} required></textarea>
                    <textarea className="addhomesize" placeholder="Size of Home" value={newSize} onChange={(e) => setNewSize(e.target.value)} required></textarea>
                    <button className="submithome">Add Home</button>
            </form>
            <form onSubmit={(i) => itemQuantity(i)} className="itemquantity">
                <h3 className="quantmessage">Check Frequency Of Item</h3>
                    <textarea className="itemname" placeholder="Item" value={item} onChange={(i) => setItem(i.target.value)} required></textarea>
                    <div><button className="submititem">Check Item</button></div>
            </form>
        </>
    )
}

export default Allhomes