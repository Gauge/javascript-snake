/**
 * Framework functions
 */

Object.prototype.extend = function (obj1, obj2) {
	if (typeof obj2 === 'undefined') {
		for (var property in obj1) {
			if (obj1.hasOwnProperty(property)) {
				this[property] = obj1[property];
			}			
		}
	} else {
		for (var property in obj2) {
			if (obj2.hasOwnProperty(property)) {
			    obj1[property] = obj2[property];
			}
		}
	}
};

/**
 * example of multiple files adding to global app object
 */
 /*
(function () {
    if (typeof Test === 'undefined') {
        Test = {};
    }
    Test.extend({
    	scott: function () {
    		alert('hi');
    	}
    });
}());

(function () {
    if (typeof Test === 'undefined') {
        Test = {};
    }
    Test.extend({
        ben: function () {
            this.scott();
        }
    });
}());

Test.ben();
*/