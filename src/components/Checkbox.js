function Checkbox(props){
    const {value,onChange} = props;

    return (
        <>
            <input type="checkbox" class="mr-4 w-[20px] h-[20px] accent-[#E3F2FD]" checked={value} onChange={onChange}/>
        </>
    )
}

export default Checkbox;