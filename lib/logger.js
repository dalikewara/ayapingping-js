/*!
 * logger.js
 * Copyright(c) 2018-2020 Dali Kewara
 * MIT Licensed
 */

'use strict';

var morgan = require('morgan');

var defaultEnv = {
  LOGGER_REQUEST_BODY: (process.env.LOGGER_REQUEST_BODY === 'false') ? false : true,
  LOGGER_RESPONSE_BODY: (process.env.LOGGER_RESPONSE_BODY === 'false') ? false : true,
  LOGGER_FORMAT: process.env.LOGGER_FORMAT || 'dev'
};

var defaultOption = {
  requestBodyLength: process.appjsPlgOpt.requestBodyLength || null,
  responseBodyLength: process.appjsPlgOpt.responseBodyLength || 5000
};

module.exports = function (app, proto, resolve, reject) {
  app.use(function (req, res, next) {
    res.locals.__LOGGER__ = {};
    res.locals.__LOGGER__.hrStartTime = getStartTime();
    var oldWrite = res.write;
    var oldEnd = res.end;
    var chunks = [];
    res.write = function (...restArgs) {
      chunks.push(Buffer.from(restArgs[0]));
      oldWrite.apply(res, restArgs);
    };
    res.end = function (...restArgs) {
      if (restArgs[0]) chunks.push(Buffer.from(restArgs[0]));
      var logObjs = logObj(req, res, Buffer, chunks);
      res.locals.__LOGGER__.obj = logObjs;
      setLoggerToken(res.locals.__LOGGER__.obj);
      oldEnd.apply(res, restArgs);
    };
    next();
  });
  app.use(morgan(function (tokens, req, res) {
    if (tokens.__LOGGER__) return loggingConsoleNormalFormat(defaultEnv.LOGGER_FORMAT, tokens, req, res);
    return loggingConsoleTimeoutFormat(defaultEnv.LOGGER_FORMAT, tokens, req, res);
  }));
  resolve();
};

function getIpAddress(req) {
  return (req.headers['x-forwarded-for']
    || req.connection.remoteAddress) || '-';
}

function getContentType(req) {
  return req.headers['content-type'] || '-';
}

function getMethod(req) {
  return req.method || '-';
}

function getEndpoint(req) {
  return (req.originalUrl || req.url) || '-';
}

function getTimestamp() {
  return new Date();
}

function getStartTime() {
  return process.hrtime();
}

function getElapsedTime(res) {
  var elapsedTime = 0;
  if (res.locals.__LOGGER__.hrStartTime) {
    elapsedTime = process.hrtime(res.locals.__LOGGER__.hrStartTime);
    elapsedTime = elapsedTime[0] * 1e3 + elapsedTime[1] * 1e-6;
    elapsedTime = elapsedTime.toFixed(3);
  }
  return elapsedTime;
}

function getStatusCode(res) {
  return res.statusCode || '-';
}

function getRequestBody(req) {
  return req.body || '-';
}

function getResponseBody(Buffer, chunks) {
  return Buffer.concat(chunks).toString('utf8');
}

function getMorganFormat(format) {
  switch (format) {
    case 'tiny':
      return ':method :url :status :res[content-length] - :response-time ms';
    case 'short':
      return ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms';
    case 'common':
      return ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]';
    case 'combined':
      return ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
    case 'dev':
      return ':method :url :status :response-time ms - :res[content-length]';
    default:
      return ':method :url :status :response-time ms - :res[content-length]';
  }
}

function setLoggerToken(obj) {
  morgan.token('__LOGGER__', function (req, res, param) {
    switch (param) {
      case 'header':
        return '=================== REQUEST ======================\n';
      case 'footer':
        return '==================================================\n';
      case 'ipAddress':
        return 'IP        : ' + obj.ipAddress + '\n';
      case 'endpoint':
        return 'ENDPOINT  : ' + obj.endpoint + '\n';
      case 'timestamp':
        return 'TIMESTAMP : ' + obj.timestamp + '\n';
      case 'info':
        return 'INFO      : ' + obj.method +
          ' ' + obj.statusCode + ' ' + obj.processTime + 'ms ' +
          obj.contentType + '\n';
      case 'requestBody':
        return (!defaultEnv.LOGGER_REQUEST_BODY) ? '' :
          'BODY      : ' + obj.requestBodyShort + '\n';
      case 'responseBody':
        return (!defaultEnv.LOGGER_RESPONSE_BODY) ? '' :
          'RESPONSE  : ' + obj.responseBodyShort + '\n';
      case 'end':
        return '\n ';
      default:
        return '-';
    }
  });
}

function logObj(req, res, Buffer, chunks) {
  var requestBodyLength = defaultOption.requestBodyLength;
  var responseBodyLength = defaultOption.responseBodyLength;
  var obj = {};
  obj.ipAddress = getIpAddress(req);
  obj.endpoint = getEndpoint(req);
  obj.timestamp = getTimestamp();
  obj.method = getMethod(req);
  obj.statusCode = getStatusCode(res);
  obj.processTime = getElapsedTime(res);
  obj.contentType = getContentType(req);
  obj.requestBody = getRequestBody(req);
  obj.requestBodyString = JSON.stringify(obj.requestBody);
  obj.responseBody = getResponseBody(Buffer, chunks);
  obj.responseBodyString = JSON.stringify(obj.responseBody);
  if (!requestBodyLength || (requestBodyLength &&
    (obj.requestBodyString.length <= requestBodyLength))) {
    obj.requestBodyShort = obj.requestBodyString;
  } else {
    obj.requestBodyShort = obj.requestBodyString.slice(0, requestBodyLength) + '...(ONLY SHOW ' + requestBodyLength + ' CHARS)';
  }
  if (!responseBodyLength || (responseBodyLength &&
    (obj.responseBodyString.length <= responseBodyLength))) {
    obj.responseBodyShort = obj.responseBodyString;
  } else {
    obj.responseBodyShort = obj.responseBodyString.slice(0, responseBodyLength) + '...(ONLY SHOW ' + responseBodyLength + ' CHARS)';
  }
  return obj;
}

