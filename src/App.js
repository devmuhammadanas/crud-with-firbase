import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import { addDoc, collection, deleteDoc, doc,setDoc, updateDoc } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { async } from '@firebase/util';

import { useState, useEffect } from 'react';


import db from './FireBase-Config'

function App() {

  const data = collection(db, 'users')

  useEffect( () => {

    const mirza = async () => {
      const get_data = await getDocs(data)
      setAllusers(get_data.docs.map( (v) => ({...v.data(),id: v.id})))
    }
    mirza()

    
  }, [])
  
  
  
  const [name, setName] = useState('')
  const [lName, setLName] = useState('')
  const [age, setAge] = useState('')
  const [flag, setFlag] = useState(true)
  const [updateid, setUpdateId] = useState(0)
  const [d,setD] =useState('')
  const uuid = new Date().getTime().toString()

  const usersData = {
    name,
    lName,
    age,
    uid: new Date().getTime().toString(),
  }
  const [allusers, setAllusers] = useState([])
  console.log(allusers)


  const addData = async () => {

      await setDoc(doc(db, 'users', uuid),usersData)

    setAllusers([...allusers, usersData])

    setName('')
    setLName('')
    setAge('')
  }

  const deleteData = async (id) => {
    console.log(id)

    await deleteDoc(doc(db, "users", id))

    console.log(uuid)

    const deleteUse = allusers.filter((v) => v.id !== id)
    setAllusers(deleteUse)
      

  }
  const updateData = async (v,id) => {

    setName(v.name)
    setLName(v.lName)
    setAge(v.age)
    setFlag(false)
    setUpdateId(id)
    console.log(id)


  }
  const upDateMe = async () => {

    console.log(updateid)
     
    const washingtonRef = doc(db, "users", updateid);
    await updateDoc(washingtonRef,usersData)
      
    const userUpDate = allusers.map((v) => {
      if (updateid === v.id) {
        return (
          ({...usersData,id:updateid})
        )
      }
      else {
        return (
          v
        )
      }
    })
    setAllusers(userUpDate)
    setFlag(true)
    
  }
  console.log(allusers)





  return (
    <div>
      <div className="container">
        <h1>projeck with Firebase</h1>
        <input className='mt-4' onChange={(e) => setName(e.target.value)} value={usersData.name} type="text" name="name" id="" placeholder='type you First name' /><br />
        <input className='mt-4' onChange={(e) => setLName(e.target.value)} value={usersData.lName} type="text" name="lname" id="" placeholder='type your Last name' /><br />
        <input className='mt-4' onChange={(e) => setAge(e.target.value)} value={usersData.age} type="number" name="age" id="" placeholder='Type you age' /><br />
        {
          flag ? <button className='btn btn-info mt-4' onClick={addData}>submit</button>
            :
            <button className="btn btn-info mt-4" onClick={upDateMe}>UpDate Me</button>
        }
      </div>
      <br />
      <br />
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Age</th>
          </tr>
        </thead>
        <tbody>
          {
            allusers.map((v, i) => {
              return (
                <tr>

                  <td>{i + 1}</td>
                  <td>{v.name}</td>
                  <td>{v.lName}</td>
                  <td>{v.age}</td>
                  <button className='btn btn-info m-1' onClick={() => deleteData(v.id)}>Delete</button>
                  <button className="btn btn-info" onClick={() => updateData(v , v.id)}>UpDate</button>

                </tr>
              )
            })
          }
        </tbody>
      </table>


    </div>
  )
}

export default App