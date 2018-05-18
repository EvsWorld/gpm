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


// to be called on every form change. enables submit button when form is complete and disables it when not complete
const validate = () => {
  const form = document.getElementById('form');
  console.log('form = ', form );
  console.log('form.elements = ', form.elements );
  const formElems = form.querySelectorAll('div > input');
  console.log('formElems = ', formElems );
  const divs = form.getElementsByTagName('div');

  const formIncomplete = ![...divs].every( elem => {
    let subElem = elem.querySelectorAll('input, select');
    console.log('subElem = ', subElem);
    return [...subElem].every( att => {
      return att.value
    });
  });

  console.log('formIncomplete = ', formIncomplete);
  // const disabledOrNull = formIncomplete ? false : 'disabled';
  // console.log('disabledOrNull = ', disabledOrNull);

  let addButton = document.querySelectorAll('#add-button')[0];
  console.log(`document.querySelectorAll('#add-button')[0] = `, document.querySelectorAll('#add-button')[0]);

  addButton.disabled = formIncomplete;

}
