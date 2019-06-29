const edmundArticle = require("./BackupData/edmundArticle.json");
const edmundArticle2 = require("./BackupData/edmundArticle2.json");
const edmundArticle3 = require("./BackupData/edmundArticle3.json");
const edmundCars = require("./BackupData/edmundCars.json");
const edmundDealer = require("./BackupData/edmundDealer.json");

const util = require("util");
// MUST RUN BROWSERIFY AGAIN! It will NOT autoupdate bundle file

// $(function() {
//   $("#open-popup1").magnificPopup({
//     items: {
//       src: "#popup-window1",
//       type: "inline"
//     }
//   });
//   $("#open-popup2").magnificPopup({
//     items: {
//       src: "#popup-window2",
//       type: "inline"
//     }
//   });
//   $("#open-popup3").magnificPopup({
//     items: {
//       src: "#popup-window3",
//       type: "inline"
//     }
//   });
//   $("#open-popup4").magnificPopup({
//     items: {
//       src: "#popup-window4",
//       type: "inline"
//     }
//   });
//   $("#open-popup5").magnificPopup({
//     items: {
//       src: "#popup-window5",
//       type: "inline"
//     }
//   });
//   $("#open-popup6").magnificPopup({
//     items: {
//       src: "#popup-window6",
//       type: "inline"
//     }
//   });
//   $("#open-popup7").magnificPopup({
//     items: {
//       src: "#popup-window7",
//       type: "inline"
//     }
//   });
//   $("#open-popup8").magnificPopup({
//     items: {
//       src: "#popup-window8",
//       type: "inline"
//     }
//   });
//   $("#open-popup9").magnificPopup({
//     items: {
//       src: "#popup-window9",
//       type: "inline"
//     }
//   });
//   $("#open-popup10").magnificPopup({
//     items: {
//       src: "#popup-window10",
//       type: "inline"
//     }
//   });
// });

// This is a backup if Edmunds API limit is reached
// Listings API not available anymore to public developers
// Idea instead is display dealers nearby up to 100 per return
var imgIndex = 1;
// Normally should fill this JSON with a return
var vehicleJSON;
// If not, this should be about the same return
var backupVehicleJson;

// switchMainImgs();
// function switchMainImgs() {
//   console.log("This actually ran");
//   var i;
//   $("#mainBody")
//     .children(".backgroundImgs")
//     .css("display", "none");
//   //var x = document.getElementsByClassName("backgroundImgs");
//   // for (i=0; i<x.length;i++) {
//   //x[i].style.display="none";
//   // }
//   if (imgIndex > 8) imgIndex = 1;
//   var imgID = "#image" + imgIndex;
//   // console.log(imgID);
//   $("#mainBody")
//     .children(imgID)
//     .fadeIn(600);
//   // console.log("Working on it!");
//   imgIndex++;
//   setTimeout(switchMainImgs, 2000);
// }
function switchSearchImgs() {
  var i;
  $("#searchResultsBody")
    .children(".backgroundImgs")
    .css("display", "none");
  //var x = document.getElementsByClassName("backgroundImgs");
  // for (i=0; i<x.length;i++) {
  //x[i].style.display="none";
  // }
  if (imgIndex > 8) imgIndex = 1;
  var imgID = "#image" + imgIndex;
  // console.log(imgID);
  $("#searchResultsBody")
    .children(imgID)
    .fadeIn(600);
  // console.log("Working on it!");
  imgIndex++;
  setTimeout(switchSearchImgs, 2000);
}
function popUp(id) {
  // if (id == "popup-window1") {

  //}
  var idString = "#" + id;
  var numString = id.charAt(id.length - 1);
  var srcString = "#popup-window" + numString;
  /*
  $(idString).magnificPopup({
    items: {
      src: srcString,
      type: 'inline'
    }
  }); 
  */
  console.log("Clicked me " + idString);
  console.log("Source String " + srcString);
}
function isClicked(thisID) {
  document.getElementById("first-li").classList.remove("w3-teal");
  document.getElementById("second-li").classList.remove("w3-teal");
  document.getElementById("third-li").classList.remove("w3-teal");
  document.getElementById("fourth-li").classList.remove("w3-teal");

  document.getElementById(thisID).classList.add("w3-teal");
  console.log("It's working");
}

