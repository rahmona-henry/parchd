var request = require('superagent')
var createButton = document.getElementById("creator")
var submitButton = document.getElementById('submitBtn')
var Firebase = require('firebase')
firebase = new Firebase("https://parchd.firebaseio.com/")


if(document.getElementById("water")){ //all /water logic goes here
  createButton.addEventListener("click", visitCreatePage)
}


if(document.getElementById("create")){ // all /create logic goes here
  submitButton.addEventListener("click", submitCreateForm)
}

 function visitCreatePage() { //
  // window.location = "/create"
 }

function submitCreateForm() {
  console.log("hello")
  var form = {
    name: document.getElementById("name_form").value,
    quality: document.getElementById('qual_form').value,
    local: document.getElementById('locale').innerHTML,
    description: document.getElementById("desc_form").value,
    lat: document.getElementById("lat_form").value,
    lng: document.getElementById("lng_form").value
  }
  firebase.push({lat: form.lat, lng: form.lng })
  console.log(form)
  request
    .post('/create')
   .send(form)
   .end(function(err, res){
     if(err){
       console.log(err)
    }
  })
}

///////////////////////////// MAP CODE BELOW/////////////








