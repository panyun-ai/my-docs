class Employee {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  toString() {
    console.log(this.name + "-", this.age);
  }
}

const employee1 = new Employee("张三", 100);
const employee2 = new Employee("李四", 18);

console.log(employee1);
console.log(employee2);

employee1.toString();
employee2.toString();
