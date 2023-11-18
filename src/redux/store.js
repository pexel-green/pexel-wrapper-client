import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { imageValidationApi } from './services/imageValidation'
import { imageSASURIGeneration } from './services/imageSASGenerate'
import { authService } from './services/authService'
import { userSlice } from './user'
import { blobService } from './services/mediaDataService'
import { searchImage } from './services/searchCognitive'
import { azureBlobService } from './services/azureBlobService'
import { userService } from './services/userService'


export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        // Add the generated reducer as a specific top-level slice
        [imageValidationApi.reducerPath]: imageValidationApi.reducer,
        [imageSASURIGeneration.reducerPath]: imageSASURIGeneration.reducer,
        [azureBlobService.reducerPath]: azureBlobService.reducer,
        [authService.reducerPath]: authService.reducer,
        [blobService.reducerPath]: blobService.reducer,
        [searchImage.reducerPath]: searchImage.reducer,
        [userService.reducerPath]: userService.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([imageValidationApi.middleware, imageSASURIGeneration.middleware, azureBlobService.middleware, authService.middleware, blobService.middleware, searchImage.middleware, userService.middleware]),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)