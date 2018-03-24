# callbag-distinct-until-changed

Drops consecutive duplicate values. Works on either pullable or listenable sources.

Uses strict (`===`) comparison by default, but it accepts a custom comparator function too.

## Example

```js
import distinctUntilChanged from 'callbag-distinct-until-changed'
import forEach from 'callbag-for-each'
import fromIterable from 'callbag-from-iter'
import pipe from 'callbag-pipe'

pipe(
  fromIterable([1, 1, 2, 2, 3, 3, 4, 4]),
  distinctUntilChanged(),
  forEach(value => {
    // will 1 2 3 4
    console.log(value)
  }),
)
```

## Alternatives

* https://github.com/franciscotln/callbag-drop-repeats
