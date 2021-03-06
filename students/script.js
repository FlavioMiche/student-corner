$(document).ready(function () {


	$.get("grabStudentName.php", {uid: getParameterByName('uid')}).done(function (data) {
		$('#studentName').append(data);
		console.log(data);
	});


});


function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}


var loggedIn = false;
var $loginToast = $('<span>Successfully Logged In!</span>').add($('<button onclick="Materialize.Toast.removeAll();" class="btn-flat toast-action">Yay!</button>'));

function logIn() {
	loggedIn = true;
	$('.editable').attr('contenteditable', 'true');
	Materialize.toast($loginToast, 4000)
}

function startEditing(element) {
	if (loggedIn === true) {
		$(element).addClass('editing')
	}
}

var projectsJSON = '{\n' +
	'  "profiles": [\n' +
	'    {\n' +
	'      "uid" : "0",\n' +
	'      "firstName": "John",\n' +
	'      "lastName": "Doe",\n' +
	'      "gradYear": "2210",\n' +
	'      "advisor": "John Doe 2",\n' +
	'	   "about": "This is all about me John doe is the best person you have every seen, I made everything you ever wanted, just like that! *snaps*",\n' +
	'      "projects": [\n' +
	'        {\n' +
	'          "id": "1",\n' +
	'          "name": "The best project",\n' +
	'          "desc": "This is a great description"\n' +
	'        },\n' +
	'        {\n' +
	'          "id": "2",\n' +
	'          "name": "The best project",\n' +
	'          "desc": "This is a great descridddddption"\n' +
	'        }      ]\n' +
	'    },\n' +
	'    {\n' +
	'      "uid" : "1",\n' +
	'      "firstName": "John",\n' +
	'      "lastName": "Doe",\n' +
	'      "gradYear": "2210",\n' +
	'      "advisor": "John Doe 2",\n' +
	'	   "about": "This is all about me!!!!",\n' +
	'      "projects": [\n' +
	'        {\n' +
	'          "id": "1",\n' +
	'          "name": "The best project",\n' +
	'          "desc": "This is a great description"\n' +
	'        },\n' +
	'        {\n' +
	'          "id": "2",\n' +
	'          "name": "The best project",\n' +
	'          "desc": "This is a great description"\n' +
	'        }      ]\n' +
	'    }\n' +
	'  ]\n' +
	'}\n';
console.log(projectsJSON);
var profileJson = JSON.parse(projectsJSON);

function loadProfile() {
	var projectAmount = profileJson.profiles[getParameterByName('uid')].projects.length;
	var projects = profileJson.profiles[getParameterByName('uid')].projects;
	var aboutInfo = profileJson.profiles[getParameterByName('uid')].about;
	console.log(projectAmount);
	$('.name').html(profileJson.profiles[getParameterByName('uid')].firstName + ' ' + profileJson.profiles[getParameterByName('uid')].lastName);
	$('#project-cards').html('');
	for (var i = 0; i < projectAmount; i++) {
		$('#project-cards').append('' +
			'<div class="card horizontal hoverable">\<n></n>' +
			'	<div class="card-image center" style="padding-left: 10px; margin-top: 10px;">\<n></n>' +
			'		<img width="86" height="86" src="https://maxcdn.icons8.com/Share/icon/Logos//google_logo1600.png">\n' +
			'   	<h6>' + projects[i].name + '</h6>\<n></n>' +
			'	</div>\n' +
			'	<div class="card-stacked">\n' +
			'       <div class="card-content">\n' +
			'       	<p>' + projects[i].desc + '</p>\n' +
			'           <a href="#" style="margin-top: 40px;" class="btn red waves-effect">Go</a>\n' +
			'       </div>\n' +
			'   </div>\n' +
			'</div>'
		);
	}
	$('#about').val(aboutInfo)
}

function submitEdit() {
	if (!$(".editable").is(":focus")) {
		$('.editable').attr('contenteditable', 'false');
	}
}