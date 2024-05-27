// footer 

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

// end footer


// skills

let skills = ["HTML", "SQL", "CSS", "JavaScript", "Git"];
let skillSection = document.getElementById("Skills");
console.log(skillSection);
console.log(skills);

// skills container
let skillList = skillSection.querySelector("ul");
console.log(skillList);

// list of skills
for (const skill of skills) {
    const skillListItem = document.createElement("li");
    skillListItem.innerHTML = skill;
    console.log(skillListItem);
    skillList.appendChild(skillListItem);

}
console.log(skillList);


// message form

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


    // edit form
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

        // saving changes 
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
        // end of saving changes 
    })  

    newMessage.appendChild(editButton);
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    messageForm.reset();

    
})


// fetch projects from github
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
    console.log(JSON.parse(data));
    console.log("repositories: " + repositories); 
    console.log(repositories.length);

    const projectSection = document.getElementById("Projects");
    const projectList = document.createElement("ul");
    projectSection.appendChild(projectList);
    console.log(projectList);

    // iteration by array index solution for creating the list of projects;
    // 
    for(let i = 0; i < repositories.length; i++) {

        // repo name:
        // get repo names:
        const repoName = repositories[i]["name"];
        console.log(repoName);

        // get repo links: 
        const repoLink = repositories[i]["html_url"];
        console.log(repoLink);

        // show repo name:
        const project = document.createElement("li");
        project.innerHTML = repoName;

        project.style.listStyle = "inside";
        project.style.listStyleType = "disc";

        projectList.appendChild(project);

        // date and time repo created
        // get full date created
        const dateCreated = repositories[i]["created_at"];
        console.log(dateCreated);

        const fullDate = new Date(dateCreated);
        console.log("full date: " + fullDate);

        // get month created
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let monthName = months[fullDate.getMonth()];
        console.log("month: " + monthName);

        // get day created
        const day = fullDate.getDate();
        console.log("day: " + day);

        // get year created
        const year = fullDate.getFullYear();
        console.log("year: " + year);

        // get time created
        let hours = fullDate.getHours();
        console.log("hours: " + hours);

        let minutes = fullDate.getMinutes();
        console.log("minutes: " + minutes);

         // check AM or PM
        let timeFormat12H = hours >= 12 ? 'PM' : 'AM';
 
        // convert hour in AM-PM format
        hours = hours % 12;
        // display "0" hours as "12"
        hours = hours ? hours : 12;
        //  display "1" to "9" minutes as "01" to "09"
        minutes = minutes < 10 ? '0' + minutes : minutes;
 
        let fullTime12 = `${hours}:${minutes} ${timeFormat12H}`;
        console.log("time: " + fullTime12);

        // show date and time repo created
        let dateCreatedMsg = document.createElement("p");
        dateCreatedMsg.innerHTML = `Created on ${monthName} ${day}, ${year} at ${hours}`;

        // get description
        const description =  document.createElement("p");
        description.innerHTML = repositories[i]["description"];
        console.log(description.innerHTML);

        // add more info to page,
        // hide by default, show by clicking "Soow more" button
        let moreInfo = document.createElement("div");

        moreInfo.appendChild(dateCreatedMsg);
        moreInfo.appendChild(description);
       
        moreInfo.style.display = "none";

        const goToRepo = document.createElement("button");
        goToRepo.innerHTML = "Go to repo";
        goToRepo.addEventListener( "click", () => {
          window.open(repoLink, "_blank");
        })

        // "show more" toggle button
        const showMore = document.createElement("button");
        showMore.innerHTML = "Show more";
        showMore.addEventListener( "click", () => {
          if (moreInfo.style.display === "block") {
            moreInfo.style.display = "none";
            showMore.innerHTML = "Show more"
          } else {
            moreInfo.style.display = "block";
            showMore.innerHTML = "Hide";
          }

        })

        const projectButtons = document.createElement("div");
        project.appendChild(projectButtons);
        projectButtons.appendChild(showMore);
        projectButtons.appendChild(goToRepo);
        project.appendChild(moreInfo);
       
        projectList.appendChild(project);

    }

  })

  // .catch(error => {
  //   console.error('An error occurred:', error);
  // });

  


