// get total 1
// creat product 2
// save localstorage 3
// clear inputs 4
// read 5
// count 6
// delete 7
// update 8
// search 9
// clean date 10

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discound = document.getElementById("discound");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mode = "create";
let tmp;

// get total
function gettotal() {
  if (price.value != "") {
    let ruselt = +price.value + +taxes.value + +ads.value - +discound.value;
    total.innerHTML = ruselt;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// creat product
let datepro;
// save localstorage
if (localStorage.product != null) {
  datepro = JSON.parse(localStorage.product);
} else {
  datepro = [];
}

// creat product
submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discound: discound.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value != "" && price.value != "" && category.value != "") {
    if (mode === "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          datepro.push(newpro);
        }
      } else {
        datepro.push(newpro);
      }
    } else {
      datepro[tmp] = newpro;
      mode = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
  } else {
    cleardate();
  }

  // save localstorage
  localStorage.setItem("product", JSON.stringify(datepro));

  cleardate();
  showdate();
};

// clear inputs
function cleardate() {
  title.value = "";
  price.value = "";
  ads.value = "";
  discound.value = "";
  taxes.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read
function showdate() {
  gettotal();
  let table = "";
  for (let i = 0; i < datepro.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${datepro[i].title}</td>
    <td>${datepro[i].price}</td>
    <td>${datepro[i].taxes}</td>
    <td>${datepro[i].discound}</td>
    <td>${datepro[i].ads}</td>
    <th>${datepro[i].total}</th>
    <td>${datepro[i].category}</td>
    <td><button  onclick="updateData(${i})" id="update">update</button></td>
    <td><button  onclick="deleteDate(${i})" id="delete">delete</button></td>
    </tr>
    
    `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btndeleteall = document.getElementById("deleteall");
  if (datepro.length > 0) {
    btndeleteall.innerHTML = `
    <button onclick = "deleteAll()" >deleteAll (${datepro.length})</button>
    
    `;
  } else {
    btndeleteall.innerHTML = "";
  }
}
showdate();

// delete
function deleteDate(i) {
  datepro.splice(i, 1);
  localStorage.product = JSON.stringify(datepro);
  showdate();
}

// deleteAll
function deleteAll() {
  localStorage.clear();
  datepro.splice(0);
  showdate();
}

// update 8

function updateData(i) {
  title.value = datepro[i].title;
  price.value = datepro[i].price;
  taxes.value = datepro[i].taxes;
  ads.value = datepro[i].ads;
  discound.value = datepro[i].discound;
  gettotal();
  count.style.display = "none";
  category.value = datepro[i].category;
  submit.innerHTML = "update";
  mode = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search 9
let searchmode = "title";

function getsearchmode(id) {
  let search = document.getElementById("search");
  if (id == "searchtitle") {
    searchmode = "title";
    search.placeholder = "search by title";
  } else {
    searchmode = "category";
    search.placeholder = "search by category";
  }
  search.focus();
  search.value = "";
  showdate();
}

// search 9
function searchDate(value) {
  let table = "";

  if (searchmode == "title") {
    for (let i = 0; i < datepro.length; i++) {
      if (datepro[i].title.includes(value.toLowerCase())) {
        table += `
      <tr>
      <td>${i}</td>
      <td>${datepro[i].title}</td>
      <td>${datepro[i].price}</td>
      <td>${datepro[i].taxes}</td>
      <td>${datepro[i].ads}</td>
      <td>${datepro[i].discound}</td>
      <th>${datepro[i].total}</th>
      <td>${datepro[i].category}</td>
      <td><button  onclick="updateData(${i})" id="update">update</button></td>
      <td><button  onclick="deleteDate(${i})" id="delete">delete</button></td>
      </tr>
      `;
      }
    }
  } else {
    for (let i = 0; i < datepro.length; i++) {
      if (datepro[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${datepro[i].title}</td>
        <td>${datepro[i].price}</td>
        <td>${datepro[i].taxes}</td>
        <td>${datepro[i].ads}</td>
        <td>${datepro[i].discound}</td>
        <th>${datepro[i].total}</th>
        <td>${datepro[i].category}</td>
        <td><button  onclick="updateData(${i})" id="update">update</button></td>
        <td><button  onclick="deleteDate(${i})" id="delete">delete</button></td>
        </tr>
        
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
