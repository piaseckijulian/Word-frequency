const textInput = document.getElementById('text');
const calculateBtn = document.getElementById('calculate');
const tableDiv = document.getElementById('table');

let frequencyObject = {};

const calculateFrequency = () => {
  if (textInput.value.trim() === '') {
    tableDiv.innerText = 'Enter text!';
    return;
  }

  frequencyObject = {};
  const frequencyArray = textInput.value.split(' ');
  for (let word of frequencyArray) {
    if (word.trim() === '') continue;
    word = word.replaceAll('.', '');
    word = word.replaceAll(',', '');
    word = word.replaceAll('!', '');
    word = word.replaceAll('?', '');
    word = word.replaceAll(':', '');
    word = word.replaceAll(';', '');

    if (word.toLowerCase() in frequencyObject) {
      frequencyObject[word.toLowerCase()] += 1;
    } else {
      frequencyObject[word.toLowerCase()] = 1;
    }
  }

  frequencyObject = Object.entries(frequencyObject)
    .sort((a, b) => b[1] - a[1])
    .reduce((a, [k, v]) => ({ ...a, [k]: v }), {});

  createTable();
};

const createTable = () => {
  tableDiv.innerHTML = '';
  const table = document.createElement('table');

  const th1 = document.createElement('th');
  const th2 = document.createElement('th');

  th1.innerText = 'Word';
  th2.innerText = 'Frequency';

  table.appendChild(th1);
  table.appendChild(th2);

  for (const key in frequencyObject) {
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.innerHTML = key;
    tr.appendChild(td1);

    const td2 = document.createElement('td');
    td2.innerHTML = frequencyObject[key];
    tr.appendChild(td2);

    table.appendChild(tr);
  }

  tableDiv.appendChild(table);
};

calculateBtn.onclick = () => calculateFrequency();
