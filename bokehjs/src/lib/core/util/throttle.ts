const delay_animation = requestAnimationFrame

// Returns a function, that, when invoked, will only be triggered at
// most once during a given window of time.
//
// In addition, if the browser supports requestAnimationFrame, the
// throttled function will be run no more frequently than request
// animation frame allows.
//
// @param func [function] the function to throttle
// @param wait [number] time in milliseconds to use for window
// @return [function] throttled function
//
export function throttle(func: () => void, wait: number): () => void {
  let timeout: number | null = null
  let previous = 0
  let pending = false

  const later = function() {
    previous = Date.now()
    timeout = null
    pending = false
    func()
  }

  return function() {
    const now = Date.now()
    const remaining = wait - (now - previous)
    if (remaining <= 0 && !pending) {
      if (timeout != null)
        clearTimeout(timeout)
      pending = true
      delay_animation(later)
    } else if (!timeout && !pending)
      timeout = setTimeout(() => delay_animation(later), remaining)
  }
}
