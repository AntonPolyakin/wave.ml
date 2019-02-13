/*tabs*/

	var tabs,
	tabcontents;

	function updateTabsItems(){
		tabs = document.querySelectorAll('.menu-tab');
		tabcontents = document.getElementById('tab-container').children;
	}
	function setSomeStyles(attr){
		for(let int=0;int<tabcontents.length;int++){
			if (tabcontents[int].getAttribute('data-tabcontent') == attr){
				tabcontents[int].style.width = 'auto';
				tabcontents[int].style.height = 'auto';
				tabcontents[int].style.overflow = 'hidden';
				tabcontents[int].style.visibility = 'visible';
				tabcontents[int].classList.add('tab-active');
			}
		}
	}

	function changeTab() {
		var tabchange = this.getAttribute('data-tabcontent');
		for(let int=0;int<tabcontents.length;int++){
			
			tabcontents[int].classList.remove('tab-active');
			tabcontents[int].style.height = '0';
			tabcontents[int].style.width = '0';
			tabcontents[int].style.padding = '0';
			tabcontents[int].style.overflow = 'auto';
			tabcontents[int].style.visibility = 'hidden';

		}
		
		for(let int=0;int<tabs.length;int++){
			if(tabs[int].classList.contains("current-tab")){
				tabs[int].classList.remove('current-tab');
			}
		}	

		this.classList.add('current-tab');
		window.scrollTo(0, 0);
		setSomeStyles(tabchange);
	}	

	updateTabsItems();
	for(var index=0;index<tabs.length;index++){
		tabs[index].mynum=index;
		tabs[index].addEventListener('click', changeTab, false);
	}
	setSomeStyles('search');

/*end of tabs*/