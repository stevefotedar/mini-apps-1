var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('client'));

app.post('/upload', (req, res) => {
  // console.log(req.body.uploadtext);
  let csv = csvCon(JSON.parse(req.body.uploadtext));
  res.send(csv);
});

const csvCon = (obj) => {
  let string = '';
  let keyArr = Object.keys(obj);
  keyArr.pop();
  string += keyArr.toString(',') + `<br>`;
  let valArr = Object.values(obj);
  valArr.pop();
  string += valArr.toString(',') + `<br>`;
  function childRows (str, cObj) {
    if (cObj.children.length) {
      for (let key of cObj.children) {
        let vArr = Object.values(key);
        vArr.pop();
        str += vArr.toString(',') + `<br>`;
        if (key.children.length) {
          str = childRows(str, key);
        }
      }
    }
    return str;
  }
  string = childRows(string, obj);
  return string;
};

app.listen(3000, () => {
  console.log('Server is listening on Port 3000');
});