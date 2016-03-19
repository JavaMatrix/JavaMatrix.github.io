var I18n = {};

I18n.Load = function()
{
    $.get("./data/i18n.yaml", I18n.LoadFile);
}

I18n.LoadFile = function(text)
{
    var doc = safeLoad(text);
    for (var tag in doc) {
        console.log(tag);
    }
}

I18n.Load();