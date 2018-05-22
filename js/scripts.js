'use-strict';
const tableOne = document.getElementById("table-one");
const sortElement = document.querySelectorAll('#filter')[0];
sortElement.onchange = renderTable.bind(null, store, tableOne);

const store = [
  {
  deviceName: 'test name',
  deviceType: 'test Device',
  deviceBrand: 'test Brand',
  deviceModel: 'test model',
  deviceInstallDate: 300,
  storeId: '28394576'
  },
  {
  deviceName: 'duck man',
  deviceType: 'phonebooth',
  deviceBrand: 'Bell South',
  deviceModel: 'T1000',
  deviceInstallDate: 1988,
  storeId: '28394576'
  }
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
  const post = Object.values(store[store.length-1]);
  const tableRbody = tableOne.getElementsByTagName('tbody')[0];
  renderRow(store, tableRbody, post)
  // reset fields
  formOne.reset();
};

function renderRow (storeR, tableR, postToRender) {
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
    trashButton.onclick = deleteTheRow.bind(null, id, storeR, tableR)
  };
  let newRow = tableR.insertRow(tableR.rows.length);
  fillRow(postToRender, newRow);
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
    console.log('this = ', this);
    // now remove the elements and rerender the whole table
    renderTable(storeR, tableR)
  };

// not using
function renderTable (storeR, tableR) {
  // console.trace('enter renderTable!!!!!');
  // console.trace(`tableR = `, tableR);
  // const tableRbody = tableR.getElementsByTagName('tbody')[0];
  // console.trace(`tableRbody = `, tableRbody);
  //still fucks up when this isnt here
  // sortDevices(store, tableR)

  const new_tbody = document.createElement('tbody');
  storeR.forEach( (post, i) => {
    // for each object in store, create a new row in 'new_tbody'
    let postArray = Object.values(post);
    let newRow = new_tbody.insertRow(i);
    renderRow(storeR, tableR, postArray);
  });
  // replace old table body with 'new_tbody'
  // console.trace('tableR.parentNode = ', tableR.parentNode)
  console.trace('FROM RENDERTABLE:  tableR = ', tableR)
  tableR.parentNode.replaceChild(new_tbody, tableR);
  // console.trace(`end of renderTable, store = `, store);
};

function sortDevices (storeR) {
  const e = document.getElementById('filter');
  const sortBy = e.options[e.selectedIndex].value;
  console.log('sortBy = ', sortBy)
  storeR.sort(function(a,b) {return (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0);} );
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
