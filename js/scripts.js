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

function addDataObject () {
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
  console.trace('id = ', id);
  console.trace('postData (after pop()) = ', postData)
  // cut off id from end (bc doesn't need to be rendered)
  // const dataToRender = postData.slice(0, postData.length-1);
  postData.forEach( (field, index) => {
    let inserted = row.insertCell(index);
    inserted.innerHTML = field;
  });
  let trashButton = row.insertCell(indexToTackTrash);
  trashButton.innerHTML = `<i class='fas fa-trash'></i>`;
  trashButton.onclick = deleteTheRow.bind(null, id, storeR, tableR)
};


function renderLastRow (storeR, tableR) {
  // console.log('postToRender.slice(-1) = ', postToRender.slice(-1));
  // newRow.setAttribute('storeId', postToRender.slice(0,-1))
  const postToRender = Object.values(storeR[storeR.length-1]);
  // console.log('dataToRender: ', dataToRender);
  let newRow = tableR.insertRow(tableR.length);
  // console.log('from renderLastRow,     postToRender = ', postToRender);
  fillRow(storeR, tableR, postToRender, newRow);
};

function deleteTheRow (postId, storeR, tableR) {
  // console.trace('store', storeR);
  // const itemId = post.pop()
  console.trace('postId = ', postId)
    storeR.forEach( (p,i) => {
      // console.log('p.id = ', p.id);
      // console.log('itemId = ', itemId);
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
  // clear table before rerender
  const tableRbody = tableR.tBodies.item(0);
  const new_tbody = document.createElement('tbody');
  tableRbody.parentNode.replaceChild(new_tbody, tableRbody);
  // render all store data
  storeR.forEach( post => {
    let newRow = tableR.insertRow(tableR.length);
    let postArray = Object.values(post);
    console.trace('postArray = ', postArray);
    fillRow(storeR, tableR, postArray, newRow);
  });
};

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

  // console.log('formIncomplete = ', formIncomplete);
  // const disabledOrNull = formIncomplete ? false : 'disabled';
  // console.log('disabledOrNull = ', disabledOrNull);

  let addButton = document.querySelectorAll('#add-button')[0];
  // console.log(`document.querySelectorAll('#add-button')[0] = `, document.querySelectorAll('#add-button')[0]);

  addButton.disabled = formIncomplete;

}
