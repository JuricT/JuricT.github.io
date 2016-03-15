var base, exponent;

base = prompt("Введите число", "1");
exponent = prompt("Введите число", "1");
console.log("Число " + base + " в степени " + exponent + " = " + pow(base, exponent));

function pow(base, exponent) {
	var result = 1;

	if (base == 0) return 0;
	if (exponent == 0) return 1;

	for (var i = 0; i < exponent; i++) {
		result *= base;
	}
	return result;
}