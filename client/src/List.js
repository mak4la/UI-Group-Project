import './Lists.css';

export default function List({id, name}){

    const handleDelete = () =>{
        console.log("hit delete button")
    }

    return(
        <div> 
            <h1>
                <a href="/lists/1" className="temp-hyperlink">{name}</a>
            </h1>
            <p>Number of Books: </p>
            <button className='deleteList' onClick={handleDelete}>DELETE</button>
        </div>
    )
}


/*

<>
<div classname="listsArray">hello</div>
  <div className="lists-page">
    <header className="lists-header">
      <h1 className="lists-title">Your Lists</h1>
    </header>

    <div classname="listsArray">
      <p>HELLO</p>
    </div>

    <div classname="lists-array">
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder="Enter a list name"></input>
        <button type='submit'>Add List</button>
      </form>
      {sample_lists.map( list => (
        <List key={list.id} id={list.id} name={list.name}/> 
      ))}
    </div>
  </div>
</>
*/