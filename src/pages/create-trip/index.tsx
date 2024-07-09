import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './invite-guest-modal'
import { ConfirmTripModal } from './confirm-trip-modal'

export function CreateTripPage() {
    const [isGuestInputOpen, setIGuestInputOpen] = useState(false)
    const [isGuestsModalOpen, setIsGuestModalOpen] = useState(false)
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
    const navigate = useNavigate();
  
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
    function createTrip(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        navigate('/trips/123')
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
                    {emaislToInvite.length > 0 ? (
                      <span className='text-zinc-100 text-lg flex-1' >
                        {emaislToInvite.length} pessoas(s) convidada(s)
                      </span>
                    ) : (
                      <span className='text-zinc-400 text-lg flex-1'>Quem estará na viagem?</span>
                    ) }
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
       <InviteGuestsModal
       emaislToInvite={emaislToInvite}
       addNewEmailToInvite={addNewEmailToInvite}
       cloesGuesModal={cloesGuesModal}
       removeEmailFromInvites={removeEmailFromInvites}

       
       />
        )}
        {isConfirmTripModalOpen &&(   
     
        <ConfirmTripModal
        closeConfirmTripModal={closeConfirmTripModal}
        createTrip={createTrip}
        />
       )}
  
      </div>
    )
}

