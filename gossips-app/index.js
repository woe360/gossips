// javascript

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-fcbb8-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const gossipListInDB = ref(database, "gossipList")


const inputEl = document.getElementById("text-input")
const publishBtnEl = document.getElementById("publish-btn")
const gossipListEl = document.getElementById("gossip-list")

publishBtnEl.addEventListener("click", function(){
    let inputValue = inputEl.value
    
    push(gossipListInDB, inputValue)
    
    clearInput()
})


onValue(gossipListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let gossipArray = Object.entries(snapshot.val())
        
        clearGossipList()
        
        for (let i = 0; i < gossipArray.length; i++) {
            let currentGossip = gossipArray[i]
            let currentGossipID = currentGossip[0]
            let currentGossipValue = currentGossip[1]
            
            appendGossipToTheList(currentGossip)
        }
        
    } else {
        gossipListEl.innerHTML = "No gossips yet, change this ;)"
    }
})

function clearGossipList() {
    gossipListEl.innerHTML = ""
}

function clearInput() {
    inputEl.value = ""
}

function appendGossipToTheList(gossip) {
    let gossipID = gossip[0]
    let gossipValue = gossip[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = gossipValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `gossipList/${gossipID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    gossipListEl.append(newEl)
}