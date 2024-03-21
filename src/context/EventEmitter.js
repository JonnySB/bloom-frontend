class EventEmitter {
    constructor() {
      this.events = {};
    }
  

    on(eventName, listener) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(listener);
    }
  

    off(eventName, listener) {
      if (!this.events[eventName]) return;
      this.events[eventName] = this.events[eventName].filter(l => l !== listener);
    }
  

    emit(eventName, ...args) {
      if (!this.events[eventName]) return;
      this.events[eventName].forEach(listener => {
        listener(...args);
      });
    }
  }
  

  const eventEmitter = new EventEmitter();
  export default eventEmitter;