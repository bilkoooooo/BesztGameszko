import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react'
import {useContext, useState} from "react";
import {IoIosColorPalette} from "react-icons/io";
import {FaUserCircle} from "react-icons/fa";
import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import PlayerInputComponent from "@ui/PlayerInputComponent";
import {PlayerContext} from "@/services/PlayerProvider";

export default function JoinModalComponent({setIsJoined}) {
  const {player, dispatch} = useContext(PlayerContext);
  const [error, setError] = useState('');

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  const onJoin = () => {
    if (!player.name) {
      setError('PLayername is required');
      return false;
    }

    setError('');

    setIsJoined(true);
  }

  const [open, setOpen] = useState(true)

  return (
    <Dialog open={true} onClose={setOpen} className="relative z-10"
            onKeyDown={(e) => e.key === "Enter" ? onJoin() : void (0)}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex-grow">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Enter Username
                    {error ? <p className="text-red-500 font-bold text-xs flex gap-2"><ExclamationTriangleIcon
                      height={20}/> {error}</p> : ''}
                  </DialogTitle>
                  <div className="mt-2 text-gray-600 flex gap-4">
                    {PlayerInputComponent({
                      inputType: 'text',
                      inputName: 'name',
                      inputLabel: 'Enter playername',
                      inputPlaceholder: 'Playername',
                      InputIcon: FaUserCircle,
                      inputValue: player.name,
                      inputStyle: {style: {color: player.color}},
                      dispatch,
                      player
                    })}
                    {PlayerInputComponent({
                      inputType: 'color',
                      inputName: 'color',
                      inputLabel: 'Enter playername',
                      inputPlaceholder: '',
                      InputIcon: IoIosColorPalette,
                      inputValue: getRandomColor(),
                      inputStyle: {style: {padding: 0, outline: 0}},
                      dispatch,
                      player
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => onJoin()}
                className="inline-flex w-full justify-center transition-shadow rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 sm:ml-3 sm:w-auto">
                Join
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )

}
