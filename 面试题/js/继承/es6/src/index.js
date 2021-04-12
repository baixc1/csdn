class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return this.x + "" + this.y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); //调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + " " + super.toString(); // 调用父类的toString()
  }
}

var colorPoint = new ColorPoint("1", "2", "red");

for (let key in colorPoint) {
  console.log(key);
}

console.log(colorPoint);
