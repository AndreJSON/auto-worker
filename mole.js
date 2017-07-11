'use strict';
 
/********************************************
*************  Mom's spaghetti  *************
********************************************/
 
var mole;
mole = {
	runtimeOptions: {
		barType: 0,
		seedType: 0,
		potionType: 0,
		boatType: 0,
		fightType: 0,
	},
	tabs : {
		'crafting'  : 'tab-container-bar-crafting',
		'farming'   : 'tab-container-bar-farming',
		'mining'    : 'tab-container-bar-mining',
		'shop'      : 'tab-container-bar-shop',
		'wc'        : 'tab-container-bar-woodcutting'
	},
	crafting : {
		furnaces : {
			stone : 'item-box-boundStoneFurnace'
		},
		bars : [
			{name: 'bronze', id: 'input-furnace-bronze-bar'},
			{name: 'iron', id: 'input-furnace-iron-bar'},
			{name: 'silver', id: 'input-furnace-silver-bar'},
			{name: 'gold', id: 'input-furnace-gold-bar'},
			{name: 'glass', id: 'input-furnace-glass'}
		],
		smeltAmount : 'input-smelt-bars-amount',
		smeltConfirm: 'dialogue-furnace-mats-needed-area',
		smeltingProgress: 'notif-smelting',
		smelt: function() {
			if(mole.getElement(mole.crafting.smeltingProgress).style.display !== 'none') { //Bars are in progress
				return;
			}
			mole.clickElement(mole.getElement(mole.crafting.furnaces.stone));
			mole.clickElement(mole.getElement(mole.crafting.bars[mole.runtimeOptions.barType].id));
			mole.getElement(mole.crafting.smeltAmount).value = 10;
			var i, children = mole.getElement(mole.crafting.smeltConfirm).childNodes;
			for (i = 0; i < children.length; i+=1) {
				if(children[i].localName === 'input') {
					mole.clickElement(children[i]);
				}
			}
		},
		changeBar: function (barType) {
			mole.runtimeOptions.barType = barType % mole.crafting.bars.length;
			mole.getElement('smeltButton').innerHTML = mole.crafting.bars[mole.runtimeOptions.barType].name;
		}
	},
	farming : {
		patches : [
			{id: 'farming-patch-area-1', textId: 'farming-patch-text-1'},
			{id: 'farming-patch-area-2', textId: 'farming-patch-text-2'},
			{id: 'farming-patch-area-3', textId: 'farming-patch-text-3'},
			{id: 'farming-patch-area-4', textId: 'farming-patch-text-4'},
			{id: 'farming-patch-area-5', textId: 'farming-patch-text-5'},
			{id: 'farming-patch-area-6', textId: 'farming-patch-text-6'}
		],
		seeds : [
			{name: 'redshroom', id: 'dialogue-plant-redMushroomSeeds'},
			{name: 'dotted', id: 'dialogue-plant-dottedGreenLeafSeeds'},
			{name: 'blewit', id: 'dialogue-plant-blewitMushroomSeeds'},
			{name: 'greenL', id: 'dialogue-plant-greenLeafSeeds'},
			{name: 'lime', id: 'dialogue-plant-limeLeafSeeds'},
			{name: 'gold', id: 'dialogue-plant-goldLeafSeeds'},
			{name: 'snape', id: 'dialogue-plant-snapegrassSeeds'},
			{name: 'carrot', id: 'dialogue-plant-carrotSeeds'},
			{name: 'tomato', id: 'dialogue-plant-tomatoSeeds'},
			{name: 'potato', id: 'dialogue-plant-potatoSeeds'},
			{name: 'wheat', id: 'dialogue-plant-wheatSeeds'}
		],
		farm : function () {
			var i;
			for(i = 0; i < 6; i += 1) {
				if(mole.getElement(mole.farming.patches[i].textId).innerHTML === 'Click to grow') {
					mole.clickElement(mole.getElement(mole.farming.patches[i].id));
					mole.clickElement(mole.getElement(mole.farming.seeds[mole.runtimeOptions.seedType].id));
				} else if(mole.getElement(mole.farming.patches[i].textId).innerHTML === 'Click to harvest') {
					mole.clickElement(mole.getElement(mole.farming.patches[i].id));
				}
			}
		},
		changeSeed: function (seedType) {
			mole.runtimeOptions.seedType = seedType % mole.farming.seeds.length;
			mole.getElement('seedButton').innerHTML = mole.farming.seeds[mole.runtimeOptions.seedType].name;
		}
	},
	brewing: {
		potions: [
			{name: 'sd pot', id: 'item-box-stardustPotion'}
		],
		potionProgress: 'notif-stardustPotionTimer',
		drink: function () {
			if(mole.getElement(mole.brewing.potionProgress).style.display !== 'none') { //Potion in progress
				return;
			}
			mole.clickElement(mole.getElement(mole.brewing.potions[mole.runtimeOptions.potionType].id));
			mole.clickElement(mole.getElement(mole.g.confirmButton));
		}
	},
	wc : {
		growthStatuses : [
			'wc-div-tree-lbl-1',
			'wc-div-tree-lbl-2',
			'wc-div-tree-lbl-3',
			'wc-div-tree-lbl-4',
			'wc-div-tree-lbl-5',
			'wc-div-tree-lbl-6'
		],
		trees : [
			'wc-div-tree-1',
			'wc-div-tree-2',
			'wc-div-tree-3',
			'wc-div-tree-4',
			'wc-div-tree-5',
			'wc-div-tree-6'
		],
		confirmBox : 'dialogue-loot',
		harvestTrees: function() {
			var i;
			for(i = 0; i < 6; i+=1) {
				if(mole.getElement(mole.wc.growthStatuses[i]).innerHTML === '(ready)') {
					mole.clickElement(mole.getElement(mole.wc.trees[i]));
					console.log(i + " is ready");
				}
			}
		}
	},
	cb : {
		cooldown: 'fight-cooldown',
		combatContainer: 'tab-sub-container-combat',
		fightSelector: 'dialogue-fight',
		monsterWindow: 'monster-area',
		fightMapper: [
			{name: 'fields', index: 2},
			{name: 'forests', index: 4},
			{name: 'cave', index: 6},
			{name: 'volcano', index: 8},
			{name: 'NF', index: 10}
		],
		fight : function () {
			if(mole.getElement(mole.cb.cooldown).innerHTML === "Ready" && mole.getElement(mole.cb.monsterWindow).style.display === 'none') {
				var i, children = mole.getElement(mole.cb.fightSelector).childNodes;
				for (i = 0; i < children.length; i+=1) {
					if(children[i].localName === "table") {
						mole.clickElement(children[i].childNodes[1].childNodes[mole.cb.fightMapper[mole.runtimeOptions.fightType].index]);
						mole.clickElement(mole.getElement(mole.g.confirmButton));
					}
				}
			}
		},
		changeFight : function (fightType) {
			mole.runtimeOptions.fightType = fightType % mole.cb.fightMapper.length;
			mole.getElement('cbButton').innerHTML = mole.cb.fightMapper[mole.runtimeOptions.fightType].name;
		}
	},
	g : { //g for general
		confirmButton : 'dialogue-confirm-yes',
		effectBar : 'notifaction-area',
		boatTimers: [
			'notif-rowBoatTimer',
			'notif-canoeTimer'
		],
		boats: [
			{name: 'small', id: 'item-box-boundRowBoat'},
			{name: 'large', id: 'item-box-boundCanoe'}
		],
		boatDialogue: 'dialogue-id-boat',
		sendBoat : function () {
			var i;
			for (i = 0; i < mole.g.boatTimers.length; i += 1) {
				if(mole.getElement(mole.g.boatTimers[i]).childNodes[1].innerHTML !== "") {
					return; //A boat is out atm.
				}
			}
			//Only get here if no boat is out.
			mole.clickElement(mole.getElement(mole.g.boats[mole.runtimeOptions.boatType].id));
			mole.clickElement(mole.getElement(mole.g.boatDialogue).childNodes[15]);
		},
		changeBoat: function (boatType) {
			mole.runtimeOptions.boatType = boatType % mole.g.boats.length;
			mole.getElement('boatButton').innerHTML = mole.g.boats[mole.runtimeOptions.boatType].name;
		}
	},
	getElement: function(id) {
		return document.getElementById(id);
	},
	clickElement: function(element) {
		if (element.fireEvent) {
			element.fireEvent('onclick');
		} else {
			var evObj = document.createEvent('Events');
			evObj.initEvent('click', true, false);
			element.dispatchEvent(evObj);
		}
	},
	selectTab: function(tabName) {
		mole.clickElement(mole.getElement(mole.tabs[tabName]));
	},
	addNavPanel: function() {
		mole.prependHTML(mole.getElement(mole.g.effectBar), mole.navPanel);
	},
	prependHTML: function(element, text) {
		element.innerHTML = text + element.innerHTML;
	},
	createCookie: function(name,value,days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + value + expires + "; path=/";
	},
	readCookie: function(name, defaultValue) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)===' '){
				c = c.substring(1,c.length);
			}
			if (c.indexOf(nameEQ) === 0) {
				return c.substring(nameEQ.length,c.length);
			}
		}
		return defaultValue;
	},
	saveToCookie: function () {
		mole.createCookie('barType', mole.runtimeOptions.barType, 100);
		mole.createCookie('smeltCheckbox', mole.getElement('smeltCheckbox').checked, 100);
		mole.createCookie('seedType', mole.runtimeOptions.seedType, 100);
		mole.createCookie('seedCheckbox', mole.getElement('seedCheckbox').checked, 100);
		mole.createCookie('potionCheckbox', mole.getElement('potionCheckbox').checked, 100);
		mole.createCookie('wcCheckbox', mole.getElement('wcCheckbox').checked, 100);
		mole.createCookie('cbCheckbox', mole.getElement('cbCheckbox').checked, 100);
		mole.createCookie('fightType', mole.runtimeOptions.fightType, 100);
		mole.createCookie('boatCheckbox', mole.getElement('boatCheckbox').checked, 100);
		mole.createCookie('boatType', mole.runtimeOptions.boatType, 100);
	},
	loadFromCookie: function () {
		mole.crafting.changeBar(mole.readCookie('barType',0));
		mole.getElement('smeltCheckbox').checked = (mole.readCookie('smeltCheckbox', 'false') === 'true');
		mole.farming.changeSeed(mole.readCookie('seedType',0));
		mole.getElement('seedCheckbox').checked =  (mole.readCookie('seedCheckbox', 'false') === 'true');
		mole.getElement('potionCheckbox').checked =  (mole.readCookie('potionCheckbox', 'false') === 'true');
		mole.getElement('wcCheckbox').checked =  (mole.readCookie('wcCheckbox', 'false') === 'true');
		mole.getElement('cbCheckbox').checked =  (mole.readCookie('cbCheckbox', 'false') === 'true');
		mole.cb.changeFight(mole.readCookie('fightType',0));
		mole.getElement('boatCheckbox').checked =  (mole.readCookie('boatCheckbox', 'false') === 'true');
		mole.g.changeBoat(mole.readCookie('boatType',0));
	},
	reloadPage: function () {
		window.location.reload(false);
	},
	main: function () {
		if(mole.getElement('smeltCheckbox').checked) {
			setTimeout(mole.crafting.smelt, 1000);
		}
		if(mole.getElement('seedCheckbox').checked) {
			setTimeout(mole.farming.farm, 1000);
		}
		if(mole.getElement('potionCheckbox').checked) {
			setTimeout(mole.brewing.drink, 1000);
		}
		if(mole.getElement('wcCheckbox').checked) {
			setTimeout(mole.wc.harvestTrees, 1000);
		}
		if(mole.getElement('cbCheckbox').checked) {
			setTimeout(mole.cb.fight, 1000);
		}
		if(mole.getElement('boatCheckbox').checked) {
			setTimeout(mole.g.sendBoat, 1000);
		}
		mole.saveToCookie();
		setTimeout(mole.main, 5000);
	},
	navPanel:
		'<span class="notif-box" style="height:50px;width:465px;">' +
			'<div style="display:inline">' +
				'<input type="checkbox" id="smeltCheckbox">' +
				'<button style="height:52px; width:55px; background:#FFFFFF" id="smeltButton" onclick="mole.crafting.changeBar(mole.runtimeOptions.barType+1)">' +
					'bronze' +
				'</button>' +
			'</div>' +
			'<div style="display:inline">' +
				'<input type="checkbox" id="seedCheckbox">' +
				'<button style="height:52px; width:75px; background:#FFFFFF" id="seedButton" onclick="mole.farming.changeSeed(mole.runtimeOptions.seedType+1)">' +
					'redshroom' +
				'</button>' +
			'</div>' +
			'<div style="display:inline">' +
				'<input type="checkbox" id="potionCheckbox">' +
				'<button style="height:52px; width:55px; background:#FFFFFF" id="potionButton" onclick="">' +
					'sd pot' +
				'</button>' +
			'</div>' +
			'<div style="display:inline">' +
				'<input type="checkbox" id="wcCheckbox">' +
				'<button style="height:52px; width:45px; background:#FFFFFF" id="wcButton" onclick="">' +
					'chop' +
				'</button>' +
			'</div>' +
			'<div style="display:inline">' +
				'<input type="checkbox" id="cbCheckbox">' +
				'<button style="height:52px; width:70px; background:#FFFFFF" id="cbButton" onclick="mole.cb.changeFight(mole.runtimeOptions.fightType+1)">' +
					'cave' +
				'</button>' +
			'</div>' +
			'<div style="display:inline">' +
				'<input type="checkbox" id="boatCheckbox">' +
				'<button style="height:52px; width:45px; background:#FFFFFF" id="boatButton" onclick="mole.g.changeBoat(mole.runtimeOptions.boatType+1)">' +
					'small' +
				'</button>' +
			'</div>' +
		'</span>'
};
 
setTimeout(function () {mole.addNavPanel();}, 1000);
setTimeout(function () {mole.loadFromCookie();}, 1500);
setTimeout(function () {mole.selectTab('farming');}, 2000);
setTimeout(function () {mole.main();}, 2000);
setTimeout(function () {mole.reloadPage();}, 1000*1000);
