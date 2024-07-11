import { Calendar, MapPin, Plus, Settings2 } from "lucide-react";
import { useState } from "react";
import { CreateActivyModal } from "./create-activy-modal";
import { ImportantLinks } from "./important-links";
import { Guest } from "./guest";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date=header";



export function TripDetaoilsPage() {

const [isCreateActivyModalOpen, setIsCreateActivyModalOpen] = useState(false)

function openCreateActivyModal() {
setIsCreateActivyModalOpen(true)

}

function closeCreateActivyModal() {
setIsCreateActivyModalOpen(false)
}
return (
<div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
<DestinationAndDateHeader />
<main className="flex gap-16 px-4">
    <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button onClick={openCreateActivyModal} className='bg-violet-700 text-zinc-200 rounded-lg px-5 py-2 font font-medium flex items-center gap-2 hover:bg-violet-50 hover:text-gray-950'>
                Cadastrar atividade
                <Plus className='size-5' />
            </button>
        </div>

        <Activities />
    </div>

    <div className="w-80 space-y-6 ">
        <ImportantLinks />

        <div className='w-full h-px bg-zinc-800' />
        <Guest />
    </div>
</main>
{isCreateActivyModalOpen && (

    <CreateActivyModal closeCreateActivyModal={closeCreateActivyModal}
    />
)}
</div>
)
}