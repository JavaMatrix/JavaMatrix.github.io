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

function Weapon(name, damage, accuracy, crit)
{
	this.name = name;
	this.damage = damage;
	this.accuracy = accuracy;
	this.crit = crit;
}

Weapon.prototype.swing = function()
{
	var dmg = this.accuracy * this.damage;
	dmg += Math.random() * ((1 - this.accuracy) * this.damage);

	var ncrit = 0; 
	while (Math.random() < this.crit)
	{
		dmg *= 2;
		ncrit++;
	}

	return {
		"damage": Math.floor(dmg),
		"crit": ncrit		
	};
}

