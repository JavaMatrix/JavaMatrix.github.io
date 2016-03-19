// A global class to define the "console".
class Output
{
    static Flush()
    {
        document.getElementById("out").innerHTML += this.buffer;
        this.buffer = "";
    }
    
    static Write(str, no_flush)
    {
        if (typeof this.buffer == "undefined")
            this.buffer = "";
            
        this.buffer += str;
        
        if (!no_flush)
        {
            Output.Flush();
        }
        
        window.scrollTo(0, document.body.scrollHeight);
    }
    
    static WriteLine(str, no_flush)
    {
        Output.Write(str + "<br\>", no_flush);
    }
    
    // dramaType: types out a string with a delay between each char to the
    // output medium.
    // Usage: dramaType("Test", nextAction, 100)
    static DramaType(line, finished, context, interval, newline) {
        console.log("drama typing " + line);
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
                    if (context)
                        finished.call(context);
                    else
                        finished();
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
    
    static ReadLine(callback, context)
    {
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
                document.getElementsByTagName("html")[0].removeEventListener("keypress", keypress);
                document.getElementsByTagName("html")[0].removeEventListener("keydown", keydown);
                
                Output.WriteLine(text);
                
                if(callback)
                {
                    if (context)
                    {
                        callback.call(context, text);
                        return;
                    }
                    else
                    {
                        callback(text);
                        return;
                    }
                }
            }
            else
            {
                document.getElementById("input").innerText += String.fromCharCode(e.keyCode || e.charCode);
            }
        }
        document.getElementsByTagName("html")[0].addEventListener("keypress", keypress);
        
        function keydown(e)
        {
            if (e.keyCode == 8) // Backspace / Delete
            {
                document.getElementById("input").innerText = document.getElementById("input").innerText.slice(0, -1);
                e.preventDefault();
            }
        }
        document.getElementsByTagName("html")[0].addEventListener("keydown", keydown);
    }
    
    static Clear()
    {
        var out = document.getElementById("out");
        while (out.firstChild)
        {
            out.removeChild(out.firstChild);
        }
    }
}