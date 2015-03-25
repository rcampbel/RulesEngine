'use strict';

describe('RulesEngine', function() {
	it("is deifned", function() {
		expect(window.RulesEngine).toBeDefined();
	});

	it("is a function", function() {
		expect(window.RulesEngine).toEqual(jasmine.any(Function));
	});

	describe("contains", function() {

		var ruleEngine = null;

		beforeEach(function() {
			ruleEngine = new RulesEngine();
		});

		describe('getInstance', function() {
			it('which is defined', function() {
				expect(RulesEngine.getInstance).toBeDefined();
			});

			it('which is a function', function() {
				expect(RulesEngine.getInstance).toEqual(jasmine.any(Function));
			});

			it('which returns the instance of the RulesEngine', function() {
				expect(RulesEngine.getInstance()).toBe(ruleEngine);
			});
		});

	});
});

describe('RuleLibary', function() {
	it("is deifned", function() {
		expect(window.RuleLibary).toBeDefined();
	});

	it("is a function", function() {
		expect(window.RuleLibary).toEqual(jasmine.any(Function));
	});

	describe("contains", function() {
		var ruleLibary = null;

		beforeEach(function() {
			//Need to make sure we get a new instance each time
			//RuleLibary.prototype._singletonInstance = undefined;
			ruleLibary = new RuleLibary();
		});

		describe('getInstance', function() {
			it('which is defined', function() {
				expect(RuleLibary.getInstance).toBeDefined();
			});

			it('which is a function', function() {
				expect(RuleLibary.getInstance).toEqual(jasmine.any(Function));
			});

			it('which returns the instance of the RuleLibary', function() {
				expect(RuleLibary.getInstance()).toBe(ruleLibary);
			});
		});

		describe('the properties', function() {
			describe('libary', function() {
				it("is deifned", function() {
					expect(ruleLibary.libary).toBeDefined();
				});

				it("is a function", function() {
					expect(ruleLibary.libary).toEqual(jasmine.any(Object));
				});
			});
		});

		describe('set', function() {
			it('which is defined', function() {
				expect(ruleLibary.set).toBeDefined();
			});

			it('which is a function', function() {
				expect(ruleLibary.set).toEqual(jasmine.any(Function));
			});

			describe('which adds the rule(s) to the libary when', function() {
				it('it is passed a rule name and rule', function() {
					var ruleName = 'doSomething',
						rule = function() { return false; };

					ruleLibary.set(rule,'doSomething');

					expect(ruleLibary.libary).toEqual(jasmine.objectContaining({
				      'doSomething': rule
			    	}));

				});

				describe('it is passed a rule name, rule, and namespace', function() {
					it('it defines the namespace in the libary', function() {
						var ruleName = 'doSomething',
							rule = function() { return false; },
							namespace = 'core';

						ruleLibary.set(rule, ruleName, namespace);
						
						expect(ruleLibary.libary[namespace]).toBeDefined();

					});

					it('it defines the namespace in the libary as an Object', function() {
						var ruleName = 'doSomething',
							rule = function() { return false; },
							namespace = 'core';

						ruleLibary.set(rule, ruleName, namespace);
						
						expect(ruleLibary.libary[namespace]).toEqual(jasmine.any(Object));

					});

					it('it adds the rule to the libary under the namespace', function() {
						var ruleName = 'doSomething',
							rule = function() { return false; },
							namespace = 'core';

						ruleLibary.set(rule, ruleName, namespace);
						
						expect(ruleLibary.libary[namespace]).toBeDefined();
						expect(ruleLibary.libary[namespace][ruleName]).toBe(rule);

					});
				});

				it('it is passed an object that contains rule name => rule pairs', function() {
					var ruleObject = {
						'doSomething' : function() { return false; }
					};

					ruleLibary.set(ruleObject);

					expect(ruleLibary.libary).toEqual(jasmine.objectContaining({
				      'doSomething': ruleObject.doSomething
			    	}));

				});

				it('it is passed an object that contains rule name => rule pairs and a namespace', function() {
					var ruleObject = {
						'doSomething' : function() { return false; }
					},
					namespace = 'core';

					ruleLibary.set(ruleObject, namespace);

					expect(ruleLibary.libary).toEqual(jasmine.objectContaining({
						'core' : jasmine.any(Object)				      
			    	}));

					expect(ruleLibary.libary.core).toEqual(jasmine.objectContaining({
						'doSomething': ruleObject.doSomething
			    	}));
			    	
				});
			});

			describe('which does not add the rule(s) to the libary when', function() {
				it('the rule is not an rule list of functions', function() {
					var ruleObject = {
						'doSomething' : {}
					};

					ruleLibary.set(ruleObject);

					expect(ruleLibary.libary).not.toEqual(jasmine.objectContaining({
				      'doSomething': ruleObject.doSomething
			    	}));
		    	});

		    	it('the rule is not a function', function() {
					var ruleName = 'doSomething',
						rule = null;

					ruleLibary.set(rule, ruleName);

					expect(ruleLibary.libary).not.toEqual(jasmine.objectContaining({
				      'doSomething': rule
			    	}));
		    	});

		    	it('the rule name is not a string', function() {
					var ruleName = null,
						rule = function() { return false; };

					ruleLibary.set(rule, ruleName);

					expect(ruleLibary.libary).not.toEqual(jasmine.objectContaining({
				      'doSomething': rule
			    	}));
		    	});

				it('the rule is an object that contains a mix of functions and non-functions', function() {
					var ruleObject = {
						'doSomething' : {},
						'didSomething' : function() { return true; }
					};

					ruleLibary.set(ruleObject);

					expect(ruleLibary.libary).not.toEqual(jasmine.objectContaining({
				      'doSomething': ruleObject.doSomething
			    	}));

			    	expect(ruleLibary.libary).toEqual(jasmine.objectContaining({
				      'didSomething': ruleObject.didSomething
			    	}));
				});
			});
		});

		describe('get', function() {
			it('which is defined', function() {
				expect(ruleLibary.get).toBeDefined();
			});

			it('which is a function', function() {
				expect(ruleLibary.get).toEqual(jasmine.any(Function));
			});

			describe('which returns the rules', function () {

				var ruleSet = null,
					namespacedRuleSet = null,
					namespace = null;

				beforeEach(function() {
					ruleSet = {
						'ruleSetA' : function(){ return 'ruleSetA'; }
					};

					namespace = 'core';

					namespacedRuleSet = {
						'ruleSetB' : function(){ return 'ruleSetB'; }
					};

					ruleLibary.set(ruleSet);
					ruleLibary.set(namespacedRuleSet, namespace);
				});


				it('when passed a single rule name', function() {
					var result = ruleLibary.get('ruleSetA');

					expect(result).toEqual(jasmine.objectContaining({
				      'ruleSetA': ruleSet.ruleSetA
			    	}));

				});

				it('when passed a single namespaced rule name', function() {
					var result = ruleLibary.get('core.ruleSetB');

					expect(result).toEqual(jasmine.objectContaining({
				      'core.ruleSetB': namespacedRuleSet.ruleSetB
			    	}));

				});

				it('when passed a mutiple rule name', function() {
					var result = ruleLibary.get(['ruleSetA','core.ruleSetB']);

					expect(result).toEqual(jasmine.objectContaining({
				      'core.ruleSetB': namespacedRuleSet.ruleSetB,
				      'ruleSetA': ruleSet.ruleSetA
			    	}));

				});
			});	

			it('which returns only the rules that exist in the Libary', function() {
				var ruleSet = null,
					namespacedRuleSet = null,
					namespace = null;

				ruleSet = {
					'ruleSetA' : function(){ return 'ruleSetA'; }
				};

				namespace = 'core';

				namespacedRuleSet = {
					'ruleSetB' : function(){ return 'ruleSetB'; }
				};

				ruleLibary.set(ruleSet);
				ruleLibary.set(namespacedRuleSet, namespace);

				var result = ruleLibary.get(['ruleSetA','core.ruleSetA']);

				expect(result).toEqual(jasmine.objectContaining({
					'ruleSetA': jasmine.any(Function)
		    	}));
		    	expect(result).not.toEqual(jasmine.objectContaining({
					'core.ruleSetA': jasmine.any(Function)
		    	}));
			});
		});
	});
});