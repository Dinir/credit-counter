/**
 * Get a query map based on a query string.
 *
 * The function will populate a map variable with key value pairs of the parameters.
 *
 * If there is more than one of the same key, the function will populate an array in the map with the multiple values within it.
 *
 * Forked from {@link https://gist.github.com/MatthewDaniels/388fa1e0c02613f103f00a504ed58c55 MatthewDaniels/parse-query-parameters-into-a-map.js}.
 *
 * @param {?string} [query=window.location.search]
 * The query string - the question mark is optional
 * @return {map}
 * key value pairs of the parameter / value of the parameter
 */
 const getQueryMap = (query = window.location.search) => {
  if (typeof query !== 'string') {
    return null
  }

  const toType = v =>
    ({}).toString.call(v).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
  const map = new Map()

  query.replace(/([^&|\?=]+)=?([^&]*)(?:&+|$)/g, (_match, key, value) => {
    if (map.has(key)) {
      // the key already exists, so we need to check if it is an array,
      // if not, make it an array and add the new value
      if (toType(map.get(key)) !== 'array') {
        // it's not an array - make it an array
        map.set(key, [map.get(key)])
      }
      // push the new value into the array
      map.get(key).push(value)
    } else {
      // put the value into the map
      map.set(key, value)
    }
  })

  return map
}
