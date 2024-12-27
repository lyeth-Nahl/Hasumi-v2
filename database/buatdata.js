const fs = require('fs');
const path = './data.json';

function loadData() {
  if (fs.existsSync(path)) {
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
  } else {
    return {}; 
  }
}

function saveData(database) {
  fs.writeFileSync(path, JSON.stringify(database, null, 2), 'utf8');
}

function addUser(id, nama) {
  let database = loadData(); 
  
  if (!database[id]) {
    database[id] = {
      nama: nama, 
      yen: 0,
      exp: 0,
      lv: 1
    };
    saveData(database); 
    console.log(`User dengan ID ${id} berhasil ditambahkan.`);
  } else {
    console.log(`User dengan ID ${id} sudah ada.`);
  }
}
const cekdata = loadData();
module.exports = { addUser, cekdata };
