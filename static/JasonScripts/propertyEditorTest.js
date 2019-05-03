var editor={}


function createPopUp(propertySheet, g) {
	//change this to accompany jsons
    let propertyName = Object.getOwnPropertyNames(propertySheet);
    let propertyValue = Object.values(propertySheet);
    
	//Make Div
	var div = document.createElement('div');
    div.id = "myForm";
    div.class = "form-popup";
    div.style.display = 'none';
    div.style.position = 'fixed';
    div.style.bottom = '0';
    div.style.right = "15px";
    div.style.border = "3px solid #f1f1f1";
    div.style.zIndex = "9";

	//make Form box
    var form = document.createElement("form");
    form.action = "/action_page.php";
    form.class = "form-container";
    form.style.maxWidth = "300px";
    form.style.padding = "10px";
    form.style.background = "white";


	//for loop to create input
    for (let i = 0; i < propertyName.length; i++) {
        // For loop for label
        if(typeof propertySheet[propertyName[i]] !== 'function')
        {
          var label = document.createElement("Label");
          //question name
		  label.for = "email"
          label.innerHTML = propertyName[i];
          form.appendChild(label);
		  
		  //input type
          var input = document.createElement("input");
          input.placeholder = propertyValue[i];
          input.name = propertyName[i];
          input.id = propertyName[i];
          input.style.width = "100%";
          input.style.padding = "15px";
          input.style.margin = "5px 0 22px 0";
          input.style.border = "none";
          input.style.background = "#f1f1f1";
		  
		  
        }
		
        else if(typeof propertySheet[propertyName[i]] === 'function')
        {
          let setName = propertySheet[propertyName[i]];
          //when inputted, redraws
		  input.oninput = function()
          {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            //setterfunction propertySheet[propertyName[i]]
			//soething.setter(input.value?
			//it just knows
			propertySheet[propertyName[i]](input.value)
            g.draw();
          }
		  
		  
          form.appendChild(input);
        }
    }
	
	
	//submit buttons
    var submit = document.createElement("button");
    submit.type = "button";
    submit.class = "btn btn-danger";
    submit.innerHTML = "&check; Update";
    form.appendChild(submit);
    submit.style.backgroundColor = "#4CAF50";
    submit.style.color = "white";
    submit.style.padding = "16px 20px";
    submit.style.border = "none";
    submit.style.cursor = "poiner";
    submit.style.width = "100%";
    submit.style.marginBottom = "10px";
    submit.style.opacity = "0.8";
    submit.onclick = function () {
    closeForm();
    g.draw();
    }

    var close = document.createElement('button');
    close.type = "button";
    close.class = "btn cancel";
    close.innerHTML = "&#120; Cancel";
    close.style.backgroundColor = "#ff0000";
    close.style.color = "white";
    close.style.padding = "16px 20px";
    close.style.border = "none";
    close.style.cursor = "poiner";
    close.style.width = "100%";
    close.style.marginBottom = "10px";
    close.style.opacity = "0.8";
    close.onclick = function () {
      g.draw();
        closeForm();
    }
    form.appendChild(close);
    div.appendChild(form);
    document.body.insertBefore(div, canvas);
}
