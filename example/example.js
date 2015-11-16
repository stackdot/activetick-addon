// Generated by IcedCoffeeScript 1.8.0-e
(function() {
  var ActiveTick, config, fs, iced, log, main, updateLogStatement, __iced_k, __iced_k_noop;

  iced = require('iced-runtime');
  __iced_k = __iced_k_noop = function() {};

  ActiveTick = require('..').ActiveTick;

  log = require('single-line-log').stdout;

  fs = require('fs');

  config = require('./config.js');

  updateLogStatement = (function(_this) {
    return function(tickers, lastTrades, lastQuotes) {
      var lineStatement, logstring, lq, lt, statement, t, _i, _len;
      statement = '';
      for (_i = 0, _len = tickers.length; _i < _len; _i++) {
        t = tickers[_i];
        lineStatement = t + '\t';
        if ((lt = lastTrades[t]) != null) {
          lineStatement += lt.tradeSize + ' @ ' + lt.tradePrice.price;
        }
        if ((lq = lastQuotes[t]) != null) {
          lineStatement += '\t| ' + lq.quoteBidPrice.price + ' ' + lq.quoteAskPrice.price;
        }
        lineStatement += '\n';
        statement += lineStatement;
      }
      log(statement);
      if ((_this.last_trade != null) && (_this.last_quote != null)) {
        logstring = last_trade.tradeSize + ' @ ' + last_trade.tradePrice.price + '\n' + ' Bid: ' + last_quote.quoteBidPrice.price + ' Ask: ' + last_quote.quoteAskPrice.price;
        return log(logstring);
      }
    };
  })(this);

  main = function() {
    var a, alibaba, apple, att, facebook, result, shake_shack, tickers, virgin_america, ___iced_passed_deferral, __iced_deferrals, __iced_k;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    (function(_this) {
      return (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "/Users/sheldonthomas/Documents/Resplendent/activetick-addon/example/example.iced"
        });
        a = new ActiveTick(__iced_deferrals.defer({
          lineno: 33
        }));
        __iced_deferrals._fulfill();
      });
    })(this)((function(_this) {
      return function() {
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/sheldonthomas/Documents/Resplendent/activetick-addon/example/example.iced"
          });
          a.connect(config.api_key, config.username, config.password, __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return result = arguments[0];
              };
            })(),
            lineno: 34
          }));
          __iced_deferrals._fulfill();
        })(function() {
          _this.last_trades = {};
          _this.last_quotes = {};
          a.on('trade', function(trade) {
            return _this.last_trades[trade.tradeSymbol.symbol] = trade;
          });
          a.on('quote', function(quote) {
            return _this.last_quotes[quote.quoteSymbol.symbol] = quote;
          });
          setInterval(function() {
            return updateLogStatement(tickers, _this.last_trades, _this.last_quotes);
          }, 1000);
          virgin_america = 'VA';
          att = 'T';
          facebook = 'FB';
          apple = 'AAPL';
          alibaba = 'BABA';
          shake_shack = 'SHAK';
          tickers = [virgin_america, att, facebook, apple, alibaba, shake_shack];
          return a.beginQuoteStream(tickers, 'StreamRequestSubscribe', function(result) {
            var i, st, _i, _len, _ref;
            st = 'Logging Quote Stream: ';
            _ref = result.quoteStreamItems;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              i = _ref[_i];
              st += i.symbol.symbol + ' ';
            }
            return log(st);
          });
        });
      };
    })(this));
  };

  if (!module.parent) {
    main();
  }

}).call(this);
