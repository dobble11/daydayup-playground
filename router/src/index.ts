window.addEventListener('popstate', (ev) => {
  console.log(ev);
});

window.addEventListener('hashchange', (ev) => {
  console.log(ev);
});

class Emitter {
  listeners: Record<string, Function[]> = {};

  on(event: string, listener: () => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
  }
  off(event: string, listener: () => void): void {
    this.listeners[event]?.filter((m) => m !== listener);
  }

  trigger(event: string, ev: any) {
    this.listeners[event].forEach((m) => m(ev));
  }
}

const e = new Emitter();

e.on('message', function () {
  console.log(this);
});

e.trigger('message', undefined);
