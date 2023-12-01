# JS 常用设计模式

## 设计模式介绍

- 设计模式是一套方法论，为的是让我们的代码的`更简洁`、`可读性`、`可维护性`更高，当然也可以不必刻意的去套用；
- 在 JS 设计模式中，最核心的思想：`封装变化`;
- 实际的使用过程中更多的是多种模式一起使用。

## 构造器模式

> 基础的`面向对象`思想，对具有相同属性的一类对象进行**抽象**和**封装**

**用法**

```js
function Employee(name, age) {
  this.name = name;
  this.age = age;
  this.toString = function () {
    console.log(this.name + "-", this.age);
  };
}
const employee1 = new Employee("张三", 100);
const employee2 = new Employee("李四", 18);

console.log(employee1);
console.log(employee2);

employee1.toString();
employee2.toString();
```

**优缺点**

- 基于面向对象的思想，使得代码复用性增加，提高代码的维护性；
- 每次重新实例化一个对象都会为对象的行为开辟一个新的内存地址，增加内存的开销；

## 原型模式

> 基于构造器模式改造，优化实例化时开辟新内存的问题

**用法 ES5**

```js
function Employee(name, age) {
  this.name = name;
  this.age = age;
}
Employee.prototype.toString = function () {
  console.log(this.name + "-", this.age);
};

const employee1 = new Employee("张三", 100);
const employee2 = new Employee("李四", 18);

console.log(employee1);
console.log(employee2);

employee1.toString();
employee2.toString();
```

**用法 ES6**

```js
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
```

**优缺点**

- 实现面向对象封装的特性，使得代码复用性增加，提高代码的维护性；

## 简单工厂模式

> 创建对象，隐藏对象的具体实现细节，将对象的创建和使用分离，常用来创建同一个类的实例。

**用法**

```js
class User {
  constructor(role, pages) {
    this.role = role;
    this.pages = pages;
  }
}

class UserFactory {
  constructor() {}
  static instanceUser(role) {
    switch (role) {
      case "superadmin":
        return new User("superadmin", [
          "home",
          "user-manage",
          "right-manage",
          "news-manage",
        ]);
        break;
      case "admin":
        return new User("admin", ["home", "user-manage", "news-manage"]);
        break;
      case "editor":
        return new User("editor", ["home", "news-manage"]);
        break;
      default:
        throw new Error("参数错误");
    }
  }
}

const user1 = UserFactory.instanceUser("superadmin");
const user2 = UserFactory.instanceUser("admin");
const user3 = UserFactory.instanceUser("editor");

console.log(user1);
console.log(user2);
console.log(user3);
```

**优缺点**

- 你只需要一个正确的参数，就可以获取到你所需要的对象，而无需知道其创建的具体细节;
- 函数内包含了所有对象的创建逻辑和判断逻辑的代码，每增加新的构造函数还需要修改判断逻辑代码。当我们的对象较多时，这个函数会成为一个庞大的超级函数，便得难以维护;
- 简单工厂只能作用于**创建的对象数量较少，对象的创建逻辑不复杂时使用**;

## 抽象工厂模式

> 抽象工厂模式并不直接生成实例， 而是用于对产品类簇的创建。

**用法**

```js
class User {
  constructor(name) {
    this.name = name;
  }
  toString() {
    console.log(this.name, this.role);
  }
  isPermission() {
    throw new Error("该方法需要子类自己实现");
  }
}

class SuperadminUser extends User {
  constructor(name) {
    super(name);
    this.role = "superadmin";
    this.pages = ["home", "user-manage", "right-manage", "news-manage"];
  }
  isPermission() {
    console.log("SuperadminUser............isPermission");
    return true;
  }
}

class AdminUser extends User {
  constructor(name) {
    super(name);
    this.role = "admin";
    this.pages = ["home", "user-manage", "news-manage"];
  }
  isPermission() {
    console.log("AdminUser............isPermission");
    return true;
  }
}

class EditorUser extends User {
  constructor(name) {
    super(name);
    this.role = "editor";
    this.pages = ["home", "news-manage"];
  }
  isPermission() {
    console.log("EditorUser............isPermission");
    return true;
  }
}

class UserFactory {
  constructor() {}
  static instanceUser(role) {
    switch (role) {
      case "superadmin":
        return SuperadminUser;
        break;
      case "admin":
        return AdminUser;
        break;
      case "editor":
        return EditorUser;
        break;
      default:
        throw new Error("参数错误");
    }
  }
}

const user1 = new (UserFactory.instanceUser("superadmin"))("张三");
const user2 = new (UserFactory.instanceUser("admin"))("李四");
const user3 = new (UserFactory.instanceUser("editor"))("王五");

user1.isPermission();
user2.isPermission();
user3.isPermission();
```

