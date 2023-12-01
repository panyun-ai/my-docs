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
