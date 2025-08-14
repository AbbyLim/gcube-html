document.addEventListener("DOMContentLoaded", function () {
  // GNB
  var btnNav = document.querySelector(".btn__nav");
  if (btnNav) {
    btnNav.addEventListener("click", function () {
	  document.documentElement.classList.toggle("nav-opened");
	  btnNav.classList.toggle("is-active");
    });
  }

  // 모달열기
  function modalOpen(obj) {
    var pops = obj.getAttribute("data-link");
    var popup = document.querySelector(pops);
		if (!popup) return;
		document.documentElement.classList.add("is-opened");
    if (popup.classList.contains("filter-layer")) {
			popup.style.display = "block";
			popup.style.transform = "translateY(100%)"; 
			popup.style.opacity = 1;
			setTimeout(function () {
				popup.style.transform = "translateY(0)";
			}, 10);
		} else {
			popup.style.display = "block";
			popup.style.opacity = 0;
			setTimeout(function () {
				popup.style.opacity = 1;
			}, 0);
		}
  }
	window.modalOpen = modalOpen;

  // 모달닫기
	function modalClose(obj) {
		var popup = obj.closest(".modal__container, .filter-layer");
		if (!popup) return;
		if (popup.classList.contains("filter-layer")) {
			popup.style.transform = "translateY(100%)";
			setTimeout(function () {
				popup.style.display = "none";
			}, 300);
		} else {
			// 기존 fade-out
			popup.style.opacity = 0;
			setTimeout(function () {
				popup.style.display = "none";
				popup.style.opacity = "";
			}, 500);
		}
		document.documentElement.classList.remove("is-opened");
	}
	window.modalClose = modalClose;

  // 모달열기 버튼
  document.querySelectorAll(".btn__modal").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      modalOpen(btn);
    });
  });

  // 모달닫기 버튼
  document.querySelectorAll(".modal__close").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      modalClose(btn);
    });
  });

  // 토글 버튼
  document.querySelectorAll(".btn__toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.classList.toggle("is-active");
    });
  });

	// 탭
	const tabWraps = document.querySelectorAll('.tab--wrap');
  tabWraps.forEach(tabWrap => {
    const isAccordion = tabWrap.classList.contains('accordion');
    const isFaq = tabWrap.classList.contains('faq--wrap');
    const tabTitles = tabWrap.querySelectorAll('.tab__title');
    tabTitles.forEach(title => {
      title.addEventListener('click', () => {
        const windowWidth = window.innerWidth;
        if ((isAccordion && windowWidth < 1920) || isFaq) {
          if (title.classList.contains('is-active')) {
            title.classList.remove('is-active');
            return;
          }
        }
        tabTitles.forEach(t => t.classList.remove('is-active'));
        title.classList.add('is-active');
      });
    });
  });
});