**优缺点**

## 建造者模式

> 适用于对象构建过程相对复杂、有多个步骤且步骤相对固定的情况、每个步骤的实现差异化较大时，提供统一的构建过程，提高代码的可维护性和扩展性；

**用法**

```js
// 产品类
// 基础实例接口
class BaseDto {
  constructor() {}

  // 验证参数
  validate() {}
  // 获取数据
  getData() {}
  // 返回结果
  response() {
    console.log("response..........result");
  }
}

// 用户
class UserDto extends BaseDto {
  validate() {
    console.log("user.....validate");
  }
  getData() {
    console.log("user.....getData");
  }
}
// 角色
class RoleDto extends BaseDto {
  validate() {
    console.log("role.....validate");
  }
  getData() {
    console.log("user.....getData");
  }
}

// 定义过程
class Request {
  static loadList(builder) {
    builder.validate();
    builder.getData();
    builder.response();
  }
}

// 用户对象
const user = new UserDto();
const role = new RoleDto();

Request.loadList(user);
Request.loadList(role);
```

## 单例模式

> 保证一个类仅有一个实例，并提供一个访问它的全局访问点，主要解决一个全局使用的类频繁地创建和销毁，占用内存

**ES5 用法**

```js
function Request() {
  console.log("实例化请求对象");
  return {
    post: () => {
      console.log("post.....................");
    },
    get: () => {
      console.log("get.....................");
    },
  };
}

const HttpApi = (function () {
  let request = null;
  return function () {
    if (!request) {
      request = new Request();
    }
    return request;
  };
})();

const httpApi1 = new HttpApi();
const httpApi2 = new HttpApi();

console.log("http1 === http2", httpApi1 === httpApi2);
httpApi1.post();
httpApi2.get();
```

**ES6 用法**

```js
class Request {
  constructor() {
    console.log("实例化请求对象");
  }
  post() {
    console.log("post.....................");
  }
  get() {
    console.log("get.....................");
  }
}

class HttpApi {
  constructor() {
    if (!HttpApi.instance) {
      HttpApi.instance = new Request();
    }
    return HttpApi.instance;
  }
}

const httpApi1 = new HttpApi();
const httpApi2 = new HttpApi();

console.log("http1 === http2", httpApi1 === httpApi2);
httpApi1.post();
httpApi2.get();
```

**优缺点**

- 单例模式可以在多个模块中共享相同的实例，节省资源；
- 单例模式可以采用懒加载的方式，在需要时才创建实例，避免了不必要的资源消耗；
- 单例模式提供了一个全局访问点，使得其他对象可以轻松访问该单例实例；
- 单例模式引入全局状态，可能导致状态共享和耦合，不利于维护和测试；
- 单例模式的全局访问点可能隐藏了类的依赖关系，使得代码难以理解和维护；
- 过度使用单例模式可能导致全局变量的滥用，使得系统的结构变得复杂且难以扩展；
- 单例模式常常承担过多责任，既要负责自身的业务逻辑，又要负责管理全局状态。

## 策略模式

> 策略模式定义了一系列算法，并将每个算法封装起来，使它们可以相互替换，且算法的变化不会影响算法的使用。

> 该模式**主要解决**在有多种算法相似的情况下，使用 `if...else` 所带来的复杂和难以维护。它的**优点**是算法可以自由切换，同时可以避免多重`if...else`判断，且具有良好的扩展性。

**用法**

```js
// Strategy 接口
class PricingStrategy {
  calculatePrice(originalPrice) {}
}

// ConcreteStrategy 实现
class RegularPricing extends PricingStrategy {
  calculatePrice(originalPrice) {
    return originalPrice;
  }
}

class SalePricing extends PricingStrategy {
  calculatePrice(originalPrice) {
    return originalPrice * 0.8; // 8折
  }
}

class ClearancePricing extends PricingStrategy {
  calculatePrice(originalPrice) {
    return originalPrice * 0.5; // 5折
  }
}

// Context
class ShoppingCart {
  constructor(pricingStrategy) {
    this.pricingStrategy = pricingStrategy;
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  calculateTotal() {
    let total = this.items.reduce((acc, item) => acc + item.price, 0);
    return this.pricingStrategy.calculatePrice(total);
  }
}

// 客户端代码
const regularStrategy = new RegularPricing();
const saleStrategy = new SalePricing();
const clearanceStrategy = new ClearancePricing();

const shoppingCart = new ShoppingCart(regularStrategy);
shoppingCart.addItem({ name: "Product1", price: 100 });
shoppingCart.addItem({ name: "Product2", price: 200 });
console.log("Regular Price:", shoppingCart.calculateTotal());

shoppingCart.pricingStrategy = saleStrategy;
console.log("Sale Price:", shoppingCart.calculateTotal());

shoppingCart.pricingStrategy = clearanceStrategy;
console.log("Clearance Price:", shoppingCart.calculateTotal());
```

