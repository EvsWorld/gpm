'use-strict';
console.log(('hello world'));


function addData() {
  // e.preventDefault();

    var table = document.getElementById("table-one");
    var row = table.insertRow(table.length);
    console.log('table', table);
    console.log('row: ', row);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.innerHTML = "NEW CELL1";
    cell2.innerHTML = "NEW CELL2";
    cell3.innerHTML = "NEW CELL3";
    cell4.innerHTML = "NEW CELL4";
    cell5.innerHTML = "NEW CELL5";
    cell6.innerHTML = "NEW CELL6";

}



const validate = (id) => {
  // console.log('id = ', id);
  let x = document.getElementById(id);
  // console.log('Validate called!! x.value = ', x.value);
  const myForm = document.getElementById('my-form');
  console.log('myForm = ', myForm );
  const myFormElems = myForm.children;
  console.log('myFormElems = ', myFormElems );
  myFormElems.forEach( elem => {
      console.log(elem)
  });

}

// var button = document.getElementById("button-one");
// button.addEventListener('click', function(event) {
//   addData();
// });
