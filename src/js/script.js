let grid = document.querySelector('.grid');
const rows = 20;
const columns = 10;

function initBox() {

    for(let i = 1; i <= rows; i++) {
        for(let k = 1; k <= columns; k++) {
            const div = document.createElement('div');
            div.classList.add('box');
            div.id = i+':'+k;
            div.setAttribute('fill', false);
            grid.append(div);
        }
    }
}
initBox()

// class constBox{
//
// }

// function constBox(width, height, bgColor, fill) {
//     this.width = width;
//     this.height = height;
//     this.bgColor = bgColor;
//     this.fill = fill;
// }
//
// let box = new constBox (50, 50, 'red', true);
// console.log(box);

// возв. элемента по id
function getCell(row, column) {
    return document.getElementById(row + ':' + column);
}

// заливка ячейки в сетке
function setFill(row, column) {
    if(!document.getElementById(row + ':' + column).classList.contains('filled')) {
        document.getElementById(row + ':' + column).classList.add('filled');
        document.getElementById(row + ':' + column).setAttribute('fill', true);
    }
}


// удаление заливки
function removeFill(row, column) {
    if(document.getElementById(row + ':' + column).classList.contains('filled')) {
        document.getElementById(row + ':' + column).classList.remove('filled');
        document.getElementById(row + ':' + column).setAttribute('fill', false);
    }
}

// проверка заполнености
function checkFill(row, column) {
    let res = document.getElementById(row + ':' + column).getAttribute('fill');
    if(res === 'false') return false;
    if(res === 'true') return true;
}

function getLeftSide(pos){
    let rows = {};
    let result = [];
    for (let i=0;i<pos.length;i++){
        if (rows[pos[i][0]] === undefined) {rows[pos[i][0]] = []}
        rows[pos[i][0]].push(pos[i][1])
    }
    for(let row in rows){
        if (rows[row].length>0){
            result.push([Number(row), Math.min.apply(null, rows[row]) - 1])
        }
    }
    return result;
}

function checkMove(res) {
    for(let i = 0; i < res.length; i++) {
        if(res[i][1] <= 0) return false;
        if(res[i][1] > 10) return false;
        if(res[i][0] > 20) return false;
        if(checkFill(res[i][0], res[i][1])) return  false;
    }
    return  true;
}


function getRightSide(pos){
    let rows = {};
    let result = [];
    for (let i=0;i<pos.length;i++){
        if (rows[pos[i][0]] === undefined) {rows[pos[i][0]] = []}
        rows[pos[i][0]].push(pos[i][1])
    }
    for(let row in rows){
        if (rows[row].length>0){
            result.push([Number(row), Math.max.apply(null, rows[row]) + 1])
        }
    }
    return result;
}

function getBottomSide(pos) {
    let rows = {};
    let result = [];
    for (let i=0;i<pos.length;i++){
        if (rows[pos[i][0]] === undefined) {rows[pos[i][0]] = []}
        rows[pos[i][0]].push(pos[i][1])
    }
    let maxRow = Math.max.apply(null, Object.keys(rows));
    if (rows[maxRow].length>0){
        for (let i=0;i<rows[maxRow].length;i++){
            result.push([Number(maxRow) + 1, rows[maxRow][i]])
        }
    }
    return result;
}


class item{
    form = null;
    rotate = 0;
    position = [];
    spawn = () => {
        for(let i = 0; i < this.position.length; i++){
            setFill(this.position[i][0], this.position[i][1])
        }
        document.addEventListener('keydown', keyLoger)
    }
    deStroy = () => {
        for(let i = 0; i < this.position.length; i++){
            removeFill(this.position[i][0], this.position[i][1])
        }
    }
    toUp = () => {
        console.log('Up')

    }
    toLeft = () => {
        if(checkMove(getLeftSide(this.position))) {
            let newPos = [];
            for(let i = 0; i < this.position.length; i++) {
                newPos.push([this.position[i][0], this.position[i][1]-1] );
            }
            this.deStroy();
            this.position.length = 0;
            newPos.forEach((item) => {
                this.position.push(item)
            })
            this.spawn()
        }
    }
    toRight = () => {
        if(checkMove(getRightSide(this.position))) {
            let newPos = [];
            for(let i = 0; i < this.position.length; i++) {
                newPos.push([this.position[i][0], this.position[i][1]+1] );
            }
            this.deStroy();
            this.position.length = 0;
            newPos.forEach((item) => {
                this.position.push(item)
            })
            this.spawn()
        }
    }
    toDown = () => {
        if(checkMove(getBottomSide(this.position))) {
            let newPos = [];
            for(let i = 0; i < this.position.length; i++) {
                newPos.push([this.position[i][0] + 1, this.position[i][1]] );
            }
            this.deStroy();
            this.position.length = 0;
            newPos.forEach((item) => {
                this.position.push(item)
            })
            this.spawn()
        } else {
            let min = 0
            let max = 5
            active = new item( Math.floor(Math.random() * (max - min)) + min)
        }
    }
    constructor(form) {
        this.form = form;
        switch (form){
            case 0:{
                this.position = [
                    [4, 4], [4, 5],
                    [5, 4], [5, 5]
                ];
                break;
            }
            case 1:{
                this.position = [
                        [1, 6],
                        [2, 6],
                 [3, 5],[3, 6],
                ];
                break;
            }
            case 2:{
                this.position = [
                    [1, 6],
                    [2, 6],
                    [3, 6],
                    [4, 6]
                ];
                break;
            }
            case 3:{
                this.position = [
                            [1, 5],
                    [2, 4], [2, 5], [2, 6]
                ];
                break;
            }
            case 4:{
                this.position = [
                    [1, 5], [1, 6],
                            [2, 6], [2, 7]
                ];
                break;
            }
        }

    }
}

let active = new item(1);
let active2 = new item(1);
active.spawn();
active2.spawn()

function keyLoger(e) {
    switch (e.code) {
        case 'ArrowUp': active.toUp(); break;
        case 'ArrowLeft': active.toLeft(); break;
        case 'ArrowRight': active.toRight(); break;
        case 'ArrowDown': active.toDown(); break;
    }
}

// console.log(checkMove(getRightSide(active.position)));


