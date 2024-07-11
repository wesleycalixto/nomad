import { ArrowRight, UserRoundPlus, } from "lucide-react";
import { Button } from "../../components/button";

interface InviteGuestsStepProps {
    openGuestModalOpen: () => void
    openConfirmTripModal: () => void
    emaislToInvite: string[]
}


export function InviteGuestsStep({
    emaislToInvite,
    openConfirmTripModal,
    openGuestModalOpen
}: InviteGuestsStepProps) {
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <button type='button' onClick={openGuestModalOpen} className="flex items-center gap-2 flex-1 text-left">
                <UserRoundPlus className=" size-5 text-zinc-400" />
                {emaislToInvite.length > 0 ? (
                    <span className='text-zinc-100 text-lg flex-1' >
                        {emaislToInvite.length} pessoas(s) convidada(s)
                    </span>
                ) : (
                    <span className='text-zinc-400 text-lg flex-1'>Quem estará na viagem?</span>
                )}
            </button>
            <div className='w-px h-6 bg-zinc-800'>
            </div>
            <Button onClick={openConfirmTripModal} variant="primary" >
            Continuar
            <ArrowRight />
        </Button>
        </div>
    )
}