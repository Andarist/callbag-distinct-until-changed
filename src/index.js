const is = (previous, current) => previous === current

export default function distinctUntilChanged(compare = is) {
  return source => (start, sink) => {
    if (start !== 0) return
    let inited = false
    let prev
    let talkback
    source(0, (type, data) => {
      if (type === 0) {
        talkback = data
      }

      if (type !== 1) {
        sink(type, data)
        return
      }

      if (inited && compare(prev, data)) {
        talkback(1)
        return
      }

      inited = true
      prev = data
      sink(1, data)
    })
  }
}
