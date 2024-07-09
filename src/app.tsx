import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus, User, Mail } from 'lucide-react'
import { FormEvent, useState } from 'react'

export function App() {

  const [isGuestInputOpen, setIGuestInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModal] = useState(false)

  const [emaislToInvite, setEmailsToInvite] = useState(['weslleyezequiel32@gmail.com'])

  function openGuestInputOpen() {
    setIGuestInputOpen(true)
  }

  function closeGuestInput() {
    setIGuestInputOpen(false)
  }

  function openGuestModalOpen() {
    setIsGuestModalOpen(true)
  }

  function cloesGuesModal() {
    setIsGuestModalOpen(false)
  }
  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emaislToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([
      ...emaislToInvite,
      email
    ])

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emaislToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmailList)


  }
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="nomad" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua proxima viagem</p>
        </div>

        <div className='space-y-4'>
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className=" size-5 text-zinc-400" />
              <input disabled={isGuestInputOpen} type="text" placeholder="Para Onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
            </div>
            <div className="flex items-center gap-2" >
              <Calendar className=" size-5 text-zinc-400" />
              <input disabled={isGuestInputOpen} type="text" placeholder="Quando?" className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none" />
            </div>
            <div className='w-px h-6 bg-zinc-800'>
            </div>

            {isGuestInputOpen ? (<button onClick={closeGuestInput} className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font font-medium flex items-center gap-2 hover:bg-zinc-700'>Alterar loca/data
              <Settings2 />
            </button>) : (
              <button onClick={openGuestInputOpen} className='bg-violet-700 text-zinc-200 rounded-lg px-5 py-2 font font-medium flex items-center gap-2 hover:bg-violet-50 hover:text-gray-950'>
                Continuar
                <ArrowRight className='size-5' />
              </button>
            )}
          </div>
          {
            isGuestInputOpen && (
              <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
                <button type='button' onClick={openGuestModalOpen} className="flex items-center gap-2 flex-1 text-left">
                  <UserRoundPlus className=" size-5 text-zinc-400" />
                  <span className='text-zinc-400 text-lg flex-1'>Quem estará na viagem?</span>
                </button>
                <div className='w-px h-6 bg-zinc-800'>
                </div>
                <button onClick={openConfirmTripModal} className='bg-violet-700 text-zinc-200 rounded-lg px-5 py-2 font font-medium flex items-center gap-2 hover:bg-violet-50 hover:text-gray-950'>
                  Confirmar viagem
                  <ArrowRight className='size-5' />
                </button>
              </div>)}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejaer sua viagem pela nomad você automaticamente concorda
          <br /> com os nossos <a className="text-zinc-300 underline" href="#"> termos de uso</a> e <a className="text-zinc-300 underline" href="#">politica de privacidade </a></p>
      </div>

      {isGuestsModalOpen && (
        <div className=' fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Selecionar convidado</h2>
                <button type='button' onClick={cloesGuesModal}>
                  <X className='size-5 text-zinc-400' />
                </button>
              </div>
              <p className='text-sm text-zinc-400'>Os convidados irão receber e-mails para confirmar a participação na viagem.
              </p>
              <div className='flex flex-wrap gap-2 '>
                {
                  emaislToInvite.map(email => {
                    return (
                      <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                        <span className='text-zinc-300'>{email}</span>
                        <button type='button' onClick={() => removeEmailFromInvites(email)}>
                          <X className='size-4 text-zinc-400' />
                        </button>
                      </div>
                    )
                  })
                }
              </div>

              <div className='w-full h-full bg-zinc-800'>

                <form onSubmit={addNewEmailToInvite} className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                  <div className='px-2 flex items-center flex-1 gap-2'>
                    <AtSign className='text-zinc-400 size-5' />
                    <input
                      type="email"
                      name='email'
                      placeholder="Digite o e-mail do convidado"
                      className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
                  </div>
                  <button type='submit' className='bg-violet-700 text-zinc-200 rounded-lg px-5 py-2 font font-medium flex items-center gap-2 hover:bg-violet-50 hover:text-gray-950'>
                    Convidar
                    <Plus className='size-5' />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {isConfirmTripModalOpen &&(   <div className=' fixed inset-0 bg-black/60 flex items-center justify-center'>
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
            <form onSubmit={addNewEmailToInvite} className='space-y-3'>
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
                Convidar
                <Plus className='size-5' />
              </button>
            </form>

          </div>
        </div>
      </div>)
     }

    </div>
  )
}

