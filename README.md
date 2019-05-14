# RiemannMathProject
![Yolo'd Code: 100%](https://sdbagel.github.io/static/img/yolo.png)

This is our group's semester two maths project. Our topic is Riemann sums, which approximate the area underneath a polynomial curve.

# What is this?

This is our part of our "physical product" which we will demonstrate on presentation day. It is a web based application intended to assist with finding the surface area of two-dimensional objects with curves, that could otherwise not be easily or quickly measured. The end goal is to be able to, on any* device with an internet connection and camera, measure some kind of 2D object. A practical example of this would be the soon-to-be-implemented toast calorie counter, which tells the user how many calories are in one slice of toast based on our web app's calculations and bread type.

*Any device refers to any modern device that has no issues with whatever we decide to stick in here

# How does it work?

A live camera feed (desktop only) or file upload button (opens camera on mobile) allows the user to select an image for use with our calculator. They trace the object they want to find the area of using their mouse or touchscreen, where each press and release action denotes one "equation" to find the Riemann sum of. This action logs datapoints which we use a regression library on to get our equation. The user then selects a length on the screen to provide a measurement, otherwise, a measurement is assumed and the results page is shown.

# Other info

Our group: 
- Kyle
- Nemo
- Alvin

Goal: Construct a cross-platform, mobile-targeted application which allows users to take a picture of an object and figure out the area of one face.
