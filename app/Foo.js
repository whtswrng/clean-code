class Foo {
	constructor(a, b, c, d) {

	}

	getAllFoo(){
		setTimeout(function() {
			setTimeout(function(){
				// cb hell
			})
		})
	}

}