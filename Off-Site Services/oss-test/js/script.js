'use strict';

var sourcePage = getSourcePage();

setPageTitle(sourcePage.title);

var menuHeader = new Menu(sourcePage.menuHeader);

// Methods

function getSourcePage() {
  var sourcePage = {
    title: 'oss-test',
    menuHeader: {
      elem: document.getElementById('menu-heder'),
      items: [
        {
          title: 'Home',
          link: '#'
        },
        {
          title: 'Portfolio',
          link: '#'
        },
        {
          title: 'Blog',
          link: '#'
        },
        {
          title: 'Contact',
          link: '#'
        }
      ]
    }
  };
  
  return sourcePage;
}

function setPageTitle(title) {
  var elemTitle = document.getElementsByTagName('title');
  elemTitle[0].text = title;
}

// Classes

function Menu(options) {
  var menuWrapper = options.elem;
  var menu = getMenu();
  
  menuWrapper.insertBefore(menu, menuWrapper.firstChild);
  
  function getMenu() {
    if (!menu) renderMenu();
    return menu;
  }
  
  function renderMenu() {
    menu = document.createElement('nav');
    
    menu.className = 'menu clearfix';
    
    menu.onmousedown = function () {
      return false;
    };

    menu.onclick = function (event) {
    };
    
    renderItems(options);
  }
  
  function renderItems(options) {
    var itemsMenu = options.items || [];
    
    var listMenu = document.createElement('ul');
    
    itemsMenu.forEach(function (item) {
      var listItem = document.createElement('li');
      listItem.className = 'menu__item';
      
      var link = document.createElement('a');
      link.className = 'link link_menu';
      link.textContent = item.title;
      link.href = item.link;
      
      listItem.appendChild(link);
      
      listMenu.appendChild(listItem);
    });
    
    menu.appendChild(listMenu);
  }
  
  this.getMenu = getMenu;
}