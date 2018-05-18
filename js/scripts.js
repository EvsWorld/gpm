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



const validate = () => {
  // console.log('id = ', id);
  // let x = document.getElementById(id);
  // console.log('Validate called!! x.value = ', x.value);
  const form = document.getElementById('form');
  console.log('form = ', form );
  console.log('form.elements = ', form.elements );
  const formElems = form.querySelectorAll('div > input');
  console.log('formElems = ', formElems );
  const divs = form.getElementsByTagName('div');
  console.log('divs =', divs);
  // formElems.forEach( elem => {
  //   console.log('elem = ', elem);

  // console.log('formElems.elements= ',formElems.elements);


    // const itsDone = false;
  // for (let elem of divs) {
  // console.log('type of div ', typeof(divs));
    const itsDone = [...divs].every( elem => {
      let subElem = elem.querySelectorAll('input, select');
      console.log('subElem = ', subElem);
      return [...subElem].every( att => {
        return att.value
      });
    });
  //   console.log('subElem by tag = ', subElem);
  //   for (let attribute of subElem) {
  //     // console.log('is there an attribute??');
  //     console.log('attribute = ', attribute);
  //     console.log('attribute.value = ', attribute.value);
  //   }
  // }

  console.log('itsDone = ', itsDone);
  // const formComplete = formElems.every( elem => {
  //   console.log('every...', elem.value.value);
  //   return elem.value.value !== "";
  // });
  // console.log('form is complete = ', formComplete);

}

// var button = document.getElementById("button-one");
// button.addEventListener('click', function(event) {
//   addData();
// });
