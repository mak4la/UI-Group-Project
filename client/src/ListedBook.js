export default function ListedBook({id, name, image}){

    return(
        <div> 
            <img src={image} alt="test" width="75" height="100"></img>
            <div>
                <a href="/lists/1/1" className="temp-hyperlink">
                    {name}
                </a>
            </div>
            
        </div>
    )
}