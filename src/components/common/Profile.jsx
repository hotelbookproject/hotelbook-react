import React,{useState} from "react";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
// import '../../css/GuestDashboard.css'
import "../../css/Profile.css";

function Profile({ title, description, name, details }) {
    const [nameField,setNameField] = useState(false);
    const [phoneField,setPhoneField] = useState(false);
    const [changeName,setChangeName] = useState('');
    const [changePhone,setChangePhone] = useState('');
  return (
    <div className="guestDashboard_details">
      <h3>{title}</h3>
      <h5>{description}</h5>
      <div className="guestDashboard_details_contents">
        <div className="item">
          <p>
            Name : <span className="contents">{details.name}</span>
          </p>{" "}
          <EditIcon onClick={e => setNameField(true)} className="edit_Icon" />
        </div>
       {nameField && <div className="hidden_Item">
          <TextField id="outlined-basic" label="Enter Name Here" variant="outlined" onChange={ e => setChangeName(e.target.value)} />
          <div className="hidden_Item_Button">
          <Button variant="contained" color="primary" size="small" startIcon={<SaveIcon />}>Save</Button>
          </div>
        </div> } 
        <div className="item">
          <p>
            Phone : <span className="contents">{details.phone}</span>
          </p>{" "}
          <EditIcon onClick={ e => setPhoneField(true)} className="edit_Icon" />
        </div>
       {phoneField && <div className="hidden_Item">
          <TextField id="outlined-basic" label="Enter Mobile Here" variant="outlined" onChange={ e => setChangePhone(e.target.value)} />
          <div className="hidden_Item_Button">
          <Button variant="contained" color="primary" size="small" startIcon={<SaveIcon />}>Save</Button>
          </div>
        </div> } 
        <div className="item">
          <p>
            Email : <span className="contents">{details.email}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;