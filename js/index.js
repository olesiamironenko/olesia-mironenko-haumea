document.body.appendChild(document.createElement("footer"));

const today = new Date();
console.log(today);

let thisYear = today.getFullYear();
console.log(thisYear);

const footer = document.querySelector("footer");
console.log(footer);

const copyright = document.createElement("p");
console.log(copyright);

footer.append(copyright);

copyright.innerHTML = "&copy; Olesia Mironenko " + thisYear;

let skills = ["HTML", "SQL", "CSS", "JavaScript", "Git"];
let skillSection = document.getElementById("Skills");
console.log(skillSection);
console.log(skills);

let skillList = skillSection.querySelector("ul");
console.log(skillList);


for (const skill of skills) {
    const skillListItem = document.createElement("li");
    skillListItem.innerHTML = skill;
    skillList.append(skillListItem);
}
console.log(skillList);

let messageForm = document.querySelector('[name="leave_message"]');
console.log(messageForm);

messageForm.addEventListener("submit", event => {
    event.preventDefault()
    
    let usersName = event.target.usersName.value;
    let usersEmail = event.target.usersEmail.value;
    let usersMessage = event.target.usersMessage.value;

    console.log(usersName);
    console.log(usersEmail);
    console.log(usersMessage);

    let messageSection = document.getElementById("messages");
    
    let messageList = messageSection.querySelector("ul");
    console.log(messageList);
 
    let newMessage = document.createElement("li");
    newMessage.innerHTML = `<a href="mailto:${usersEmail}">${usersName} </a><span>wrote: ${usersMessage}</span>`;
    
    let removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    removeButton.type = "button";
    console.log(removeButton);

    removeButton.addEventListener("click", () => {
        let entry = removeButton.parentNode;
        entry.remove();
    })

    let editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.type = "button";
    console.log(editButton);

    editButton.addEventListener("click", () => {
        
        let newTextInput = document.createElement("input");
        newTextInput.type = "text";
        newTextInput.value = usersName;
        
        let newEmailInput = document.createElement("input");
        newEmailInput.type = "email";
        newEmailInput.value = usersEmail;

        let newTextarea = document.createElement("textarea");
        newTextarea.value = usersMessage;

        let editForm = document.createElement("form");
        editForm.method = "post";

        let saveButton = document.createElement("button");
        saveButton.innerHTML = "Save";
        saveButton.type = "submit";
        console.log(saveButton);

        editForm.appendChild(newTextInput);
        editForm.appendChild(newEmailInput);
        editForm.appendChild(newTextarea);
        editForm.appendChild(saveButton);
        console.log(editForm);

        newMessage.innerHTML = "";
        newMessage.appendChild(editForm);

        editForm.addEventListener("submit", (event) => {

            event.preventDefault();

            let newUsersName = document.createElement("input");
            newTextInput.type = "text";
            newUsersName.textContent = newTextInput.value;

            let newUsersEmail = document.createElement("input");
            newUsersEmail.type = "email";
            newUsersEmail.textContent = newEmailInput.value;
            
            let newUsersMessage = document.createElement("textarea");
            newUsersMessage.textContent = newTextarea.value;

            console.log(newUsersName);
            console.log(newUsersEmail);
            console.log(newUsersMessage);
 
            newMessage.innerHTML = `<a href="mailto:${newUsersEmail.textContent}">${newUsersName.textContent} </a><span>wrote: ${newUsersMessage.textContent}</span>`;

            newMessage.appendChild(editButton);
            newMessage.appendChild(removeButton);
        })

    })  

    newMessage.appendChild(editButton);
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    messageForm.reset();
        
})

const userName = "olesiamironenko";
fetch(`https://api.github.com/users/${userName}/repos`, {
    method: 'GET'
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return response.text(); 
  })
  .then(data => {
    const repositories = JSON.parse(data);
    console.log(repositories); 
    console.log(repositories.length);

    const projectSection = document.getElementById("Projects");
    const projectList = document.createElement("ul");
    projectSection.appendChild(projectList);
    console.log(projectList);

    // Q1: is array 'for of' iteration more effitient than iterationn by array index?
    // Q2: is '.' notation more effitient than bracket notation?

    // 'for of' loop solution for creating the list of projects;
    // 
    // for(let repository of repositories) {
    //     const project = document.createElement("li");
    //     project.innerHTML = repository["name"];
    //     projectList.appendChild(project);
    // }


    // iterationn by array index solution for creating the list of projects;
    // 
    for(let i = 0; i < repositories.length; i++) {
        const repoName = repositories[i]["name"];
        console.log(repoName);
        const project = document.createElement("li");
        project.innerHTML = `${repoName}`;
        projectList.appendChild(project);
    }

  })

  .catch(error => {
    console.error('An error occurred:', error);
  });

  

  