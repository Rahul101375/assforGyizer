import React,{useState} from "react";
import List from "./component/List";
import Alert from "./component/Alert";



export default function App(){
  const [name,setName]=useState('');
  const [list,setList]=useState([]);
  const [isEditing,setIsEditing]=useState(false);
  const [editId,setEditId]=useState(null);
  const [alert,setAlert]=useState({show:false,type:"",msg:""})
  

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!name){
      showAlert(true,"danger","please enter value")
    }
    else if(name && isEditing){
      setList(
        list.map((item)=>{
          if(item.id===editId){
            return {...item,title:name}
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true,"success","value changes")
    }
    else{
      showAlert(true,"success","Item Added to the list");
      const newItem={id:new Date().getTime().toString(),title:name}
      setList([...list,newItem]);
      setName("");
    }
  }

  const showAlert=(show=false,type="",msg="")=>{
    setAlert({show,type,msg})
  }
  const removeItem=(id)=>{
    showAlert(true,"danger","Item Remove")
    setList(list.filter((item)=>item.id!==id))
  }
  const editItem=(id)=>{
    const editItem=list.find((item)=>item.id===id)
    setIsEditing(true);
    setEditId(id);
    setName(editItem.title)
  }
  const clearList=()=>{
    showAlert(true,"danger","Empty List");
    setList([]);
  }

  return(
    <section className="section-center">
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3 style={{marginBottm:"1.5rem",textAlign:"center"}}>
          Todo List
        </h3>
        <div className="mb-3 form">
          <input
          type="text"
          className="form-control"
          placeholder="e.g. Bread"
          onChange={(e)=>setName(e.target.value)}
          value={name}
          />
          <button type="submit" className="btn btn-success">{isEditing?"Edit":"Submit"}</button>
        </div>
      </form>
      {list?.length>0 &&(
        <div style={{marginTop:"2rem"}}>
          <List items={list} removeItem={removeItem} editItem={editItem} ></List>
          <button className="btn btn-warning" onClick={clearList}>Clear Items</button>
        </div>
      )}
    </section>
  )
}