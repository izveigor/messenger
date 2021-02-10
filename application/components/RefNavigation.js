import { createRef } from 'react'

const navigationRef = createRef();

function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export {
    navigationRef,
    navigate
}
