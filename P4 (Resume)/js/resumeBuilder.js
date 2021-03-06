/*
This is empty on purpose! Your code to build the resume will go here.


var name = "John Doe";
var formattedName  = HTMLheaderName.replace("%data%", name);
$("#header").append(formattedName);

var role = "Web Developer";
var formattedRole = HTMLheaderRole.replace("%data%", role);
$("#header").append(formattedRole);

var skills = ["awesomeness", "programmming", "teaching", "JS"];
$("#main").append(skills);


/*
var bio = {
  "name" = "James",
  "age" = 32,
  "skills" = skills
};
$("#main").append(bio.name);


var work = {};
work.position = "Course Developer";
work.employer = "Udacity";
work.years = 0.3;

var education = {};
education["name"] = "Nova Southeastern University";
education["years"] = "2005-2013";
education["city"] = "Fort Lauderdale, FL, US";

$("#main").append(work["position"]);
$("#main").append(education.name);


var education = {
  "schools" : [
    {
      "name": "Eckerd College",
      "city": "Saint Petersburg, FL, US",
      "degree": "BA",
      "major": ["CompSci", "French"]
    },
    {
      "name": "Nova SouthEastern University",
      "city": "Fort Lauderdale, FL, US",
      "degree": "Masters",
      "major": ["CompSci"]
    }
  ]
}

*/


var bio = {
  "name" : "John Doe",
  "role" : "Web Developer",
  "contacts" : {
    "mobile" : "650-555-5555",
    "email" : "john@examole.com",
    "github" : "johndoe",
    "twitter" : "@johndoe",
    "location" : "San Francisco"
  },
  "welcomeMessage" : "lorem ipsum dolor sit amet etc etc etc.",
  "skills" : [
    "awesomeness", "delivering things", "cryogenic sleep", "saving the universe"
    ],
  "biopic" : "images/fry.jpg",
  display:function(){
      
	  var formattedName = HTMLheaderName.replace("%data%", bio.name);
	var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
	var formattedMobile =HTMLmobile.replace("%data%", bio.contacts.mobile);
	var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
	var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
	var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
	var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
	var formattedBioPic = HTMLbioPic.replace("%data%", bio.biopic);
	var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
	$("#header").prepend(formattedName,formattedRole);
      $("ul#topContacts").append(formattedMobile,formattedEmail,
        formattedGithub,formattedTwitter,formattedLocation);
      $("#header").append(formattedBioPic,formattedWelcomeMsg,HTMLskillsStart);
      bio.skills.forEach(bioSkills);
	  $("ul#footerContacts").append(formattedMobile,formattedEmail,
  formattedGithub,formattedTwitter,formattedLocation);
  }
};




function bioSkills(item,index){
  var formmattedHTMLskills = HTMLskills.replace("%data%", bio.skills[index]);
  $("#skills").append(formmattedHTMLskills);
}

bio.display();

var work = {
  "jobs" : [
    {
      "employer" : "Planet Express",
      "title" : "Delivery Boy",
      "dates" : "January 3000 - Future",
      "location" : "Brooklyn, NY",
      "description" : "Who moved my cheese cheesy."
    },
    {
      "employer" : "Panucci's Pizza",
      "title" : "Delivery Boy",
      "dates" : "1998 - December 31, 1999",
      "location" : "Manhattan, NY",
      "description" : "Who moved my cheese cheesy."
    }
  ],
  display:function(){
    $("#workExperience").append(HTMLworkStart);
      work.jobs.forEach(workFunction);
  }
};


function workFunction(item,index){
  var formattedHTMLworkEmployer = HTMLworkEmployer.replace("%data%", work.jobs[index].employer);
  var formattedHTMLworkTitle = HTMLworkTitle.replace("%data%", work.jobs[index].title);
  var formattedHTMLworkDates = HTMLworkDates.replace("%data%", work.jobs[index].dates);
  var formattedHTMLworkLocation = HTMLworkLocation.replace("%data%", work.jobs[index].location);
  var formattedHTMLworkDescription = HTMLworkDescription.replace("%data%", work.jobs[index].description);

  $(".work-entry").append(formattedHTMLworkEmployer+formattedHTMLworkTitle,
          formattedHTMLworkDates,formattedHTMLworkLocation,formattedHTMLworkDescription);
};

