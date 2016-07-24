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

ROOM_DEFS = {};

 
function Room(name)
{
	var data = ROOM_DEFS[name];
	this.name = name;
	this.description = data.description;
	
	this.monsters = [];
	for (var i = 0; i < data.monsters.length; i++)
	{
		var def = data.monsters[i];
		for (var n = 0; n < def.count; n++)
		{
			this.monsters.push(new Monster(def.type));
		}
	}

	this.monsters.shuffle();
	
	this.exits = {};
	this.altExits = {};

	for (var i = 0; i < data.exits.length; i++)
	{
		var exitDef = data.exits[i];
		this.exits[exitDef.direction] = exitDef.to;
		this.altExits[window.Untrash(exitDef.direction)] = exitDef.to;
	}
}

Room.prototype.popMonster = function()
{
	return this.monsters.pop();
}
