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

var Game = {};

Game.init = function()
{
	Game.currentRoom = new Room("field");
	Game.player = new Player();
    Output.DramaType("Long, long ago in a dungeon deep, deep underground", Game.dots, 100, false);
	Game.lastCommand = "help";
}

Game.dots = function() {
    Output.DramaType("...", Game.drawGiantLogo, 300, true);
}

Game.drawGiantLogo = function()
{
    Outhtput.WriteLine("    ___     ____  ____   __  _  ____    ___  _____ ______     ", true);
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
        
		var cacheLast = true;
		if (input == "")
		{
			var output = document.getElementById("out");
			output.removeChild(output.lastChild);
			Output.WriteLine(Game.lastCommand);
			input = Game.lastCommand;
		}
        // Process the command.
        if (input.startsWith("help"))
        {
            Game.help();
        }
        else if (input.startsWith("fight"))
        {
            Game.fight();
        }
        else if (input.startsWith("go"))
        {
            Game.go(args);
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
                for (var item in I18N)
                {
                   Output.Write("<tr>", true);
                   Output.Write("<td>" + item + "</td>", true);
                   Output.Write("<td>" + I18N[item] + "</td>", true)
                   Output.Write("</tr>", true);
                }
                Output.Write("</table>");
            }
            else
            {
                var translated = I18N[args[0]];
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
		else if (input.startsWith("reload"))
		{
			location.reload();
		}
        else if (input.startsWith("i hate myself"))
        {
            document.getElementById("out").style.fontFamily = "Comic Sans MS";
        }
        else
        {
            if (I18N["command-" + input])
            {
                Output.WriteI18n("command-" + input);
            }
            else
            {
                Output.WriteLine("I don't understand what " + input + " means.");
				cacheLast = false;
            }
        }
    }
    catch (e)
    {
         console.log("[ERROR] " + e);
         Output.WriteI18n("error-occurred");
    }
    
	if (cacheLast)
		Game.lastCommand = input;
	
	if (Game.player.health > 0)
	{
    	// Get the next command.
    	Output.Write("&gt; ");
    	Output.ReadLine(Game.handleInput);
	}
	else
	{
		Output.WriteI18n("player-died");
		Output.DramaType(I18N["game-over"],
		function()
		{
			Output.Write(I18N["reload?"]);
			Output.ReadLine(
			function(response)
			{
				if (!response.toLowerCase().trim().startsWith("n"))
				{
					location.reload();
				}
			});
		}, 500, true);
	}
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

Game.fight = function()
{
	if (typeof Game.currentMonster == "undefined" || Game.currentMonster.health <= 0)
	{
		var newMonster = Game.currentRoom.popMonster();
		if (typeof newMonster == "undefined")
		{
			Output.WriteI18n("no-monsters");
			return;
		}
		else
		{
			Game.currentMonster = newMonster;
			Output.WriteI18n("fight-new", Game.currentMonster.description);
		}
	}

	if (Math.random() <= 0.2)
	{
		Output.WriteI18n("player-miss", Game.currentMonster.name);
	}
	else
	{
		var swing = Game.player.attack();
		var damage = Game.currentMonster.damage(swing.damage);
		Output.WriteCrit(swing.crit);	

		if (damage > 0)
		{
			Output.WriteI18n("player-hit", Game.currentMonster.name, damage);
			if (Game.currentMonster.health > 0)
				Output.WriteI18n("monster-hit", Game.currentMonster.name, Game.currentMonster.damaged);
			else
				Output.WriteI18n("monster-death", Game.currentMonster.name, Game.currentMonster.death, Game.currentMonster.name);
		}
		else
		{
			Output.WriteI18n("monster-blocked", Game.currentMonster.name);
		}
	}

	if (Game.currentMonster.health <= 0)
	{
		return;
	}
	
	if (Math.random() <= 0.2)
	{
		Output.WriteI18n("monster-miss", Game.currentMonster.name, Game.currentMonster.attackMiss);
	}
	else
	{
		var swing = Game.currentMonster.attack();
		var damage = Game.player.damage(swing.damage);
		Output.WriteI18n("monster-hit", Game.currentMonster.name, Game.currentMonster.attackHit);
		Output.WriteCrit(swing.crit);

		if (damage > 0)
		{
			Output.WriteI18n("player-damaged", damage);
		}
		else
		{
			Output.WriteI18n("player-blocked", Game.currentMonster.name);
		}
	} 
}

Game.go = function(args)
{
	if (Game.currentRoom.monsters.length > 0 || (typeof Game.currentMonster != 'undefined' && Game.currentMonster.health > 0))
	{
		Output.WriteI18n("fight-all");
		return;
	}

	if (args.length	< 1)
	{
		Output.WriteI18n("go-where");
		return;
	}	

	var where = window.Untrash(args.join(' '));
	if (Game.currentRoom.exits[where])
	{
		Game.currentRoom = new Room(Game.currentRoom.exits[where]);
	}
	else if (Game.currentRoom.altExits[where])
	{
		Game.currentRoom = new Room(Game.currentRoom.altExits[where]);
	}
	else
	{
		Output.WriteI18n("no-exit");
	}
}