// These four variables are designed to
// act as add ons to create the endpoint
var searchYear; // Year of model interested in
var searchModel; // Model interested in
var searchMake; // Make interested in
// Note if these are not set properly then
// Json will explode (Error Bad Request)
function enterPressed(event) {
  if (event.keyCode != 13) {
    console.log("returning");
    return;
  }
  $("#search-result-box").html("");
  var searchTerms = document.getElementById("search-box").value;
  document.getElementById("search-box").value = "";
  var numArray = searchTerms.match(/\d+/gi);
  var wordArray = searchTerms.match(/\D\w+/gi);

  $("#showing-results").html("Showing results for: ");
  $("#showing-results").append(searchTerms);

  console.log(searchTerms);
  console.log(numArray);

  console.log(wordArray);
  if (wordArray != null) {
    for (var i = 0; i < wordArray.length; i++) {
      wordArray[i] = wordArray[i].trim();
      console.log(wordArray[i]);
    }
    console.log(wordArray);
    var makeIndex;
    var modelIndex;
    for (var i = 0; i < wordArray.length; i++) {
      if (vehicleJSON == null) {
        for (var j = 0; j < backupVehicleJson.makes.length; j++) {
          var makeName = backupVehicleJson.makes[j].name;
          var makeRE = new RegExp(wordArray[i], "ig");
          if (makeRE.test(makeName)) {
            console.log(makeName + " was found");
            makeIndex = j;
            console.log(makeIndex);
            searchMake = backupVehicleJson.makes[j].niceName;
            console.log(searchMake);
          }
        }
        console.log(makeIndex);
        if (makeIndex != null) {
          for (
            var k = 0;
            k < backupVehicleJson.makes[makeIndex].models.length;
            k++
          ) {
            var modelName = backupVehicleJson.makes[makeIndex].models[k].name;
            var modelRE = new RegExp(wordArray[i], "ig");
            if (modelRE.test(modelName)) {
              console.log(modelName + " was found");
              modelIndex = k;
              searchModel =
                backupVehicleJson.makes[makeIndex].models[modelIndex].niceName;
              console.log(searchModel);
            }
          }
        }
      } else {
        for (var j = 0; j < vehicleJSON.makes.length; j++) {
          var makeName = vehicleJSON.makes[j].name;
          var makeRE = new RegExp(wordArray[i], "ig");
          if (makeRE.test(makeName)) {
            console.log(makeName + " was found");
            makeIndex = j;
            console.log(makeIndex);
            searchMake = vehicleJSON.makes[j].niceName;
            console.log(searchMake);
          }
        }
        console.log(makeIndex);
        if (makeIndex != null) {
          for (var k = 0; k < vehicleJSON.makes[makeIndex].models.length; k++) {
            var modelName = vehicleJSON.makes[makeIndex].models[k].name;
            var modelRE = new RegExp(wordArray[i], "ig");
            if (modelRE.test(modelName)) {
              console.log(modelName + " was found");
              modelIndex = k;
              searchModel = vehicleJSON.makes[makeIndex].niceName;
              console.log(searchModel);
            }
          }
        }
      }
    }
    if (numArray != null) {
      for (var i = 0; i < numArray.length; i++) {
        if (vehicleJSON == null) {
          console.log(
            backupVehicleJson.makes[makeIndex].models[modelIndex].years.length
          );
          for (
            var j = 0;
            j <
            backupVehicleJson.makes[makeIndex].models[modelIndex].years.length;
            j++
          ) {
            var yearChecked =
              backupVehicleJson.makes[makeIndex].models[modelIndex].years[j]
                .year;
            console.log(yearChecked);
            if (numArray[i] == yearChecked) {
              console.log(yearChecked + " is valid");
              searchYear = yearChecked;
            }
          }
        } else {
          console.log(
            vehicleJSON.makes[makeIndex].models[modelIndex].years.length
          );
          for (
            var j = 0;
            j < vehicleJSON.makes[makeIndex].models[modelIndex].years.length;
            j++
          ) {
            var yearChecked =
              vehicleJSON.makes[makeIndex].models[modelIndex].years[j].year;
            console.log(yearChecked);
            if (numArray[i] == yearChecked) {
              console.log(yearChecked + " is valid");
              searchYear = yearChecked;
            }
          }
        }
      }
    }
    console.log(searchMake);
    console.log(searchModel);
    console.log(searchYear);
  }

  $("#mainBody").css("display", "none");
  $("#findCarBody").css("display", "none");
  $("#searchResultsBody")
    .css("display", "block")
    .slideDown();
  switchSearchImgs();
  populateSearch();
}
// Pressing search now button causes this to happen
// Switches div elements out and begins a search query to Edmunds API
function switchToFindCar() {
  $("#mainBody").css("display", "none");
  $("#findCarBody")
    .css("display", "block")
    .slideDown();
  // addMakes();
  dealerAPICall();
}
function goBack() {
  $("#searchResultsBody").css("display", "none");
  $("#findCarBody").css("display", "none");
  $("#mainBody")
    .css("display", "block")
    .slideDown();
}

