// @ts-ignore
import {RadioGroup, RadioGroupItem} from "@ui/utilities/radio-group";
import {useContext, useEffect, useRef} from "react";
// @ts-ignore
import {PlayerContext} from '@/services/PlayerProvider';

export default function Radio07({onChange}) {
    const groupRef = useRef(null);
    // @ts-ignore
    const {player} = useContext(PlayerContext);
    useEffect(() => {
        const colorElem = groupRef.current.querySelector(player.color ? `button[value="${player.color}"]` : 'button');
        colorElem.click();
        onChange({target: colorElem});
    }, [groupRef])

    return (
        <fieldset
            className="space-y-4"
            onClick={onChange}
            ref={groupRef}
        >
            <RadioGroup
                className="flex gap-1.5 [&>button>span]:text-white"
                defaultValue="blue"
            >
                <RadioGroupItem
                    value="rgb(59 130 246)"
                    id="radio-07-blue"
                    aria-label="Blue"
                    className="size-6 border-blue-500 bg-blue-500 shadow-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
                    data-state="checked"
                />
                <RadioGroupItem
                    value="rgb(99 102 241)"
                    id="radio-07-indigo"
                    aria-label="Indigo"
                    className="size-6 border-indigo-500 bg-indigo-500 shadow-none data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500"
                />
                <RadioGroupItem
                    value="rgb(236 72 153)"
                    id="radio-07-pink"
                    aria-label="Pink"
                    className="size-6 border-pink-500 bg-pink-500 shadow-none data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500"
                />
                <RadioGroupItem
                    value="rgb(239 68 68)"
                    id="radio-07-red"
                    aria-label="red"
                    className="size-6 border-red-500 bg-red-500 shadow-none data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500"
                />
                <RadioGroupItem
                    value="rgb(249 115 22)"
                    id="radio-07-orange"
                    aria-label="orange"
                    className="size-6 border-orange-500 bg-orange-500 shadow-none data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500"
                />
                <RadioGroupItem
                    value="rgb(234 179 8)"
                    id="radio-07-yellow"
                    aria-label="yellow"
                    className="size-6 border-yellow-500 bg-yellow-500 shadow-none data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-500"
                />
                <RadioGroupItem
                    value="rgb(34 197 94)"
                    id="radio-07-green"
                    aria-label="green"
                    className="size-6 border-green-500 bg-green-500 shadow-none data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500"
                />
            </RadioGroup>
        </fieldset>
    );
}
