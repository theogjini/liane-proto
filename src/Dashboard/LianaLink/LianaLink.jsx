import React from 'react';
import { Link } from 'react-router-dom';

export default function LianaLink(props) {
    return (<div>
        <Link to={{
            pathname: '/chatroom/' + props.travel._chatroomId,
            state: {
                travel: props.travel
            }
        }}>
            Go to Chatroom
        </Link>
    </div>
    );
}