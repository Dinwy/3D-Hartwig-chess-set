/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


var EventEmitter = function () {
	this.eventHandlers = {};
};
EventEmitter.EventEmitter = EventEmitter;
module.exports = EventEmitter;

EventEmitter.listenerCount = function (emitter, evt) {
	var eventHandlers = emitter.eventHandlers[evt];
	return eventHandlers ? eventHandlers.length : 0;
};

EventEmitter.prototype.on = function (evt, fn) {
	if (typeof fn !== 'function') {
		console.warn('Tried to register non-function', fn, 'as event handler for event:', evt);
		return this;
	}

	this.emit('newListener', evt, fn);

	var allHandlers = this.eventHandlers;
	var evtHandlers = allHandlers[evt];
	if (evtHandlers === undefined) {
		// first event handler for this event type
		allHandlers[evt] = [fn];
		return this;
	}

	evtHandlers.push(fn);
	return this;
};

EventEmitter.prototype.addListener = EventEmitter.prototype.on;

EventEmitter.prototype.once = function (evt, fn) {
	if (!fn.once) {
		fn.once = 1;
	} else {
		fn.once += 1;
	}

	return this.on(evt, fn);
};

EventEmitter.prototype.setMaxListeners = function () {
	console.warn('Method setMaxListeners not supported, there is no limit to the number of listeners');
};

EventEmitter.prototype.removeListener = function (evt, handler) {
	// like node.js, we only remove a single listener at a time, even if it occurs multiple times

	var handlers = this.eventHandlers[evt];
	if (handlers !== undefined) {
		var index = handlers.indexOf(handler);
		if (index !== -1) {
			handlers.splice(index, 1);
			this.emit('removeListener', evt, handler);
			if (handlers.length === 0) {
				delete this.eventHandlers[evt];
			}
		}
	}
	return this;
};

EventEmitter.prototype.removeAllListeners = function (evt) {
	if (evt) {
		delete this.eventHandlers[evt];
	} else {
		this.eventHandlers = {};
	}
	return this;
};

EventEmitter.prototype.hasListeners = function (evt) {
	return (this.eventHandlers[evt] !== undefined);
};

EventEmitter.prototype.listeners = function (evt) {
	var handlers = this.eventHandlers[evt];
	if (handlers !== undefined) {
		return handlers.slice();
	}

	return [];
};

var slice = Array.prototype.slice;
EventEmitter.prototype.emit = function (evt) {

	var handlers = this.eventHandlers[evt];
	if (handlers === undefined) {
		return false;
	}

	// copy handlers into a new array, so that handler removal doesn't affect array length
	handlers = handlers.slice();

	var hadListener = false;
	var args = slice.call(arguments, 1);
	for (var i = 0, len = handlers.length; i < len; i++) {
		var handler = handlers[i];
		if (handler === undefined) {
			continue;
		}

		handler.apply(this, args);
		hadListener = true;

		if (handler.once) {
			if (handler.once > 1) {
				handler.once--;
			} else {
				delete handler.once;
			}

			this.removeListener(evt, handler);
		}
	}

	return hadListener;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

try {
  var util = __webpack_require__(16);
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  module.exports = __webpack_require__(7);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Mage = __webpack_require__(10);
var config = typeof window === 'undefined' ? global.mageConfig : window.mageConfig;

module.exports = new Mage(config);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var cachepuncher = __webpack_require__(6);
var deepCopy = __webpack_require__(14);


function addParamsToUrl(url, params) {
	if (!params) {
		return url;
	}

	var keys = Object.keys(params);
	var count = keys.length;

	if (count === 0) {
		return url;
	}

	var splitter = url.indexOf('?') === -1 ? '?' : '&';

	for (var i = 0; i < count; i += 1) {
		var key = keys[i];

		url += splitter + encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);

		splitter = '&';
	}

	return url;
}


// safe XHR data extractors (will not throw)

function getStatusCode(xhr) {
	var status;

	try {
		status = xhr.status;
	} catch (error) {
		return 0;
	}

	// IE CORS compatibility

	if (typeof status !== 'number') {
		status = 200;
	}

	return status;
}


function getResponseText(xhr) {
	var response;

	try {
		response = xhr.responseText;
	} catch (error) {
		// do nothing, we'll return undefined
	}

	return response;
}


function getContentType(xhr) {
	var type;

	try {
		type = xhr.contentType;
	} catch (error) {
		// ignore, we'll try getResponseHeader
	}

	if (!type) {
		try {
			type = xhr.getResponseHeader('content-type');
		} catch (getError) {
			// ignore, we'll return undefined
		}
	}

	return type;
}


function createCORSRequest() {
	var xhr = new XMLHttpRequest();
	if ('withCredentials' in xhr) {
		// XHR for Chrome/Firefox/Opera/Safari.
		return xhr;
	}

	if (window.XDomainRequest) {
		// XDomainRequest for IE.
		return new window.XDomainRequest();
	}

	return xhr;
}

function HttpRequest(options) {
	options = options || {};

	var xhr = createCORSRequest();

	var callback;
	var isSending = false;
	var timer;
	var FormData = window.FormData;


	this.isBusy = function () {
		return isSending;
	};


	this.send = function (method, url, params, data, headers, cb) {
		if (typeof method !== 'string') {
			throw new TypeError('method is not a string: ' + method);
		}

		if (typeof url !== 'string') {
			throw new TypeError('url is not a string: ' + url);
		}

		if (params && typeof params !== 'object') {
			throw new TypeError('params is not an object: ' + params);
		}

		if (headers && typeof headers !== 'object') {
			throw new TypeError('headers is not an object: ' + headers);
		}

		if (isSending) {
			if (cb) {
				cb('busy');
			}

			return false;
		}

		isSending = true;
		callback = cb;

		headers = headers || {};

		var m = url.match(/^[a-z]+:(\/\/)([^:]+:[^:]+)@/i);
		if (m) {
			headers.Authorization = 'Basic ' + window.btoa(m[2]);
		}

		if (params) {
			if (options.noCache) {
				params = deepCopy(params);
				params.rand = cachepuncher.punch();
			}

			url = addParamsToUrl(url, params);
		}

		xhr.open(method, url, true);

		if (options.withCredentials) {
			xhr.withCredentials = true;
		}

		if (data) {
			if (!FormData || !(data instanceof FormData)) {
				if (!headers.hasOwnProperty('content-type')) {
					var contentType;

					if (typeof data === 'string') {
						contentType = 'text/plain; charset=UTF-8';
					} else {
						contentType = 'application/json';
						data = JSON.stringify(data);
					}

					if ('setRequestHeader' in xhr) {
						xhr.setRequestHeader('content-type', contentType);
					}
				}
			}
		} else {
			data = null;
		}

		if ('setRequestHeader' in xhr) {
			for (var key in headers) {
				if (headers.hasOwnProperty(key)) {
					xhr.setRequestHeader(key, headers[key]);
				}
			}
		}

		if (options.timeout) {
			if (options.timeout < 1000) {
				throw new Error('Unreasonable timeout setting for HTTP request: ' + options.timeout + ' msec.');
			}

			timer = setTimeout(function () {
				var cb = callback;
				callback = null;

				console.warn('HTTP request timed out, aborting');

				xhr.abort();

				// in some browsers, oncomplete will now fire due to abort()
				// since callback is now null however, it will not do anything

				isSending = false;

				if (cb) {
					cb('network');
				}
			}, options.timeout);
		}

		xhr.send(data);

		return true;
	};


	this.abort = function () {
		// abort does not call any callbacks
		// useful for long polling

		callback = null;
		isSending = false;

		try {
			xhr.abort();
		} catch (abortError) {
			// ignore
			console.error(abortError);
		}
	};


	function oncomplete() {
		// possible error codes sent back to callback:
		// 'network': connection issue
		// 'maintenance': server is in maintenance

		isSending = false;

		if (!callback) {
			return;
		}

		var cb = callback;
		callback = null;

		// the two variables we'll return in the callback, possibly returned as undefined

		var error, response;

		// extract data from XHR

		var code = getStatusCode(xhr);
		var rawResponse = getResponseText(xhr);
		var contentType = getContentType(xhr);
		var codeCategory = (code / 100) >>> 0;

		// detect errors

		if (codeCategory !== 2) {
			// error situation

			if (code === 503) {
				error = 'maintenance';
			} else {
				error = 'network';
			}

			console.warn('HTTP response code:', code, 'set as error:', error);
		}

		// detect and parse response body

		if (rawResponse && contentType) {
			if (contentType.match(/^[a-z]+\/json/)) {
				try {
					response = JSON.parse(rawResponse);
				} catch (e) {
					console.warn('JSON parse error on HTTP response', e, rawResponse);

					error = error || 'server';
				}
			} else {
				response = rawResponse;
			}
		}

		cb(error, response);
	}

	function onLoad() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}

		setTimeout(function () {
			oncomplete();
		}, 0);
	}

	if ('onload' in xhr) {
		xhr.onload = onLoad;
		xhr.onerror = onLoad;
	} else {
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				onLoad();
			}
		};
	}
}

