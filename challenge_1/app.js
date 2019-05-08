window.onload = () => {
  var turnBool = true;
  var boxCount = 0;
  var winDeclared = false;
  var xWin = 0;
  var oWin = 0;
  var ticClick = (ev) => {
    let currentContent = ev.target.textContent;
    let playerTrack = '';
    if (!currentContent) {
      if (turnBool) {
        ev.target.textContent = 'X';
        playerTrack = 'x';
      } else {
        ev.target.textContent = 'O';
        playerTrack = 'o';
      }
      turnBool = !turnBool;
      boxCount++;
      if (winCondition(ev.target.id) && !winDeclared) {
        setTimeout(() => (alert(`${ev.target.textContent} WINS!!!`)), 0);
        winDeclared = !winDeclared;
        if (ev.target.textContent === 'X') {
          xWin++;
          document.getElementById('x').textContent = `X - ${xWin}`;
          turnBool = true;
        } else {
          oWin++;
          document.getElementById('o').textContent = `O - ${oWin}`;
          turnBool = false;
        }
      }
      if (!winDeclared && boxCount === 9) {
        setTimeout(() => (alert('IT\'S A TIE')), 0);
        turnBool = true;
      }
    }
  };

  var elementBoxes = document.getElementsByTagName('td');

  document.getElementById('board').addEventListener('click', ticClick);

  document.getElementById('reset').addEventListener('click', () => {
    boxCount = 0;
    winDeclared = false;
    for (let el of elementBoxes) {
      el.textContent = '';
    }
  });

  var winCondition = (id) => {
    if (['11', '13', '22', '31', '33'].includes(id)) {
      if (checkDiag(id)) {
        return true;
      } 
    }
    if (checkHorizontal(id)) {
      return true;
    } else if (checkVertical(id)) {
      return true;
    } else {
      return false;
    }
  };

  var checkDiag = (id) => {
    let idVal = document.getElementById(id).textContent;
    let majorDiag = ['11', '22', '33'];
    let minorDiag = ['13', '22', '31'];
    let minorCount = 0;
    let majorCount = 0;
    for (let i of majorDiag) {
      if (document.getElementById(i).textContent === idVal) {
        majorCount++;
        if (majorCount === 3) {
          return true;
        }
      }
    }
    for (let j of minorDiag) {
      if (document.getElementById(j).textContent === idVal) {
        minorCount++;
        if (minorCount === 3) {
          return true;
        }
      }
    }
    return false;
  };

  var checkHorizontal = (id) => {
    let idVal = document.getElementById(id).textContent;
    let row = id[0];
    let checkId = '';
    let horCount = 0;
    for (let c = 1; c < 4; c++) {
      checkId = row + c;
      if (idVal === document.getElementById(checkId).textContent) {
        horCount++;
        if (horCount === 3) {
          return true;
        }
      }
    }
    return false;
  };

  var checkVertical = (id) => {
    let idVal = document.getElementById(id).textContent;
    let col = id[1];
    let checkId = '';
    let verCount = 0;
    for (let r = 1; r < 4; r++) {
      checkId = r + col;
      if (idVal === document.getElementById(checkId).textContent) {
        verCount++;
        if (verCount === 3) {
          return true;
        }
      }
    }
    return false;
  };
};