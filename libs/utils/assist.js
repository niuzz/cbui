// Find components upward
export function findComponentUpward (context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName];
    } else {
        componentNames = componentName;
    }
    let parent = context.$parent;
    let name = parent.$options.name;
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}

export function findComponentUpwards (context, componentName) {
    let parent = context.$parent;
    let name = parent.$options.name;
    let parents = [];
    while (parent && (!name || componentName !== name)) {
        parents.push(parent);
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parents;
}

// Find component downward
export function findComponentDownward (context, componentName) {
    const childrens = context.$children;
    let children = null;
    if (childrens.length) {
        for (const child of childrens) {
            const name = child.$options.name;
            if (name === componentName) {
                children = child;
                break;
            } else {
                children = findComponentDownward(child, componentName);
                if (children) break;
            }
        }
    }
    return children;
}

// Find components downward
export function findComponentsDownward (context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child);
        const foundChilds = findComponentsDownward(child, componentName);
        return components.concat(foundChilds);
    }, []);
}

export function typeOf (obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    return map[toString.call(obj)];
}

// deepCopy
export function deepCopy (data) {
    const t = typeOf(data);
    let o;
    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }
    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    } else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i]);
        }
    }
    return o;
}

export function firstUpperCase (str) {
    return str.toString()[0].toUpperCase() + str.toString().slice(1);
}

export function scrollTop (el, from = 0, to, duration = 500, endCallback) {
    if (!window.requestAnimationFrame) {
    // window.requestAnimationFrame = (
    //     window.webkitRequestAnimationFrame ||
    //     window.mozRequestAnimationFrame ||
    //     window.msRequestAnimationFrame ||
    //     function (callback) {
    //         return window.setTimeout(callback, 1000 / 60)
    //     }
    // )
        window.requestAnimationFrame = window.requestAnimationFrame || function (fn) {
            return setTimeout(fn, 1000 / 60);
        };
        window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil(difference / duration * 50);

    function scroll (start, end, step) {
        if (start === end) {
            endCallback && endCallback();
            return;
        }
        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }
        if (el === window) {
            window.scrollTo(d, d);
        } else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, step);
}

export const sharpMatcherRegx = /#([^#]+)$/;
