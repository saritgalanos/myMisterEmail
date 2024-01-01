import { useState } from "react"
import { useEffectUpdate } from "./useEffectUpdate"

export function useForm(initialState, cb) {
    const [fields, setFields] = useState(initialState)

    useEffectUpdate(() => {
        cb(fields)
    }, [fields])
   

    function handleChange({ target }) {
        let { name: field, value, type } = target
        if (type === 'number') value = +value
        setFields(prevFilter => ({ ...prevFilter, [field]: value }))
        
    }

    return [fields, handleChange]


}
