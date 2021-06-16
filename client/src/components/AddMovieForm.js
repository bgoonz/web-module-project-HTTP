//TECH IMPORTS
import React, { useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import axios from "axios";


//BEGIN FUNCTIONAL COMPONENT 
const AddMovieForm = (props) => {


//SLICES OF STATE, PROPS, HOOKS 

    const { setMovies }=props;

    const history=useHistory();
    const params=useParams();

const initialMovieToBeAdded = {
    title:"",
    director: "",
    genre: "",
    metascore: 0,
    description: ""
}

const [addMovieFormValues, setAddMovieFormValues] = useState(initialMovieToBeAdded);

//HANDLES CHANGES TO ADD MOVIE FORM

const handleAddMovieFormChanges = (event)=>{
    const { name, value, checked, type }=event.target;

    const valueToUse= type === "checkbox" ? checked : value

    setAddMovieFormValues({
        ...addMovieFormValues, [name]: valueToUse
    })
}

//HANDLES SUBMISSION OF ADDED MOVIE

const handleAddMovieSubmit = (event)=>{
    event.preventDefault();
    axios.post(`http://localhost:5000/api/movies`, addMovieFormValues)
    .then((res)=>{
        console.log("SUCCESSFULLY ADDED MOVIE", res);
        setMovies(res.data);
        history.push("/movies");
    })
    .catch((err)=>{
        console.log("FAILED TO POST ADDED MOVIE", err);
    })
}

//BEGIN FUNCTIONAL COMPONENT RETURN 
    return (
        <div className="col">
		<div className="modal-content">
			<form onSubmit={handleAddMovieSubmit}>
				<div className="modal-header">						
					<h4 className="modal-title">Add A Movie</h4>
				</div>
				<div className="modal-body">					
					<div className="form-group">
						<label>Title</label>
						<input value={addMovieFormValues.title} onChange={handleAddMovieFormChanges} name="title" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Director</label>
						<input value={addMovieFormValues.director} onChange={handleAddMovieFormChanges} name="director" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input value={addMovieFormValues.genre} onChange={handleAddMovieFormChanges} name="genre" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Metascore</label>
						<input value={addMovieFormValues.metascore} onChange={handleAddMovieFormChanges} name="metascore" type="number" className="form-control"/>
					</div>		
					<div className="form-group">
						<label>Description</label>
						<textarea value={addMovieFormValues.description} onChange={handleAddMovieFormChanges} name="description" className="form-control"></textarea>
					</div>
									
				</div>
				<div className="modal-footer">			    
					<input type="submit" className="btn btn-info" value="Save"/>
					<Link to={`/movies/1`}><input type="button" className="btn btn-default" value="Cancel"/></Link>
				</div>
			</form>
		</div>
	</div>
    )
}

export default AddMovieForm;