function addMakes(make) {
  if (make.makes.length > 0) {
    for (var i = 0; i < make.makes.length; i++) {
      $("#makeDropdown").append(
        "\n <a href='' class='dropdown-item'>" + make.makes[i].name + "</a>"
      );
    }
  }
}
var makeIndex;
var makeVal;
function getMake(selectedObject) {
  document.getElementById("listingsButton").disabled = true;
  document.getElementById("models1").selectedIndex = 0;
  document.getElementById("years1").selectedIndex = 0;
  makeVal = selectedObject.value;
  makeIndex = selectedObject.selectedIndex - 1;
  console.log(makeIndex);
  console.log(makeVal);
  document.getElementById("makes2").selectedIndex = makeIndex + 1;
  if (vehicleJSON == null) {
    addModels(makeIndex, backupVehicleJson);
  } else {
    addModels(makeIndex, vehicleJSON);
  }
}
function addModels(makeIndex, make) {
  $("#models1").html(
    "<option value='' disabled selected>Select a Model</option>"
  );
  $("#models2").html("<option value='' disabled selected>All Models</option>");
  for (var i = 0; i < make.makes[makeIndex].models.length; i++) {
    $("#models1").append(
      "\n <option value='" +
        make.makes[makeIndex].models[i].niceName +
        "'>" +
        make.makes[makeIndex].models[i].name +
        "</option>"
    );
    $("#models2").append(
      "\n <option value='" +
        make.makes[makeIndex].models[i].niceName +
        "'>" +
        make.makes[makeIndex].models[i].name +
        "</option>"
    );
    //$("#models1").append("\n <option value='" + "Hi" + "'>" + "Hi" +"</option");
  }
  // addYears();
}
var modelIndex;
var modelVal;
function getModel(selectedObject) {
  document.getElementById("listingsButton").disabled = true;
  document.getElementById("years1").selectedIndex = 0;
  modelVal = selectedObject.value;
  modelIndex = selectedObject.selectedIndex - 1;
  console.log(modelVal);
  // document.getElementById("models2").selectedIndex=modelIndex+1;
  if (vehicleJSON == null) {
    addYears(modelIndex, backupVehicleJson);
  } else {
    addYears(modelIndex, vehicleJSON);
  }
}
function addYears(modelIndex, make) {
  $("#years1").html(
    "<option value='' disabled selected>Select a Year</option>"
  );
  //$("#years2").html("<option value='' disabled selected>All Years</option>");
  //$("#years3").html("<option value='' disabled selected>All Years</option>");
  for (
    var i = 0;
    i < make.makes[makeIndex].models[modelIndex].years.length;
    i++
  ) {
    $("#years1").append(
      "\n <option value'" +
        make.makes[makeIndex].models[modelIndex].years[i].year +
        "'>" +
        make.makes[makeIndex].models[modelIndex].years[i].year +
        "</option>"
    );
    //$("#years2").append("\n <option value'" + make.makes[makeIndex].models[modelIndex].years[i].year + "'>" + make.makes[makeIndex].models[modelIndex].years[i].year + "</option>")
    //$("#years3").append("\n <option value'" + make.makes[makeIndex].models[modelIndex].years[i].year + "'>" + make.makes[makeIndex].models[modelIndex].years[i].year + "</option>")
  }
}
var yearIndex;
var yearVal;
function getYear(selectedObject) {
  yearVal = selectedObject.value;
  console.log(yearVal);
  yearIndex = selectedObject.selectedIndex - 1;
  console.log(yearIndex);
  //document.getElementById("years2").selectedIndex=yearIndex+1;
  //document.getElementById("years3").selectedIndex=yearIndex+1;
  document.getElementById("listingsButton").disabled = false;
  /*
  if (vehicleJSON == null) {
    addYears(val, backupVehicleJson);
  } else {
    addYears(val, vehicleJSON);
  } */
}

// This Json is used for the article return
// from the search bar
var searchArticleJSON;
// This particular JSON is from searching
// BMW 3 Series so make and model only
// Poor numbering choice but articleAPICall2 is called
var backupArticleJSON;

// This backup corresponds to searching with make, model and year!
// Specifically for 2014 Acura ILX Hybrid
// articleAPICall method is called
var backupArticleJSON2;

// This one corresponds to searching for only a make
// Specifically Scion
// articleAPICall3 method is called
var backupArticleJSON3;

// This call corresponds to if make, model and year are found

