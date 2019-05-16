/*
    ______
  (       ))
  |       ||
  | toast ||
  |       ||
  |_______|/

*/

// dataInput = 2D array of points
function areaOfRegion(dataInput, widthOfRegion, degreeOfApproximationMax) {
    const order = degreeOfApproximationMax;
    const accuracy = widthOfRegion;
    var dataPoints = dataInput;
    console.log(dataPoints);
    var xDataPoints = [];
    var yDataPoints = [];

    //extracts x values
    for (var iteration = 0; iteration <= dataPoints.length - 1; iteration++) {
        xDataPoints.push(dataPoints[iteration][0]);
    }
    for (var iteration = 0; iteration <= dataPoints.length - 1; iteration++) {
        yDataPoints.push(dataPoints[iteration][1]);
    }

    var firstFunctionDataPoints = [];
    var secondFunctionDataPoints = [];
    var currentFunction = 0;
    var maxOrMin = true;
    var startingPoint = 0;

    //Jump to the earliest point that isn't max or min
    for (var iteration = 0; maxOrMin === true; iteration++) {
        if (xDataPoints[iteration] !== Math.max(...xDataPoints) && xDataPoints[iteration] != Math.min(...xDataPoints)) {
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
        if (xDataPoints[specificDataPoint] !== Math.min(...xDataPoints) && xDataPoints[specificDataPoint] != Math.max(...xDataPoints)) {
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




    var regression = require("regression")
    const result = regression.polynomial(firstFunctionDataPoints, { order: order });
    const result1 = regression.polynomial(secondFunctionDataPoints, { order: order });
    console.log("First function regression coefficients: ");
    console.log(result.equation);
    console.log("Second function regression coefficients: ");
    console.log(result1.equation);
    var firstFunctionCoefficients = result.equation;
    var secondFunctionCoefficients = result1.equation;;
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


    function areaCalculation(coefficients, currentDataset, accuracy) {
        var x = domainRestrictionLower;
        // Values to find
        // Left, Right, Middle, Trapezoidal, Length of Curve
        var areaL = 0;
        var areaM = 0;
        var areaR = 0;
        var areaT = 0;
        var length = 0;

        // Finds y value of a given x value and an equation. Returns value given that it does not exceed any restrictions.
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


        // Finds area of a sinnopgle column, width defined by accuracy
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


        // Repeats calculation of area until domain restrictions met

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
                length = length + distanceFormula(x, coefficients, accuracy);;
                areaT = areaT + Math.abs(rangeRestrictionUpper * accuracy - trapezoidalArea(x, coefficients, accuracy));
                x = x + accuracy;

            }


        }



        return [areaL, areaM, areaR, areaT, length];
    }
    var firstResults = areaCalculation(firstFunctionCoefficients, firstFunctionDataPoints, accuracy);
    var secondResults = areaCalculation(secondFunctionCoefficients, secondFunctionDataPoints, accuracy);
    var finalResults = [totalRestrictionArea - (firstResults[0] + secondResults[0]), totalRestrictionArea - (firstResults[1] + secondResults[1]), totalRestrictionArea - (firstResults[2] + secondResults[2]), totalRestrictionArea - (firstResults[3] + secondResults[3]), (firstResults[4] + secondResults[4])];
    console.log(areaCalculation(secondFunctionCoefficients, secondFunctionDataPoints, accuracy));
    console.log(areaCalculation(firstFunctionCoefficients, firstFunctionDataPoints, accuracy));
    return finalResults;
}
console.log(areaOfRegion([[0, 3], [1, 4], [2, 2], [3, 0], [3, -1], [2, -2], [0, -1], [-1, 0], [-2, -1], [-2, 0], [-1, 1]], 0.001, 100));