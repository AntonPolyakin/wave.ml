/*tabs*/

var tabs,
	tabcontents;

function updateTabsItems() {
	tabs = document.querySelectorAll('.menu-tab');
	tabcontents = document.getElementById('tab-container').children;
}

function setSomeStyles(attr) {
	for (let int = 0; int < tabcontents.length; int++) {
		if (tabcontents[int].getAttribute('data-tabcontent') == attr) {

			tabcontents[int].classList.add('tab-active');
		}
	}
}

function changeTab() {
	var tabchange = this.getAttribute('data-tabcontent');
	for (let int = 0; int < tabcontents.length; int++) {

		tabcontents[int].classList.remove('tab-active');

	}

	for (let int = 0; int < tabs.length; int++) {
		if (tabs[int].classList.contains("current-tab")) {
			tabs[int].classList.remove('current-tab');
		}
	}

	this.classList.add('current-tab');
	window.scrollTo(0, 0);
	setSomeStyles(tabchange);
}

updateTabsItems();
for (var index = 0; index < tabs.length; index++) {
	tabs[index].mynum = index;
	tabs[index].addEventListener('click', changeTab, false);
}

changeTab.call(document.querySelector('[data-tabcontent="search"]'));
/*end of tabs*/