function articleAPICall() {
  var res = new EDMUNDSAPI("sej676rt53rh2cwp9jrcr9h3");
  // Get articles
  var options = {
    view: "full"
  };

  // Callback function to be called when the API response is returned
  function mainArticleCall(articleAPIJson) {
    searchArticleJSON = articleAPIJson;

    console.log(searchArticleJSON);
    console.log(articleAPIJson);

    // $("#right-side-container").html("<div class='w3-teal' style='margin-top:10px; width: 800px;''>Featured Dealers</div>");

    for (var i = 0; i < searchArticleJSON.articles.length; i++) {
      $("#search-result-box").append(
        "\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" +
          searchArticleJSON.articles[i].title +
          "</div> <div class='search-inner-contents'>" +
          searchArticleJSON.articles[i].description +
          "</div> <a href='" +
          searchArticleJSON.articles[i].link.href +
          "'>" +
          searchArticleJSON.articles[i].link.href +
          "</a> </div>"
      );
    }
    console.log("populating listings!");
  }

  // Oops, Houston we have a problem
  function fail() {
    // console.log(data);
    // $("#right-side-container").html("<div class='w3-teal' style='margin-top:10px; width: 800px;''>Featured Dealers</div>");
    for (var i = 0; i < backupArticleJSON2.articles.length; i++) {
      $("#search-result-box").append(
        "\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" +
          backupArticleJSON.articles[i].title +
          "</div> <div class='search-inner-contents'>" +
          backupArticleJSON.articles[i].description +
          "</div> <a href='" +
          backupArticleJSON.articles[i].link.href +
          "'>" +
          backupArticleJSON.articles[i].link.href +
          "</a> </div>"
      );
    }
    console.log("Made it through the loops");
  }

  var endpoint =
    "/api/editorial/v2/" +
    searchMake +
    "/" +
    searchModel +
    "/" +
    searchYear +
    "/";
  // Fire the API call
  res.api(endpoint, options, mainArticleCall, fail);
}

// This version corresponds to make and model found
function articleAPICall2() {
  var res = new EDMUNDSAPI("sej676rt53rh2cwp9jrcr9h3");

  // Get articles
  var options = {
    view: "full"
  };

  // Callback function to be called when the API response is returned
  function mainArticleCall(articleAPIJson) {
    searchArticleJSON = articleAPIJson;

    console.log(searchArticleJSON);
    console.log(articleAPIJson);

    // $("#right-side-container").html("<div class='w3-teal' style='margin-top:10px; width: 800px;''>Featured Dealers</div>");

    for (var i = 0; i < searchArticleJSON.articles.length; i++) {
      $("#search-result-box").append(
        "\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" +
          searchArticleJSON.articles[i].title +
          "</div> <div class='search-inner-contents'>" +
          searchArticleJSON.articles[i].description +
          "</div> <a href='" +
          searchArticleJSON.articles[i].link.href +
          "'>" +
          searchArticleJSON.articles[i].link.href +
          "</a> </div>"
      );
    }
    console.log("populating articles!");
  }

  // Oops, Houston we have a problem
  function fail() {
    // console.log(data);
    // $("#right-side-container").html("<div class='w3-teal' style='margin-top:10px; width: 800px;''>Featured Dealers</div>");
    for (var i = 0; i < backupArticleJSON.articles.length; i++) {
      $("#search-result-box").append(
        "\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" +
          backupArticleJSON.articles[i].title +
          "</div> <div class='search-inner-contents'>" +
          backupArticleJSON.articles[i].description +
          "</div> <a href='" +
          backupArticleJSON.articles[i].link.href +
          "'>" +
          backupArticleJSON.articles[i].link.href +
          "</a> </div>"
      );
    }
    console.log("Made it through the loops");
  }

  var endpoint = "/api/editorial/v2/" + searchMake + "/" + searchModel + "/";
  // Fire the API call
  res.api(endpoint, options, mainArticleCall, fail);
}

// This corresponds to only make found
function articleAPICall3() {
  var res = new EDMUNDSAPI("sej676rt53rh2cwp9jrcr9h3");

  // Get articles
  var options = {
    view: "full"
  };

  // Callback function to be called when the API response is returned
  function mainArticleCall(articleAPIJson) {
    searchArticleJSON = articleAPIJson;

    console.log(searchArticleJSON);
    console.log(articleAPIJson);

    // $("#right-side-container").html("<div class='w3-teal' style='margin-top:10px; width: 800px;''>Featured Dealers</div>");

    for (var i = 0; i < searchArticleJSON.articles.length; i++) {
      $("#search-result-box").append(
        "\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" +
          searchArticleJSON.articles[i].title +
          "</div> <div class='search-inner-contents'>" +
          searchArticleJSON.articles[i].description +
          "</div> <a href='" +
          searchArticleJSON.articles[i].link.href +
          "'>" +
          searchArticleJSON.articles[i].link.href +
          "</a> </div>"
      );
    }
    console.log("populating articles!");
  }

  // Oops, Houston we have a problem
  function fail() {
    // console.log(data);
    // $("#right-side-container").html("<div class='w3-teal' style='margin-top:10px; width: 800px;''>Featured Dealers</div>");
    for (var i = 0; i < backupArticleJSON3.articles.length; i++) {
      $("#search-result-box").append(
        "\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" +
          backupArticleJSON.articles[i].title +
          "</div> <div class='search-inner-contents'>" +
          backupArticleJSON.articles[i].description +
          "</div> <a href='" +
          backupArticleJSON.articles[i].link.href +
          "'>" +
          backupArticleJSON.articles[i].link.href +
          "</a> </div>"
      );
    }
    console.log("Made it through the loops");
  }

  var endpoint = "/api/editorial/v2/" + searchMake + "/";
  // Fire the API call
  res.api(endpoint, options, mainArticleCall, fail);
}

