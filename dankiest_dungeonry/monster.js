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

MONSTER_DEFS = {}
 
function Monster(monsterType)
{
	data = MONSTER_DEFS[monsterType];
	this.description = data["description"];
	this.plural = data["plural"];
	this.name = data["short"];
	this.attackHit = data["attack-hit-text"];
	this.attackMiss = data["attack-miss-text"];
	this.damaged = data["damaged-text"];
	this.death = data["death-text"];
	
	this.weapon = new Weapon(data["weapon"].name, data["weapon"].damage, data["weapon"].accuracy, data["weapon"].crit);
	
	this.health = data["health"];
	this.armor = data["armor"];
	
	this.maxDropLevel = data["max-drop-level"];
}

Monster.prototype.damage = function(damage)
{
	if (this.armor > 0)
		damage -= Math.floor((Math.random() * this.armor) + 1);
	
	if (damage <= 0)
	{
		return 0;
	}
	else
	{
		this.health -= damage;
		return damage;
	}
}

Monster.prototype.attack = function()
{
	return this.weapon.swing();
}

Monster.prototype.isDead = function()
{
	return this.health > 0;
}

Monster.prototype.getDrops = function()
{
	// TODO
	return [];
}
