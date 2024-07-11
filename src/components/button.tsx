import { ComponentProps, ReactNode } from "react";
import {tv, VariantProps}from 'tailwind-variants'


const buttonVariants = tv({
    base: 'rounded-lg px-5 py-2 font font-medium flex items-center gap-2 ',

    variants:{
        variant:{
            primary: ' bg-violet-700 text-zinc-200 hover:bg-violet-50 hover:text-gray-950',
            secondary:'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
        },

        size:{
            default: 'py-2',
            full: 'w-full h-11 justify-center'
        }
    },

    defaultVariants:{
        variant: 'primary',
        size: 'default',
    }
})

interface ButtonProps extends ComponentProps<'button'>,VariantProps<typeof buttonVariants>{
    children: ReactNode
}

export function Button({children,variant,size, ...props}: ButtonProps){
    return(
        <button  {...props}className={buttonVariants({variant, size})}>
        {children}
    </button>
    )
}