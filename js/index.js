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

// for each skill:
    // create a variable : "skill", var skill
    // create a new list item, : document.createElement("li")
    // set inner text to current skill, : li.innerHTML = skill
    // append the skill element to skillList : skillList.append(skill)

for (const skill of skills) {
    const skillListItem = document.createElement("li");
    skillListItem.innerHTML = skill;
    skillList.append(skillListItem);
}
console.log(skillList);