function populateSearch() {
  console.log(searchMake);
  console.log(searchModel);
  console.log(searchYear);

  if (searchMake == null && searchModel == null && searchYear == null) {
    $("#search-result-box").html(
      "\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>Sorry no results found! Suggestions:</div> <div class='search-inner-contents'> - Make sure all words are spelled correctly.</div> <div class='search-inner-contents'> - Try different keywords</div><div class='search-inner-contents'> - Try more keywords of different models</div></div>"
    );
  } else if (searchMake != null && searchModel != null && searchYear != null) {
    // $("#search-results").append("\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" + searchResults[i].title + "</div> <div class='search-inner-contents'>" +searchResults[i].description+"</div> <a href='"+searchResults[i].link"'>"+searchResults[i].link+"</a> </div>");
    for (var i = 0; i < backupArticleJSON2.articles.length; i++) {
      $("#search-result-box").append(
        "\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" +
          backupArticleJSON2.articles[i].title +
          "</div> <div class='search-inner-contents'>" +
          backupArticleJSON2.articles[i].description +
          "</div> <a href='" +
          backupArticleJSON2.articles[i].link.href +
          "'>" +
          backupArticleJSON2.articles[i].link.href +
          "</a> </div>"
      );
    }
    console.log(searchMake);
    console.log(searchModel);
    console.log(searchYear);
    console.log("All three found");
    // articleAPICall();
  } else if (searchMake != null && searchModel != null && searchYear == null) {
    // $("#search-results").append("\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" + searchResults[i].title + "</div> <div class='search-inner-contents'>" +searchResults[i].description+"</div> <a href='"+searchResults[i].link"'>"+searchResults[i].link+"</a> </div>");
    for (var i = 0; i < backupArticleJSON.articles.length; i++) {
      $("#search-result-box").append(
        "\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" +
          backupArticleJSON.articles[i].title +
          "</div> <div class='search-inner-contents'>" +
          backupArticleJSON.articles[i].description +
          "</div> <a href='" +
          backupArticleJSON.articles[i].link.href +
          "'>" +
          backupArticleJSON.articles[i].link.href +
          "</a> </div>"
      );
    }
    console.log(searchMake);
    console.log(searchModel);
    console.log(searchYear);
    console.log("Only make and model found");
    // articleAPICall2();
  } else if (searchMake != null && searchModel == null && searchYear == null) {
    // $("#search-results").append("\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" + searchResults[i].title + "</div> <div class='search-inner-contents'>" +searchResults[i].description+"</div> <a href='"+searchResults[i].link"'>"+searchResults[i].link+"</a> </div>");
    for (var i = 0; i < backupArticleJSON3.articles.length; i++) {
      $("#search-result-box").append(
        "\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" +
          backupArticleJSON3.articles[i].title +
          "</div> <div class='search-inner-contents'>" +
          backupArticleJSON3.articles[i].description +
          "</div> <a href='" +
          backupArticleJSON3.articles[i].link.href +
          "'>" +
          backupArticleJSON3.articles[i].link.href +
          "</a> </div>"
      );
    }
    console.log(searchMake);
    console.log(searchModel);
    console.log(searchYear);
    console.log("Only make found");
    // articleAPICall3();
  }

  /*
    if (searchMake == null && searchModel == null && searchYear == null) {
      $("#search-result-box").html("\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>Sorry no results found! Suggestions:</div> <div class='search-inner-contents'> - Make sure all words are spelled correctly.</div> <div class='search-inner-contents'> - Try different keywords</div><div class='search-inner-contents'> - Try more keywords of different models</div></div>")
    } else if (searchMake != null && searchModel != null && searchYear != null) {
      for (var i=0;i<searchArticleJSON.articles.length;i++) {
        // $("#search-results").append("\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" + searchResults[i].title + "</div> <div class='search-inner-contents'>" +searchResults[i].description+"</div> <a href='"+searchResults[i].link"'>"+searchResults[i].link+"</a> </div>")
        $("#search-result-box").append("\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" + searchArticleJSON.articles[i].title + "</div> <div class='search-inner-contents'>" + searchArticleJSON.articles[i].description+"</div> <a href='"+ searchArticleJSON.articles[i].link.href + "'>"+searchArticleJSON.articles[i].link.href+"</a> </div>");
      }
    } else if (searchMake != null && searchModel != null && searchYear == null) {
      for (var i=0;i<searchArticleJSON.articles.length;i++) {
        // $("#search-results").append("\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" + searchResults[i].title + "</div> <div class='search-inner-contents'>" +searchResults[i].description+"</div> <a href='"+searchResults[i].link"'>"+searchResults[i].link+"</a> </div>")
        $("#search-result-box").append("\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" + searchArticleJSON.articles[i].title + "</div> <div class='search-inner-contents'>" + searchArticleJSON.articles[i].description+"</div> <a href='"+ searchArticleJSON.articles[i].link.href + "'>"+searchArticleJSON.articles[i].link.href+"</a> </div>");
      }
    } else if (searchMake != null && searchModel == null && searchYear == null) {
      for (var i=0;i<searchArticleJSON.articles.length;i++) {
        // $("#search-results").append("\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" + searchResults[i].title + "</div> <div class='search-inner-contents'>" +searchResults[i].description+"</div> <a href='"+searchResults[i].link"'>"+searchResults[i].link+"</a> </div>")
        $("#search-result-box").append("\n <div class='search-result-container w3-red'> <div class='search-title' style='width:600px;'>" + searchArticleJSON.articles[i].title + "</div> <div class='search-inner-contents'>" + searchArticleJSON.articles[i].description+"</div> <a href='"+ searchArticleJSON.articles[i].link.href + "'>"+searchArticleJSON.articles[i].link.href+"</a> </div>");
      }
    } */

  searchMake = null;
  searchModel = null;
  searchYear = null;
}