work.display();



var projects= {
  "projects" :[
    {
      "title" : "Sample Project 1",
      "dates" : "2014",
      "description" : "Who moved my cheese cheesy.",
      "images" : [
        "images/puppy.jpg",
        "images/Sunflower.jpg"
      ]
    }
  ],display:function(){
    $("#projects").append(HTMLprojectStart);
    projects.projects.forEach(projectFunction);
  }
};

function projectFunction(item,index){
  var formattedHTMLprojectDates = HTMLprojectDates.replace("%data%", projects.projects[index].dates);
  var formattedHTMLprojectTitle = HTMLprojectTitle.replace("%data%", projects.projects[index].title);
  var formattedHTMLprojectDescription = HTMLprojectDescription.replace("%data%", projects.projects[index].description);
  $(".project-entry").append(formattedHTMLprojectTitle,formattedHTMLprojectDates,
                            formattedHTMLprojectDescription);
  projects.projects[index].images.forEach(function(image){
    var formattedHTMLprojectImage = HTMLprojectImage.replace("%data%", image);
    $(".project-entry").append(formattedHTMLprojectImage);
  });
}


projects.display();


var education = {
"schools" : [
  {
    "name": "Nova SouthEastern University",
    "location": "Fort Lauderdale, FL, US",
    "degree": "Masters",
    "majors": ["CS"],
    "dates": "2013",
    "url" : "http://example.com"
  },
  {
    "name": "Eckerd College",
    "location": "Saint Petersburg, FL, US",
    "degree": "BA",
    "majors": ["CS"],
    "dates" : "2003",
    "url" : "http://example.com"
  }
],
"onlineCourses" : [
  {
    "title" : "Javascript Crash Course",
    "school" : "Udacity",
    "dates" : "2014",
    "url" : "http://www.udacity.com/course/ud804"
  }
],
display:function(){
  $("#education").append(HTMLschoolStart);
  education.schools.forEach(schoolFunc);
  $(".education-entry").append(HTMLonlineClasses);
  education.onlineCourses.forEach(onlineFunc);
  }
};

function schoolFunc(item,index){
  var formattedHTMLschoolName = HTMLschoolName.replace("%data%", education.schools[index].name);
  var formattedHTMLschoolDegree = HTMLschoolDegree.replace("%data%", education.schools[index].degree);
  var formattedHTMLschoolDates = HTMLschoolDates.replace("%data%", education.schools[index].dates);
  var formattedHTMLschoolLocation = HTMLschoolLocation.replace("%data%", education.schools[index].location);
  var formattedHTMLschoolMajor = HTMLschoolMajor.replace("%data%", education.schools[index].majors);
  $(".education-entry").append(formattedHTMLschoolName+formattedHTMLschoolDegree);
  $(".education-entry").append(formattedHTMLschoolDates,formattedHTMLschoolLocation,formattedHTMLschoolMajor);
}


function onlineFunc(item,index){
  var formattedHTMLonlineTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[index].title);
  var formattedHTMLonlineSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[index].school);
  var formattedHTMLonlineDates = HTMLonlineDates.replace("%data%", education.onlineCourses[index].dates);
  var formattedHTMLonlineURL = HTMLonlineURL.replace("%data%", education.onlineCourses[index].url);

  $(".education-entry").append(formattedHTMLonlineTitle+formattedHTMLonlineSchool);
  $(".education-entry").append(formattedHTMLonlineDates,formattedHTMLonlineURL);
}

education.display();

$(".education-entry h3").css("padding","10px 0%");
$("#mapDiv").append(googleMap);

/*





if(bio.skills.length > 0){
  $("#header").append(HTMLskillsStart);

  var formattedSkill = HTMLskills.replace("%data%", bio.skills[0]);
  $("#skills").append(formattedSkill);
  formattedSkill = HTMLskills.replace("%data%", bio.skills[1]);
  $("#skills").append(formattedSkill);
  formattedSkill = HTMLskills.replace("%data%", bio.skills[2]);
  $("#skills").append(formattedSkill);
  formattedSkill = HTMLskills.replace("%data%", bio.skills[3]);
  $("#skills").append(formattedSkill);
}
*/
