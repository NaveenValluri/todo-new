import React from 'react';

const MyCustomTaskInfoPanelItem = (props) => { 
		console.log("PROOooooOOOOOOOOOOOOPS", props.task);
		const {task} = props;
        return (
         <div>
             <br />
             <hr />
             <h3>More info about the call:</h3>
             <ul>
               <li><b>Intent:</b> {task.attributes.intent || ""}</li>
               <li><b>User speech transcript:</b> {task.attributes.user_called_for || ""}</li>
               <li><b>State:</b> {task.attributes.caller_state || ""}</li>
               <li><b>Wait time in Queue:</b> {task.age || "0"} seconds</li>
               <li><b>Played default message:</b> {task.attributes.played_default || "No"}</li>
             </ul>
         </div>
)};

export default MyCustomTaskInfoPanelItem;