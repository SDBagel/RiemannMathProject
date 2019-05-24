# RiemannMathProject
![Yolo'd Code: 100%](https://sdbagel.github.io/static/img/yolo.png)

This is our group's semester two maths project. Our topic is Riemann sums, which approximate the area underneath a polynomial curve among other things. A live demonstration is available at http://riemann.ml.

# What is this?

This is our part of our "physical product" which we demonstrated on May 23rd, 2019. It is a web based application intended to assist with finding the surface area of two-dimensional objects with curves, that could otherwise not be easily or quickly measured. The app was demonstrated to function with relative accuracy in some cases with errors of less than 2%, with the entire calculation process being completely fluid to the user.

RiemannWeb has been tested on the following browsers:
- Chrome: 100% Functionality
- Chromium (Edge Dev, Opera): 100% Functionality
- Firefox: 100% Functionality
- Edge: No touchscreen/pen support, error with mouse input offset, other small errors
- Internet Explorer 11: 0% Functional (Will Not Support)

# How does it work?

A live camera feed (desktop only) or file upload button (opens camera on mobile) allows the user to select an image for use with our calculator. They trace the object they want to find the area of using their mouse or touchscreen, where each press and release action denotes one "equation" to find the Riemann sum of. This action logs datapoints which we use a regression library on to get our equation. The user then selects a length on the screen to provide a measurement in centimeters for reference and the results page is shown.

# Other info

Now that the maths project is done, this site will see general UI and UX fixes only, with the excepton of the calorie counter feature that did not get finished in time for demonstration.
