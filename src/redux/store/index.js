import {init} from '@rematch/core';
import models from '../models/index';

const store = init({
    models,
})

export default store;