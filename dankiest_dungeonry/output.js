window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

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
    static DramaType(line, finished, interval, newline) {
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
    
    static ReadLine(callback)
    {
        if (mobilecheck())
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
    
    static MobileReadLine(callback)
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
    
    static Clear()
    {
        var out = document.getElementById("out");
        while (out.firstChild)
        {
            out.removeChild(out.firstChild);
        }
    }
}