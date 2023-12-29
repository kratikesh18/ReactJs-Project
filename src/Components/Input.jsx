import React, {forwardRef, useId} from 'react'

const Input = forwardRef(function Input({
    label, 
    type ="text",
    className = "",
    ...props
}, ref){


    const id = useId()
    return (
        <div className={`flex w-full justify-between ${className}`}>
            {label && <label 
            className='font-bold text-lg'
            htmlFor={id}>
                {label}
            </label>
            }
            <input type={type}
                className={` border-black rounded-md bg-transparent border px-2 ${className}`}
                ref={ref}
                {...props}
                id={id}
            /> 
        </div>
    )
})

export default Input