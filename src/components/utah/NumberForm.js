import React, { useState, useEffect} from 'react';

const NumberForm = (props) => {
    const initialInputValues = {
        number: '',
        name: '',
        address: '',
        active: 'false' 
    }

    var [values, setValues] = useState(initialInputValues)

    useEffect(() => { 
        if(props.currentId === '')
            setValues({
                ...initialInputValues
            })
        else
        setValues({
            ...props.personObjects[props.currentId]
        })
    }, [props.currentId, props.personObjects])

    const handleInputChange = e => {
        var { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.addEntry(values)
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div>
                <h3>Create new entry</h3>
                <input
                    required
                    type="text" 
                    placeholder="name" 
                    name="name" 
                    value={values.name} 
                    onChange={handleInputChange}
                />
                <input
                    required
                    type="text" 
                    placeholder="phone number" 
                    name="number" 
                    value={values.number} 
                    onChange={handleInputChange}
                />
                <input 
                    required
                    type="text" 
                    placeholder="address" 
                    name="address" 
                    value={values.address} 
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit" value={props.currentId == '' ? "Save" : "Update"}>Save new entry</button>
        </form>
    );
}

export default NumberForm;