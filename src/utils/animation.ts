interface IAminate {
  duration: number
  timing: (time: number) => number
  draw: (progress: number) => null
  complete?: Function
}

export function animate(options: IAminate) {
  var start = performance.now()

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / options.duration
    if (timeFraction > 1) timeFraction = 1

    const progress = options.timing(timeFraction)

    options.draw(progress)

    console.log({ timeFraction, options })
    if (timeFraction < 1) {
      requestAnimationFrame(animate)
    } else if (timeFraction === 1) {
      options.complete && options.complete()
    }
  })
}
