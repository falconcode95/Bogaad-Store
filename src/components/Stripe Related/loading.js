import'./sharedcss.css';
import { Link } from 'react-router-dom';

function Loading() {
  return (
    <div className='Loading'>
        <img src={require('../../Projects Images/stripe.png')} alt="" />
        <div  className='loading-line'><div></div></div>
    </div>
  );
}

export default Loading;