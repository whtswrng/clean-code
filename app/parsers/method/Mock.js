module.exports = {
    nestedCallbacksES6: nestedCallbacksES6(),
    nestedCallbacksES5: nestedCallbacksES5(),
    longMethod: longMethod(),
    argumentsViolation: argumentsViolation(),
    booleanAsArgument: booleanAsArgument(),
    methodOverFlow: methodOverFlow()
};


function nestedCallbacksES6() {
    return `
        function foo () {
            setTimeout(() => {
                setTimeout(() => {

                }, 500);
            });
        }
    `;
}

function nestedCallbacksES5() {
    return `
        function foo () {
            setTimeout(function() {
                setTimeout(function() {

                }, 500);
            });
        }
    `;
}

function longMethod() {
    return `
        function longFunctionBitch() {
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
            console.log('fofofofof');
        }
    `;
}

function argumentsViolation() {
    return `
        function longFunctionBitch(a, b, c, d) {
            
        }
        
        Class Foo{
            foo (a, b, c, d) {
                
            }
        }
    `;
}

function booleanAsArgument() {
    return `
        function longFunctionBitch(a, b, booleanSomeVal) {
            if(booleanSomeVal) {
                // fofofo
            }
            
            for () {
                console.log();
            }
            
        }
        
        Class Foo{
            foo (a, b, d) {
                if(d) {
                    // fofofo
                }
                
                for () {
                    console.log();
                }
            }
        }
    `;
}

function methodOverFlow() {
    return `
        function longFunctionBitch(a, b, booleanSomeVal) {
        }
        
        function longFunctionBitch(a, b, booleanSomeVal) {
        }
        
        function longFunctionBitch(a, b, booleanSomeVal) {
        }
        
        function longFunctionBitch(a, b, booleanSomeVal) {
        }
        
        function longFunctionBitch(a, b, booleanSomeVal) {
        }
        
        Class Foo{
            foo (a, b, d) {
            }
            
            foo (a, b, d) {
            }
            
            foo (a, b, d) {
            }
            
            foo (a, b, d) {
            }
            
            foo (a, b, d) {
            }
        }
        
        function fooFe() {
        
        }
        
        const fafa = () {
        
        };
    `;

}
