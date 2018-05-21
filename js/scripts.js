'use-strict';

const store = [
  // {
  // deviceName: 'test name',
  // deviceType: 'test Device',
  // deviceBrand: 'test Brand',
  // deviceModel: 'test model',
  // deviceInstallDate: 'test install date',
  // storeId: 'test1'
  // }
];

function addData () {
  console.log(' addData called!!');
  const tableOne = document.getElementById("table-one");
  const inputIds = [['device-name','deviceName'], ['device-type','deviceType'], ['device-brand','deviceBrand'], ['device-model','deviceModel'], ['device-install-date','deviceInstallDate'], ['id', 'id']];
  const formOne = document.getElementById("form-one");

  // build object
  let newRow = {};
  inputIds.forEach( tag => {
    newRow[tag[1]] =  document.querySelectorAll(`#${tag[0]}`)[0] ? document.querySelectorAll(`#${tag[0]}`)[0].value : Date.now().toString();
    // console.log('newRow = ', newRow);
  });
  store.push(newRow); // push on store
  console.log('store = ', store);
  // render table
  // renderTable(store, tableOne);
  renderLastRow(store, tableOne)
  // reset fields
  formOne.reset();
};

const fillRow = (storeR, tableR, postData, row) => {
  const id = postData.pop();
  const indexToTackTrash = postData.length;
  // cut off id from end (bc doesn't need to be rendered)
  postData.forEach( (field, index) => {
    let inserted = row.insertCell(index);
    inserted.innerHTML = field;
  });
  let trashButton = row.insertCell(indexToTackTrash);
  trashButton.innerHTML = `<i class='fas fa-trash'></i>`;
  trashButton.onclick = deleteTheRow.bind(null, id, storeR, tableR)
};


function renderLastRow (storeR, tableR) {
  const postToRender = Object.values(storeR[storeR.length-1]);
  const tableRbody = tableR.getElementsByTagName('tbody')[0];
  let newRow = tableRbody.insertRow(tableRbody.rows.length);
  fillRow(storeR, tableRbody, postToRender, newRow);
};

function deleteTheRow (postId, storeR, tableR) {
  console.log('DeleteTheRow called!!!');
    storeR.forEach( (p,i) => {
      if (p.id === postId) {
        console.trace(`after enter 'if', storeR = `, storeR);
        storeR.splice(i,1);
        console.trace('store after splice in deleteRow = ', storeR);
      }
    });
    // now remove the elements and rerender the whole table
    renderTable(storeR, tableR)
  };

// not using
function renderTable (storeR, tableR) {
  sortDevices(storeR, tableR)
  console.log('enter renderTable!!!!!');
  // clear table before rerender
  // const tableRbody = tableR.getElementsByTagName('tbody')[0];
  const new_tbody = document.createElement('tbody');
  // render all store data to 'new_tbody'
  storeR.forEach( post => {
    let newRow = new_tbody.insertRow(tableR.length);
    let postArray = Object.values(post);
    fillRow(storeR, new_tbody, postArray, newRow);
  });
  // replace old table body with 'new_tbody'
  tableR.parentNode.replaceChild(new_tbody, tableR);
  console.trace(`after renderTable, store = `, store);
};

function sortDevices () {
  const e = document.getElementById('filter');
  const sortBy = e.options[e.selectedIndex].value;
  console.log('sortBy = ', sortBy)
  store.sort(function(a,b) {return (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0);} );
}

// to be called on every form change. enables submit button when form is complete and disables it when not complete
const validate = () => {
  const form = document.getElementById('form-one');
  // console.log('form = ', form );
  // console.log('form.elements = ', form.elements );
  const formElems = form.querySelectorAll('div > input');
  // console.log('formElems = ', formElems );
  const divs = form.getElementsByTagName('div');

  const formIncomplete = ![...divs].every( elem => {
    let subElem = elem.querySelectorAll('input, select');
    // console.log('subElem = ', subElem);
    return [...subElem].every( att => {
      return att.value
    });
  });

  let addButton = document.querySelectorAll('#add-button')[0];
  addButton.disabled = formIncomplete;
};

const sortElement = document.querySelectorAll('#filter')[0];
const tableOne = document.getElementById("table-one");
// inputElement.type = "button"
sortElement.addEventListener('change', () => {
    renderTable(store, tableOne);
});
