import Slim from '../../../src/slim'

it(`parameters with store creating should be a plainObject`, () => {
  const state = {
    emit: false
  }

  const store = Slim.createStore({
    reducers: {},
    state
  })

  Slim.on('__SLIM_DEVTOOL_ANSWER__', (state) => {
    store.dispatch('__SLIM_DEVTOOL_SET__', state)
  })

  const w = new Promise(resolve => {
    setTimeout(() => {
      window.postMessage(JSON.stringify({
        type: '__SLIM_DEVTOOL_INIT__',
      }), '*')
      window.postMessage(JSON.stringify({
        type: '__SLIM_DEVTOOL_ANSWER__',
        state: {
          emit: true
        }
      }), '*')

      setTimeout(() => {
        resolve(store.state.emit)
      })
    })
  })
  return w.then((s) => {
    expect(s).toBe(true)
  })
})

