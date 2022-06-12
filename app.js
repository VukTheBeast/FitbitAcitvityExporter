var bearerTokenInput = document.getElementById("bearerToken");
var spinner = document.getElementById("spinner");
var resultsTextArea = document.getElementById("resultsTxtArea"); 
var foundActivitiSpan = document.getElementById("foundActivitiSpan");
var downloadBtn = document.getElementById("downlaod");

function start() {
  if(bearerTokenInput.value && getSelectedActivity().length > 0) {
    resultsTextArea.value = '';
    showSpinner();
    btoken = 'Bearer ' + bearerTokenInput.value;
    getData();
  } else {
    resultsTextArea.value = 'There was an error! Token and activity selection are required to start process.!';
  }
}

function getData(beforeDate) {

  beforeDate = beforeDate || getCurrentDate();

  var url = 'https://api.fitbit.com/1/user/-/activities/list.json?beforeDate=' + beforeDate + '&offset=0&limit=100&sort=desc';

  sendGetRequest(url, retreiveAndCall);
  showResults();
}


function retreiveAndCall(res) {
  if(!res.activities.length && !res.success) {
    hideSpinner();
    resultsTextArea.value = 'There was an error! Refhresh page and try again!';
    console.error('There was an error!', error);
  } else {
    var act = res.activities;
    var len = act.length;

    var activityTypes = getSelectedActivity();

    if (len != 0 && activityTypes.length > 0 && listOfHikesAndRuns.length < 10) {
      var lastFull = act[len - 1].lastModified;
      console.log(lastFull);
      var lastDate = lastFull.split(':')[0];
      var hikeAndRun = act.filter(a => activityTypes.includes(a.activityName));
  
      hikeAndRun.forEach(a => listOfHikesAndRuns.push(a.tcxLink));
      getData(lastDate);
    } else {
      console.log("Finish");
      hideSpinner();
      showDownlaodBtn();
    }
  }
};

function downloadActivites() {
    listOfHikesAndRuns.forEach(url => {
        var name = url.split('/')[7];
        downloadFilesFromBlobURI(url, name);
      });
}

function downloadFilesFromBlobURI(uri, name) {
  let headers = new Headers();
  headers.append('Authorization', btoken);
  
  fetch(uri, { headers })
      .then(response => response.blob())
      .then(blobby => {
          var link = document.createElement("a");
          document.body.appendChild(link);
          var objectUrl = window.URL.createObjectURL(blobby);
  
          link.href = objectUrl;
          link.download = name;
          link.click();
  
          window.URL.revokeObjectURL(objectUrl);
      });
  }


  function getCurrentDate() {
      return new Date().toISOString().slice(0, 10);
  }

  function sendGetRequest(url, responseProcessor) {

    fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': btoken
      },
      referrerPolicy: 'no-referrer', 

    })
    .then(response => response.json())
    .then(data => responseProcessor(data));
  
  }

  function getSelectedActivity() {
    var selectedActivity = [];
    var activityCheckbox = document.getElementsByName('activity');
    activityCheckbox.forEach(a => {
      if(a.checked) {
        selectedActivity.push(a.value);
      }
    });
  
    return selectedActivity;
  }
  

  function showDownlaodBtn(){
    downloadBtn.style.display = "block";
  }

  function showResults() {
    var results = listOfHikesAndRuns.reduce((prev, curr) => prev + ' ' + curr + ';', "");
    resultsTextArea.value = results;
    showFoundActivitieNumber();
  }

  function showFoundActivitieNumber() {
    foundActivitiSpan.innerHTML = "Found activities: " + listOfHikesAndRuns.length;
  }

  function showSpinner() {
    spinner.style.display = "block"
  }

  function hideSpinner() {
    spinner.style.display = "none"
  }