// JSON returning listings of dealers
var searchDealerJSON;

function dealerAPICall() {
  var res = new EDMUNDSAPI("sej676rt53rh2cwp9jrcr9h3");

  // Get dealers
  var options = {
    zipcode: "91208",
    make: makeVal,
    view: "full",
    pagesize: "100"
  };

  // Callback function to be called when the API response is returned
  function mainDealerCall(dealerAPIJson) {
    searchDealerJSON = dealerAPIJson;

    console.log(searchDealerJSON);
    console.log(dealerAPIJson);

    $("#right-side-container").html(
      "<div class='w3-teal' style='margin-top:10px; width: 800px;''>Featured Dealers</div>"
    );

    for (var i = 0; i < searchDealerJSON.dealers.length; i++) {
      $("#right-side-container").append(
        "\n <div id='dealer-container" +
          i +
          "' class='car-container'> <img id='car-img" +
          i +
          "' height='100' width='100' style='display: inline-block;'> <div style='display: inline-block; width: 600px;'> <div class='car-search-title'>" +
          searchDealerJSON.dealers[i].name +
          "</div> <div> <div class='car-search-inner-contents'>Distance (miles): </div> <div id='dealer-distance" +
          i +
          "' class='car-search-inner-contents'>" +
          searchDealerJSON.dealers[i].distance.toFixed(2) +
          "</div> </div> <div><div class='car-search-inner-contents'>Address: </div> <div class='car-search-inner-contents'>" +
          searchDealerJSON.dealers[i].address.street +
          ", " +
          searchDealerJSON.dealers[i].address.city +
          ", " +
          searchDealerJSON.dealers[i].address.stateCode +
          "</div> </div> <div><div class='car-search-inner-contents'>Overall Sales Rating: </div> <div class='car-search-inner-contents'>" +
          searchDealerJSON.dealers[i].reviews.sales.overallRating +
          "</div> </div> </div>"
      );
    }

    console.log("populating listings!");
  }

  // Oops, Houston we have a problem
  function fail() {
    console.log(data);
    for (var i = 0; i < backupDealerJSON.dealers.length; i++) {
      $("#right-side-container").append(
        "\n <div id='dealer-container" +
          i +
          "' class='car-container'> <img id='car-img" +
          i +
          "' height='100' width='100' style='display: inline-block;'> <div style='display: inline-block; width: 600px;'> <div class='car-search-title'>" +
          backupDealerJSON.dealers[i].name +
          "</div> <div> <div class='car-search-inner-contents'>Distance (miles): </div> <div id='dealer-distance" +
          i +
          "' class='car-search-inner-contents'>" +
          backupDealerJSON.dealers[i].distance.toFixed(2) +
          "</div> </div> <div><div class='car-search-inner-contents'>Address: </div> <div class='car-search-inner-contents'>" +
          backupDealerJSON.dealers[i].address.street +
          ", " +
          backupDealerJSON.dealers[i].address.city +
          ", " +
          backupDealerJSON.dealers[i].address.stateCode +
          "</div> </div> <div><div class='car-search-inner-contents'>Overall Sales Rating: </div> <div class='car-search-inner-contents'>" +
          backupDealerJSON.dealers[i].reviews.sales.overallRating +
          "</div> </div> </div>"
      );
    }
  }

  // Fire the API call
  res.api("/api/dealer/v2/dealers/", options, mainDealerCall, fail);

  // console.log(data);
  //for (var i=0; i<backupDealerJSON.dealers.length;i++) {
  //$("#right-side-container").append("\n <div id='dealer-container" +i+ "' class='car-container'> <img id='car-img" +i+"' height='100' width='100' style='display: inline-block;'> <div style='display: inline-block; width: 600px;'> <div class='car-search-title'>" +backupDealerJSON.dealers[i].name+"</div> <div> <div class='car-search-inner-contents'>Distance (miles): </div> <div id='dealer-distance" + i + "' class='car-search-inner-contents'>"+backupDealerJSON.dealers[i].distance.toFixed(2)+ "</div> </div> <div><div class='car-search-inner-contents'>Address: </div> <div class='car-search-inner-contents'>" +backupDealerJSON.dealers[i].address.street +", "+backupDealerJSON.dealers[i].address.city +", "+backupDealerJSON.dealers[i].address.stateCode+ "</div> </div> <div><div class='car-search-inner-contents'>Overall Sales Rating: </div> <div class='car-search-inner-contents'>" +backupDealerJSON.dealers[i].reviews.sales.overallRating+ "</div> </div> </div>");
  //}
}

