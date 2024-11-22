const PlayerInputComponent = (
    {
        inputType,
        inputName,
        inputLabel,
        inputPlaceholder,
        InputIcon,
        inputValue,
        inputStyle,
        dispatch,
        player,
        other
    }
) => {
    return <div className="relative rounded-md shadow-sm">
        <div className="flex min-h-9">
            <div className="flex items-center flex-none border border-r-0" style={{color: player.color}}>
                <InputIcon className="min-w-12 text-xl"/>
            </div>

            <input
                id={inputName}
                name={inputName}
                type={inputType}
                placeholder={inputPlaceholder}
                defaultValue={inputValue}
                {...inputStyle}
                {...other}
                onChange={({target}) => dispatch(target)}
                className="flex-auto h-auto border-0 border-l-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-none focus:outline-0 sm:text-sm/6"
            />
        </div>
    </div>
}

export default PlayerInputComponent;
