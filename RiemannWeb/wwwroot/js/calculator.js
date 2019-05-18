﻿/**
* License info for polynomial(...), gaussianElimination(...), round(...), determinationCoefficient(...)
* Function taken from source code of Regression.JS
*
* Regression.JS - Regression functions for javascript
* http://tom-alexander.github.com/regression-js/
*
* copyright(c) 2013 Tom Alexander
* Licensed under the MIT license.
*
* Least-squares regression functions for JavaScript
**/

function round(number, precision) {
    const factor = 10 ** precision;
    return Math.round(number * factor) / factor;
}

function polynomial(data, options) {
    const lhs = [];
    const rhs = [];
    let a = 0;
    let b = 0;
    const len = data.length;
    const k = options.order + 1;

    for (let i = 0; i < k; i++) {
        for (let l = 0; l < len; l++) {
            if (data[l][1] !== null) {
                a += data[l][0] ** i * data[l][1];
            }
        }

        lhs.push(a);
        a = 0;

        const c = [];
        for (let j = 0; j < k; j++) {
            for (let l = 0; l < len; l++) {
                if (data[l][1] !== null) {
                    b += data[l][0] ** (i + j);
                }
            }
            c.push(b);
            b = 0;
        }
        rhs.push(c);
    }
    rhs.push(lhs);

    const coefficients = gaussianElimination(rhs, k).map(v => round(v, 2));

    const predict = x => [
        round(x, 2),
        round(
            coefficients.reduce((sum, coeff, power) => sum + coeff * x ** power, 0),
            2,
        )
    ];

    const points = data.map(point => predict(point[0]));

    let string = 'y = ';
    for (let i = coefficients.length - 1; i >= 0; i--) {
        if (i > 1) {
            string += `${coefficients[i]}x^${i} + `;
        } else if (i === 1) {
            string += `${coefficients[i]}x + `;
        } else {
            string += coefficients[i];
        }
    }

    return {
        string,
        points,
        predict,
        equation: [...coefficients].reverse(),
        r2: round(determinationCoefficient(data, points), 2)
    };
}

function gaussianElimination(input, order) {
    const matrix = input;
    const n = input.length - 1;
    const coefficients = [order];

    for (let i = 0; i < n; i++) {
        let maxrow = i;
        for (let j = i + 1; j < n; j++) {
            if (Math.abs(matrix[i][j]) > Math.abs(matrix[i][maxrow])) {
                maxrow = j;
            }
        }

        for (let k = i; k < n + 1; k++) {
            const tmp = matrix[k][i];
            matrix[k][i] = matrix[k][maxrow];
            matrix[k][maxrow] = tmp;
        }

        for (let j = i + 1; j < n; j++) {
            for (let k = n; k >= i; k--) {
                matrix[k][j] -= matrix[k][i] * matrix[i][j] / matrix[i][i];
            }
        }
    }

    for (let j = n - 1; j >= 0; j--) {
        let total = 0;
        for (let k = j + 1; k < n; k++) {
            total += matrix[k][j] * coefficients[k];
        }

        coefficients[j] = (matrix[n][j] - total) / matrix[j][j];
    }

    return coefficients;
}

function determinationCoefficient(data, results) {
    const predictions = [];
    const observations = [];

    data.forEach((d, i) => {
        if (d[1] !== null) {
            observations.push(d);
            predictions.push(results[i]);
        }
    });

    const sum = observations.reduce((a, observation) => a + observation[1], 0);
    const mean = sum / observations.length;

    const ssyy = observations.reduce((a, observation) => {
        const difference = observation[1] - mean;
        return a + difference * difference;
    }, 0);

    const sse = observations.reduce((accum, observation, index) => {
        const prediction = predictions[index];
        const residual = observation[1] - prediction[1];
        return accum + residual * residual;
    }, 0);

    return 1 - sse / ssyy;
}

// Script We Wrote

