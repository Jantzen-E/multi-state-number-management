// import React, { useState, useEffect} from 'react';

// const NumberForm2 = (props) => {
//     const initialInputValues = {
//         number: '',
//         name: '',
//         address: '',
//         active: 'false'
//     }

//     var [values, setValues] = useState(initialInputValues)

//     useEffect(() => { 
//         if(props.currentId == '')
//             setValues({
//                 ...initialInputValues
//             })
//         else
//         setValues({
//             ...props.personObjects[props.currentId]
//         })
//     }, [props.currentId, props.personObjects])

//     const handleInputChange = e => {
//         var { name, value } = e.target
//         setValues({
//             ...values,
//             [name]: value
//         })
//     }

//     const handleSubmit = e => {
//         e.preventDefault();
//         props.addEntry(values)
//     }

//     return (
//         <form onSubmit={ handleSubmit }>
//             <div>
//                 <input 
//                     type="text" 
//                     placeholder="name" 
//                     name="name" 
//                     value={values.name} 
//                     onChange={handleInputChange}
//                 />
//                 <input 
//                     type="text" 
//                     placeholder="phone number" 
//                     name="phoneNumber" 
//                     value={values.phoneNumber} 
//                     onChange={handleInputChange}
//                 />
//                 <input 
//                     type="text" 
//                     placeholder="address" 
//                     name="address" 
//                     value={values.address} 
//                     onChange={handleInputChange}
//                 />
//             </div>
//             <button type="submit" value={props.currentId == '' ? "Save" : "Update"}>Save entry</button>
//         </form>
//     );
// }

// export default NumberForm2;