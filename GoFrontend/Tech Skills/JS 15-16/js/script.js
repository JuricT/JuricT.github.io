;
//==========================================
//===             First part             ===
//===  Make a search box as Google.com   ===
//==========================================
var $resultWrapper;

$(function() {

	$('.search-form').on('submit', searchSubmit);
	$('.search-input').on('keypress', searchSubmit)

	searchSubmit();

	function searchSubmit(e){
		if (e) {
			if (e.type === 'submit') e.preventDefault();
			if ((e.type === 'keypress')&&(e.keyCode !== 13)) return;
		}

		var searchRequest = $('.search-input')[0].value;

		$resultWrapper = $('.result-wrapper');

		$.ajax({
			url: 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&key=ABQIAAAACKQaiZJrS0bhr9YARgDqUxQBCBLUIYB7IF2WaNrkYqF0tBovNBQFDtM_KNtb3xQxWff2mI5hipc3lg&q=' + searchRequest + '&callback=googleCallback&context=?',
			dataType: 'jsonp',
			method: 'GET',
		});//close $.ajax
	};

});//close main jQuery

function googleCallback(jQuery, data) {
	var searchArticleDoom;

	var searchArticleTemplate = $('#search-article-template').html();

	$resultWrapper.html('');

	data.results.forEach(function(item){
		searchArticleDoom = tmpl(searchArticleTemplate, item);
		$resultWrapper.append(searchArticleDoom);
	});
};//close GoogleCallback

//==========================================
//===            Second part             ===
//===  Object Oriented Programming (OOP) ===
//==========================================

function Human(){};
function Worker(){};
function Student(){};

var human = new Human();
human.name = 'Bill';
human.age = 24;
human.sex = true;
human.height = 150;
human.weight = 75;

Worker.prototype = human;
var worker = new Worker();

worker.company = 'Google';
worker.salary = 5000;
worker.working = function(){console.log("work as a programmer - it's cool")};

Student.prototype = human;
var student = new Student();

student.institution = 'DPI';
student.stipend = 120;
student.watchTVShows = function(){
	console.log('institution - ' + this.institution);
};

console.log(student);
console.log(student.name);
console.log(student.age);