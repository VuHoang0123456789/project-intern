//class start
class Faculty {
  constructor(facultyId, facultyName) {
    this.facultyId = facultyId;
    this.facultyName = facultyName;
  }
}

class Students {
  constructor({ studentId, studentName, birthDay, geneder, fatultyId }) {
    this.studentId = studentId;
    this.studentName = studentName;
    this.birthDay = birthDay;
    this.geneder = geneder;
    this.fatultyId = fatultyId;
  }
}
//class end

const table = document.getElementsByClassName("table_js")[0];
const formEdit = document.getElementsByClassName("form_edit")[0];
const btnAdd = document.getElementsByClassName("btn_add-js")[0];
const btnUpdate = document.getElementsByClassName("btn_update-js")[0];
const btnDelete = document.getElementsByClassName("btn_delete-js")[0];
const studentIdInput = document.getElementsByClassName("student_id-js")[0];
const studentNameInput = document.getElementsByClassName("student_name-js")[0];
const studentBirthdayInput = document.getElementsByClassName(
  "student_birthday-js"
)[0];
const inputSearch = document.getElementsByClassName("input_search-js")[0];
const radioMale = document.getElementById("male");
const radioFamale = document.getElementById("famale");
const select = document.getElementById("faculty");
const formMsg = document.getElementsByClassName("form_msg")[0];
const wrapMsgContent = document.getElementsByClassName("wrap_msg-content")[0];

window.addEventListener("load", () => {
  table.innerHTML = createHtmlString(students);

  select.innerHTML = Object.entries(faculties)
    .map((item) => `<option value="${item[0]}">${item[1]}</option>`)
    .join("");
});

//table data default
let selectedIndex = -1;
let faculties = {
  cntt: "Công nghệ thông tin",
  nna: "Ngôn ngữ anh",
  dl: "Du lịch",
  mt: "Môi trường",
};
let students = [
  {
    studentId: "191211001",
    studentName: "Vũ Huy Hoàng",
    birthDay: "2001-06-12",
    geneder: "Nam",
    fatultyId: "cntt",
  },
  {
    studentId: "191211002",
    studentName: "Vũ Quốc Huy",
    birthDay: "2001-05-06",
    geneder: "Nam",
    fatultyId: "nna",
  },
  {
    studentId: "191211003",
    studentName: "Nguyễn Thị Huệ",
    birthDay: "2001-01-17",
    geneder: "Nữ",
    fatultyId: "dl",
  },
  {
    studentId: "191211004",
    studentName: "Nguyễn Đình Quyết",
    birthDay: "2001-02-28",
    geneder: "Nam",
    fatultyId: "mt",
  },
  {
    studentId: "191211005",
    studentName: "Lê Duy Quang",
    birthDay: "2001-09-21",
    geneder: "Nam",
    fatultyId: "cntt",
  },
  {
    studentId: "191211006",
    studentName: "Phạm Thị Ngọc Anh",
    birthDay: "2001-06-15",
    geneder: "Nữ",
    fatultyId: "cntt",
  },
  {
    studentId: "191211007",
    studentName: "Lương Thị Thuỷ",
    birthDay: "2001-03-07",
    geneder: "Nữ",
    fatultyId: "dl",
  },
  {
    studentId: "191211008",
    studentName: "Phạm Mạnh Chính",
    birthDay: "2001-01-20",
    geneder: "Nam",
    fatultyId: "cntt",
  },
  {
    studentId: "191211009",
    studentName: "Nguyễn Văn Lương",
    birthDay: "2001-09-22",
    geneder: "Nam",
    fatultyId: "cntt",
  },
  {
    studentId: "191211010",
    studentName: "Nguyễn Tuấn Hùng",
    birthDay: "2001-04-29",
    geneder: "Nam",
    fatultyId: "dl",
  },
];
let student;
let selectedIndexs = [];

//use chosse row
function rowClick(e) {
  let el = e.target;
  while (el.nodeName !== "TR") {
    el = el.parentElement;
  }
  const index = el.getAttribute("index");

  if (!students[index]) return;

  studentIdInput.value = students[index].studentId;
  studentNameInput.value = students[index].studentName;
  studentBirthdayInput.value = students[index].birthDay;
  if (students[index].geneder === "Nam") radioMale.checked = true;
  else radioFamale.checked = true;
  select.value = students[index].fatultyId;

  selectedIndex = index;
}

//func event start
//use search

function selectionRow(obj) {
  const index = obj.getAttribute("index");
  const deleteIndex = selectedIndexs.findIndex(
    (item) => item === parseInt(index)
  );

  if (obj.checked) {
    selectedIndexs.push(parseInt(index));
    return;
  }

  if (deleteIndex === -1) return;

  selectedIndexs.splice(deleteIndex, 1);
}
function checkInput(obj) {
  setTimeout(() => {
    const newArr = search(obj.value);

    table.innerHTML = createHtmlString(newArr);
  }, 800);
}

//use search when click to button search
function btn_search_click(e) {
  e.preventDefault();

  const newArr = search(inputSearch.value);
  table.innerHTML = createHtmlString(newArr);
}

//add new item
function btn_add_handleClick(e) {
  if (
    studentIdInput.value !== "" &&
    studentNameInput.value !== "" &&
    select.value !== ""
  ) {
    e.preventDefault();
  }

  const isNone = CheckNoneInput();

  if (isNone) return;

  const obj = {
    studentId: studentIdInput.value,
    studentName: studentNameInput.value,
    birthDay: studentBirthdayInput.value,
    geneder: radioMale.checked ? "Nam" : "Nữ",
    fatultyId: select.value,
  };

  addNewItem(obj);

  table.innerHTML = createHtmlString(students);
  ClearInput();
}

