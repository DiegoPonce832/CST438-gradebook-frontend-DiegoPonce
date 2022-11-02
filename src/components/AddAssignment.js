// import React from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link } from 'react-router-dom'
// import Cookies from 'js-cookie';
// import Button from '@mui/material/Button';
// import Radio from '@mui/material/Radio';
// import {DataGrid} from '@mui/x-data-grid';
// import {SERVER_URL} from '../constants.js'
// import TextField from '@mui/material/TextField';
// import PropTypes from 'prop-types';

// // NOTE:  for OAuth security, http request must have
// //   credentials: 'include' 
// //

// class AddAssignment extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {open: false, assignment: { }};
//     };
 
// //    componentDidMount() {
// //     this.fetchAssignments();
// //   }
//   handleClickOpen = () => {
//     this.setState( {open:true} );
//   };
//   handleClose = () => {
//     this.setState( {open:false} );
//   };
//   handleChange = (event) => {
//     this.setState({assignment:{assignmentId: event.target.value}})
//   }
 
//   // Add course
//   addAssignment = (assignment) => {
//     const token = Cookies.get('XSRF-TOKEN');
//     fetch(`${SERVER_URL}/schedule`,
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json',
//                    'X-XSRF-TOKEN': token  },
//         body: JSON.stringify(assignment)
//       })
//     .then(res => {
//         if (res.ok) {
//           toast.success("Assignment successfully added", {
//               position: toast.POSITION.BOTTOM_LEFT
//           });
//           this.fetchCourses();
//         } else {
//           toast.error("Error when adding", {
//               position: toast.POSITION.BOTTOM_LEFT
//           });
//           console.error('Post http status =' + res.status);
//         }})
//     .catch(err => {
//       toast.error("Error when adding", {
//             position: toast.POSITION.BOTTOM_LEFT
//         });
//         console.error(err);
//     })
//   }
  
//    onRadioClick = (event) => {
//     console.log("Assignment.onRadioClick " + event.target.value);
//     this.setState({selected: event.target.value});
//   }

//   handleAdd = () => {
//     this.props.addAssignment(this.state.assignment);
//     this.handleClose();
//   }
  
//   render() {
//     //  const columns = [
//     //   {
//     //     field: 'assignmentName',
//     //     headerName: 'Assignment',
//     //     width: 400,
//     //     renderCell: (params) => (
//     //       <div>
//     //       <Radio
//     //         checked={params.row.id == this.state.selected}
//     //         onChange={this.onRadioClick}
//     //         value={params.row.id}
//     //         color="default"
//     //         size="small"
//     //       />
//     //       {params.value}
//     //       </div>
//     //     )
//     //   },
//     //   { field: 'courseTitle', headerName: 'Course', width: 300 },
//     //   { field: 'dueDate', headerName: 'Due Date', width: 200 }
//     //   ];
      
//     //   const assignmentSelected = this.state.assignments[this.state.selected];
//       return (
//         <div>
//           <div align="center" >
//             <h4>Add assignment</h4>
//             <br/>
//             <TextField size="small" autoFocus style = {{width:200}} label="Assignment Name" name="name" 
//              onChange={this.handleChange} value={this.state.attempt} /> 
//             <br/>
//             <br/>
//             <TextField size="small" autoFocus style = {{width:200}} label="Due Date" name="date" 
//                 onChange={this.handleChange} value={this.state.attempt} /> 
//             <br/>
//             <br/>
//             <TextField size="small" autoFocus style = {{width:200}} label="Course" name="course" 
//                 onChange={this.handleChange} value={this.state.attempt} /> 
//             <br/>
//             <br/>
//             <Button variant="outlined" color="primary" style={{margin: 10}}
//                 onClick={this.handleAdd} >Add Assignment</Button>

//           </div>  
//         </div>
//       )
//   }
// }  

// // AddAssignment.propTypes = {
// //     addAssignment : PropTypes.func.isRequired
// //   }

// export default AddAssignment;

import * as React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state={open: false, course:{ } };
  }
  
  componentDidMount() {
    this.fetchAssignments();
  }
  
  fetchAssignments = () => {
    console.log("Assignment.fetchAssignments");
    const token = Cookies.get('XSRF-TOKEN');
    fetch(`${SERVER_URL}/gradebook`, 
      {  
        method: 'GET', 
        headers: { 'X-XSRF-TOKEN': token }
      } )
    .then((response) => response.json()) 
    .then((responseData) => { 
      if (Array.isArray(responseData.assignments)) {
        //  add to each assignment an "id"  This is required by DataGrid  "id" is the row index in the data grid table 
        this.setState({ assignments: responseData.assignments.map((assignment, index) => ( { id: index, ...assignment } )) });
      } else {
        toast.error("Fetch failed.", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }        
    })
    .catch(err => console.error(err)); 
  }

  handleSubmit = () => {
    let Name = document.getElementById('name').value
    let Date = document.getElementById('date').value
    var num=25; 
    
    fetch(`http://localhost:8081/add?id=${num}&name=${Name}&dueDate=${Date}`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        due_date: this.state.due_date,
        title: this.state.course.title,    
      })
    })
      .then(response => response.json() )
      .catch(err => console.error(err))

      num++; 
  }
 
  
  handleChange = (event) =>  {
     this.setState({[event.target.name]: event.target.value});
  }
  
  render() {
    const { name, due_date, course } = this.state;
    return (
      <div>
        <h1>AddAssignment </h1>
        <TextField autoFocus style = {{width:200}} 
             label="Assignment Name" name="Name" 
             onChange={this.handleChange}  value={this.state.name} id="name" /> 
        <br/> <br/>
        <TextField style = {{width:200}} label="Due Date" name="DueDate" 
             onChange={this.handleChange}  value={this.state.due_date}  id = "date"/> 
        <br/> <br/>
        <TextField style = {{width:200}} label="Course" name="course" 
             onChange={this.handleChange}  value={this.state.course.title} /> 
        <br/> <br/>
        <Button variant="outlined" color="primary"  id= "addId" style={{margin: 10}}
             onClick={this.handleSubmit} >Submit</Button>
      </div>
      ); 
  }
}
export default AddAssignment; 
