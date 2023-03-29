import React ,{useState, useEffect} from 'react';



function Search(props){

    const [query, setquery] = useState('');

    function handleonchange(){
        props.onSearchHandler(query); 
    }


    useEffect(() => {
        const timeOutId = setTimeout(() => handleonchange(), 500);
        return () => clearTimeout(timeOutId);
        // eslint-disable-next-line
    }, [query]);



   


    return(
        <input type="text"
               className="w-full bg-transparent text-gray-300 outline-0"
               placeholder="Another Location"
               onChange={event => setquery(event.target.value)}
        />
    )
}
export default Search;