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
    return document.getElementById(row + ':' + column).getAttribute('fill');
}

function getLeftSide(pos) {

}


class item{
    form = null;
    rotate = 0;
    position = [];
    spawn = () => {
        for(let i = 0; i < this.position.length; i++){
            setFill(this.position[i][0], this.position[i][1])
        }
    }
    toLeft = () => {

    }
    toRight = () => {

    }
    toDown = () => {

    }
    constructor(form) {
        this.form = form;
        switch (form){
            case 0:{
                this.position = [
                    [1, 5], [1, 6],
                    [2, 5], [2, 6]
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

let active = new item(0);
active.spawn();

// console.log(active.position);
let tmp = [];
active.position.forEach(function (item, index, array) {
   console.log(item)

});

