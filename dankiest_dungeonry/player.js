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

function Player()
{
	this.weapon = new Weapon("Candy Cane", 6, 0.3, 0.01);
	this.max_health = 100;
	this.health = 100;
	this.inventory = [];
}

Player.prototype.attack = function()
{
	return this.weapon.swing();
}

Player.prototype.damage = function(damage)
{
	this.health -= damage;
	return damage;
}
