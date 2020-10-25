This is my version of the Etch-a-Sketch project for The Odin Project, styled after the actual
Etch-a-Sketch toy. The project:

1.  has the ability to click within the grid to turn the drawing on or off.
2.  has the option for user to select a specific color with the color picker.
3.  has 3 pen options: solid, gradient, or random.
    - both the solid and gradient options use the color selected by user.
    - the gradient option starts with 10% alpha for rgba and increases a cell's alpha by 10% each time it is
      moused over.
    - the random option fills each cell with a random color.
4.  is mobile friendly, but each cell must be tapped to fill (dragging to fill does not work).

Check out my <a href="https://thatblindgeye.github.io/Etch-a-Sketch/">Etch-a-Sketch</a>

To Do:

1.  Allow user to choose a color to sketch with DONE
2.  Allow user to choose a gradient option to increase alpha of the chosen color with each
    mouseover DONE
3.  Allow user to have each cell be filled with a random color DONE
4.  Allow user to toggle cell borders on/off DONE
5.  Create shaking animation for grid when create/clear button is pressed DONE
6.  Continue testing, possibly remove shaking animation if it causes slowness, make minor
    visual tweaks
