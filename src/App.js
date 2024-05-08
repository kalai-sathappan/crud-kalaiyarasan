
import './App.css'; 
import {useEffect} from 'react';  
import {useState} from "react";
import Axios from "axios"; 

function App() {  

  const [users,setUsers] = useState([]); 

  const [id,setId]=useState(""); 

  const [name,setName] = useState("");  

  const [score,setScore] = useState("");

  const [update,setUpdated] = useState({id:'',name:'',score:''}); 

  const [ma,setMax] = useState([]); 

  const [addt,setAdd] = useState("");
   
  //to fetch data amde by request
  useEffect(()=>{ 
    load()
  },[]); 
 
// api reqest and store data
  const load = async() =>{ 
    const res=await Axios.get("http://localhost:3005/users"); 
    console.log(res.data); 
    setUsers(res.data);
  } 

  //add user
  const addUser = (e) => { 
    e.preventDefault(); 
    Axios.post("http://localhost:3005/users",{ 
      id,name,score
    }).then(()=> {
      setId("");
      setName(""); 
      setScore("");
    }).catch((err) => { 
      console.log(err);
    }) 

    //to update page use timeout
   setTimeout(()=>{load()},100);
  } 

  const deleteUser = (id) => { 
   Axios.delete(`http://localhost:3005/users/${id}`).catch((err)=>console.log(err)); 

   setTimeout(() => {
    load()
   }, 100);
  }  

  const updateUser = () => {
  Axios.put(`http://localhost:3005/users/${update.id}`, {
    id: update.id,
    name: update.name,
    score: update.score
  })
  .then((res) => { 
    console.log(res);
    setUpdated(({  id:'', name:'', score:'' })); // Update state based on previous state
  })
  .catch((e) => {
    console.log(e);
  });

  setTimeout(() => {
    load();
  }, 100);
}

function max(){
  const great =users.map((e)=>e.score*2);  
  setMax(great);
}   
 
function add(){ 
  const great =users.map((e)=>e.score*2);  
const sum = great.reduce(function(acc,curr){ 
    acc = acc + curr; 
    return acc;
},0);  
setAdd(sum); 
console.log(sum);
}


function checkId(event){ 
  const inputValue = event.target.value;
  
  // Check if the entered ID already exists in the users state
  const idExists = users.some(user => user.id === inputValue);

  if (idExists) { 
    console.log(idExists)
    alert('ID already exists');
  } else {
    // If ID doesn't exist, update the state with the new ID
    setId(inputValue);
  }
}





  

    

  return (
    <div className="App">
          
          <input placeholder='id' value={id} onChange={(e)=>checkId(e)}/>
          <input placeholder='name' value={name} onChange={e => setName(e.target.value)}/> 
          <input placeholder='score' value={score} onChange={e=> setScore(e.target.value)}/>   

          <button onClick={addUser}>add</button>

            {users.map(e =>( 
            <div key={e.id}> 
            {e.id} {e.name} {e.score} <button onClick={()=>deleteUser(e.id)}>delete</button> 
            <input type="text" placeholder="enter id" onChange={e=>setUpdated({...update,id:e.target.value}) }/>
            <input type="text" placeholder="enter name" onChange={e=>setUpdated({...update,name:e.target.value}) }/>  
            <input type="text" placeholder='score' onChange={e=>setUpdated({...update,score:e.target.value})}/>
            <button onClick={()=>updateUser()}>Update</button>
            </div> 
          ) )}   


          <button onClick={()=>max()}>Double Score</button> 
          {ma.map((e, index) => <div key={index}>{e}</div>)}
           <br/><br/>
          <button onClick={()=>add()}>SUM Of Double</button> 
          {addt}

    </div>
  );
}

export default App;
