import { ArrowRight, Calendar, CheckCircle2, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from 'date-fns';
import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";


interface DestinationAndDateStepProps {
    isGuestInputOpen: boolean
    eventStartAdnEndStates: DateRange | undefined
    closeGuestInput: () => void
    openGuestInputOpen: () => void
    setDestination: (destination: string) => void
    setEventStartAdnEndStates: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep({
    closeGuestInput,
    isGuestInputOpen,
    openGuestInputOpen,
    setDestination,
    setEventStartAdnEndStates,
    eventStartAdnEndStates
    
}: DestinationAndDateStepProps) {

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

   

    function openDatePicker() {
        return setIsDatePickerOpen(true)

    }
    function closeDatePicker() {
        return setIsDatePickerOpen(false)
    }

    const displayedDate = eventStartAdnEndStates && eventStartAdnEndStates.from && eventStartAdnEndStates.to 
    ? format(eventStartAdnEndStates.from, "d 'de' LLL").concat(' até ').concat(format(eventStartAdnEndStates.to, "d' de 'LLL")) 
    : null




    return (<div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
        <div className="flex items-center gap-2 flex-1">
            <MapPin className=" size-5 text-zinc-400" />
            <input disabled={isGuestInputOpen} 
            type="text" 
            placeholder="Para Onde você vai?" 
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            onChange={event => setDestination(event.target.value)} 
            />
        </div>
        <button onClick={openDatePicker} disabled={isGuestInputOpen} className="flex items-center gap-2 text-left w-[240px]" >
            <Calendar className=" size-5 text-zinc-400" />
            <span
                className="text-lg text-zinc-400 w-40 flex-1" >
                {displayedDate || 'Quando?'}
            </span>
        </button>

        {isDatePickerOpen && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                <div className='fixed rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                    <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                            <h2 className='text-lg font-semibold'>Selecione a data </h2>
                            <button type='button' onClick={closeDatePicker}>
                                <X className='size-5 text-zinc-400' />
                            </button>
                        </div>
                    </div>
                    <DayPicker mode="range"  locale={ptBR} selected={eventStartAdnEndStates} onSelect={setEventStartAdnEndStates} disabled={{before: new Date()}}/>
                    <Button onClick={closeDatePicker} variant="primary" size="full">
                        Confirmar
                        <CheckCircle2 />
                    </Button>
                </div>
            </div>
        )}
        <div className='w-px h-6 bg-zinc-800'>
        </div>

        {isGuestInputOpen ? (<Button onClick={closeGuestInput} variant="secondary" >
            <Settings2 />
            Alterar local/data
        </Button>) : (
            <Button onClick={openGuestInputOpen} variant="primary" >
                Continuar
                <ArrowRight />
            </Button>
        )}
    </div>)
}