'use-strict';
const tableOne = document.getElementById("table-one");
const sortElement = document.querySelectorAll('#filter')[0];
sortElement.onchange = () => renderTable(tableOne);

let store = [
  // {
  // deviceName: 'test name',
  // deviceType: 'test Device',
  // deviceBrand: 'test Brand',
  // deviceModel: 'test model',
  // deviceInstallDate: 1981,
  // storeId: '28394576'
  // },
  // {
  // deviceName: 'superman',
  // deviceType: 'phonebooth',
  // deviceBrand: 'Bell South',
  // deviceModel: 'T1000',
  // deviceInstallDate: 1988,
  // storeId: '28394576'
  // }
];

function addData () {
  const tableOne = document.getElementById("table-one");
  const inputIds = [['device-name','deviceName'], ['device-type','deviceType'], ['device-brand','deviceBrand'], ['device-model','deviceModel'], ['device-install-date','deviceInstallDate'], ['id', 'id']];
  const formOne = document.getElementById("form-one");

  // build data object
  let newRow = {};
  inputIds.forEach( tag => {
    newRow[tag[1]] =  document.querySelectorAll(`#${tag[0]}`)[0] ? document.querySelectorAll(`#${tag[0]}`)[0].value : Date.now().toString();
  });
  store.push(newRow); // push on store
  // render table
  const post = Object.values(store[store.length-1]);
  renderTable(tableOne)
  // reset fields
  formOne.reset();
};


function deleteRow (postId, storeR, tableR) {
    storeR.forEach( (p,i) => {
      if (p.id === postId) {
        storeR.splice(i,1);
      }
    });
    // remove the elements and rerender the whole table
    renderTable(tableR)
  };

function renderTable (table) {
  const store = sortDevices(store); // sort the store
  const tableBody = table.getElementsByTagName('tbody').item(0);
  const newTableBody = document.createElement('tbody');
  // render values to that new table body
  function renderRow (storeR, newTBody, postToRender, insertRowIndex) {
    const newRow = newTBody.insertRow(insertRowIndex);
    const fillRow = (postData, row) => {
      const id = postData.pop();
      const indexToTackTrash = postData.length;
      // cut off id from end (bc doesn't need to be rendered)
      postData.forEach( (field, index) => {
        let inserted = row.insertCell(index);
        inserted.innerHTML = field;
      });
      let trashButton = row.insertCell(indexToTackTrash);
      trashButton.innerHTML = `<i class='fas fa-trash'></i>`;
      trashButton.onclick = () => deleteRow(id, store, table)
    };
    fillRow(postToRender, newRow);
  };

  // for each object in store, create a new row in 'newTableBody'
  store.forEach( (post, i) => {
    let postArray = Object.values(post);
    renderRow(store, newTableBody, postArray, i);
  });
  // replace old table body ( 'tableBody' ) with 'newTableBody'
  tableBody.parentNode.replaceChild(newTableBody, tableBody);
};

function sortDevices () {
  const e = document.getElementById('filter');
  const sortBy = e.options[e.selectedIndex].value;
  return store.sort(function(a,b) {
    return (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0);
  } );
}

// to be called on every form change. enables submit button when form is complete and disables it when not complete
const validate = () => {
  const form = document.getElementById('form-one');
  const formElems = form.querySelectorAll('div > input');
  const divs = form.getElementsByTagName('div');

  const formIncomplete = ![...divs].every( elem => {
    let subElem = elem.querySelectorAll('input, select');
    return [...subElem].every( att => {
      return att.value
    });
  });

  let addButton = document.querySelectorAll('#add-button')[0];
  addButton.disabled = formIncomplete;
};
