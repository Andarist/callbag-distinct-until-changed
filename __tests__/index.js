import forEach from 'callbag-for-each'
import flatten from 'callbag-flatten'
import fromIterable from 'callbag-from-iter'
import interval from 'callbag-interval'
import map from 'callbag-map'
import pipe from 'callbag-pipe'
import take from 'callbag-take'

import distinctUntilChanged from '../src'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

test('works with pullable source', () => {
  const actual = []

  pipe(
    fromIterable([1, 1, 2, 2, 3, 3, 4, 4]),
    distinctUntilChanged(),
    forEach(data => actual.push(data)),
  )

  expect(actual).toEqual([1, 2, 3, 4])
})

test('works with listenable source', () => {
  const actual = []

  pipe(
    interval(10),
    map(i => fromIterable([i, i])),
    flatten,
    distinctUntilChanged(),
    take(4),
    forEach(data => actual.push(data)),
  )

  return delay(50).then(() => {
    expect(actual).toEqual([0, 1, 2, 3])
  })
})

test('works with custom comparator', () => {
  const actual = []

  pipe(
    fromIterable([1, 1, 2, 2, 3, 3, 4, 4]),
    map(i => ({ [i]: i })),
    distinctUntilChanged(
      (previous, current) =>
        Object.keys(previous)[0] === Object.keys(current)[0],
    ),
    forEach(data => actual.push(data)),
  )

  expect(actual).toEqual([{ 1: 1 }, { 2: 2 }, { 3: 3 }, { 4: 4 }])
})
