let elinput = document.querySelector(".crud__img_input");
let elImg = document.querySelector(".render__img");
let elModalWrapper = document.querySelector(".modal__wrapper");
let elModal = document.querySelector(".modal");
let elAddBtn = document.querySelector(".students__add_btn");

let elList = document.querySelector(".students__list");

let elSearchInput = document.querySelector(".crud__header_input");
let elLogoutBtn = document.querySelector(".crud__logout_btn");
//  =========== User img start ==================

elinput.addEventListener("change", function (evt) {
  elImg.src = URL.createObjectURL(evt.target.files[0]);
});

//  =========== User img end ==================

//================== modal  start================

let addUser = JSON.parse(window.localStorage.getItem("addUser")) || [];

elAddBtn.addEventListener("click", function () {
  elModalWrapper.classList.add("open__modal");
  elModal.innerHTML = `
    <form class="add__form_submit">
    <label class="">
        <div class="user__img">
           <img class="render__image" src="./images/user__img.png"/>
        </div>
           <input class="add__input"  type="file"  />
    </label>
        <div class="user__input_box">
           <input class="user__input" type="text" placeholder="Enter your name"/>
           <input class="user__input" type="email" placeholder="Enter your email"/>
           <input class="user__input" type="number" placeholder="Enter your phone number"/>
           <input class="user__input" type="number" placeholder="Enter your Enroll Number"/>
           </div>
           <button class="user__submit">Submit</buttton>    
    </form>
  `;

  let elForm = document.querySelector(".add__form_submit");
  let elInputChange = document.querySelector(".add__input");
  let elRenderImg = document.querySelector(".render__image");

  elInputChange.addEventListener("change", function (evt) {
    elRenderImg.src = URL.createObjectURL(evt.target.files[0]);
  });

  elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const data = {
      id: addUser.length + 1,
      img: URL.createObjectURL(evt.target[0].files[0]),
      name: evt.target[1].value,
      email: evt.target[2].value,
      phoneNumber: evt.target[3].value,
      EnrollNumber: evt.target[4].value,
    };

    addUser.push(data);
    renderAddUser(addUser, elList);
    window.localStorage.setItem("addUser", JSON.stringify(addUser));
    elModalWrapper.classList.remove("open__modal");
  });
});

elModalWrapper.addEventListener("click", function (evt) {
  if (evt.target.id == "modal__wrapper") {
    elModalWrapper.classList.remove("open__modal");
  }
});

//================== modal  end================

// ===========render start ==============
function renderAddUser(arr, list) {
  list.innerHTML = "";
  arr.map((item) => {
    let elItem = document.createElement("li");
    elItem.innerHTML = `
      <div class="user__item_box">
          <div class="user__image user__item_text">
              <img src=${item.img} width="70" height="70" />
          </div> 
          <div class="user__item_text">
              ${item.name}
          </div>
          <div class="user__item_text">
              ${item.email}
          </div>
          <div class="user__item_text">
              ${item.phoneNumber}
          </div>
          <div class="user__item_text">
              ${item.EnrollNumber}
          </div> 
          <div>
             <button onclick="updateItem(${item.id})" class="user__item_btn">
                  <img src="./images/update.svg" width="15px" height="15px" />
             </button>
             <button onclick="deleteItem(${item.id})" class="user__item_btn">
                  <img src="./images/delete.svg" width="15px" height="15px" />
             </button>
          </div>
      </div>
    `;

    elList.appendChild(elItem);
  });
}

renderAddUser(addUser, elList);

// ===========render end ==============

//======================== Update part start ====================

function updateItem(id) {
  let data = addUser.find((item) => item.id == id);
  elModalWrapper.classList.add("open__modal");
  elModal.innerHTML = `
    <form class="update__form_submit">
    <label class="">
        <div class="user__img">
           <img class="update__render_image" src="${data.img}"/>
        </div>
           <input class="update__input"  type="file"  />
    </label>
        <div class="user__input_box">
           <input value="${data.name}" class="user__input" type="text" placeholder="Enter your name"/>
           <input value="${data.email}" class="user__input" type="email" placeholder="Enter your email"/>
           <input value="${data.phoneNumber}" class="user__input" type="number" placeholder="Enter your phone number"/>
           <input value="${data.EnrollNumber}" class="user__input" type="number" placeholder="Enter your Enroll Number"/>
           </div>
           <button class="user__submit">Submit</buttton>    
    </form>
  `;

  let elUpdateForm = document.querySelector(".update__form_submit");
  let elUpdateInputImg = document.querySelector(".update__render_image");
  let elUpdateInput = document.querySelector(".update__input");
  elUpdateInput.addEventListener("change", function (evt) {
    elUpdateInputImg.src = URL.createObjectURL(evt.target.files[0]);
  });

  elUpdateForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    data.img = elUpdateInputImg.src;
    data.name = evt.target[1].value;
    data.email = evt.target[2].value;
    data.phoneNumber = evt.target[3].value;
    data.EnrollNumber = evt.target[4].value;

    elModalWrapper.classList.remove("open__modal");
    renderAddUser(addUser, elList);
    window.localStorage.setItem("addUser", JSON.stringify(addUser));
  });
}

//======================== Update part end ====================

//================= delete start =====================
function deleteItem(id) {
  elModalWrapper.classList.add("open__modal");
  elModal.innerHTML = `
  <div class="delete__wrapper">
       <h2>Are you sure delete</h2>
       <div class="delete__box">
            <button class="user__delete_btn" onclick="deleteSureBtn(${id})">ok</button>
            <button class="user__cencel_btn" onclick="cencelModal()">cencel</button>
       </div>
  </div>
  `;
}
function cencelModal() {
  elModalWrapper.classList.remove("open__modal");
}

function deleteSureBtn(id) {
  const finedIndex = addUser.findIndex((item) => item.id == id);
  elModalWrapper.classList.remove("open__modal");
  addUser.splice(finedIndex, 1);
  window.localStorage.setItem("addUser", JSON.stringify(addUser));
  renderAddUser(addUser, elList);
}

//================= delete end =====================

//  ============= search start ===============

elSearchInput.addEventListener("keyup", function (evt) {
  const inputVal = evt.target.value.trim();
  const data = addUser.filter((item) =>
    item.name.toLowerCase().includes(inputVal.toLowerCase())
  );
  renderAddUser(data, elList);
});

//  ============= search end ===============

// logout

elLogoutBtn.addEventListener("click", function () {
  setTimeout(() => {
    window.location = "/login.html";
  }, 1000);
});
