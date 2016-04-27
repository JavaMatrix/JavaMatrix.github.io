var Game = {};

Game.init = function()
{
    Output.DramaType("Long, long ago in a dungeon deep, deep underground", Game.dots, 100, false);
}

Game.dots = function() {
    Output.DramaType("...", Game.drawGiantLogo, 300, true);
}

Game.drawGiantLogo = function()
{
    Output.WriteLine("    ___     ____  ____   __  _  ____    ___  _____ ______     ", true);
    Output.WriteLine("   |   \\   /    ||    \\ |  |/ ]|    |  /  _]/ ___/|      |    ", true);
    Output.WriteLine("   |    \\ |  o  ||  _  ||  ' /  |  |  /  [_(   \\_ |      |    ", true);
    Output.WriteLine("   |  D  ||     ||  |  ||    \\  |  | |    _]\\__  ||_|  |_|    ", true);
    Output.WriteLine("   |     ||  _  ||  |  ||     \\ |  | |   [_ /  \\ |  |  |      ", true);
    Output.WriteLine("   |     ||  |  ||  |  ||  .  | |  | |     |\\    |  |  |      ", true);
    Output.WriteLine("   |_____||__|__||__|__||__|\\_||____||_____| \\___|  |__|      ", true);
    Output.WriteLine("                                                               ", true);
    Output.WriteLine(" ___    __ __  ____    ____    ___   ___   ____   ____   __ __ ", true);
    Output.WriteLine("|   \\  |  |  ||    \\  /    |  /  _] /   \\ |    \\ |    \\ |  |  |", true);
    Output.WriteLine("|    \\ |  |  ||  _  ||   __| /  [_ |     ||  _  ||  D  )|  |  |", true);
    Output.WriteLine("|  D  ||  |  ||  |  ||  |  ||    _]|  O  ||  |  ||    / |  ~  |", true);
    Output.WriteLine("|     ||  :  ||  |  ||  |_ ||   [_ |     ||  |  ||    \\ |___, |", true);
    Output.WriteLine("|     ||     ||  |  ||     ||     ||     ||  |  ||  .  \\|     |", true);
    Output.WriteLine("|_____| \\__,_||__|__||___,_||_____| \\___/ |__|__||__|\\_||____/ ", true);
    Output.WriteLine("                                                               ", true);
    Output.WriteI18n("copywrong");
    Game.help();
    Output.Write("&gt; ");
    Output.ReadLine(Game.handleInput);
}

Game.handleInput = function(input)
{
    try
    {
        // Clean up the input.
        input = input.toLowerCase().trim();
        
        // Grab the args.
        args = input.split(" ").slice(1);
        
        // Process the command.
        if (input.startsWith("help"))
        {
            Game.help();
        }
        else if (input.startsWith("fight"))
        {
            Output.WriteI18n("under-construction");
        }
        else if (input.startsWith("go"))
        {
            Output.WriteI18n("under-construction");
        }
        else if (input.startsWith("take"))
        {
            Output.WriteI18n("under-construction");
        }
        else if (input.startsWith("drop"))
        {
            Output.WriteI18n("under-construction");
        }
        else if (input.startsWith("use"))
        {
            Output.WriteI18n("under-construction");
        }
        else if (input.startsWith("inv"))
        {
            Output.WriteI18n("under-construction");
        }
        else if (input.startsWith("check"))
        {
            Output.WriteI18n("under-construction");
        }
        else if (input.startsWith("equip"))
        {
            Output.WriteI18n("under-construction");
        }
        else if (input.startsWith("clear"))
        {
            Output.Clear();
        }
        else if (input.startsWith("i18n"))
        {
            if (input.startsWith("i18n dump"))
            {
                Output.Write("<table>", true);
                for (var item in I18n)
                {
                   Output.Write("<tr>", true);
                   Output.Write("<td>" + item + "</td>", true);
                   Output.Write("<td>" + I18n[item] + "</td>", true)
                   Output.Write("</tr>", true);
                }
                Output.Write("</table>");
            }
            else
            {
                var translated = I18n[args[0]];
                if (translated)
                {
                    Output.WriteLine(translated);
                }
                else
                {
                    Output.WriteLine("No such string found in I18n.");
                }
            }
        }
        else if (input.startsWith("i hate myself"))
        {
            document.getElementById("out").style.fontFamily = "Comic Sans MS";
        }
        else
        {
            if (I18n["command-" + input])
            {
                Output.WriteI18n("command-" + input);
            }
            else
            {
                Output.WriteLine("I don't understand what " + input + " means.");
            }
        }
    }
    catch (e)
    {
         console.log("[ERROR] " + e);
         Output.WriteI18n("error-occurred");
    }
    
    // Get the next command.
    Output.Write("&gt; ");
    Output.ReadLine(Game.handleInput);
}

Game.help = function()
{
    Output.WriteI18n("help-header");
    Output.WriteI18n("help-help");
    Output.WriteI18n("fight-help");
    Output.WriteI18n("go-help");
    Output.WriteI18n("take-help");
    Output.WriteI18n("drop-help");
    Output.WriteI18n("use-help");
    Output.WriteI18n("inventory-help");
    Output.WriteI18n("check-help");
    Output.WriteI18n("equip-help");
    Output.WriteI18n("clear-help");
}