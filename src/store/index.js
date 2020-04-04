import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './modules/'
import thunk from 'redux-thunk'
import { requestsPromiseMiddleware } from 'redux-saga-requests'
import createSaga from 'redux-saga'
import { createRequestInstance, watchRequests } from 'redux-saga-requests'
import { createDriver } from 'redux-saga-requests-axios'
import axios from 'axios'
import { createLogger } from 'redux-logger'

axios.defaults.baseURL = 'http://localhost:8000/api/'

function* rootSaga() {
    yield createRequestInstance({ driver: createDriver(axios) })
    yield watchRequests()
}

const saga = createSaga()
const logger = createLogger({ collapsed: true})

const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk, requestsPromiseMiddleware({ auto: true}), saga, logger),
        // offline(offlineConfig),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    )

saga.run(rootSaga)

export default store