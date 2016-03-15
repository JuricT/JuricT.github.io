var userNameArr = [];
var enteredString;

for (var i = 0; i < 5; i++) {
	enteredString = prompt("Добавьте имя (" + (i + 1) + " из 5)", "");
	userNameArr.push(enteredString);
}

enteredString = prompt("Введите имя пользователя", "");

var conformity = -1;
for (var i = 0; i < 5; i++) {
	if (userNameArr[i] === enteredString) {
		conformity = i;
		break;
	}
}

(conformity >= 0) ? alert(userNameArr[conformity] + ", Вы успешно вошли.")
				 : alert("Такого имени нет в базе");