//update item
function btn_update_handelClick(e) {
  if (
    studentIdInput.value !== "" &&
    studentNameInput.value !== "" &&
    select.value !== ""
  ) {
    e.preventDefault();
  }

  const isNone = CheckNoneInput();

  if (isNone) return;

  const obj = {
    studentId: studentIdInput.value,
    studentName: studentNameInput.value,
    birthDay: studentBirthdayInput.value,
    geneder: radioMale.checked ? "Nam" : "Nữ",
    fatultyId: select.value,
  };

  updateItem(obj, selectedIndex);

  table.innerHTML = createHtmlString(students);
  ClearInput();
}

//delete item when click to delete button
function btn_delete_click() {
  deleteMutipleItem(selectedIndexs);

  table.innerHTML = createHtmlString(students);
  ClearInput();

  formMsg.style.display = "none";
}

function showFormMessage(e) {
  e.preventDefault();

  if (selectedIndexs.length === 0) return;

  const msgStr =
    selectedIndexs.length > 1
      ? "Bạn có chắc muốn xoá thông tin của những sinh viên này không? Khi đã xoá sẽ không khôi phục được lại."
      : "Bạn có chắc muốn xoá thông tin của sinh viên này không? Khi đã xoá sẽ không khôi phục được lại.";

  wrapMsgContent.innerText = msgStr;
  formMsg.style.display = "flex";
}

//delete item when click to icon button
function icon_delete_click(e) {
  formMsg.style.display = "flex";
}

function icon_edit_onClick(e) {
  let el = e.target;
  while (el.nodeName !== "TR") {
    el = el.parentElement;
  }
  const index = el.getAttribute("index");

  if (!students[index]) return;

  studentIdInput.value = students[index].studentId;
  studentNameInput.value = students[index].studentName;
  studentBirthdayInput.value = students[index].birthDay;
  if (students[index].geneder === "Nam") radioMale.checked = true;
  else radioFamale.checked = true;
  select.value = students[index].fatultyId;

  selectedIndex = index;

  studentIdInput.disabled = true;
}

function btn_cancel_click() {
  formMsg.style.display = "none";
}

//func event end

//add new item
function addNewItem(obj) {
  student = new Students({ ...obj });

  students.push(student);
}

//update item
function updateItem({ studentId, ...obj }) {
  student = { studentId, ...obj };
  const index = students.findIndex((item) => item.studentId === studentId);

  if (index === -1) return;

  students[index] = { ...student };
}

//delete item
function deleteItem(studentId) {
  const index = students.findIndex((item) => item.studentId === studentId);
  if (index === -1) return;

  students.splice(index, 1);
}

function deleteMutipleItem(indexs) {
  students = students.filter((item, index) => {
    return indexs.indexOf(index) === -1;
  });
}
//function render result of search
function createHtmlString(students) {
  let newArr = [
    `
        <tr>
            <th class="header_row check_box-column center"></th>
            <th class="header_row left">Mã sinh viên</th>
            <th class="header_row left min_width-200">Tên sinh viên</th>
            <th class="header_row center min_width-100">Ngày sinh</th>
            <th class="header_row center min_width-100">Giới tính</th>
            <th class="header_row left">Khoa</th>
            <th class="header_row center min_width-100">Thao tác</th>
        </tr>
    `,
  ];

  const newStudents = students.map((item, index) => {
    const htmlsTring = `       
          <tr index=${index}>       
              <td class="row row_checbox center">
                <input index = '${index}' type="checkbox" onchange="selectionRow(this)"/>
              </td>
              <td class="row left">${item.studentId}</td>
              <td class="row left min_width-200">${item.studentName}</td>
              <td class="row center min_width-100">${formatDateVN(
                item.birthDay
              )}</td>
              <td class="row center min_width-100">${item.geneder}</td>
              <td class="row left">${faculties[item.fatultyId]}</td>
              <td class="row center min_width-100">
                  <i class="fa-solid fa-pencil btn_edit" onclick = "icon_edit_onClick(event)"></i>
                  <i onclick = "icon_delete_click(event)" class="fa-regular fa-trash-can btn_delete"></i>
              </td>
          </tr>
      `;

    return htmlsTring;
  });

  newArr = [...newArr, ...newStudents];

  return newArr.join(" ");
}

//function format date vn
function formatDateVN(date) {
  const dates = date.split("-");

  return `${dates[2]}/${dates[1]}/${dates[0]}`;
}

//clear input where user change data
function ClearInput() {
  studentIdInput.value = "";
  studentNameInput.value = "";
  studentBirthdayInput.value = "";
  radioMale.checked = true;
  select.value = "cntt";
  studentIdInput.disabled = false;
  selectedIndexs = [];
  selectedIndex = -1;
}

//search function
function search(search_value) {
  const newArr = students.filter((item) => {
    return (
      item.studentName
        .toLocaleLowerCase()
        .includes(search_value.toLocaleLowerCase()) ||
      item.studentId
        .toLocaleLowerCase()
        .includes(search_value.toLocaleLowerCase())
    );
  });

  return newArr;
}

function CheckNoneInput() {
  const errorMsgs = document.getElementsByClassName("error_msg");
  const error = {};
  if (studentIdInput.value === "") error["studentId"] = true;
  if (studentNameInput.value === "") error["studentName"] = true;
  if (studentBirthdayInput.value === "") error["birthDay"] = true;

  for (let index = 0; index < errorMsgs.length; index++) {
    if (error[errorMsgs[index].getAttribute("name")])
      errorMsgs[index].style.display = "block";
    else errorMsgs[index].style.display = "none";
  }

  if (Object.entries(error).length > 0) return true;

  return false;
}