module.exports = HttpRequest;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var HttpRequest = __webpack_require__(3);
var EventEmitter = __webpack_require__(0);
var inherits = __webpack_require__(1);


function HttpPollingClient(style, cfg) {
	EventEmitter.call(this);

	var that = this;

	var hr = new HttpRequest({
		noCache: true,
		withCredentials: cfg.cors && cfg.cors.credentials ? true : false
	});

	var lastError;
	var endpoint = cfg.url;
	var confirmIds = [];
	var sessionKey;

	var afterRequestInterval = cfg.afterRequestInterval || (style === 'shortpolling' ? 5000 : 0);
	var afterErrorInterval = cfg.afterErrorInterval || 5000;

	this.isRunning = false;

	var send;


	function scheduleNext() {
		if (!that.isRunning) {
			// nothing to schedule if we've been aborted
			return;
		}

		if (lastError) {
			setTimeout(send, afterErrorInterval);
		} else {
			setTimeout(send, afterRequestInterval);
		}
	}


	function ondone(error, response) {
		if (error) {
			lastError = error;

			that.emit('error', { error: error, data: response });
		} else {
			confirmIds = [];

			if (response !== null && typeof response === 'object') {
				that.emit('delivery', response);
			}
		}

		scheduleNext();
	}


	send = function () {
		if (!that.isRunning) {
			return;
		}

		lastError = null;

		var params = {
			transport: style
		};

		if (sessionKey) {
			params.sessionKey = sessionKey;
		}

		if (confirmIds.length > 0) {
			params.confirmIds = confirmIds.join(',');
		}

		// send the request

		hr.send('GET', endpoint, params, null, null, ondone);
	};


	this.setSessionKey = function (key) {
		sessionKey = key;
	};


	this.start = function () {
		if (this.isRunning) {
			// restart, since setup has probably changed

			hr.abort();

			setTimeout(function () {
				send();
			}, 0);
		} else {
			this.isRunning = true;

			send();
		}


		return true;
	};


	this.confirm = function (msgId) {
		confirmIds.push(msgId);
	};


	this.getUnconfirmed = function () {
		return confirmIds.slice();
	};


	this.abort = function () {
		hr.abort();
		this.isRunning = false;
	};


	this.destroy = function () {
		this.abort();
		this.removeAllListeners();
	};
}

inherits(HttpPollingClient, EventEmitter);


exports.longpolling = {
	test: function (cfg) {
		return cfg.url ? true : false;
	},
	create: function (cfg) {
		return new HttpPollingClient('longpolling', cfg);
	}
};