function loggingConsoleFormat(format) {
  var morganFormat = getMorganFormat(format || defaultEnv.LOGGER_FORMAT);
  var header =
    ':__LOGGER__[header]' +
    ':__LOGGER__[ipAddress]' +
    ':__LOGGER__[endpoint]' +
    ':__LOGGER__[timestamp]' +
    ':__LOGGER__[info]' +
    ':__LOGGER__[requestBody]' +
    ':__LOGGER__[responseBody]' +
    ':__LOGGER__[footer]';
  var footer = ':__LOGGER__[end]';
  return header + morganFormat + footer;
}

function loggingConsoleNormalFormat(format, tokens, req, res) {
  var morganString = loggingConsoleFormat(format);
  morganString = morganString.replace(':method', tokens.method(req, res) || '-')
    .replace(':url', tokens.url(req, res) || '-')
    .replace(':status', tokens.status(req, res) || '-')
    .replace(':res[content-length]', tokens.res(req, res, 'content-length') || '-')
    .replace(':response-time', tokens['response-time'](req, res) || '-')
    .replace(':remote-addr', tokens['remote-addr'](req, res) || '-')
    .replace(':remote-user', tokens['remote-user'](req, res) || '-')
    .replace(':date', tokens.date(req, res, 'clf') || '-')
    .replace(':http-version', tokens['http-version'](req, res) || '-')
    .replace(':referrer', tokens.referrer(req, res) || '-')
    .replace(':user-agent', tokens['user-agent'](req, res) || '-')
    .replace(':__LOGGER__[header]', tokens['__LOGGER__'](req, res, 'header'))
    .replace(':__LOGGER__[ipAddress]', tokens['__LOGGER__'](req, res, 'ipAddress'))
    .replace(':__LOGGER__[endpoint]', tokens['__LOGGER__'](req, res, 'endpoint'))
    .replace(':__LOGGER__[timestamp]', tokens['__LOGGER__'](req, res, 'timestamp'))
    .replace(':__LOGGER__[info]', tokens['__LOGGER__'](req, res, 'info'))
    .replace(':__LOGGER__[requestBody]', tokens['__LOGGER__'](req, res, 'requestBody'))
    .replace(':__LOGGER__[responseBody]', tokens['__LOGGER__'](req, res, 'responseBody'))
    .replace(':__LOGGER__[footer]', tokens['__LOGGER__'](req, res, 'footer'))
    .replace(':__LOGGER__[end]', tokens['__LOGGER__'](req, res, 'end'));
  return morganString;
}

function loggingConsoleTimeoutFormat(format, tokens, req, res) {
  var logObjs = logObj(req, res, Buffer, []);
  res.locals.__LOGGER__.obj = logObjs;
  setLoggerToken(res.locals.__LOGGER__.obj);
  var morganString = loggingConsoleFormat(format);
  morganString = morganString.replace(':method', tokens.method(req, res) || '-')
    .replace(':url', tokens.url(req, res) || '-')
    .replace(':status', tokens.status(req, res) || '-')
    .replace(':res[content-length]', tokens.res(req, res, 'content-length') || '-')
    .replace(':response-time', tokens['response-time'](req, res) || '-')
    .replace(':remote-addr', tokens['remote-addr'](req, res) || '-')
    .replace(':remote-user', tokens['remote-user'](req, res) || '-')
    .replace(':date', tokens.date(req, res, 'clf') || '-')
    .replace(':http-version', tokens['http-version'](req, res) || '-')
    .replace(':referrer', tokens.referrer(req, res) || '-')
    .replace(':user-agent', tokens['user-agent'](req, res) || '-')
    .replace(':__LOGGER__[header]', tokens['__LOGGER__'](req, res, 'header'))
    .replace(':__LOGGER__[ipAddress]', tokens['__LOGGER__'](req, res, 'ipAddress'))
    .replace(':__LOGGER__[endpoint]', tokens['__LOGGER__'](req, res, 'endpoint'))
    .replace(':__LOGGER__[timestamp]', tokens['__LOGGER__'](req, res, 'timestamp'))
    .replace(':__LOGGER__[info]', tokens['__LOGGER__'](req, res, 'info'))
    .replace(':__LOGGER__[requestBody]', tokens['__LOGGER__'](req, res, 'requestBody'))
    .replace(':__LOGGER__[responseBody]', tokens['__LOGGER__'](req, res, 'responseBody') + '[408 REQUEST TIMEOUT]\n')
    .replace(':__LOGGER__[footer]', tokens['__LOGGER__'](req, res, 'footer'))
    .replace(':__LOGGER__[end]', tokens['__LOGGER__'](req, res, 'end'));
  return morganString;
}