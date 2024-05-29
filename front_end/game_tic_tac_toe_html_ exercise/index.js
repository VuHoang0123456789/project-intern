const X_icon = document.querySelectorAll(".wrap_x_o h1")[0];
const O_icon = document.querySelectorAll(".wrap_x_o h1")[1];
const wrap_title = document.getElementsByClassName("wrap_title")[0];
const wrapBroad = document.getElementsByClassName("wrap_broad")[0];
const o_win_el = document.getElementsByClassName("o_win")[0];
const x_win_el = document.getElementsByClassName("x_win")[0];

let selection = "x_i";
let ob = {};
let o_win_count = 0;
let x_win_count = 0;

let winPos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

window.addEventListener("load", createBroad);

function clearBroad() {
  ob = {};
  selection = "x_i";
  wrapBroad.innerHTML = "";
}

function createBroad() {
  wrapBroad.innerHTML = `
    <div class="broad">
        <div class="broad_row">
            <div class="broad_node">
                <button index = "0" onclick="broad_node_click(event)"></button>
            </div>

            <div class="broad_node">
                <button index = "1" onclick="broad_node_click(event)"></button>
            </div>

            <div class="broad_node">
                <button index = "2" onclick="broad_node_click(event)"></button>
            </div>
        </div>

        <div class="broad_row">
            <div class="broad_node">
                <button index = "3" onclick="broad_node_click(event)"></button>
            </div>

            <div class="broad_node">
                <button index = "4" onclick="broad_node_click(event)"></button>
            </div>

            <div class="broad_node">
                <button index = "5" onclick="broad_node_click(event)"></button>
            </div>
        </div>

        <div class="broad_row">
            <div class="broad_node">
                <button index = "6" onclick="broad_node_click(event)"></button>
            </div>

            <div class="broad_node">
                <button index = "7" onclick="broad_node_click(event)"></button>
            </div>

            <div class="broad_node">
                <button index = "8" onclick="broad_node_click(event)"></button>
            </div>
        </div>
    </div>
  `;

  wrap_title.innerHTML = `
    <p>Lượt chơi của:</p>
    <h2>X</h2>
  `;

  swap_turn("x_i");
}

function wrapResult_onclick(e) {
  e.preventDefault();

  createBroad();
}

function checkWin(id) {
  if (!ob[id]) return -1;

  if (ob[id].length < 3) return -1;

  const win = winPos.filter((item) => {
    let isWin = true;
    for (let index = 0; index < item.length; index++) {
      if (!ob[id].includes(item[index])) {
        isWin = false;
        break;
      }
    }

    return isWin;
  });

  if (id === "x_i" && win.length > 0) return 10;

  if (id === "o_i" && win.length > 0) return -10;

  if (ob["x_i"]?.length + ob["o_i"]?.length === 9 && win.length === 0) return 0;

  return -1;
}

function showResult(isWin) {
  clearBroad();
  let htmlStr = ``;

  if (isWin === 10) {
    htmlStr = `
        <div class="wrap_result" onclick="wrapResult_onclick(event)">
            <h1>X</h1>
            <h2>Chiến thắng!</h2>
        </div>
    `;

    x_win_count += 1;
    x_win_el.innerText = x_win_count;
  } else if (isWin === -10) {
    htmlStr = `
        <div class="wrap_result" onclick="wrapResult_onclick(event)">
            <h1 class="white_color">O</h1>
            <h2>Chiến thắng!</h2>
        </div>
    `;
    o_win_count += 1;
    o_win_el.innerText = o_win_count;
  } else
    htmlStr = `
    <div class="wrap_result" onclick="wrapResult_onclick(event)">
        <div class="flex">
            <h1>X</h1>
            <h1 class="white_color space_l-10">O</h1>
        </div>
        <h2>Hoà!</h2>
    </div>
  `;

  wrapBroad.innerHTML = htmlStr;
}

function swap_turn(id) {
  X_icon.classList.remove("selected");
  O_icon.classList.remove("selected");

  const el = id === "x_i" ? X_icon : O_icon;
  selection = id;

  el.classList.add("selected");
}

function broad_node_click(e) {
  e.preventDefault();

  const broadNode = e.target;
  //     e.target.nodeName === "DIV" ? e.target : e.target.parentElement;
  const index = parseInt(broadNode.getAttribute("index"));

  //   if ([...broadNode.classList].includes("node_selected")) return;

  //   broadNode.classList.add("node_selected");

  //   const htmlStr =
  //     selection === "x_i"
  //       ? `<h1 index="x_${index}" class="broad_node_x">X</h1>`
  //       : `<h1 index="o_${index}" class="white_color broad_node_o">O</h1>`;

  //   broadNode.innerHTML = htmlStr;
  const text = selection === "x_i" ? "X" : "O";
  const className = selection === "x_i" ? "black_color" : "white_color";

  broadNode.innerText = text;
  broadNode.classList.add(className);
  broadNode.disabled = true;

  if (ob[selection]) ob[selection].push(index + 1);
  else ob[selection] = [index + 1];

  const isWin = checkWin(selection);

  if (isWin !== -1) {
    showResult(isWin);
    return;
  }

  selection = selection === "x_i" ? "o_i" : "x_i";
  wrap_title.innerHTML = `
    <p>Lượt chơi của:</p>
    <h2>${selection === "x_i" ? "X" : "O"}</h2>
  `;

  swap_turn(selection);
}

function selection_icon(e) {
  e.preventDefault();
  const el = e.target;

  swap_turn(el.getAttribute("index"));
}

function re_start() {
  clearBroad();
  createBroad();
}
