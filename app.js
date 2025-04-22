function loadData() {
  const tablebody = document.querySelector("#dataTable").children[1];
  tablebody.innerHTML = ""; // Clear existing table rows before reloading

  const storeDaat = JSON.parse(localStorage.getItem("formData")) || [];
  storeDaat.forEach((ele, index) => {
    const newRow = tablebody.insertRow();
    newRow.innerHTML = `
      <td>${ele.fullname}</td>
      <td>${ele.email}</td>
      <td>${ele.message}</td>
      <td>${ele.gender}</td>
      <td>${ele.hobbies}</td>
      <td>${ele.phone}</td>
      <td>${ele.otherfield}</td>
      <td>
        <button onclick="deleteOne(${index})">Delete</button>
        <button onclick="editOne(${index})">Update</button>
      </td>
    `;
  });

  if (storeDaat.length > 0) {
    document.getElementById("dataTable").style.display = "table";
  }
}

function deleteOne(index) {
  const storeData = JSON.parse(localStorage.getItem("formData")) || [];
  storeData.splice(index, 1); // remove the item
  localStorage.setItem("formData", JSON.stringify(storeData));
  loadData(); // reload the table
}

function editOne(index) {
  const storeData = JSON.parse(localStorage.getItem("formData")) || [];
  const data = storeData[index];

  document.getElementById("name").value = data.fullname;
  document.getElementById("email").value = data.email;
  document.getElementById("message").value = data.message;
  document.getElementById("phone").value = data.phone;
  document.getElementById("otherfield").value = data.otherfield;

  document.querySelectorAll("input[name='gender']").forEach((radio) => {
    radio.checked = radio.value === data.gender;
  });

  document.querySelectorAll("input[name='hobbies']").forEach((checkbox) => {
    checkbox.checked = data.hobbies.includes(checkbox.value);
  });

  // Remove old data at this index, user will resubmit
  storeData.splice(index, 1);
  localStorage.setItem("formData", JSON.stringify(storeData));
}

window.onload = loadData;

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullname = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const gender = document.querySelector("input[name='gender']:checked")?.value;
  const hobbies = Array.from(document.querySelectorAll("input[name='hobbies']:checked"))
    .map((checkbox) => checkbox.value)
    .join(",");
  const phone = document.getElementById("phone").value;
  const otherfield = document.getElementById("otherfield").value;

  const storeData = JSON.parse(localStorage.getItem("formData")) || [];
  storeData.push({ fullname, email, message, gender, hobbies, phone, otherfield });
  localStorage.setItem("formData", JSON.stringify(storeData));

  document.getElementById("contactform").reset();
  loadData();
});
   