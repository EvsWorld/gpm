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
  // deviceInstallDate: 300,
  // storeId: '28394576'
  // },
  // {
  // deviceName: 'duck man',
  // deviceType: 'phonebooth',
  // deviceBrand: 'Bell South',
  // deviceModel: 'T1000',
  // deviceInstallDate: 1988,
  // storeId: '28394576'
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
  const post = Object.values(store[store.length-1]);
  renderTable(tableOne)
  // reset fields
  formOne.reset();
};


function deleteTheRow (postId, storeR, tableR) {
  console.trace('DeleteTheRow called!!!');
    storeR.forEach( (p,i) => {
      if (p.id === postId) {
        console.trace(`after enter 'if', storeR = `, storeR);
        storeR.splice(i,1);
        console.trace('store after splice in deleteRow = ', storeR);
      }
    });
    // now remove the elements and rerender the whole table
    renderTable(tableR)
  };

// not using
function renderTable (table) {
  console.log('renderTable called!!');
  const tableBody = table.getElementsByTagName('tbody').item(0);
  const newTableBody = document.createElement('tbody');
  // render values to that new table body
  function renderRow (storeR, newTBody, postToRender, insertRowIndex) {
    const newRow = newTBody.insertRow(insertRowIndex);
    console.trace('renderRow called!!!!')
    const fillRow = (postData, row) => {
      console.log('fillRow called!!');
      const id = postData.pop();
      const indexToTackTrash = postData.length;
      // cut off id from end (bc doesn't need to be rendered)
      postData.forEach( (field, index) => {
        let inserted = row.insertCell(index);
        inserted.innerHTML = field;
      });
      let trashButton = row.insertCell(indexToTackTrash);
      trashButton.innerHTML = `<i class='fas fa-trash'></i>`;
      trashButton.onclick = () => deleteTheRow(id, store, table)
    };
    fillRow(postToRender, newRow);
  };
  debugger;
  sortDevices(store); // sort the store
  // for each object in store, create a new row in 'newTableBody'
  store.forEach( (post, i) => {
    let postArray = Object.values(post);
    renderRow(store, newTableBody, postArray, i);
  });
  // replace old table body ( 'tableBody' ) with 'newTableBody'
  console.trace('FROM RENDERTABLE:  tableBody = ', tableBody)
  tableBody.parentNode.replaceChild(newTableBody, tableBody);
};

function sortDevices (store) {
  debugger;
  const e = document.getElementById('filter');
  const sortBy = e.options[e.selectedIndex].value;
  // console.log('sortBy = ', sortBy)
  store.sort(function(a,b) {return (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0);} );
  debugger;
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
