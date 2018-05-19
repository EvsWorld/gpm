'use-strict';

function addData() {
    var tableOne = document.getElementById("table-one");
    var formOne = document.getElementById("form-one");
    var row = tableOne.insertRow(tableOne.length);
    console.log('tableOne', tableOne);
    console.log('row: ', row);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.innerHTML = document.querySelectorAll('#device-name')[0].value;
    cell2.innerHTML = document.querySelectorAll('#device-type')[0].value;
    cell3.innerHTML = document.querySelectorAll('#device-brand')[0].value;
    cell4.innerHTML = document.querySelectorAll('#device-model')[0].value;
    cell5.innerHTML = document.querySelectorAll('#device-install-date')[0].value;
    cell6.innerHTML = 'trashcan';
    // reset fields
    formOne.reset();

}



// to be called on every form change. enables submit button when form is complete and disables it when not complete
const validate = () => {
  const form = document.getElementById('form-one');
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
