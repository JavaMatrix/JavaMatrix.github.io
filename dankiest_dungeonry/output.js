/*
 *
 *  Dankiest Dungeonry - A completely irreverent Zork-like.
 *
 *  Written in 2016 by Nathanael Page (defensoft, gmail)
 *
 *  Makes use of jQuery - "jQuery v1.12.0 | (c) jQuery Foundation | jquery.org/licence"
 *  Some code is from stackoverflow or similar sites. This code is noted wherever it appears along with a link to the original post.
 *
 *  To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this 
 *  software to the public domain worldwide. This software is distributed without any warranty.
 *
 *  You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see
 *  <http://creativecommons.org/publicdomain/zero/1.0/>. 
 */

var I18N = {};

$.getJSON("./data/i18n.json", 
function(data)
{
    I18N = data;
});

// A global class to define the "console".
var Output = {};

Output.Flush = function()
{
    document.getElementById("out").innerHTML += this.buffer;
    Output.buffer = "";
}

Output.Write = function(str, no_flush)
{
    if (!Output.buffer)
        Output.buffer = "";
        
    Output.buffer += str;
    
    if (!no_flush)
    {
        Output.Flush();
    }
    
    window.scrollTo(0, document.body.scrollHeight);
}

Output.WriteLine = function(str, no_flush)
{
    Output.Write(str + "<br\>", no_flush);
}

Output.WriteI18n = function(key)
{
    var str = I18N[key];
    if (!str)
    {
        console.log("[WARN] I18n does not contain a definition for " + key + ".");
        str = key;
    }
    
    Output.WriteLine(str.format(Array.from(arguments).slice(1)));
}

Output.WriteCrit = function(crit)
{
	if (crit <= 0) return;
	if (I18N["critical-hit-" + crit])
		Output.WriteI18n("critical-hit-" + crit);
	else
		Output.WriteI18n("critical-hit-max", crit);
}

// dramaType: types out a string with a delay between each char to the
// output medium.
// Usage: dramaType("Test", nextAction, 100)
Output.DramaType = function(line, finished, interval, newline) {
    if (!(typeof line == "string")) return;
    var ln = String(line);
    
    // Go through each char, waiting between each.
    var idx = 0;
    var cancel_id = window.setInterval(print_char, interval || 100);
    function print_char()
    {
        
        // If we've hit the length of the string we're done.
        if (idx >= ln.length)
        {
            // Stop running the function.
            window.clearInterval(cancel_id);
            
            // Put a newline if newline is truthy.
            if (newline)
                Output.Write("<br\>");
            
            // Alert the callback if there was one.
            if (finished)
            {
                finished();
                return;
            }
        }
        
        // Actually output the char.
        var c = ln.substr(idx, 1);
        Output.Write(c);
        
        // Go to the next char.
        idx++;
        
        // Skip whitespace chars.
        if (c == " ")
        {
            // Go straight to the next one without delaying.
            print_char();
        }
    }
}

Output.ReadLine = function(callback)
{
    if (window.mobilecheck())
    {
        Output.MobileReadLine(callback);
        return;
    }
    
    var out = document.getElementById("out");
    var input_area = document.createElement("div");
    input_area.id = "input_area";
    out.appendChild(input_area);
    var input = document.createElement("div");
    input.id = "input";
    input_area.appendChild(input);
    var cursor = document.createElement("div");
    cursor.id = "cursor";
    cursor.classList.add("cursor-on");
    cursor.innerText = "_";
	cursor.textContent = "_";
    input_area.appendChild(cursor);
    
    // Start up the cursor.
    function blinkCursor(params) {
        if (this.cursor_on)
        {
            document.getElementById("cursor").classList.remove("cursor-on");
            document.getElementById("cursor").classList.add("cursor-off");
            this.cursor_on = false;
        }
        else
        {
            document.getElementById("cursor").classList.remove("cursor-off");
            document.getElementById("cursor").classList.add("cursor-on");
            this.cursor_on = true;
        }
    }
    blinkCursor.cursor_on = true;
    var cursorBlinkEvent = window.setInterval(blinkCursor, 500);
    
    function keypress(e)
    {
        e = e || event;
        if (e.keyCode == 13) // Enter
        {
            var text = document.getElementById("input").innerHTML.slice();
            var p = document.getElementById("out");
            var c = document.getElementById("input_area");
            p.removeChild(c);
            window.clearInterval(cursorBlinkEvent);
            document.getElementsByTagName("html")[0].removeEventListener("keypress", keypress);
            document.getElementsByTagName("html")[0].removeEventListener("keydown", keydown);
            
            Output.WriteLine(text);
            
            if(callback)
            {
                callback(text);
                return;
            }
        }
        else
        {
        }
            document.getElementById("input").innerText += String.fromCharCode(e.keyCode || e.charCode);
            document.getElementById("input").textContent += String.fromCharCode(e.keyCode || e.charCode);
    }
    document.getElementsByTagName("html")[0].addEventListener("keypress", keypress);
    
    function keydown(e)
    {
        if (e.keyCode == 8) // Backspace / Delete
        {
            document.getElementById("input").innerText = document.getElementById("input").innerText.slice(0, -1);
            document.getElementById("input").textContent = document.getElementById("input").textContent.slice(0, -1);
            e.preventDefault();
        }
    }
    document.getElementsByTagName("html")[0].addEventListener("keydown", keydown);
}

Output.MobileReadLine = function(callback)
{
    var box = document.getElementById("mobilein");
    var out = document.getElementById("out");
    var input_area = document.createElement("div");
    input_area.id = "input_area";
    out.appendChild(input_area);
    var input = document.createElement("div");
    input.id = "input";
    input_area.appendChild(input);
    var cursor = document.createElement("div");
    cursor.id = "cursor";
    cursor.classList.add("cursor-on");
    cursor.innerText = "_";
    input_area.appendChild(cursor);
    
    // Start up the cursor.
    function blinkCursor(params) {
        if (this.cursor_on)
        {
            document.getElementById("cursor").classList.remove("cursor-on");
            document.getElementById("cursor").classList.add("cursor-off");
            this.cursor_on = false;
        }
        else
        {
            document.getElementById("cursor").classList.remove("cursor-off");
            document.getElementById("cursor").classList.add("cursor-on");
            this.cursor_on = true;
        }
    }
    blinkCursor.cursor_on = true;
    var cursorBlinkEvent = window.setInterval(blinkCursor, 500);
    
    function keypress(e)
    {
        e = e || event;
        if (e.keyCode == 13) // Enter
        {
            var text = document.getElementById("input").innerHTML.slice();
            var p = document.getElementById("out");
            var c = document.getElementById("input_area");
            p.removeChild(c);
            window.clearInterval(cursorBlinkEvent);
            box.removeEventListener("keypress", keypress);
            box.removeEventListener("keydown", keydown);
            
            Output.WriteLine(text);
            
            if(callback)
            {
                callback(text);
                return;
            }
        }
        else
        {
            document.getElementById("input").innerText += String.fromCharCode(e.keyCode || e.charCode);
        }
    }
    box.addEventListener("keypress", keypress);
    
    function keydown(e)
    {
        if (e.keyCode == 8) // Backspace / Delete
        {
            document.getElementById("input").innerText = document.getElementById("input").innerText.slice(0, -1);
            e.preventDefault();
        }
    }
    box.addEventListener("keydown", keydown);
}

Output.Clear = function()
{
    var out = document.getElementById("out");
    while (out.firstChild)
    {
        out.removeChild(out.firstChild);
    }
    Output.buffer = "";
}
