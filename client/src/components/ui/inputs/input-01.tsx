// @ts-ignore
import {Input} from "@ui/utilities/input";
// @ts-ignore
import {Label} from "@ui/utilities/label";

export default function Input01() {
    return (
        <div className="space-y-2">
            <Label htmlFor="input-01">Simple input</Label>
            <Input id="input-01" placeholder="Email" type="email"/>
        </div>
    );
}
