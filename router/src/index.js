window.addEventListener('popstate', (ev) => {
  console.log(ev);
});
window.addEventListener('hashchange', (ev) => {
  console.log(ev);
});
class Emitter {
  listeners = {};
  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }
  off(event, listener) {
    this.listeners[event]?.filter((m) => m !== listener);
  }
  trigger(event, ev) {
    console.log('2', this);
    this.listeners[event].forEach((m) => m(ev));
  }
}
const e = new Emitter();
e.on('message', function () {
  console.log(this);
});
e.trigger('message', undefined);
