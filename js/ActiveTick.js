// Generated by IcedCoffeeScript 1.8.0-e
(function() {
  var ATBarHistoryType, ATConstituentRequestTypes, ATStreamRequestTypes, ActiveTick, EventEmitter, NodeActiveTick, ProtoBuf, async, debug_exists, debug_path, fs, noisy, path, release_path, standard_timeout, _, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  fs = require('fs');

  release_path = __dirname + '/../build/Release/NodeActiveTickAddon.node';

  debug_path = __dirname + '/../build/Debug/NodeActiveTickAddon.node';

  debug_exists = fs.existsSync(debug_path);

  if (debug_exists) {
    NodeActiveTick = require(debug_path).NodeActiveTick;
  } else {
    NodeActiveTick = require(release_path).NodeActiveTick;
  }

  async = require('async');

  _ = require('underscore');

  ProtoBuf = require('protobufjs');

  path = require('path');

  EventEmitter = require('events');

  _ref = require('./ActiveTickDefines'), ATConstituentRequestTypes = _ref.ATConstituentRequestTypes, ATStreamRequestTypes = _ref.ATStreamRequestTypes, ATBarHistoryType = _ref.ATBarHistoryType;

  noisy = true;

  standard_timeout = 3000;

  ActiveTick = (function(_super) {
    __extends(ActiveTick, _super);

    function ActiveTick(readyCb) {
      this.handleProtoMsg = __bind(this.handleProtoMsg, this);
      this.connect = __bind(this.connect, this);
      this.beginQuoteStream = __bind(this.beginQuoteStream, this);
      this.quoteDBRequest = __bind(this.quoteDBRequest, this);
      this.barHistoryDBRequest = __bind(this.barHistoryDBRequest, this);
      ProtoBuf.loadProtoFile(path.join(__dirname, "../protobuf", "messages.proto"), (function(_this) {
        return function(err, builder) {
          if (err) {
            return console.error(err);
          }
          _this.api = new NodeActiveTick(_this.handleProtoMsg);
          _this.callbacks = {};
          _this.stream_callbacks = {};
          _this.messages_builder = builder;
          _this.ATLoginResponse = _this.messages_builder.build("NodeActiveTickProto.ATLoginResponse");
          _this.ATConstituentResponse = _this.messages_builder.build("NodeActiveTickProto.ATConstituentResponse");
          _this.ATQuote = _this.messages_builder.build("NodeActiveTickProto.ATQuote");
          _this.ATQuoteStreamResponse = _this.messages_builder.build("NodeActiveTickProto.ATQuoteStreamResponse");
          _this.ATQuoteStreamTradeUpdate = _this.messages_builder.build("NodeActiveTickProto.ATQuoteStreamTradeUpdate");
          _this.ATQuoteStreamQuoteUpdate = _this.messages_builder.build("NodeActiveTickProto.ATQuoteStreamQuoteUpdate");
          _this.ATBarHistoryDbResponse = _this.messages_builder.build("NodeActiveTickProto.ATBarHistoryDbResponse");
          _this.ATQuoteDbResponse = _this.messages_builder.build("NodeActiveTickProto.ATQuoteDbResponse");
          return readyCb();
        };
      })(this));
    }

    ActiveTick.prototype.barHistoryDBRequest = function(symbol, barhistorytype, intradayminutecompression, startime, endtime, requestCb) {
      var request_id;
      request_id = this.api.barHistoryDbRequest(symbol, barhistorytype, intradayminutecompression, startime, endtime);
      if (requestCb != null) {
        return this.callbacks[request_id] = requestCb;
      }
    };

    ActiveTick.prototype.quoteDBRequest = function(symbol, fields, requestCb) {
      var request_id;
      request_id = this.api.quoteDbRequest(symbol, fields);
      if (requestCb != null) {
        return this.callbacks[request_id] = requestCb;
      }
    };

    ActiveTick.prototype.beginQuoteStream = function(symbols, ATStreamRequestTypeIndex, requestCb) {
      var request_id, symbolCount, symbolParam;
      if (typeof symbols === 'object') {
        if (symbols.length === 1) {
          symbolParam = symbols[0];
          symbolCount = 1;
        } else {
          symbolParam = symbols.join(',');
          symbolCount = symbols.length;
        }
      } else if (typeof symbols === 'string') {
        symbolParam = symbols;
        symbolCount = 1;
      }
      request_id = this.api.beginQuoteStream(symbolParam, symbolCount, ATStreamRequestTypeIndex);
      if (requestCb != null) {
        return this.callbacks[request_id] = requestCb;
      }
    };

    ActiveTick.prototype.listRequest = function(listType, key, cb) {
      var request_id;
      request_id = this.api.listRequest(listType, key);
      return this.callbacks[request_id] = cb;
    };

    ActiveTick.prototype.connect = function(apiKey, username, password, cb) {
      var request_id;
      request_id = this.api.connect(apiKey, username, password);
      return this.callbacks[request_id] = cb;
    };

    ActiveTick.prototype.handleProtoMsg = function(msgType, msgID, msgData) {
      var c, f, g, msg, _i, _j, _len, _len1, _ref1, _ref2;
      if (msgType === 'ATLoginResponse') {
        msg = this.ATLoginResponse.decode(msgData);
        if (msg.loginResponseString !== 'Success') {
          return console.error(msg);
        }
      } else if (msgType === 'ATConstituentResponse') {
        msg = this.ATConstituentResponse.decode(msgData);
      } else if (msgType === 'ATQuoteStreamResponse') {
        msg = this.ATQuoteStreamResponse.decode(msgData);
      } else if (msgType === 'ATBarHistoryDbResponse') {
        msg = this.ATBarHistoryDbResponse.decode(msgData);
      } else if (msgType === 'ATQuoteStreamTradeUpdate') {
        msg = this.ATQuoteStreamTradeUpdate.decode(msgData);
        this.emit('trade', msg);
      } else if (msgType === 'ATQuoteStreamQuoteUpdate') {
        msg = this.ATQuoteStreamQuoteUpdate.decode(msgData);
        this.emit('quote', msg);
      } else if (msgType === 'ATQuoteDbResponse') {
        msg = this.ATQuoteDbResponse.decode(msgData);
        this.ATQuoteFieldTypes = this.messages_builder.build('NodeActiveTickProto.ATQuoteFieldType');
        this.ATFieldStatus = this.messages_builder.build('NodeActiveTickProto.ATQuoteDbResponseSymbolFieldData.ATFieldStatus');
        this.ATDataType = this.messages_builder.build('NodeActiveTickProto.ATQuoteDbResponseSymbolFieldData.ATDataType');
        this.ATQuoteDbResponseType = _.invert(this.messages_builder.build('NodeActiveTickProto.ATQuoteDbResponse.ATQuoteDbResponseType'));
        msg.responseType = this.ATQuoteDbResponseType[msg.responseType];
        _ref1 = msg.datum;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          f = _ref1[_i];
          console.log(f.symbol.symbol);
          _ref2 = f.symbolFieldData;
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            g = _ref2[_j];
            console.log(_.invert(this.ATQuoteFieldTypes)[g.fieldType]);
            console.log(_.invert(this.ATDataType)[g.dataType]);
            if (_.invert(this.ATDataType)[g.dataType] === 'DataPrice') {
              console.log(g.DataPricePB);
            }
            if (_.invert(this.ATDataType)[g.dataType] === 'DataDouble') {
              console.log(g.DataDoublePB);
            }
          }
        }
      }
      if ((c = this.callbacks[msgID]) != null) {
        return c(msg);
      }
    };

    return ActiveTick;

  })(EventEmitter);

  module.exports = {
    ActiveTick: ActiveTick
  };

}).call(this);