function areaOfRegion(dataInput, widthOfRegion, degreeOfApproximationMax) {
    var orderMax = degreeOfApproximationMax;
    const accuracy = widthOfRegion;
    var dataPoints = dataInput;
    console.log(dataPoints);
    var xDataPoints = [];
    var yDataPoints = [];

    //extracts x values
    for (var a = 0; a <= dataPoints.length - 1; a++) {
        xDataPoints.push(dataPoints[a][0]);
    }
    for (var b = 0; b <= dataPoints.length - 1; b++) {
        yDataPoints.push(dataPoints[b][1]);
    }

    var firstFunctionDataPoints = [];
    var secondFunctionDataPoints = [];
    var currentFunction = 0;
    var maxOrMin = true;
    var startingPoint = 0;
    //Jump to the earliest point that isn't max or min
    for (var iteration = 0; maxOrMin === true; iteration++) {
        if (xDataPoints[iteration] !== Math.max(...xDataPoints) && xDataPoints[iteration] !== Math.min(...xDataPoints)) {
            startingPoint = iteration;
            maxOrMin = false;
        }
    }
    var specificDataPoint = startingPoint;
    var firstMax = true;
    var firstMin = true;
    for (var iteration = 0; iteration < xDataPoints.length; iteration++) {
        //Makes the iterations in modulus
        if (specificDataPoint > xDataPoints.length - 1) {
            specificDataPoint = 0;
        }
        if (xDataPoints[specificDataPoint] === Math.max(...xDataPoints)) {
            if (firstMax === true) {
                firstFunctionDataPoints.push(dataPoints[specificDataPoint]);
                secondFunctionDataPoints.push(dataPoints[specificDataPoint]);
                firstMax = false;
                if (currentFunction === 0) {
                    currentFunction = 1;
                } else if (currentFunction === 1) {
                    currentFunction = 0;
                }
            } else {
                if (currentFunction === 0) {
                    firstFunctionDataPoints.pop(dataPoints[specificDataPoint - 1]);
                    firstFunctionDataPoints.push(dataPoints[specificDataPoint]);
                } else if (currentFunction === 1) {
                    secondFunctionDataPoints.pop(dataPoints[specificDataPoint - 1]);
                    secondFunctionDataPoints.push(dataPoints[specificDataPoint]);

                }
            }
        }
        if (xDataPoints[specificDataPoint] === Math.min(...xDataPoints)) {
            if (firstMin === true) {
                firstFunctionDataPoints.push(dataPoints[specificDataPoint]);
                secondFunctionDataPoints.push(dataPoints[specificDataPoint]);
                firstMin = false;
                if (currentFunction === 0) {
                    currentFunction = 1;
                } else if (currentFunction === 1) {
                    currentFunction = 0;
                }
            } else {
                if (currentFunction === 0) {
                    firstFunctionDataPoints.pop(dataPoints[specificDataPoint - 1]);
                    firstFunctionDataPoints.push(dataPoints[specificDataPoint]);
                } else if (currentFunction === 1) {
                    secondFunctionDataPoints.pop(dataPoints[specificDataPoint - 1]);
                    secondFunctionDataPoints.push(dataPoints[specificDataPoint]);

                }
            }
        }
        if (xDataPoints[specificDataPoint] !== Math.min(...xDataPoints) && xDataPoints[specificDataPoint] !== Math.max(...xDataPoints)) {
            if (currentFunction === 0) {
                firstFunctionDataPoints.push(dataPoints[specificDataPoint]);
            } else if (currentFunction === 1) {
                secondFunctionDataPoints.push(dataPoints[specificDataPoint]);
            }
        }
        specificDataPoint++;
    }

    console.log("first function data: ");
    console.log(firstFunctionDataPoints);
    console.log("second function data: ");
    console.log(secondFunctionDataPoints);

    var errorListFOne = [];
    var errorListFTwo = [];
    /*for (var iteration = 2; iteration <= orderMax; iteration++) {
      errorListFOne.push(polynomial(firstFunctionDataPoints, { order: iteration}));
      errorListFTwo.push(polynomial(secondFunctionDataPoints, { order: iteration}));
    }*/
    const result = polynomial(firstFunctionDataPoints, { order: orderMax });
    const result1 = polynomial(secondFunctionDataPoints, { order: orderMax });
    console.log("First function regression coefficients: ");
    console.log(result.equation);
    console.log("Second function regression coefficients: ");
    console.log(result1.equation);
    var firstFunctionCoefficients = result.equation;
    var secondFunctionCoefficients = result1.equation;
    // Coefficients of equations, where a row is (x^0, x^1, x^2...), and every column represents a new equation
    // Restrictions set to define area
    var domainRestrictionLower = Math.min(...xDataPoints);
    var domainRestrictionUpper = Math.max(...xDataPoints);
    var rangeRestrictionLower = Math.min(...yDataPoints);
    var rangeRestrictionUpper = Math.max(...yDataPoints);
    var totalRestrictionArea = (Math.abs(domainRestrictionLower) + Math.abs(domainRestrictionUpper)) * (Math.abs(rangeRestrictionLower) + Math.abs(rangeRestrictionUpper));
    console.log("Domain Lower Restriction: " + domainRestrictionLower);
    console.log("Domain Upper Restriction: " + domainRestrictionUpper);
    console.log("Range Lower Restriction: " + rangeRestrictionLower);
    console.log("Range Upper Restriction: " + rangeRestrictionUpper);

    //starting x value for the Riehmann sum calculations
    function y(xValue, coefficients) {
        var result = 0;
        for (var iteration = 0; iteration <= coefficients.length - 1; iteration++) {
            result = result + coefficients[iteration] * Math.pow(xValue, iteration);
        }
        if (result > rangeRestrictionLower && result < rangeRestrictionUpper) {
            return result;
        } else if (result <= rangeRestrictionLower) {
            return rangeRestrictionLower;
        } else if (result >= rangeRestrictionUpper) {
            return rangeRestrictionUpper;
        }
    }
    function trapezoidalArea(xValue, coefficients, accuracy) {
        var result = y(xValue + accuracy, coefficients);
        var result1 = y(xValue, coefficients);
        return (result - result1) * accuracy / 2 + result1 * accuracy;
    }

    // Gets distance between two point on curve
    function distanceFormula(xValue, coefficients, accuracy) {
        var result = y(xValue + accuracy, coefficients);
        var result1 = y(xValue, coefficients);
        return Math.sqrt(Math.pow(result - result1, 2) + Math.pow(accuracy, 2));
    }

    function areaCalculation(coefficients, currentDataset, accuracy) {
        var x = domainRestrictionLower;
        // Values to find
        // Left, Right, Middle, Trapezoidal, Length of Curve
        var areaL = 0;
        var areaM = 0;
        var areaR = 0;
        var areaT = 0;
        var length = 0;
        var functionXDataPoints = [];
        var functionYDataPoints = [];
        for (var iteration = 0; iteration <= currentDataset.length - 1; iteration++) {
            functionXDataPoints.push(currentDataset[iteration][0]);
        }
        for (var iteration = 0; iteration <= currentDataset.length - 1; iteration++) {
            functionYDataPoints.push(currentDataset[iteration][1]);
        }
        console.log(functionXDataPoints);
        console.log(functionYDataPoints);
        if (Math.min(...functionYDataPoints) === Math.min(...yDataPoints)) {
            while (x <= domainRestrictionUpper - accuracy) {
                areaL = areaL + Math.abs((y(x, coefficients) - rangeRestrictionLower) * accuracy);
                areaR = areaR + Math.abs((y(x + accuracy, coefficients) - rangeRestrictionLower) * accuracy);
                areaM = areaM + Math.abs((y(x + accuracy * 0.5, coefficients) - rangeRestrictionLower) * accuracy);
                length = length + distanceFormula(x, coefficients, accuracy);
                areaT = areaT + Math.abs(trapezoidalArea(x, coefficients, accuracy) - rangeRestrictionLower * accuracy);
                x = x + accuracy;
                //console.log("Lower Function area. x: " + x + " areaL: " + areaL);
            }
        }

        if (Math.max(...functionYDataPoints) === Math.max(...yDataPoints)) {
            while (x <= domainRestrictionUpper - accuracy) {
                areaL = areaL + Math.abs((rangeRestrictionUpper - y(x + accuracy, coefficients)) * accuracy);
                areaR = areaR + Math.abs((rangeRestrictionUpper - y(x, coefficients)) * accuracy);
                areaM = areaM + Math.abs((rangeRestrictionUpper - y(x + accuracy * 0.5, coefficients)) * accuracy);
                length = length + distanceFormula(x, coefficients, accuracy);
                areaT = areaT + Math.abs(rangeRestrictionUpper * accuracy - trapezoidalArea(x, coefficients, accuracy));
                x = x + accuracy;

            }
        }

        return [areaL, areaM, areaR, areaT, length];
    }
    var firstResults = areaCalculation(firstFunctionCoefficients, firstFunctionDataPoints, accuracy);
    var secondResults = areaCalculation(secondFunctionCoefficients, secondFunctionDataPoints, accuracy);
    var finalResults = [totalRestrictionArea - (firstResults[0] + secondResults[0]), totalRestrictionArea - (firstResults[1] + secondResults[1]), totalRestrictionArea - (firstResults[2] + secondResults[2]), totalRestrictionArea - (firstResults[3] + secondResults[3]), firstResults[4] + secondResults[4]];
    console.log(areaCalculation(secondFunctionCoefficients, secondFunctionDataPoints, accuracy));
    console.log(areaCalculation(firstFunctionCoefficients, firstFunctionDataPoints, accuracy));
    return finalResults;
}
console.log(areaOfRegion([[0, 0], [1, 1], [2, 1], [3, 2], [4, 4], [6, 3], [7, 1], [6, -2], [5, -3], [3, -6], [2, -4], [1, -3], [0.5, -1]], 0.001, 8));
//[0,0],[1,1],[2,1],[3,2],[4,4],[6,3],[7,1],[6,-2],[5,-3],[3,-6],[2,-4],[1,-3],[0.5,-1]
//[0,0],[1,1],[2,1],[3,2],[4,4],[6,3],[7,1],[8,0],[9,0],[10,0],[11,0],[12,0],[6,-2],[5,-3],[3,-6],[2,-4],[1,-3],[0.5,-1]
//[-3,0],[-2,5],[-1,8],[0,9],[1,8],[2,5],[3,0],[2,-5],[1,-8],[0,-9],[-1,-8],[-2,-5],[-3,-0]