exports.shortpolling = {
	test: function (cfg) {
		return cfg.url ? true : false;
	},
	create: function (cfg) {
		return new HttpPollingClient('shortpolling', cfg);
	}
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const mage = __webpack_require__(2);

/**
 * Get queue data
 */
exports.getQueue = async (cb) => {
	console.log('Get queue called! from client side');
	mage.user.ucGetQueue(cb);
};

/**
 * Join into the queue
 */
exports.joinQueue = (userId, cb) => {
	console.log('Join queue called! from client side');
	mage.user.ucJoinQueue(userId, cb);
};

/**
 * Join into the queue
 */
exports.hello = (cb) => {
	console.log('Hello World called');
	mage.user.ucHello(cb);
};

exports.login = (userId, password, cb) => {
	return mage.user.ucLogin(userId, password, cb);
};

exports.register = (userId, password, cb) => {
	return mage.user.ucRegister(userId, password, cb);
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// State carries the time and bump state at a particular precision (factor)

function State(factor) {
	this.factor = factor || 1;
	this.bump = 0;
	this.time = null;
}


State.prototype.setTime = function (ts) {
	var collides = false;

	if (this.time) {
		// apply the factor and compare the timestamps for collisions

		collides = Math.floor(ts * this.factor) === Math.floor(this.time * this.factor);
	}

	this.time = ts;

	if (collides) {
		this.bump += 1;
	} else {
		this.bump = 1;
	}
};


// The Puncher class exposes the punch method and carries multiple precision states

function Puncher(defaults) {
	this.defaults = defaults;

	this.states = {
		sec: new State(0.001),
		msec: new State()
	};
}


Puncher.prototype.punch = function (options) {
	if (options) {
		if (this.defaults) {
			for (var key in this.defaults) {
				if (this.defaults.hasOwnProperty(key) && !options.hasOwnProperty(key)) {
					options[key] = this.defaults[key];
				}
			}
		}
	} else {
		options = this.defaults || {};
	}

	// pick a state based on our precision

	var state = options.msec ? this.states.msec : this.states.sec;

	// assign the current time to the state

	var now = options.now || new Date();
	var ts = now.getTime();

	state.setTime(ts);

	// generate an output string

	var out = ts;

	if (options.epoch instanceof Date) {
		out -= options.epoch.getTime();
	}

	if (!options.msec) {
		out = Math.floor(out / 1000);
	}

	if (typeof options.base === 'number') {
		out = out.toString(options.base);
	}

	out += '-' + state.bump;

	return out;
};


// Expose the default punch method

var defaultPuncher = new Puncher();

exports.punch = function (options) {
	return defaultPuncher.punch(options);
};


// A factory for new cache punchers

exports.create = function (defaults) {
	var puncher = new Puncher(defaults);

	return function (options) {
		return puncher.punch(options);
	};
};



/***/ }),
/* 7 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

function CommandCenter(eventManager) {
	var HttpRequest = __webpack_require__(3);

	this.transports = {
		http: HttpRequest
	};

	this.cmdHooks = [];

	this.queryId = 0;
	this.commandSystemStarted = false;
	this.cmdMode = 'free';
	this.simulatedTransportError = null;
	this.simulatedCommandError = null;

	this.eventManager = eventManager;
}

module.exports = CommandCenter;


// transport

CommandCenter.prototype.createTransport = function (type, options) {
	// check transport availability

	var Transport = this.transports[type];
	if (!Transport) {
		throw new Error('No transport type "' + type + '" found.');
	}

	return new Transport({
		noCache: true,
		withCredentials: options && options.cors && options.cors.credentials ? true : false
	});
};

// command center

CommandCenter.prototype.setCmdMode = function (mode) {
	if (mode !== 'free' && mode !== 'blocking') {
		throw new Error('Unrecognized command mode "' + mode + '", use "free" or "blocking".');
	}

	this.cmdMode = mode;
};


CommandCenter.prototype.registerCommandHook = function (name, fn) {
	// replace the old command hook if there is one

	for (var i = 0; i < this.cmdHooks.length; i += 1) {
		var cmdHook = this.cmdHooks[i];

		if (cmdHook.name === name) {
			cmdHook.fn = fn;
			return;
		}
	}

	// else append to the end

	this.cmdHooks.push({ name: name, fn: fn });
};


CommandCenter.prototype.unregisterCommandHook = function (name) {
	for (var i = 0; i < this.cmdHooks.length; i += 1) {
		var cmdHook = this.cmdHooks[i];

		if (cmdHook.name === name) {
			this.cmdHooks.splice(i, 1);
			return;
		}
	}
};


CommandCenter.prototype.sendCommand = function () {
	console.warn('CommandCenter#sendCommand: command system not yet set up.');
};


CommandCenter.prototype.resend = function () {
	console.warn('CommandCenter#resend: command system not yet set up.');
};


CommandCenter.prototype.discard = function () {
	console.warn('CommandCenter#discard: command system not yet set up.');
};


CommandCenter.prototype.queue = function () {
	console.warn('CommandCenter#queue: command system not yet set up.');
};


CommandCenter.prototype.piggyback = function () {
	console.warn('CommandCenter#piggyback: command system not yet set up.');
};


CommandCenter.prototype.simulateTransportError = function (type) {
	this.simulatedTransportError = type;
};

CommandCenter.prototype.simulateCommandError = function (cmdName, error) {
	this.simulatedCommandError = {
		cmdName: cmdName,
		error: error
	};
};

CommandCenter.prototype.setupCommandSystem = function (config) {
	if (this.commandSystemStarted) {
		return;
	}

	var hr = this.createTransport('http', config.httpOptions);

	var that = this;

	// if this timer is active, we're about to send batches.current (which may still grow).
	var timer = null;

	// if "streaming" is true, we will send batches.current the moment the running request returns.
	var streaming = false;

	// placeholder for unlock function, to avoid circular refs and upset jslint
	var unlock;

	var batches = {
		current: [],  // the commands we're building that will be sent _very_ soon
		sending: []   // the commands that are currently being sent
	};

	// "queueing" is true when user commands are to be stored in the current batch, and should be
	// sent off asap (through commandCenter.queue method)
	var queueing = false;

	// "piggybacking" is true when user commands are to be stored in the current batch (through
	// commandCenter.piggyback method)
	var piggybacking = false;

	// "locked" is true for as long as a queryId has not been successfully completed.
	var locked = false;


	function onCommandResponse(transportError, responses) {
		// this is the response to the request that is now in the batches.sending array
		// [
		//   [sysError] or:
		//   [null, userError] or:
		//   [null, null, response obj, events array] // where events may be left out
		// ]

		if (that.simulatedTransportError) {
			transportError = that.simulatedTransportError;
			that.simulatedTransportError = null;
		}

		if (transportError) {
			// "network": network failure (offline or timeout), retry is the only correct option
			// "busy": usually treat quietly

			return that.eventManager.emitEvent('io.error.' + transportError, {
				reason: transportError,
				info: responses
			});
		}

		// unlock the command system for the next user command(s)

		var batch = batches.sending;

		unlock();

		// from here on, handle all responses and drop the queue that we just received answers to

		that.eventManager.emitEvent('io.response');

		// handle the command responses

		for (var i = 0; i < responses.length; i += 1) {
			var response = responses[i];
			var cmd = batch[i];

			if (!cmd) {
				console.warn('No command found for response', response);
				continue;
			}

			var errorCode = response[0];
			var cmdResponse = response[1];
			var events = response[2];

			if (that.simulatedCommandError && that.simulatedCommandError.cmdName === cmd.name) {
				errorCode = that.simulatedCommandError.error;
				cmdResponse = null;
				events = null;
				that.simulatedCommandError = null;
			}

			if (events) {
				that.eventManager.emitEvents(events);
			}

			/*
			cmd = {
			  name: cmdName,
			  params: params,
			  files: files,
			  cb: cb
			};
			*/

			if (!errorCode) {
				that.eventManager.emit('io.' + cmd.name, cmdResponse, cmd.params);
			}

			if (cmd.cb) {
				if (errorCode) {
					cmd.cb(errorCode);
				} else {
					cmd.cb(null, cmdResponse);
				}
			}
		}
	}


	var nextFileId = 0;


	function sendBatch(batch) {
		// no need to check for locked here, since that is taken care of by the caller of sendBatch

		locked = true;
		timer = null;

		nextFileId = 0;

		var i, len;

		// prepare data extraction

		len = batch.length;

		var cmdNames = new Array(len);
		var cmdParams = new Array(len);
		var hasCallbacks = false;
		var header = [], data, files;

		for (i = 0; i < len; i += 1) {
			var cmd = batch[i];

			cmdNames[i] = cmd.name;
			cmdParams[i] = cmd.params;

			if (cmd.files) {
				if (!files) {
					files = {};
				}

				for (var fileId in cmd.files) {
					if (cmd.files.hasOwnProperty(fileId)) {
						files[fileId] = cmd.files[fileId];
					}
				}
			}

			if (cmd.cb) {
				hasCallbacks = true;
			}
		}

		data = cmdParams.join('\n');

		// execute all hooks

		for (i = 0, len = that.cmdHooks.length; i < len; i += 1) {
			var hook = that.cmdHooks[i];

			var hookOutput = hook.fn(data);
			if (hookOutput) {
				hookOutput.name = hook.name;

				header.push(hookOutput);
			}
		}

		// emit io.send event with all command names as the argument

		that.eventManager.emitEvent('io.send', cmdNames);

		// create a request

		var url = encodeURI(config.url + '/' + cmdNames.join(','));
		var urlParams = {};

		if (hasCallbacks) {
			urlParams.queryId = that.queryId;
		}

		// prepend the header before the cmd parameter data

		data = JSON.stringify(header) + '\n' + data;

		// send request to server

		if (files) {
			var FormData = window.FormData;

			if (FormData) {
				var form = new FormData();
				form.append('cmddata', data);

				for (var name in files) {
					if (files.hasOwnProperty(name)) {
						form.append(name, files[name]);
					}
				}

				data = form;
			} else {
				console.warn('window.FormData class not available, old browser?');
			}
		}


		hr.send('POST', url, urlParams, data, null, onCommandResponse);
	}


	function sendCurrentBatch() {
		batches.sending = batches.current;
		batches.current = [];

		// set streaming to false, a next user command can turn it on again

		streaming = false;

		sendBatch(batches.sending);
	}


	function scheduleCurrentBatch() {
		// - Set streaming to true, so nothing can pause us
		// - If no timer has been set yet, create a query ID, start a timer and prepare to
		//   send a new batch.

		streaming = true;

		if (locked) {
			// if the current stream is locked, the unlocking will trigger this function to be
			// called again.
			return;
		}

		if (timer === null) {
			that.queryId += 1;
			timer = window.setTimeout(sendCurrentBatch, 0);

			that.eventManager.emitEvent('io.queued', that.queryId);
		}
	}


	function resendBatch() {
		sendBatch(batches.sending);
	}


	unlock = function () {
		// discard the last sent batch

		batches.sending = [];

		locked = false;

		// if there is a batch ready to be sent again, trigger the send

		if (batches.current.length > 0 && streaming) {
			scheduleCurrentBatch();
		}
	};


	// file upload helpers

	var uploads;

	function Upload(file) {
		this.file = file;
	}

	Upload.prototype.toJSON = function () {
		// returns the ID of the file

		var id = '__file' + nextFileId;

		nextFileId += 1;

		if (!uploads) {
			uploads = {};
		}

		uploads[id] = this.file;

		return id;
	};


	var Blob = window.Blob;
	var File = window.File;
	var FileList = window.FileList;


	/**
	 * Use this method to transform a File, Blob or FileList object to an object type that commandCenter
	 * can upload. The result of this function may safely be put in of any parameter of a user
	 * command call.
	 *
	 * @param {File|Blob|FileList} file
	 * @param {boolean} silent          Set to true to suppress errors when the type doesn't match
	 * @returns {Upload|Upload[]}       An Upload instance, or an array of Upload instances
	 */

	this.transformUpload = function (file, silent) {
		if (file instanceof Blob || file instanceof File) {
			return new Upload(file);
		}

		if (file instanceof FileList) {
			var list = [];

			for (var i = 0; i < file.length; i += 1) {
				list.push(new Upload(file[i]));
			}

			return list;
		}

		if (!silent) {
			throw new TypeError('Given argument is not a Blob, File or FileList');
		}
	};


	/**
	 * This will deep-inspect any given object and transform File, Blob or FileList objects using
	 * the transformUpload method.
	 *
	 * @param {Object} obj
	 */

	this.transformEmbeddedUploads = function (obj) {
		var keys = Object.keys(obj || {});

		for (var i = 0; i < keys.length; i += 1) {
			var value = obj[keys[i]];

			if (value && typeof value === 'object') {
				var upload = this.transformUpload(value, true);

				if (upload) {
					obj[keys[i]] = upload;
				} else {
					this.transformEmbeddedUploads(obj[keys[i]]);
				}
			}
		}
	};


	this.sendCommand = function (cmdName, params, cb) {
		if (typeof cmdName !== 'string') {
			throw new TypeError('Command name is not a string: ' + cmdName);
		}

		if (params && typeof params !== 'object') {
			throw new TypeError('Command params is not an object: ' + params);
		}

		if (cb && typeof cb !== 'function') {
			throw new TypeError('Command callback is not a function: ' + cb);
		}

		// cmdName is dot notation "moduleName.commandName"

		// Serialize the params instantly, so that they may be altered right after this call without
		// affecting command execution. The uploads list should be reset before, and after
		// stringification.

		uploads = null;

		params = JSON.stringify(params);

		// create the command object

		var cmd = {
			name: cmdName,
			params: params,
			files: uploads,
			cb: cb
		};

		uploads = null;


		if (piggybacking) {
			// Add the command to the current queue, but don't start sending anything just yet.
			// The next batch that gets scheduled will take these along.

			batches.current.push(cmd);
		} else if (locked) {
			// We're currently sending, but if the next batch is accessible, we can add the command
			// to it. That way it will be sent when the open request returns.

			if (queueing || that.cmdMode === 'free') {
				// add to current batch and make sure it will be sent off

				batches.current.push(cmd);

				scheduleCurrentBatch();
			} else {
				console.warn('Could not execute user command: busy.', cmd);

				that.eventManager.emitEvent('io.error.busy', {
					reason: 'busy',
					command: cmd,
					blockedBy: batches.sending
				});
			}
		} else {
			// The command can be executed right now, so add to the current batch and make sure it
			// will be sent off

			batches.current.push(cmd);

			scheduleCurrentBatch();
		}
	};


	// the discard function can be called if after a transport error, when do not want to retry
	// it will unlock the command center for the next user command

	this.discard = function () {
		unlock();
		that.eventManager.emitEvent('io.discarded');
	};


	this.resend = function () {
		if (!batches.sending.length) {
			console.warn('No commands to retry. Discarding instead.');
			that.discard();
			return;
		}

		that.eventManager.emitEvent('io.resend');

		resendBatch();
	};


	this.queue = function (fn) {
		queueing = true;
		fn();
		queueing = false;
	};


	this.piggyback = function (fn) {
		piggybacking = true;
		fn();
		piggybacking = false;
	};

	this.commandSystemStarted = true;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(0);
