window.addEventListener("DOMContentLoaded", (e) => {
  const navMenu = document.getElementById("nav-menu"),
    navClose = document.getElementById("nav-close"),
    navToggle = document.getElementById("nav-toggle");

  if (navToggle) {
    navToggle.addEventListener("click", (e) => {
      navMenu.classList.add("show-menu");
    });
  }
  if (navClose) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  }

  const navLink = document.querySelectorAll(".nav__link");

  function linkAction() {
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show-menu");
  }
  navLink.forEach((n) => {
    n.addEventListener("click", linkAction);
  });

  const skillsContent = document.getElementsByClassName("skills__content"),
    skillsHeader = document.querySelectorAll(".skills__header");

  function toggle() {
    let itemClass = this.parentNode.className;
    for (let i = 0; i < skillsContent.length; i++) {
      skillsContent[i].className = "skills__content skills__close";
    }
    if (itemClass === "skills__content skills__close") {
      this.parentNode.className = "skills__content skills__open";
    } else {
      this.parentNode.className = "skills__content skills__close";
    }
  }
  skillsHeader.forEach((sh) => {
    sh.addEventListener("click", toggle);
  });

  const modalViews = document.querySelectorAll(".services__modal"),
    modalBtns = document.querySelectorAll(".services__button"),
    modalCloses = document.querySelectorAll(".services__modal-close");

  let modal = function (modalClick) {
    modalViews[modalClick].classList.toggle("active-modal");
  };
  modalBtns.forEach((mb, i) => {
    mb.addEventListener("click", () => {
      modal(i);
    });
  });

  modalCloses.forEach((mC, i) => {
    mC.addEventListener("click", () => {
      modal(i);
    });
  });

  /*SLIDER*/
  const listProjects = [
    ...document.querySelectorAll(".portfolio__slider-item"),
  ];
  const listButtonArrow = [
    document.querySelector(".portfolio__slider-icon-left"),
    document.querySelector(".portfolio__slider-icon-right"),
  ];
  let index = 0;

  listProjects.map((p) => {
    p.classList.add("projectDisable");
  });
  listProjects[index].classList.remove("projectDisable");
  listProjects[index].classList.add("projectEnable");

  function toggleProject(value) {
    index = index + value;
    if (index > listProjects.length - 1) {
      index = 0;
    }
    if (index < 0) {
      index = listProjects.length - 1;
    }

    listProjects.map((p) => {
      p.classList.replace("projectEnable", "projectDisable");
    });

    listProjects[index].classList.replace("projectDisable", "projectEnable");
  }
  listButtonArrow[0].addEventListener("click", () => toggleProject(-1));
  listButtonArrow[1].addEventListener("click", () => toggleProject(1));

  const topTop = document.querySelector(".to__top");

  window.addEventListener("scroll", () => {
    let scrollHight = window.scrollY;
    if (scrollHight > 500) {
      topTop.classList.add("to_top_active");
    } else {
      topTop.classList.remove("to_top_active");
    }
  });
  topTop.addEventListener("click", () => {
    window.scrollTo(0, 0);
  });

  const btnSendEmail = document.querySelector(".button__send-form");
  const modalSendEmail = document.querySelector(".send__modal");
  const closeModalSend = document.querySelector(".send__modal-close");
  const textMessageModalSend = document.querySelector(
    ".message__modal-send-email"
  );

  const listInputs = [...document.querySelectorAll(".input")];
  const listContentInputs = [...document.querySelectorAll(".contact__content")];

  closeModalSend.addEventListener("click", () => {
    modalSendEmail.classList.remove("active-modal");
  });

  function validateDataForm() {
    const regex =/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
    let aux = 0;
    for (let i = 0; i < listInputs.length; i++) {
      const input = listInputs[i];
      if (input.value === null || input.value === "" ) {
        listContentInputs[i].style.border = "1px solid red";
        aux++;
      }else if(regex.test(listInputs[1].value)===false){
        listContentInputs[1].style.border= "1px solid red";
        aux++;
      }
    }
    if (aux === 0) {
      return false;
    }else{
      return true;
    }
    
  }

  for (let j = 0; j < listInputs.length; j++) {
    const input = listInputs[j];
    input.addEventListener("input", () => {
      if (input.value !== null || input.value !== "") {
        listContentInputs[j].style.border = "none";
      }
    });
  }
  btnSendEmail.addEventListener("click", async (e) => {
    e.preventDefault();
    if(validateDataForm()===false){
      const serviceID = "default_service";
      const templateID = "template_00yrrm7";
      const response=await emailjs.send(serviceID, templateID,{
        name:listInputs[0].value,
        project:listInputs[2].value,
        message:listInputs[3].value,
        email:listInputs[1].value
      });
      if(response.status===200 && response.text==="OK"){
        textMessageModalSend.textContent="Enviado";
        modalSendEmail.classList.add("active-modal");
      }else{
        textMessageModalSend.textContent="No enviado";
        modalSendEmail.classList.add("active-modal");
      }

    }
  });
});
