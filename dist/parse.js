"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseText = (text) => {
    const json = JSON.parse(text);
    if (!json.id)
        throw new Error('bad socket message - missing id');
    if (!json.payload)
        throw new Error('bad socket message - missing payload');
    const request = json;
    return request;
};
const parseBuffer = (buffer) => {
    const text = buffer.toString('utf8');
    const request = parseText(text);
    return request;
};
const isString = (data) => typeof data === 'string';
const isBuffer = (data) => data instanceof Buffer;
const parseMessage = (data) => {
    if (isString(data)) {
        const text = data;
        return parseText(text);
    }
    else if (isBuffer(data)) {
        const buffer = data;
        return parseBuffer(buffer);
    }
    else {
        throw new Error('bad socket message format');
    }
};
exports.default = parseMessage;
//# sourceMappingURL=parse.js.map