// Generated by IcedCoffeeScript 108.0.8
(function() {
  var ATCountryTypes, ATCountryTypes_i, ATExchangeTypes, ATExchangeTypes_i, ATOptionExchangeTypes, ATOptionTypes, ATOptionTypes_i, ATSymbolTypes, ATSymbolTypes_i, country_type_for_char, exchange_type_for_char, option_type_for_char, symbol_type_for_char, _;

  _ = require('underscore');

  ATExchangeTypes = {
    ExchangeAMEX: 'A',
    ExchangeNasdaqOmxBx: 'B',
    ExchangeNationalStockExchange: 'C',
    ExchangeFinraAdf: 'D',
    ExchangeCQS: 'E',
    ExchangeForex: 'F',
    ExchangeInternationalSecuritiesExchange: 'I',
    ExchangeEdgaExchange: 'J',
    ExchangeEdgxExchange: 'K',
    ExchangeChicagoStockExchange: 'M',
    ExchangeNyseEuronext: 'N',
    ExchangeNyseArcaExchange: 'P',
    ExchangeNasdaqOmx: 'Q',
    ExchangeCTS: 'S',
    ExchangeCTANasdaqOMX: 'T',
    ExchangeOTCBB: 'U',
    ExchangeNNOTC: 'u',
    ExchangeChicagoBoardOptionsExchange: 'W',
    ExchangeNasdaqOmxPhlx: 'X',
    ExchangeBatsYExchange: 'Y',
    ExchangeBatsExchange: 'Z',
    ExchangeCanadaToronto: 'T',
    ExchangeCanadaVenture: 'V',
    ExchangeComposite: ' '
  };

  ATOptionExchangeTypes = {
    ExchangeOpra: 'O',
    ExchangeOptionBoston: 'B',
    ExchangeOptionCboe: 'C',
    ExchangeOptionNyseArca: 'N',
    ExchangeOptionC2: 'W',
    ExchangeOptionNasdaqOmxBx: 'T',
    ExchangeComposite: ' '
  };

  ATExchangeTypes_i = _.invert(ATExchangeTypes);

  exchange_type_for_char = function(char) {
    var exchange, exchangeKey;
    exchangeKey = new Buffer([char]).toString('utf8');
    exchange = ATExchangeTypes_i[exchangeKey];
    return exchange;
  };

  ATSymbolTypes = {
    SymbolStock: 'S',
    SymbolIndex: 'I',
    SymbolStockOption: 'O',
    SymbolBond: 'B',
    SymbolMutualFund: 'M',
    SymbolTopMarketMovers: 'T',
    SymbolCurrency: 'C'
  };

  ATSymbolTypes_i = _.invert(ATSymbolTypes);

  symbol_type_for_char = function(char) {
    var symbol, symbolKey;
    symbolKey = new Buffer([char]).toString('utf8');
    symbol = ATSymbolTypes_i[symbolKey];
    return symbol;
  };

  ATOptionTypes = {
    OptionTypeCall: 'C',
    OptionTypePut: 'P'
  };

  ATOptionTypes_i = _.invert(ATOptionTypes);

  option_type_for_char = function(char) {
    var option, optionKey;
    optionKey = new Buffer([char]).toString('utf8');
    option = ATOptionTypes_i[optionKey];
    return option;
  };

  ATCountryTypes = {
    CountryInternational: 'I',
    CountryUnitedStates: 'U',
    CountryCanada: 'C'
  };

  ATCountryTypes_i = _.invert(ATCountryTypes);

  country_type_for_char = function(char) {
    var country, countryKey;
    countryKey = new Buffer([char]).toString('utf8');
    country = ATCountryTypes_i[countryKey];
    return country;
  };

  module.exports = {
    ATExchangeTypes: ATExchangeTypes,
    ATCountryTypes: ATCountryTypes,
    ATSymbolTypes: ATSymbolTypes,
    ATOptionTypes: ATOptionTypes,
    exchange_type_for_char: exchange_type_for_char,
    country_type_for_char: country_type_for_char,
    option_type_for_char: option_type_for_char,
    symbol_type_for_char: symbol_type_for_char
  };

}).call(this);
