const inputBtn = document.getElementById("input-btn");
const delBtn = document.getElementById("del-btn");
const tabBtn = document.getElementById("tab-btn");
let myLeads = [];
const inputEl = document.getElementById("input-el");
let ulEl = document.getElementById("ul-el");
inputBtn.addEventListener("click", buttonSaveClick);
delBtn.addEventListener("click", buttonDeleteClick);
tabBtn.addEventListener("click", buttonTabClick);
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
}
function renderLeads(leads) {
    let listItems = "";
    for (var i = 0; i < leads.length; i++) {
        listItems += `<li> 
        <a href = '${leads[i]}' target = '_blank''>${leads[i]}</a>
        </li>`; // += to concatinate strings
    }
    ulEl.innerHTML = listItems;
}
function buttonSaveClick() {
    myLeads.push(inputEl.value);
    inputEl.value = ""; // clearing input field after submitting
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); //storing in local memory
    renderLeads(myLeads);
}
function buttonDeleteClick() {
    myLeads.splice(0, myLeads.length);
    renderLeads(myLeads);
}
function buttonTabClick() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(currTab[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads(myLeads);
    });
}
