interface EventRegister {
    callback: CallableFunction,
    priority: number
};

const events: {
    [key: string]: EventRegister[]
} = {};

export function addEventHandler(name: string, callback: CallableFunction, priority: number = 0): void {
    events[name] = events[name] || [];

    events[name].push({
        callback: callback,
        priority: priority
    });
}

export function triggerEvent(name: string, ...args: any[]) {
    if(!events[name]) return;

    events[name].sort((a: EventRegister, b: EventRegister) => b.priority - a.priority).forEach((event: EventRegister) => {
        event.callback(...args);
    });
}