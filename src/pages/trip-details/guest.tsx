import { CheckCircle, CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Participants {
    id: string
    name: string | null
    email: string
    is_confirmed: boolean
}

export function Guest() {
    const { tripId } = useParams()
    const [participants, setParticipants] = useState<Participants[] | []>()

    useEffect(() => {
        api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
    }, [tripId])


    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>
            <div className="space-y-5">
            {participants?.map ((participants, index) => {
                return (
                    <div key= {participants.id} className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                            <span className="block font-medium text-zinc-100">{participants.name ?? `Convidado ${index}`}</span>
                            <span className="block text-sm text-zinc-400 text-sm truncate">
                                {participants.email}</span>
                        </div>
                        {participants.is_confirmed ? (
              <CheckCircle2 className="text-green-400 size-5 shrink-0" />
            ) : (
              <CircleDashed className="text-zinc-400 size-5 shrink-0" />
            )}
                    </div>
                
                )
            }) }
            <button className=' w-full bg-zinc-800 text-zinc-200 rounded-lg px-5 h-11 font justify-center font-medium flex items-center gap-2 hover:bg-zinc-700'>
                <UserCog />
                Gerenciar convidados
            </button>
        </div>
        </div>
    )
}