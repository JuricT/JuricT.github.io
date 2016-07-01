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

//Create class Human 
function Human(){
	var name,
			age,
			sex,
			height,
			weight;
	this.setName = function(setName){
		name = setName;
	};

	this.getName = function(){
		return name;
	};

	this.setAge = function(setAge){
		age = setAge;
	};

	this.getAge = function(){
		return age;
	};

	this.setSex = function(setSex){
		sex = setSex;
	};

	this.getSex = function(){
		return (sex) ? 'муж.' : 'жен.' ;
	};

	this.setHeight = function(setHeight){
		height = setHeight;
	};

	this.getHeight = function(){
		return height;
	};

	this.setWeight = function(setWeight){
		weight = setWeight;
	};

	this.getWeight = function(){
		return weight;
	};
};

//Create class Worker
function Worker(){
	var company,
			salary;

	this.setCompany = function(setCompany){
		company = setCompany;
	};

	this.getCompany = function(){
		return company;
	};

	this.setSalary = function(setSalary){
		salary = setSalary;
	};

	this.getSalary = function(){
		return salary;
	};

	this.working = function(){
		console.log("work as a programmer - it's cool");
	};
};

//Create class Student
function Student(){
	var institution,
			stipend;

	this.setInstitution = function(setInstitution){
		institution = setInstitution;
	};

	this.getInstitution = function(){
		return institution;
	};

	this.setStipend = function(setStipend){
		stipend = setStipend;
	};

	this.getStipend = function(){
		return stipend;
	};

	this.watchTVShows = function(){
		console.log('institution - ' + this.institution);
	};
};

var human = new Human();

Worker.prototype = human;
var worker = new Worker();

Student.prototype = human;
var student = new Student();


//Create student
student.setName('Иван');
student.setAge(22);
student.setSex(true);
student.setHeight(180);
student.setWeight(85);

student.setInstitution('ДПИ');
student.setStipend(120);

console.log('Студент:');
console.log('Имя - ' + student.getName());
console.log('Возраст - ' + student.getAge());
console.log('Пол - ' + student.getSex());
console.log('Рост - ' + student.getHeight() + 'см');
console.log('Вес - ' + student.getWeight(85)+ 'кг');

console.log('Образовательное заведение - ' + student.getInstitution());
console.log('Размер стипендии - ' + student.getStipend() + 'грн');

//Create worker
worker.setName('Иван');
worker.setAge(22);
worker.setSex(true);
worker.setHeight(180);
worker.setWeight(85);

worker.setCompany('Google');
worker.setSalary(12000);

console.log('-------');
console.log('Рабочий:');
console.log('Имя - ' + worker.getName());
console.log('Возраст - ' + worker.getAge());
console.log('Пол - ' + worker.getSex());
console.log('Рост - ' + worker.getHeight() + 'см');
console.log('Вес - ' + worker.getWeight(85)+ 'кг');

console.log('Место работы - ' + worker.getCompany());
console.log('Размер оклада - ' + worker.getSalary() + 'грн');
