// Requiring necessary npm packages
// const fs = require('fs');
// const generateHTML = require('../../generateHTML');
// const axios = require('axios');
// const pdf = require('html-pdf');
// var mykey = apiKey.myKey;

$(document).ready(function(){

    //variables from the form, needed for the post route api
    let firstNameInput = $('#firstName');
    console.log(firstNameInput);
    let lastNameInput = $('#lastName');
    console.log(lastName);
    let phoneInput = $('#phone');
    let emailInput = $('#email');
    
    let streetInput = $('#street');
    console.log(streetInput);
    let cityInput = $('#city');
    let stateInput = $('#state');
    console.log(stateInput);
    let countyInput = $('#county');
    
    let submitInput = $('#subDate');
    let noteInput = $('#notes');
    
    
    
    //Get todays date
    
    // let today = new Date();
    // console.log(today);
    // document.querySelector("#date").value = today;
    
    // document.querySelector("#date").valueAsDate = today;
    
    // AJAX call
    // var api = function generate() {
    //     var baseURL = "https://maps.googleapis.com/maps/api/staticmap?" + address + "&zoom=20&size=400x400&maptype=satellite" + mykey;
    //     axios.get(baseURL)
    //         .then(function (response) {
    //             console.log(response);
    //         }).catch(console.log("Not working"))
    // };
    
    const databaseData = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
    
        streetAddress: '',
        city: '',
        state: '',
    
        submitDate: '',
        notes: '',
        roofGrade: ''
    };
    
    const address = databaseData.streetAddress + databaseData.city + databaseData.state
    
    // api();
    
    const newFile = databaseData.firstName + databaseData.lastName
    
    function writeToFile(newFile, html) {
        console.log('Making your HTML file ...');
        fs.writeFile(newFile, html, (err) => {
            if (err) {
                return console.log(err);
            }
        });
    };
    
    // const html = generateHTML.generateHTML(databaseData);
    // writeToFile(newFile, html);
    
    //function to pass the new customer information to the api call
    function postNewCust(first, last, ph, em){
        $.post('/api/client', {first: first, lastName: last, phone: ph, email:em} )
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    };

    //function to pass the new address from the customer form
    function postNewAddress(street, city, state, county) {
        $.post('/api/address', {street: street, city: city, state: state, county: county} )
        .then (data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    };

    //function to pass the job info from the customer form
    function postNewJob(submitDate, jobNotes) {
        $.post('/api/job', {submitDate: submitDate, jobNotes: jobNotes})
        .tehn (data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    };


    //event handler on the submit button to post to the db and run the html creator function
        $("#submit").on('click', function(event) {
            event.preventDefault();
            // generate();
       
    
    
    //constructs the object to hand to the db
    //new Customer variable to pass to the db
    let newCust = {
       firstName: firstNameInput.val().trim(),
       lastName: lastNameInput.val().trim(),
       phone: phoneInput.val().trim(),
       email: emailInput.val().trim()
    
    };
    console.log('newCust', newCust);
    //new address object to pass to the db
    let newAddress = {
        street: streetInput.val().trim(),
        city: cityInput.val().trim(),
        state: stateInput.val().trim(),
        county: countyInput.val().trim()
    };
    console.log('newAddress', newAddress);
    // new job object to pass to the db
    let newJob = {
        submitDate: submitInput.val().trim(),
        jobNotes: noteInput.val().trim()
    };
    console.log('newJob', newJob);

    //pass new customer information to the post function above click function
    postNewCust(newCust.firstName, newCust.lastName, newCust.phone, newCust.email)
    //passing the new address info into the db
    postNewAddress(newAddress.street, newAddress.city, newAddress.state, newAddress.county)
    //passing the new job info int the db
    postNewJob(newJob.submitDate, newJob.jobNotes)

    
     });
    
    
    
    });