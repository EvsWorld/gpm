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
    console.log('newRow = ', newRow);
  });
  store.push(newRow); // push on store
  console.log('store = ', store);
  // render table
  // renderTable(store, tableOne);
  renderLastRow(store, tableOne)
  // reset fields
  formOne.reset();
};

const fillRow = (storeR, tableR, dataToRender, row) => {
  // console.log('(from fill row 1 )    dataToRender: ', dataToRender);
  // console.log('typeof dataToRender = ', typeof dataToRender);
  // dataToRender = Object.values(dataToRender);
  // console.log('Object.values(dataToRender): ', dataToRender);
  const lastIndex = dataToRender.length-1;
  // console.log('lastIndex = ', lastIndex);
  // cut off id from end
  dataToRender = dataToRender.slice(0, dataToRender.length-1);
  // console.log('dataToRender: ', dataToRender);
  dataToRender.forEach( (field, index) => {
    let inserted = row.insertCell(index);
    inserted.innerHTML = field;
  });
  let trashButton = row.insertCell(lastIndex);
  trashButton.innerHTML = `<i class='fas fa-trash'></i>`;
  // trashButton.setAttribute('storeIdTr', 'test1');
  trashButton.onclick = deleteTheRow.bind(null, dataToRender, storeR, tableR)
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

function deleteTheRow (post, storeR, tableR) {
  console.trace('store when enter deleteRow = ', storeR);
  const itemId = post.pop()
    storeR.forEach( (p,i) => {
      // console.log('p.id = ', p.id);
      // console.log('itemId = ', itemId);
      if (p.id === itemId) {
        console.log(enter);
        storeR.splice(i,1);

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
    console.log('from renderLastRow,     post = ', post);
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

  console.log('formIncomplete = ', formIncomplete);
  // const disabledOrNull = formIncomplete ? false : 'disabled';
  // console.log('disabledOrNull = ', disabledOrNull);

  let addButton = document.querySelectorAll('#add-button')[0];
  // console.log(`document.querySelectorAll('#add-button')[0] = `, document.querySelectorAll('#add-button')[0]);

  addButton.disabled = formIncomplete;

}
