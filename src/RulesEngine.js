var RuleLibary = function () {
	//Singleton pattern
	if ( arguments.callee.instance ) {
		return arguments.callee.instance;
    }
    arguments.callee.instance = this;

	this.libary = {};
}

RuleLibary.getInstance = function() {
    var singletonClass = new RuleLibary();
    return singletonClass;
};   

RuleLibary.prototype.set = function(rule, name, namespace) {

	var lib = this.libary,
		isObjectList = (typeof rule === 'object' && rule != null && !(rule instanceof Array)),
		nameSpace = isObjectList ? name : namespace;

	if (typeof nameSpace !== 'undefined' && nameSpace !== null) {
		if (typeof lib[nameSpace] !== 'object' || lib[nameSpace] === null || lib[nameSpace] instanceof Array) {
			lib[nameSpace] = {};
		}
		lib = lib[nameSpace];
	}

	if (isObjectList) {
		for (var ruleKey in rule) {
			if (rule.hasOwnProperty(ruleKey) && typeof rule[ruleKey] === 'function') {
				lib[ruleKey] = rule[ruleKey];
			}
		}
	} else {
		if (typeof rule === 'function' && typeof name === 'string') {
			lib[name] = rule;	
		}
	}
};

RuleLibary.prototype.get = function(rules) {

	var returnValue = {};

	rules = (typeof rules === 'string') ? [rules] : rules;

	if ( rules instanceof Array) {
		for (var key = 0; key < rules.length; key++) {
			var ruleKey = rules[key];
			if (typeof(ruleKey) === 'string') {
				var splitRule = ruleKey.split('.'),
					lib = this.libary;

				for (var splitRuleKey = 0; splitRuleKey < splitRule.length; splitRuleKey++) {
					lib = lib[splitRule[splitRuleKey]];
					if (typeof lib !== 'object' || lib === null) {
						break;
					}
				}

				if (typeof lib === 'function') {
					returnValue[ruleKey] = lib;
				}
			}
		}
	}

	return returnValue;
};
