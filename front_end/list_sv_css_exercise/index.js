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

//Add event
btnAdd.addEventListener("click", addNewItem);
btnUpdate.addEventListener("click", updateItem);
btnDelete.addEventListener("click", btn_delete_click);

window.addEventListener("load", () => {
  table.innerHTML = createHtmlString(arr);
});

//table data default
const arr = [
  {
    studentId: "191211001",
    studentName: "Vũ Huy Hoàng",
    birthDay: "2001-06-12",
    geneder: "Nam",
    faculty: "Công nghệ thông tin",
  },
  {
    studentId: "191211002",
    studentName: "Vũ Quốc Huy",
    birthDay: "2001-05-06",
    geneder: "Nam",
    faculty: "Ngôn ngữ anh",
  },
  {
    studentId: "191211003",
    studentName: "Nguyễn Thị Huệ",
    birthDay: "2001-01-17",
    geneder: "Nữ",
    faculty: "Du lịch",
  },
  {
    studentId: "191211004",
    studentName: "Nguyễn Đình Quyết",
    birthDay: "2001-02-30",
    geneder: "Nam",
    faculty: "Môi trường",
  },
  {
    studentId: "191211005",
    studentName: "Lê Duy Quang",
    birthDay: "2001-09-21",
    geneder: "Nam",
    faculty: "Công nghệ thông tin",
  },
  {
    studentId: "191211006",
    studentName: "Phạm Thị Ngọc Anh",
    birthDay: "2001-06-15",
    geneder: "Nữ",
    faculty: "Công nghệ thông tin",
  },
  {
    studentId: "191211007",
    studentName: "Lương Thị Thuỷ",
    birthDay: "2001-03-07",
    geneder: "Nữ",
    faculty: "Du lịch",
  },
  {
    studentId: "191211008",
    studentName: "Phạm Mạnh Chính",
    birthDay: "2001-01-20",
    geneder: "Nam",
    faculty: "Công nghệ thông tin",
  },
  {
    studentId: "191211009",
    studentName: "Nguyễn Văn Lương",
    birthDay: "2001-09-22",
    geneder: "Nam",
    faculty: "Công nghệ thông tin",
  },
  {
    studentId: "191211010",
    studentName: "Nguyễn Tuấn Hùng",
    birthDay: "2001-04-29",
    geneder: "Nam",
    faculty: "Du lịch",
  },
];
let selectedIndex = -1;

//use chosse row
function rowClick(e) {
  let el = e.target;
  while (el.nodeName !== "TR") {
    el = el.parentElement;
  }
  const index = el.getAttribute("index");

  studentIdInput.value = arr[index].studentId;
  studentNameInput.value = arr[index].studentName;
  studentBirthdayInput.value = arr[index].birthDay;
  if (arr[index].geneder === "Nam") radioMale.checked = true;
  else radioFamale.checked = true;
  select.value = arr[index].faculty;

  selectedIndex = index;
}

//search function
function search(search_value) {
  const newArr = arr.filter((item) => {
    return item.studentName
      .toLocaleLowerCase()
      .includes(search_value.toLocaleLowerCase());
  });

  return newArr;
}

//use search
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
          <tr index=${index} onclick="rowClick(event)">       
              <td class="row row_checbox center"><input type="checkbox" /></td>
              <td class="row left">${item.studentId}</td>
              <td class="row left min_width-200">${item.studentName}</td>
              <td class="row center min_width-100">${formatDateVN(
                item.birthDay
              )}</td>
              <td class="row center min_width-100">${item.geneder}</td>
              <td class="row left">${item.faculty}</td>
              <td class="row center min_width-100">
                  <i class="fa-solid fa-pencil btn_edit"></i>
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
  select.value = "Công nghệ thông tin";
}

//add new item
function addNewItem(e) {
  if (
    studentIdInput.value !== "" &&
    studentNameInput.value !== "" &&
    select.value !== ""
  ) {
    e.preventDefault();
  }

  const obj = {
    studentId: studentIdInput.value,
    studentName: studentNameInput.value,
    birthDay: studentBirthdayInput.value,
    geneder: radioMale.checked ? "Nam" : "Nữ",
    faculty: select.value,
  };

  arr.push(obj);

  table.innerHTML = createHtmlString(arr);
  ClearInput();
}

//update item
function updateItem(e) {
  if (
    studentIdInput.value !== "" &&
    studentNameInput.value !== "" &&
    select.value !== ""
  ) {
    e.preventDefault();
  }

  const obj = {
    studentId: studentIdInput.value,
    studentName: studentNameInput.value,
    birthDay: studentBirthdayInput.value,
    geneder: radioMale.checked ? "Nam" : "Nữ",
    faculty: select.value,
  };

  arr[selectedIndex] = { ...obj };

  table.innerHTML = createHtmlString(arr);
  ClearInput();
}

//delete item when click to delete button
function btn_delete_click(e) {
  if (
    studentIdInput.value !== "" &&
    studentNameInput.value !== "" &&
    select.value !== ""
  ) {
    e.preventDefault();
  }

  deleteItem(selectedIndex);
}

//delete item when click to icon button
function icon_delete_click(e) {
  if (
    studentIdInput.value !== "" &&
    studentNameInput.value !== "" &&
    select.value !== ""
  ) {
    e.preventDefault();
  }

  let el = e.target;
  while (el.nodeName !== "TR") {
    el = el.parentElement;
  }

  deleteItem(el.getAttribute("index"));
}

//function perform delete item
function deleteItem(index) {
  arr.splice(index, 1);

  table.innerHTML = createHtmlString(arr);
  ClearInput();
}
