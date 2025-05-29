import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAcGaqJWBSt4f7FXDit6HfuEdslZWDtEWw",
  authDomain: "helpzone2-21857.firebaseapp.com",
  databaseURL: "https://helpzone2-21857-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "helpzone2-21857",
  storageBucket: "helpzone2-21857.firebasestorage.app",
  messagingSenderId: "1096111837111",
  appId: "1:1096111837111:web:ada1f3e48964a194092232"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Form elements
const form = document.getElementById("helpForm");
const emergencySelect = document.getElementById("emergency");
const otherInputDiv = document.getElementById("otherInputDiv");
const extraDetailsDiv = document.getElementById("extraDetailsDiv");

// Form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = document.getElementById("location").value;
  const gender = document.getElementById("gender").value;
  const emergency = emergencySelect.value;
  const phone = document.getElementById("phone").value;
  const otherDetails = document.getElementById("otherDetails") ? document.getElementById("otherDetails").value : "";
  const extraDetails = document.getElementById("extraDetails") ? document.getElementById("extraDetails").value : "";

  // Save to Firebase
  push(ref(db, "helpRequests/"), {
    location,
    gender,
    emergency,
    phone,
    otherDetails,
    extraDetails,
    timestamp: new Date().toISOString(),
    status: "Pending"
  })
  .then((res) => {
    alert(`✅ Help request sent! Your request ID is: ${res.key}\nStatus: Pending`);
    form.reset();
    otherInputDiv.style.display = "none";
    extraDetailsDiv.style.display = "none";
  })
  .catch((error) => {
    alert("❌ Error: " + error.message);
  });
});

// Show/hide "Other" field and the extra input box for explanation
emergencySelect.addEventListener("change", () => {
  if (emergencySelect.value === "Other") {
    otherInputDiv.style.display = "block";
    extraDetailsDiv.style.display = "block";
  } else {
    otherInputDiv.style.display = "none";
    extraDetailsDiv.style.display = "none"; 
  }
});