// var distanceSlider = document.getElementById("radiusDIV");
// noUiSlider.create(distanceSlider, {
//   start: 15,
//   connect: [true, false],
//   range: {
//     min: 0,
//     max: 100
//   }
// });
// distanceSlider.noUiSlider.on("change", function(value) {
//   $("#radiusP").html("Radius: ");
//   $("#radiusP").append(value + " miles");
//   modifyDealerListings(value);
// });
function modifyDealerListings(radiusVal) {
  console.log(backupDealerJSON.dealers.length);
  if (searchDealerJSON == null) {
    for (var i = 0; i < backupDealerJSON.dealers.length; i++) {
      console.log(i);
      var distance = document.getElementById("dealer-distance" + i).innerHTML;
      if (parseFloat(radiusVal) < parseFloat(distance)) {
        document.getElementById("dealer-container" + i).style.display = "none";
      } else {
        document.getElementById("dealer-container" + i).style.display = "block";
      }
    }
  } else {
    for (var i = 0; i < searchDealerJSON.dealers.length; i++) {
      console.log(i);
      console.log(document.getElementById("dealer-distance" + i).innerHTML);
      var distance = document.getElementById("dealer-distance" + i).innerHTML;
      if (parseFloat(radiusVal) < parseFloat(distance)) {
        document.getElementById("dealer-container" + i).style.display = "none";
      } else {
        document.getElementById("dealer-container" + i).style.display = "block";
      }
    }
  }
}

// Used to create endpoint to find dealers nearby
var zip;
function beginNewSearch() {
  console.log(makeVal);
  zip = document.getElementById("zip-box").value;
  document.getElementById("zip-box").value = "";
  console.log(distanceSlider.noUiSlider.get());
}
var makeVal2;
function getMake2(selectedObject) {
  makeVal2 = selectedObject.value;
  console.log(makeVal2);
}

