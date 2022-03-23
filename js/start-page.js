export let startPageHome = () => {
  let rotationPage = false;
  do {
    heightPageHome();
    rotationPage = screen.orientation.onchange = function () {
      location.reload();
    };
  } while (rotationPage == false);
  heightPageHome();
  initModal();
};

function heightPageHome() {
  let heightWindow = Number(window.innerHeight);
  let heightLogo = Number(document.getElementById("header-home").offsetHeight);
  let heightText = Number(document.getElementById("introduction").offsetHeight);
  let heightContacts = Number(
    document.getElementById("info-contacts").offsetHeight
  );
  let sumAll = heightWindow - (heightLogo + heightText + heightContacts);
  let containerMain = document.getElementById("main-home");
  containerMain.style.height = sumAll + "px";
}

function initModal() {
  const openModal = document.querySelector('[data-modal="openModal"]');
  const closeModal = document.querySelector('[data-modal="closeModal"]');
  const containerModal = document.querySelector(
    '[data-modal="containerContacts"]'
  );
  if (openModal && closeModal && containerModal) {
    let toogle = function (event) {
      event.preventDefault();
      containerModal.classList.toggle("active");
    };
    let outside = function (event) {
      if (event.target === this) {
        event.preventDefault();
        containerModal.classList.toggle("active");
      }
    };
    openModal.addEventListener("click", toogle);
    closeModal.addEventListener("click", toogle);
    containerModal.addEventListener("click", outside);
  }
}
