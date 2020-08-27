import React, { useState, useEffect } from 'react';
import NumberForm from './NumberForm';
import fireDb from '../../utilUtah/firebase.js';
import fireDb2 from '../../utilOhio/firebase.js'

const NumberList = () => {

    var [personObjects, setPersonObjects] = useState('')
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
        if(currentId === '') {
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

    const copyEntry = key => {
        fireDb2.child(`Ohio/${key}`).push(

        )
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
        <div className="utahLists">
            <div className="container">
                <div>
                <select>
                    <option>Utah</option>
                    <option disabled>Nevada</option>
                    <option disabled>Montana</option>
                    <option disabled>Idaho</option>
                    <option disabled>Arizona</option>
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
                                        <tr><button onClick= {() => {setCurrentId(id)}}>Edit</button><button onClick={() => { onDelete(id) }}>Delete</button><button onClick={ copyEntry(id) }>Copy to Ohio</button></tr>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <NumberForm {...({ addEntry, currentId, personObjects })} />
                </div>
            </div>
        </div>
    );
}

export default NumberList;