function dealerAPICall2() {
  // console.log(data);
  // for (var i=0; i<backupDealerJSON.dealers.length;i++) {
  //$("#right-side-container").append("\n <div id='dealer-container" +i+ "' class='car-container'> <img id='car-img" +i+"' height='100' width='100' style='display: inline-block;'> <div style='display: inline-block; width: 600px;'> <div class='car-search-title'>" +backupDealerJSON.dealers[i].name+"</div> <div> <div class='car-search-inner-contents'>Distance (miles): </div> <div id='dealer-distance" + i + "' class='car-search-inner-contents'>"+backupDealerJSON.dealers[i].distance.toFixed(2)+ "</div> </div> <div><div class='car-search-inner-contents'>Address: </div> <div class='car-search-inner-contents'>" +backupDealerJSON.dealers[i].address.street +", "+backupDealerJSON.dealers[i].address.city +", "+backupDealerJSON.dealers[i].address.stateCode+ "</div> </div> <div><div class='car-search-inner-contents'>Overall Sales Rating: </div> <div class='car-search-inner-contents'>" +backupDealerJSON.dealers[i].reviews.sales.overallRating+ "</div> </div> </div>");
  //}

  var res = new EDMUNDSAPI("sej676rt53rh2cwp9jrcr9h3");

  zip = document.getElementById("zip-box").value;
  var rad = distanceSlider.noUiSlider.get().toString();
  console.log(rad);
  var radWhole = Math.floor(rad);
  console.log(zip);
  // Get dealers
  var options = {
    zipcode: zip,
    make: makeVal2,
    view: "full",
    pagesize: "100",
    radius: radWhole
  };

  // Callback function to be called when the API response is returned
  function mainDealerCall(dealerAPIJson) {
    searchDealerJSON = dealerAPIJson;

    console.log(searchDealerJSON);
    console.log(dealerAPIJson);

    $("#right-side-container").html(
      "<div class='w3-teal' style='margin-top:10px; width: 800px;''>Featured Dealers</div>"
    );

    for (var i = 0; i < searchDealerJSON.dealers.length; i++) {
      $("#right-side-container").append(
        "\n <div id='dealer-container" +
          i +
          "' class='car-container'> <img id='car-img" +
          i +
          "' height='100' width='100' style='display: inline-block;'> <div style='display: inline-block; width: 600px;'> <div class='car-search-title'>" +
          searchDealerJSON.dealers[i].name +
          "</div> <div> <div class='car-search-inner-contents'>Distance (miles): </div> <div id='dealer-distance" +
          i +
          "' class='car-search-inner-contents'>" +
          searchDealerJSON.dealers[i].distance.toFixed(2) +
          "</div> </div> <div><div class='car-search-inner-contents'>Address: </div> <div class='car-search-inner-contents'>" +
          searchDealerJSON.dealers[i].address.street +
          ", " +
          searchDealerJSON.dealers[i].address.city +
          ", " +
          searchDealerJSON.dealers[i].address.stateCode +
          "</div> </div> <div><div class='car-search-inner-contents'>Overall Sales Rating: </div> <div class='car-search-inner-contents'>" +
          searchDealerJSON.dealers[i].reviews.sales.overallRating +
          "</div> </div> </div>"
      );
    }

    console.log("populating listings!");
  }

  // Oops, Houston we have a problem
  function fail() {
    console.log(data);
    for (var i = 0; i < backupDealerJSON.dealers.length; i++) {
      $("#right-side-container").append(
        "\n <div id='dealer-container" +
          i +
          "' class='car-container'> <img id='car-img" +
          i +
          "' height='100' width='100' style='display: inline-block;'> <div style='display: inline-block; width: 600px;'> <div class='car-search-title'>" +
          backupDealerJSON.dealers[i].name +
          "</div> <div> <div class='car-search-inner-contents'>Distance (miles): </div> <div id='dealer-distance" +
          i +
          "' class='car-search-inner-contents'>" +
          backupDealerJSON.dealers[i].distance.toFixed(2) +
          "</div> </div> <div><div class='car-search-inner-contents'>Address: </div> <div class='car-search-inner-contents'>" +
          backupDealerJSON.dealers[i].address.street +
          ", " +
          backupDealerJSON.dealers[i].address.city +
          ", " +
          backupDealerJSON.dealers[i].address.stateCode +
          "</div> </div> <div><div class='car-search-inner-contents'>Overall Sales Rating: </div> <div class='car-search-inner-contents'>" +
          backupDealerJSON.dealers[i].reviews.sales.overallRating +
          "</div> </div> </div>"
      );
    }
  }

  // Fire the API call
  res.api("/api/dealer/v2/dealers/", options, mainDealerCall, fail);
}

/*
window.sdkAsyncInit = function() {
    // Instantiate the SDK
  var res = new EDMUNDSAPI('sej676rt53rh2cwp9jrcr9h3');

  // Get makes
  var options = {
    "view" : "full" 
  };

  // Callback function to be called when the API response is returned
  function success(vehicleAPIJSON) {
    var vehicleJSON = vehicleAPIJSON;
    console.log(vehicleAPIJSON);
    console.log("Successful return");
    
    for (var i=0;i<vehicleJSON.makes.length ;i++) {
      $("#makes1").append("\n <option value='" + vehicleJSON.makes[i].niceName + "'>" + vehicleJSON.makes[i].name +"</option");
      $("#makes2").append("\n <option value='" + "Hi" + "'>" + "Hi" +"</option");
      
    } 
     addMakes(vehicleJSON);
  } 

  // Oops, Houston we have a problem
  function fail() {
    // console.log(data);
    addMakes(backupVehicleJson);
  }

  // Fire the API call
  res.api('/api/vehicle/v2/makes/', options, success, fail);
    // Additional initialization code such as adding Event Listeners goes here
}; */

addMakes(backupVehicleJson);
// Load the SDK asynchronously
(function(d, s, id) {
  var js,
    sdkjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "edmunds.api.sdk.js";
  sdkjs.parentNode.insertBefore(js, sdkjs);
})(document, "script", "edmunds-jssdk");
