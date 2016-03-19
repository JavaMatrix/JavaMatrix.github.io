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
    Output.WriteLine("Copywrong &#9408; 1977 Defenestration Coding Uncorporated");
    Game.help();
    Output.Write("&gt; ");
    Output.ReadLine(Game.handleInput);
}

Game.handleInput = function(input)
{
    // Clean up the input.
    input = input.toLowerCase().trim();
    
    // Process the command.
    if (input.startsWith("help"))
    {
        Game.help();
    }
    else if (input.startsWith("fight"))
    {
        Output.WriteLine("Under construction. Watch " +
            "<a href=\"http://github.com/JavaMatrix/javamatrix.github.io/tree/master/dankiest_dungeonry\">" +
            "the repository</a> for updates!");
    }
    else if (input.startsWith("go"))
    {
        Output.WriteLine("Under construction. Watch " +
            "<a href=\"http://github.com/JavaMatrix/javamatrix.github.io/tree/master/dankiest_dungeonry\">" +
            "the repository</a> for updates!");
    }
    else if (input.startsWith("take"))
    {
        Output.WriteLine("Under construction. Watch " +
            "<a href=\"http://github.com/JavaMatrix/javamatrix.github.io/tree/master/dankiest_dungeonry\">" +
            "the repository</a> for updates!");
    }
    else if (input.startsWith("drop"))
    {
        Output.WriteLine("Under construction. Watch " +
            "<a href=\"http://github.com/JavaMatrix/javamatrix.github.io/tree/master/dankiest_dungeonry\">" +
            "the repository</a> for updates!");
    }
    else if (input.startsWith("use"))
    {
        Output.WriteLine("Under construction. Watch " +
            "<a href=\"http://github.com/JavaMatrix/javamatrix.github.io/tree/master/dankiest_dungeonry\">" +
            "the repository</a> for updates!");
    }
    else if (input.startsWith("inv"))
    {
        Output.WriteLine("Under construction. Watch " +
            "<a href=\"http://github.com/JavaMatrix/javamatrix.github.io/tree/master/dankiest_dungeonry\">" +
            "the repository</a> for updates!");
    }
    else if (input.startsWith("check"))
    {
        Output.WriteLine("Under construction. Watch " +
            "<a href=\"http://github.com/JavaMatrix/javamatrix.github.io/tree/master/dankiest_dungeonry\">" +
            "the repository</a> for updates!");
    }
    else if (input.startsWith("equip"))
    {
        Output.WriteLine("Under construction. Watch " +
            "<a href=\"http://github.com/JavaMatrix/javamatrix.github.io/tree/master/dankiest_dungeonry\">" +
            "the repository</a> for updates!");
    }
    else if (input.startsWith("clear"))
    {
        Output.Clear();
    }
    else
    {
        Output.WriteLine("I don't understand what " + input + " means.");
    }
    
    // Get the next command.
    Output.Write("&gt; ");
    Output.ReadLine(Game.handleInput);
}

Game.help = function()
{
    Output.WriteLine("Commands:");
    Output.WriteLine("  Help: Displays this help menu");
    Output.WriteLine("  Fight: Attack the monster that you are currently in battle with, or start a\n" +
    "\tbattle with a random enemy. Use \"auto fight\" to auto-battle every monster in the room. This\n" +
    "\tcannot be aborted once started, so use care.");
    Output.WriteLine("  Go (where): Move to a new area in the direction you specified. For example: go north");
    Output.WriteLine("  Take: Pick an item up off of the ground and put it in your bag.");
    Output.WriteLine("  Drop: Drop an item from your bag onto the ground.");
    Output.WriteLine("  Use: Use the item in the given slot (swig a potion, cast a spell, etc).");
    Output.WriteLine("  Inventory: Look at the items in your inventory.");
    Output.WriteLine("  Check: Take a look at your surroundings, your enemy, and yourself.");
    Output.WriteLine("  Equip: Equip an item from your bag, such as a weapon or armor.");
    Output.WriteLine("  Clear: Clear the screen.");
}