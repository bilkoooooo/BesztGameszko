import {Input} from '@ui/input'

export default function Player({player, playerSymbol, isEditing, setPlayer}) {
  const {color, name} = player;
  const editForm = () => {

    return (
      <div className="flex gap-5 ">
        {color}

        <Input className="basis-2/3" placeholder={"Player name"} style={{color: color}}/>
        <Input className="basis-1/3"
               type="color"
               value={color}
               placeholder={"Player color"}
               onBlur={(event) => setPlayer({type: 'colorChange', value: event.target.value})}/>
      </div>
    )
  }

  const playerData = () => (<div>
    <span style={{color: color}}> {name}</span>
  </div>)

  return (
    <div className={"basis-1/3"}>
      {isEditing || !name ? editForm() : playerData()}
    </div>
  )
}

