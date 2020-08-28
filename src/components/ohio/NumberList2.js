import React, { useState, useEffect } from 'react';
import NumberForm2 from './NumberForm2';
import fireDb from '../../utilUtah/firebase.js';
import fireDb2 from '../../utilOhio/firebase.js';

const NumberList2 = () => {

    var [personObjects, setPersonObjects] = useState('');
    var [currentId, setCurrentId] = useState('');

    useEffect(() => {
        fireDb2.child('Ohio').on('value', snapshot => {
            if (snapshot.val() != null) {
                setPersonObjects({...snapshot.val()})
            }
            else {
                setPersonObjects({})
            }
        })
    }, [])

    const addEntry = obj => {
        if(currentId === '') {
            fireDb2.child('Ohio').push(
                obj,
                err => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        setCurrentId('')
                    }
                }
            )
        }
        else {
            fireDb2.child(`Ohio/${currentId}`).set(
                obj,
                err => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        setCurrentId('')
                    }
                }
            )
        }
    }

    // const copyEntry = id => {
    //     fireDb.child('Utah').push({
    //         // name: personObjects[id].name
    //         name: 'Joe',
    //         number: '222',
    //         address: '444',
    //     })
    // }

    const copyEntry = id => {
        fireDb.child('Utah').push({
            // name: personObjects[id].name
        })
    }


    // const copyEntry = obj => {
    //     console.log(personObjects)
    // }

    // const copyEntry = obj => {
        // fireDb.child('Utah').push(
        //     obj,
        //     err => {
        //         if (err) {
        //             console.log(err)
        //         }
        //         else {
        //             setCurrentId('')
        //         }
        //     }
        // )
        // console.log(obj)
    // }
    
    
    // var ref = fireDb2.push().key()
    // var myRef = fireDb2.ref().push();
    // var key = myRef.key();

    // var newData = {
    //     id: key
    // }

    // myRef.push(newData)
    
    
    const onDelete = key => {
        if(window.confirm('Are you sure you want to permanently delete this?')) {
            fireDb2.child(`Ohio/${key}`).remove(
                err => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        setCurrentId('')
                    }
                }
            )
        }
    }

    return(
        <div className="ohioLists">
            <div className="container">
                <div>
                <select>
                    <option>Ohio</option>
                    <option disabled>New York</option>
                    <option disabled>Virginia</option>
                    <option disabled>North Carolina</option>
                    <option disabled>Georgia</option>
                </select>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>What do you want to do?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(personObjects).map(id => {
                                    return <tr key={id}>
                                        <td>{personObjects[id].name}</td>
                                        <td className="number">{personObjects[id].number}</td>
                                        <td>{personObjects[id].address}</td>
                                        <tr><button onClick= {() => {setCurrentId(id)}}>Edit</button><button onClick={() => { onDelete(id) }}>Delete</button><button onClick={copyEntry(id)}>Copy to Utah</button></tr>
                                        {/* <tr><button onClick= {() => {setCurrentId(id)}}>Edit</button><button onClick={() => { onDelete(id) }}>Delete</button><button>Copy to Utah</button></tr> */}
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <NumberForm2 {...({ addEntry, currentId, personObjects })} />
                </div>
            </div>
        </div>
    );
}

export default NumberList2;