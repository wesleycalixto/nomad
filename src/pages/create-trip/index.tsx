import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './invite-guest-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from '../steps/destination-and-data-step'
import { InviteGuestsStep } from '../steps/invite-guest-step'
import { DateRange } from 'react-day-picker'
import { api } from '../../lib/axios'

export function CreateTripPage() {
    const [isGuestInputOpen, setIGuestInputOpen] = useState(false)
    const [isGuestsModalOpen, setIsGuestModalOpen] = useState(false)
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
    const navigate = useNavigate();
  
    const [emaislToInvite, setEmailsToInvite] = useState(['weslleyezequiel32@gmail.com'])

    const [destination, setDestination] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [ownerEmail, setOwnerEmail] = useState('')
    const [eventStartAdnEndStates, setEventStartAndEndDates] = useState<DateRange | undefined>(undefined);

  
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
    async function createTrip(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        console.log(destination)
        console.log(eventStartAdnEndStates)
        console.log(emaislToInvite)
        console.log(ownerEmail)
        console.log(ownerName)

        if(!destination){
          return
        }

        if(!eventStartAdnEndStates?.from || !eventStartAdnEndStates?.from){
          return
        }

        if(emaislToInvite.length === 0){
          return
        }

        if(!ownerEmail || !ownerName){

        }

         {
          const response = await api.post("/trips", {
            destination,
            starts_at: eventStartAdnEndStates?.from,
            ends_at: eventStartAdnEndStates?.to,
            emails_to_invite: emaislToInvite,
            owner_name: ownerName,
            owner_email: ownerEmail,
          })
          const { tripId } = response.data;
          navigate(`/trips/${tripId}`); 
  }
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-3xl w-full px-6 text-center space-y-10">
          <div className='flex flex-col items-center gap-3'>
            <img src="/logo.svg" alt="nomad" />
            <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua proxima viagem</p>
          </div>
  
          <div className='space-y-4'>
            <DestinationAndDateStep 
            closeGuestInput={closeGuestInput}
            isGuestInputOpen = {isGuestInputOpen}
            openGuestInputOpen={openGuestInputOpen}
            setDestination={setDestination}
            setEventStartAdnEndStates={setEventStartAndEndDates}
            eventStartAdnEndStates={eventStartAdnEndStates}
            />
            {
              isGuestInputOpen && (
                <InviteGuestsStep
                emaislToInvite={emaislToInvite}
                openConfirmTripModal={openConfirmTripModal}
                openGuestModalOpen={openGuestModalOpen}
                />
            )}
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
        setOwnerName={setOwnerName}
        setOwnerEmail={setOwnerEmail}
        />
       )}
  
      </div>
    )
}

}