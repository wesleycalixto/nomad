import {  X, User, Mail,SendHorizonal} from 'lucide-react'
import { FormEvent } from "react";




interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void
    createTrip: (event: FormEvent<HTMLFormElement>) => void;
}


export function ConfirmTripModal({
    closeConfirmTripModal,
    createTrip,
}: ConfirmTripModalProps) {
    return(
        <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Confirmar criação de viagem</h2>
            <button type='button' onClick={closeConfirmTripModal}>
              <X className='size-5 text-zinc-400' />
            </button>
          </div>
          <p className='text-sm text-zinc-400'>Para concluir a criação da viagem para <span className='font-semibold text-zinc-100'>Florianópolis</span>, Brasil nas datas de <span className='font-semibold text-zinc-100'> 16 a 27 de Agosto de 2024</span> reencha seus dados abaixo:.
          </p>
          <form onSubmit={createTrip} className='space-y-3'>
            <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
              <User className='text-zinc-400 size-5' />
              <input
                type="text"
                name='name'
                placeholder="Seu nome completo"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
            </div>
            <div className='py-2.5 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
              <Mail className='text-zinc-400 size-5' />
              <input
                type="email"
                name='email'
                placeholder="Seu e-mail pessoal"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
            </div>
            <button type='submit' className='bg-violet-700 w-full justify-center text-zinc-200 rounded-lg px-5  h-11 font font-medium flex items-center gap-2 hover:bg-violet-50 hover:text-gray-950'>
              Confirmar criação de viagem
              <SendHorizonal className='size-5' />
            </button>
          </form>

        </div>
      </div>
    )
}