**优缺点**

1. 可以有效地避免多重条件选择语句
2. 代码复用性高，避免了很多粘贴复制的操作。
3. 策略模式提供了对开放封闭原则的支持，将算法独立封装在 strategies 中，使得它们易于切换，易于扩展。

## 代理模式

> 为其他对象提供一种代理以控制对这个对象的访问。

**用法**

```js
// Subject 接口
class ImageLoader {
  displayImage() {}
}

// RealSubject 实现
class RealImageLoader extends ImageLoader {
  constructor(filename) {
    super();
    this.filename = filename;
    this.loadImage();
  }

  loadImage() {
    console.log(`加载图片.......: ${this.filename}`);
  }

  displayImage() {
    console.log(`显示图片.......: ${this.filename}`);
  }
}

// Proxy 实现
class ImageLoaderProxy extends ImageLoader {
  constructor(filename) {
    super();
    this.filename = filename;
    this.realImageLoader = null;
  }

  displayImage() {
    if (!this.realImageLoader) {
      this.realImageLoader = new RealImageLoader(this.filename);
    }

    console.log("显示图片之前的。。。。。。。。。。。。");
    this.realImageLoader.displayImage();
  }
}

// 客户端代码
const image1 = new ImageLoaderProxy("image1.jpg");
image1.displayImage();

const image2 = new ImageLoaderProxy("image2.jpg");
image2.displayImage();
```

**优缺点**

- 能将代理对象与真实被调用目标对象分离，可以在目标对象实现的基础上，增强额外的功能操作，及扩展目标对象的功能；
- 代理模式能将客户端与目标对象分离，在一定程度上降低了系统的耦合度。

## 观察者模式

> 定义了一种一对多的依赖关系，让多个观察者对象同时监听并被通知某一个主题对象的状态变化

**用法**

```js
// 主题
class Subject {
  constructor() {
    this.observers = [];
    this.message = "";
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.update(this.message));
  }

  setMeasurements(message) {
    // 设置消息
    this.message = message;
    // 发布消息
    this.notifyObservers();
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }
  update(message) {
    // 在实际应用中，更新自身状态的逻辑会更加复杂
    console.log(`${this.name} 收到消息：${message}`);
  }
}

// 主题
const station = new Subject();
// 观察者
const observer1 = new Observer("张三");
const observer2 = new Observer("李四");

station.addObserver(observer1);
station.addObserver(observer2);

station.setMeasurements("第1条消息....");

station.removeObserver(observer1);

station.setMeasurements("第2条消息....");
```

**优缺点**

- 目标者与观察者，功能耦合度降低，专注自身功能逻辑, 观察者被动接收更新，时间上解耦，实时接收目标者更新状态;
- 观察者模式虽然实现了对象间依赖关系的低耦合，但却不能对事件通知进行细分管控，如 “筛选通知”，“指定主题事件通知”

## 发布/订阅模式

> 发布者 和 订阅者相互结构，不用关心对方的存在，通过消息中介来控制消息的推送和订阅，同时解决了消息类型的问题

**用法**

```js
// 中介者（消息代理）
class Mediator {
  constructor() {
    this.channels = {};
  }
  // 订阅
  subscribe(channel, subscriber) {
    if (!this.channels[channel]) {
      this.channels[channel] = [];
    }
    this.channels[channel].push(subscriber);
  }
  // 发布
  publish(channel, message) {
    if (this.channels[channel]) {
      this.channels[channel].forEach((subscriber) =>
        subscriber.update(message)
      );
    }
  }
}

// 订阅者
class Subscriber {
  constructor(name) {
    this.name = name;
  }

  update(message) {
    console.log(`${this.name} 收到消息: ${message}`);
  }
}

const mediator = new Mediator();

const subscriber1 = new Subscriber("订阅1");
const subscriber2 = new Subscriber("订阅2");

mediator.subscribe("news1", subscriber1);
mediator.subscribe("news2", subscriber2);

mediator.publish("news1", "消息类型1的消息");

mediator.publish("news2", "消息类型2的消息");

mediator.publish("news3", "消息类型3的消息");
```

## 结语

> 其他的设计模式：`装饰器模式`, `适配模式`, `模块模式`, `桥接模式`, `组合模式`, `命令模式`, `迭代器模式`, `职责链模式` 等等....
