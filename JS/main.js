var allBookmarks =[]

//store the index of the selected row
var updatedRowIndex;


// display any values stored in the array when the user make refresh to know that there is already stored data
if(localStorage.getItem("allBookmarks") != null){

    allBookmarks = JSON.parse(localStorage.getItem("allBookmarks"));
    displayAllBookmarks();
}


// select the inputs 
var bookmarkNameInput = document.getElementById('bookmarkName');
var siteUrlInput = document.getElementById('bookmarkUrl');

//function that add bookmark to the array and localStorage
function addBookmark(){

    //select the submit button to check if the text is (submit or update)
    var buttonText = document.getElementById("submitButton").innerHTML;

    
    if(validateBookmarkName()  && validateSiteUrl() ){
        var bookmark = {
            name: bookmarkNameInput.value,
            url: siteUrlInput.value,
        };
    
        if (buttonText == "Submit") {
            allBookmarks.push(bookmark);
            displayAllBookmarks();

          } else {
            displayUpdatedBookmarks(updatedRowIndex);
            document.getElementById("submitButton").innerHTML = "Submit";
          }

        localStorage.setItem("allBookmarks" , JSON.stringify(allBookmarks));
        clearInputs();
    
    }else{

        alert("Invalid bookmark name or url : Site name must contain at least 3 characters, Site URL must start with https:// and to be a valid one !!")
    }
}


// clear the inputs for the user
function clearInputs() {
  
    bookmarkNameInput.value = "";
    siteUrlInput.value = "";

}
  


// display all the bookmarks found in the array
function displayAllBookmarks() {
    var cartoona = "";
  
    for (var i = 0; i < allBookmarks.length; i++) {
      cartoona += ` <tr>
      <td>${i+1}</td>
      <td>${allBookmarks[i].name}</td>
      <td> <button class=" btn btn-success"><i class="fa-regular fa-eye"></i><a href="${allBookmarks[i].url}" target="blank" class=" text-white text-decoration-none" > Visit</a></button> </td>
      <td> <button class=" btn btn-danger" onclick="deleteBookmark(${i})"><i class="fa-regular fa-trash-can"></i> Delete</button> </td>
      <td> <button class=" btn btn-warning" onclick="updateBookmarks(${i})"><i class="fa-regular fa-trash-can"></i> Update</button> </td> 
  
      </tr>
      `
    }
  
    document.getElementById('bookmarktableBody').innerHTML = cartoona;
}


// function that check if the name is valid or not
function validateBookmarkName(){

    var bookmarkRegex = /[a-zA-Z]{3,}/
    return bookmarkRegex.test(bookmarkNameInput.value);

}
  

// function that check if the URl is valid or not : must start with www. and end with .com
function validateSiteUrl(){

    var siteUrlRegex = /^https:\/\//
    return siteUrlRegex.test(siteUrlInput.value);

}


//function delete that delete the selected row from the array and the localstorage when click on the delete button
function deleteBookmark(index){

    allBookmarks.splice(index,1);
    localStorage.setItem("allBookmarks" , JSON.stringify(allBookmarks));
    displayAllBookmarks();

}



//function update the occur when click on update button, it take the values back to the inputs and then after editing, save the new values 
function updateBookmarks(index){

    bookmarkNameInput.value = allBookmarks[index].name;
    siteUrlInput.value = allBookmarks[index].url;

    document.getElementById("submitButton").innerHTML = "Update";
    updatedRowIndex = index;

}


//function that display the table after updating the values and it update at the same row
function displayUpdatedBookmarks(index) {
    allBookmarks[index].name = bookmarkNameInput.value;
    allBookmarks[index].url = siteUrlInput.value;
    displayAllBookmarks();

}


//function search. after wrting every character,the search will work and show all the available items
function searchBookmark(term){
    var cartoona = "";
    for( var i = 0 ; i < allBookmarks.length ;i++){

        if(allBookmarks[i].name.toLowerCase().includes(term.toLowerCase()) == true){

            cartoona += ` <tr>
            <td>${i+1}</td>
            <td>${allBookmarks[i].name}</td>
            <td> <button class=" btn btn-success"><i class="fa-regular fa-eye"></i><a href="${allBookmarks[i].url}" target="blank" class=" text-white text-decoration-none" > Visit</a></button> </td>
            <td> <button class=" btn btn-danger" onclick="deleteBookmark(${i})"><i class="fa-regular fa-trash-can"></i> Delete</button> </td>
            <td> <button class=" btn btn-warning" onclick="updateBookmarks(${i})"><i class="fa-regular fa-trash-can"></i> Update</button> </td> 
        
            </tr>`
            
        }
    }

    document.getElementById("bookmarktableBody").innerHTML = cartoona;
}



