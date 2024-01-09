import React, {forwardRef, useId} from 'react'

const Input = forwardRef(function Input({
    label, 
    type ="text",
    className = "",
    isEditable = true,
    ...props
}, ref){


    const id = useId()
    return (
        <div className={className? className: "`flex w-full justify-between "}>

            {label && <label 
            className='font-bold text-base md:text-lg'
            htmlFor={id}>
                {label}
            </label>
            }
            <input type={type}
                className={`
                border-zinc-800 rounded-md bg-transparent border px-2 w-[70%] `}

                ref={ref}
                {...props}
                id={id} 
            /> 
        </div>
    )
})

export default Input