var inherits = __webpack_require__(1);


function EventManager() {
	EventEmitter.call(this);
}

inherits(EventManager, EventEmitter);

module.exports = EventManager;


function parsePath(path) {
	if (typeof path === 'string') {
		if (path.length === 0) {
			throw new Error('An empty path is not a valid event path');
		}

		return path.split('.');
	}

	if (Array.isArray(path)) {
		if (path.length === 0) {
			throw new Error('An empty path is not a valid event path');
		}

		// make a copy, because we'll be mutating it
		return path.slice();
	}

	throw new TypeError('An event path must be a non-empty array or a string');
}


function createPathFamily(path) {
	// longest paths first

	var family = [];

	path = parsePath(path);

	while (path.length > 0) {
		family.push(path.join('.'));
		path.pop();
	}

	return family;
}


EventManager.prototype.emitEvent = function (fullPath, params) {
	// accepts only a single params object (which may be of any type)

	var paths = createPathFamily(fullPath);

	for (var i = 0; i < paths.length; i += 1) {
		this.emit(paths[i], fullPath, params);
	}
};


EventManager.prototype.emitEvents = function (events) {
	for (var i = 0; i < events.length; i += 1) {
		var evt = events[i];

		if (evt) {
			this.emitEvent(evt[0], evt[1]); // magic array positions: path, params
		}
	}
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(0);
var inherits = __webpack_require__(1);
var EventManager = __webpack_require__(9);
var CommandCenter = __webpack_require__(8);
var MsgServer = __webpack_require__(11);


function Mage(config) {
	EventEmitter.call(this);

	this.eventManager = new EventManager();
	this.msgServer = new MsgServer(this.eventManager);
	this.commandCenter = new CommandCenter(this.eventManager);

	this.configure(config);
}

inherits(Mage, EventEmitter);

module.exports = Mage;


Mage.prototype.getClientHostBaseUrl = function () {
	return this.clientHostBaseUrl;
};


Mage.prototype.getSavvyBaseUrl = function (protocol) {
	var baseUrl = this.savvyBaseUrl;
	if (!baseUrl) {
		baseUrl = '/savvy';
	}

	if (baseUrl[0] === '/') {
		// location.origin is perfect for this, but badly supported

		baseUrl = this.savvyBaseUrl = window.location.protocol + '//' + window.location.host + baseUrl;

		console.warn('No savvy base URL configured, defaulting to:', baseUrl, '(which may not work)');
	}

	if (protocol) {
		// drop any trailing colons and slashes

		protocol = protocol.replace(/:?\/*$/, '');

		return baseUrl.replace(/^.*:\/\//, protocol + '://');
	}

	return baseUrl;
};


// expose configuration set up
// mage.configure registers the configuration and emits 'configure'

Mage.prototype.configure = function (config) {
	if (!config) {
		throw new Error('Mage requires a configuration to be instantiated.');
	}

	this.config = config;

	this.appName = config.appName;
	this.appVersion = config.appVersion;

	// set up server connections

	this.clientHostBaseUrl = config.baseUrl || '';

	var server = config.server || {};

	this.savvyBaseUrl = server.savvy ? server.savvy.url : ''; // TODO: what about server.savvy.cors?

	if (server.commandCenter) {
		this.commandCenter.setupCommandSystem(server.commandCenter);
	}

	if (this.msgServer.setupMessageStream(server.msgStream)) {
		var that = this;

		this.once('created.session', function () {
			// Session module is created, set up the event listeners:

			// When a session key is available or changes, set the key and (re)start the message stream.
			that.eventManager.on('session.set', function (path, session) {
				that.msgServer.setSessionKey(session.key);
				that.msgServer.start();
			});

			// When a session key expires, stop the message stream.
			that.eventManager.on('session.unset', function () {
				that.msgServer.abort();
			});
		});
	}
};


Mage.prototype.isDevelopmentMode = function () {
	return this.config.developmentMode;
};


// The MAGE module system

var setupQueue = [];
var modules = {};

function setupModule(mage, modName, cb) {
	var mod = modules[modName];

	if (!mod) {
		return cb();
	}

	if (!mod.hasOwnProperty('setup')) {
		mage.emit('setup.' + modName, mod);
		return cb();
	}

	mod.setup(function (error) {
		if (error) {
			return cb(error);
		}

		mage.emit('setup.' + modName, mod);
		return cb();
	});
}


function setupModules(mage, modNames, cb) {
	var done = 0;
	var len = modNames.length;

	var lastError;

	function finalCb() {
		mage.emit('setupComplete');

		if (cb) {
			cb(lastError);
			cb = null;
		}
	}

	function stepCb(error) {
		lastError = error || lastError;
		done += 1;

		if (done === len) {
			finalCb();
		}
	}

	if (len === 0) {
		return finalCb();
	}

	for (var i = 0; i < len; i += 1) {
		setupModule(mage, modNames[i], stepCb);
	}
}


function createUserCommand(commandCenter, modName, cmdName, params) {
	// function name (camelCase)

	var fnName = modName + cmdName[0].toUpperCase() + cmdName.slice(1);

	// function arguments

	params = params.concat('cb');

	var args = params.join(', ');

	// expected use

	var expected = modName + '.' + cmdName + '(' + args + ')';

	// real use

	// eslint-disable-next-line no-unused-vars
	function serializeActualUse(args) {
		var result = [];

		for (var i = 0; i < args.length; i += 1) {
			var arg = args[i];

			if (typeof arg === 'function') {
				arg = 'Function';
			} else {
				arg = JSON.stringify(arg);
			}

			result.push(arg);
		}

		return modName + '.' + cmdName + '(' + result.join(', ') + ')';
	}

	// function body

	var body = [];

	body.push('fn = function ' + fnName + '(' + args + ') {');
	body.push('\tvar params = {');

	for (var i = 0; i < params.length; i += 1) {
		body.push('\t\t' + params[i] + ': ' + params[i] + (i < params.length - 1 ? ',' : ''));
	}

	body.push('\t};');
	body.push('');
	body.push('\ttry {');
	body.push('\t\tcommandCenter.sendCommand(' + JSON.stringify(modName + '.' + cmdName) + ', params, cb);');
	body.push('\t} catch (error) {');
	body.push('\t\tconsole.warn(' + JSON.stringify('Expected use: ' + expected) + ');');
	body.push('\t\tconsole.warn("Actual use: " + serializeActualUse(arguments));');
	body.push('\t\tthrow error;');
	body.push('\t};');
	body.push('};');

	body = body.join('\n');

	var fn;

	try {
		// eslint-disable-next-line no-eval
		eval(body);
	} catch (e) {
		console.error('Error generating usercommand:', modName + '.' + cmdName);
		throw e;
	}

	return fn;
}


Mage.prototype.canAddModule = function (name) {
	if (modules.hasOwnProperty(name)) {
		return false;
	}

	if (this[name]) {
		throw new Error('Cannot register module "' + name + '". This is a reserved name.');
	}

	return true;
};


Mage.prototype.addModule = function (name, mod) {
	if (!this.canAddModule(name)) {
		return;
	}

	modules[name] = this[name] = mod;

	var commands = this.config.server.commandCenter.commands[name];

	if (commands && commands.length > 0) {
		for (var j = 0; j < commands.length; j += 1) {
			var cmd = commands[j];

			mod[cmd.name] = createUserCommand(this.commandCenter, name, cmd.name, cmd.params || []);
		}
	}

	this.emit('created.' + name, mod);

	setupQueue.push(name);

	return this;
};


Mage.prototype.useModules = function () {
	var appRequire = arguments[0];

	if (typeof appRequire !== 'function') {
		throw new TypeError('useModules: the first argument must be require.');
	}

	for (var i = 1; i < arguments.length; i += 1) {
		var name = arguments[i];

		if (!this.canAddModule(name)) {
			continue;
		}

		// check if this module should exist
		// if not, we provide an empty object for user commands to be registered on

		var hasImplementation = false;

		var resolved = appRequire.resolve(name);
		if (resolved) {
			hasImplementation = !!window.require.resolve(resolved);
		}

		var mod = hasImplementation ? appRequire(name) : {};

		if (!hasImplementation) {
			console.warn('Module "' + name + '" has no implementation.');
		}

		this.addModule(name, mod);
	}

	return this;
};


Mage.prototype.setupModules = function (modNames, cb) {
	// remove all given module names from the current setupQueue

	var newSetupQueue = [];	// replacement array for setupQueue
	var toSetup = [];	// the modNames that we'll end up setting up

	for (var i = 0; i < setupQueue.length; i += 1) {
		var queuedModName = setupQueue[i];

		if (modNames.indexOf(queuedModName) === -1) {
			newSetupQueue.push(queuedModName);
		} else {
			toSetup.push(queuedModName);
		}
	}

	setupQueue = newSetupQueue;

	setupModules(this, toSetup, cb);
};

// mage.setup sets up all modules yet to be set up,
// after which it emits the event 'setup'

Mage.prototype.setup = function (cb) {
	this.setupModules(setupQueue, cb);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var msgStream = __webpack_require__(12);


function MsgServer(eventManager) {
	this.futureLog = {};	// queues up events for soon or immediate emission
	this.expectedMsgId = null;
	this.stream = null;
	this.sessionKey = null;

	this.eventManager = eventManager;
}

module.exports = MsgServer;


/**
 * Queues up messages for later emission
 * @param {Object} messages
 */

MsgServer.prototype.addMessages = function (messages) {
	if (!messages) {
		return;
	}

	if (typeof messages !== 'object') {
		throw new TypeError('Messages passed must be an object');
	}

	var msgIds = Object.keys(messages);

	for (var i = 0; i < msgIds.length; i += 1) {
		var msgId = msgIds[i];
		var msgIdNum = parseInt(msgId, 10);

		// register the message into the futureLog for later emission

		this.futureLog[msgId] = messages[msgId];

		// tell the message stream it may confirm this message as delivered

		if (this.stream && this.stream.confirm) {
			this.stream.confirm(msgId);
		}

		// make sure we are expecting the lowest possible msgId first

		if (msgIdNum !== 0 && (this.expectedMsgId === null || msgIdNum < this.expectedMsgId)) {
			this.expectedMsgId = msgIdNum;
		}
	}
};


/**
 * Forgets about all currently registered messages. Required after a session key change.
 */

MsgServer.prototype.resetFutureLog = function () {
	this.expectedMsgId = null;
	this.futureLog = {};
};


MsgServer.prototype.emitEvents = function (msgId) {
	var messages = this.futureLog[msgId];

	delete this.futureLog[msgId];

	// Emit the events in the message pack.

	if (messages) {
		this.eventManager.emitEvents(messages);
	}
};


/**
 * Emits as many messages as can be emitted without creating gaps in the flow of msgId keys
 */

MsgServer.prototype.emitFutureLog = function () {
	// Keep emitting until we encounter a gap, or futureLog has simply gone empty

	while (this.expectedMsgId && this.futureLog.hasOwnProperty(this.expectedMsgId)) {
		// Early increment expectedMsgId, so that even if an event listener were to throw, the next
		// time we call emitFutureLog, we know that we won't be expecting an old ID.

		var msgId = this.expectedMsgId;

		this.expectedMsgId += 1;

		this.emitEvents(msgId);
	}

	// finally emit any events that don't have an ID and thus don't need confirmation and lack order

	if (this.futureLog.hasOwnProperty('0')) {
		this.emitEvents('0');
	}
};


/**
 * Kills the stream connection. Can be resumed later by calling start().
 */

MsgServer.prototype.abort = function () {
	if (this.stream) {
		this.stream.abort();
	}
};


/**
 * Starts or resumes (after abort() had been called) the stream connection.
 */

MsgServer.prototype.start = function () {
	if (!this.stream) {
		throw new Error('The message stream has not yet been set up');
	}

	this.stream.start();
};


/**
 * Configures the message stream's transport types
 *
 * @param {Object} cfg
 * @return {boolean}       Returns true if succeeded to set up a transport, false otherwise.
 */

MsgServer.prototype.setupMessageStream = function (cfg) {
	if (!cfg) {
		return false;
	}

	var that = this;
	var confirmIds = [];

	// instantiate the event stream if needed

	if (this.stream) {
		confirmIds = this.stream.getUnconfirmed();

		this.stream.destroy();
		this.stream = null;
	}

	var stream = msgStream.create(cfg);
	if (!stream) {
		return false;
	}

	stream.on('error', function (error) {
		console.warn('Error from message stream transport:', error);
	});

	stream.on('delivery', function (messages) {
		try {
			that.addMessages(messages);
			that.emitFutureLog();
		} catch (error) {
			console.error('Error during message stream event emission:', error);
		}
	});

	if (this.sessionKey) {
		stream.setSessionKey(this.sessionKey);
	}

	for (var i = 0; i < confirmIds.length; i += 1) {
		stream.confirm(confirmIds[i]);
	}

	this.stream = stream;

	return true;
};


MsgServer.prototype.setSessionKey = function (sessionKey) {
	if (!this.stream) {
		throw new Error('The message stream has not yet been set up');
	}

	// Make sure any lingering messages are wiped out

	if (sessionKey !== this.sessionKey) {
		this.resetFutureLog();
		this.sessionKey = sessionKey;
	}

	this.stream.setSessionKey(sessionKey);
};



/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var transports = {
	longpolling: __webpack_require__(4).longpolling,
	shortpolling: __webpack_require__(4).shortpolling,
	websocket: __webpack_require__(13)
};


exports.transports = transports;


/**
 * Creates a stream over which we can receive messages asynchronously
 *
 * @param {Object} config     Configuration for the message stream system
 * @returns {Object}          The stream instance, or undefined if none is usable
 */

exports.create = function (config) {
	var detect = config.detect || [];

	for (var i = 0; i < detect.length; i += 1) {
		var type = detect[i];
		var cfg = config.transports[type] || {};

		var transport = transports[type];

		if (!transport) {
			console.log('Unrecognized transport type:', type, '(skipping)');
			continue;
		}

		if (transport.test(cfg)) {
			return transport.create(cfg);
		}
	}

	console.warn('Could not create any transport out of:', detect);
};



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(0);
var inherits = __webpack_require__(1);


function normalizeWsUrl(str) {
	if (str.indexOf('http') === -1) {
		// trim left slash from str

		if (str[0] !== '/') {
			str = '/' + str;
		}

		// make a full URL

		var location = window.location;

		str = location.protocol + '//' + location.host + str;  // host includes port
	}

	// switch protocols
	return str.replace(/^http/, 'ws');
}


function WebSocketClient(cfg) {
	EventEmitter.call(this);

	var that = this;
	var ws = null;
	var isOpen = false;
	var confirmIds = [];

	var afterRequestInterval = cfg.afterRequestInterval || 100;
	var afterErrorInterval = cfg.afterErrorInterval || 5000;

	var endpoint = normalizeWsUrl(cfg.url);
	var sessionKey;


	function attemptReconnect(interval) {
		setTimeout(function () {
			that.start();
		}, interval);
	}


	this.setSessionKey = function (key) {
		sessionKey = key;
	};


	this.start = function () {
		// restart, since setup has probably changed

		this.abort();

		try {
			var url = endpoint;
			if (sessionKey) {
				if (url.indexOf('?') === -1) {
					url += '?sessionKey=' + encodeURIComponent(sessionKey);
				} else {
					url += '&sessionKey=' + encodeURIComponent(sessionKey);
				}
			}

			ws = new window.WebSocket(url);
		} catch (error) {
			// see: https://developer.mozilla.org/en-US/docs/WebSockets/Writing_WebSocket_client_applications
			console.error('Possible security violation (aborting):', error);
			return false;
		}

		ws.onopen = function () {
			isOpen = true;
		};

		ws.onmessage = function (evt) {
			var msg = evt.data;

			try {
				msg = JSON.parse(msg);
			} catch (parseError) {
				that.emit('error', parseError, msg);
				return;
			}

			for (var i = 0; i < confirmIds.length; i += 1) {
				var id = confirmIds[i];
				if (msg[id]) {
					delete msg[id];
				}
			}

			that.emit('delivery', msg);
		};

		ws.onclose = function (evt) {
			// https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
			// errors are >=1002

			isOpen = false;
			ws = null;

			if (evt.code && evt.code >= 1002) {
				that.emit('error', { error: evt.code, data: evt.reason });

				attemptReconnect(afterErrorInterval);
			} else {
				attemptReconnect(afterRequestInterval);
			}
		};

		return true;
	};


	this.confirm = function (msgId) {
		confirmIds.push(msgId);

		if (ws && isOpen) {
			ws.send(confirmIds.join(','));
			confirmIds = [];
		}
	};


	this.getUnconfirmed = function () {
		return confirmIds.slice();
	};


	this.abort = function () {
		if (ws) {
			ws.onclose = null;
			ws.close();
			ws = null;
		}

		isOpen = false;
	};


	this.destroy = function () {
		this.abort();
		this.removeAllListeners();
	};
}

inherits(WebSocketClient, EventEmitter);


exports.test = function (cfg) {
	return (cfg.url && window.WebSocket) ? true : false;
};

exports.create = function (cfg) {
	return new WebSocketClient(cfg);
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

function deepCopy(obj) {
	if (!obj) {
		return obj;
	}

	if (obj instanceof Date) {
		return obj;
	}

	obj = obj.valueOf();

	var out;

	if (Array.isArray(obj)) {
		var len = obj.length;

		out = new Array(len);

		for (var i = 0; i < len; i++) {
			out[i] = deepCopy(obj[i]);
		}
	} else if (typeof obj === 'object') {
		out = {};

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				out[key] = deepCopy(obj[key]);
			}
		}
	} else {
		out = obj;
	}

	return out;
}

module.exports = deepCopy;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.mageConfig = {"appName":"game","appVersion":"0.0.1","server":{"baseUrl":"http://127.0.0.1:8080","msgStream":null,"commandCenter":{"url":"http://127.0.0.1:8080/game","timeout":15000,"commands":{"archivist":[{"name":"getTopics","params":[]},{"name":"rawAdd","params":["topic","index","data","mediaType","encoding","expirationTime"]},{"name":"rawApplyDiff","params":["topic","index","diff"]},{"name":"rawDel","params":["topic","index"]},{"name":"rawDistribute","params":["changes"]},{"name":"rawExists","params":["topic","index"]},{"name":"rawGet","params":["topic","index","options"]},{"name":"rawList","params":["topic","partialIndex","options"]},{"name":"rawMGet","params":["queries","options"]},{"name":"rawSet","params":["topic","index","data","mediaType","encoding","expirationTime"]},{"name":"rawTouch","params":["topic","index","expirationTime"]}],"logger":[{"name":"getAllChannelNames","params":[]},{"name":"sendReport","params":["channel","message","data"]},{"name":"sync","params":[]}],"session":[{"name":"loginAnonymous","params":["acl"]},{"name":"loginAsActor","params":["actorId","acl"]},{"name":"logout","params":[]},{"name":"reassign","params":["fromActorId","toActorId"]},{"name":"restore","params":["sessionKey"]}],"time":[{"name":"bend","params":["offset","accelerationFactor","startAt"]},{"name":"sync","params":["clientTime"]}],"user":[{"name":"ucGetQueue","params":[]},{"name":"ucHello","params":[]},{"name":"ucJoinQueue","params":["userId"]},{"name":"ucLogin","params":["userId","password"]},{"name":"ucRegister","params":["userId","password"]}]},"httpOptions":{}},"savvy":{"url":"http://127.0.0.1:8080/savvy"}},"developmentMode":true};

const mage = window.mage = __webpack_require__(2);

mage.setup((error) => {
	if (error) {
		throw new Error(error);
	}

	sessionStorage.clear();

	mage.eventManager.on('event.joinQueue', (error, data) => {
		console.log('Event: ', data);
	});

	mage.eventManager.on('event.login', (error, data) => {
		console.log('Event: ', data);
	});

	mage.addModule('user', __webpack_require__(5));
});

console.log('Welcome to mage');

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })
/******/ ]);
//# sourceMappingURL=mage.js.map