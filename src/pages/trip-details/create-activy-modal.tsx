import { Calendar, CircleCheck, X, Tag,} from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";


interface CreateActivyModalProps{
    closeCreateActivyModal:() => void
}

export function CreateActivyModal({
    closeCreateActivyModal
}:CreateActivyModalProps){

    const{tripId} = useParams()

    async function createActivy(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const title = data.get('title')?.toString();
        const occurs_at = data.get('occurs_at')?.valueOf();

       await api.post(`/trips/${tripId}/activities`, {  
        title,
        occurs_at
    })
       closeCreateActivyModal()

    }
    return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className='w-[640px] fixed rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-lg font-semibold'>Cadastrar atividade</h2>
                    <button type='button' onClick={closeCreateActivyModal}>
                        <X className='size-5 text-zinc-400' />
                    </button>
                </div>
                <p className='text-sm text-zinc-400'>Todos convidados podem visualizar as atividades.
                </p>
                <form  onSubmit={createActivy} className='space-y-3'>
                    <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                        <Tag className='text-zinc-400 size-5' />
                        <input
                            type="text"
                            name='title'
                            placeholder="Qual a atividade"
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
                    </div>
                    <div className=" flex items-center gap-2">
                        <div className='h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                            <Calendar className='text-zinc-400 size-5' />
                            <input
                                type="datetime-local"
                                name='occurs-ett'
                                placeholder="Data e horario da atividade"
                                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
                        </div>
                    </div>
                    <Button variant="primary" size="full">
                        Salvar atividade
                        <CircleCheck className="size-5"/>
                        </Button>
                </form>
            </div>
        </div>
    </div>
    )
}