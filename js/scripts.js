'use-strict';

const store = [
  // {
  // deviceName: '',
  // deviceType: '',
  // deviceBrand: '',
  // deviceModel: '',
  // deviceInstallDate: ''
  // }
];

function addData() {
  const tableOne = document.getElementById("table-one");
  const formOne = document.getElementById("form-one");
  const inputIds = ['device-name', 'device-type', 'device-brand', 'device-model', 'device-install-date'];
    // const tblHeaders = document.querySelectorAll('th');
    // console.log(tblHeaders);
    // [...tblHeaders].map( el => {
    //   el = el.textContent
    //   console.log('Header text content:  ', el);
    // });

    console.log('tableOne: ', tableOne);
    const newRow = tableOne.insertRow(tableOne.length);
    // console.log('tableOne', tableOne);
    // console.log('newRow: ', newRow);
    console.log(typeof(newRow));
    console.log(newRow);
    inputIds.map( (tag, index) => {
      console.log('tag : ', tag);
      let inserted = newRow.insertCell(index);
      console.log('tag after insert : ', tag);
      inserted.innerHTML = document.querySelectorAll(`#${tag}`)[0].value;
    });
    // reset fields
    formOne.reset();
}

function addDataObject () {
  const tableOne = document.getElementById("table-one");
  const inputIds = [['device-name','deviceName'], ['device-type','deviceType'], ['device-brand','deviceBrand'], ['device-model','deviceModel'], ['device-install-date','deviceInstallDate']];
  const formOne = document.getElementById("form-one");

  // build object
  let newRow = {};
  inputIds.forEach( tag => {
    newRow[tag[1]] = document.querySelectorAll(`#${tag[0]}`)[0].value;
    // console.log('newRow = ', newRow);
  });
  store.push(newRow); // push on store
  console.log('store = ',store);
  // render table
  // renderTable(store, tableOne);
  renderLastRow(store, tableOne)
  // reset fields
  formOne.reset();
};

function renderLastRow (storeR, tableR) {
  let newRow = tableR.insertRow(tableR.length);
  const postToRender = storeR[storeR.length-1]
  fillRow(postToRender, newRow);
};

function fillRow (dataToRender, row) {
  console.log('dataToRender: ', dataToRender);
  Object.values(dataToRender).forEach( (field, index) => {
    let inserted = row.insertCell(index);
    inserted.innerHTML = field;
  });
};

// not using
function renderTable (storeR, tableR) {
  storeR.forEach( post => {
    let newRow = tableR.insertRow(tableR.length);
    fillRow(post, newRow);
  });
};

function fillRowLast (dataToRender, row) {
  console.log('dataToRender: ', dataToRender);

  Object.values(dataToRender).forEach( (field, index) => {
    let inserted = row.insertCell(index);
    inserted.innerHTML = field;
  });
};

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
