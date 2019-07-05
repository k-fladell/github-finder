import React, {useState} from 'react'
import PropTypes from 'prop-types';


const Search = ({searchUsers, showClear, clearUsers, setAlert}) => {
    const [text, setText] = useState(''); //default value

    //now that we have refactored this to a function component
    //in order to have functions within a function componenet we must use const
    const onChange = (e) => {
        setText(e.target.value);
        //if we had multiple inputs here, instead of having multiple onChange methods for each input
        //we could instead use this.setState({[e.target.name]: e.target.value})
        //in this case, the name of our input 'text' matches the name of our state field 'text'
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(text === ''){
            setAlert('Please enter something', 'light');
        }else{
            searchUsers(text);
            setText('');
        }
    }
        return (
            <div>
                <form onSubmit={onSubmit} className="form">
                    <input type="text" name="text" placeholder="Search Users..." value={text} onChange={onChange}/>
                    <input type="submit" value="Search" className="btn btn-dark btn-block"/>
                </form>
                {showClear ? <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button> : ''}
                
            </div>
        )
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
};

export default Search
