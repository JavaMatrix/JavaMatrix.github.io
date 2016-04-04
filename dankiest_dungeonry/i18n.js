var I18n = {};
var I18nFuncs = {};

I18nFuncs.LoadFile = function(data)
{
    I18n = data;
}

$.getJSON("./data/i18n.json", I18nFuncs.LoadFile);