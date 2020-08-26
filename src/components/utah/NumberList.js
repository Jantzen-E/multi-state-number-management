import React, { useState, useEffect } from 'react';
import NumberForm from './NumberForm';
import fireDb from '../../utilUtah/firebase.js';

const NumberList = () => {

    var {personObjects, setPersonObjects} = useState()
    var [currentId, setCurrentId] = useState('');

    useEffect(() => {
        fireDb.child('Utah').on('value', snapshot => {
            if (snapshot.val() != null) {
                setPersonObjects({...snapshot.val()})
            }
            else {
                setPersonObjects({})
            }
        })
    }, [])

    const addEntry = obj => {
        if(currentId == '') {
            fireDb.child('Utah').push(
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
            fireDb.child(`Utah/${currentId}`).set(
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

    const onDelete = key => {
        if(window.confirm('Are you sure you want to permanently delete this?')) {
            fireDb.child(`Utah/${key}`).remove(
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
        <div>
            <h1>Number Management</h1>
            <div className="container">
                <div>
                    <NumberForm {...({ addEntry, currentId, personObjects })} />
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Buttons</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(personObjects).map(id => {
                                    return <tr key={id}>
                                        <td>{personObjects[id].name}</td>
                                        <td>{personObjects[id].phoneNumber}</td>
                                        <td>{personObjects[id].address}</td>
                                        <td><button>Edit</button> <button>Delete</button></td>
                                    </tr>
                                })
                            }
                            {/* <tr><button onClick= {() => {setCurrentId(id)}}>Edit</button><button onClick={() => { onDelete(id) }}>Delete</button></tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default NumberList;