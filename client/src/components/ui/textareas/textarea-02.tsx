// @ts-ignore
import {Label} from "@/components/ui/utilities/label";
// @ts-ignore
import {Textarea} from "@/components/ui/utilities/textarea";

export default function Textarea02({onInput}) {
    return (
        <div className="space-y-2 text-black" >
            <Textarea id="textarea-02" onKeyDown={onInput} placeholder="Leave a message" required/>
        </div>
    );
}
