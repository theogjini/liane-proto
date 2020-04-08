import React from 'react';
import { Link } from 'react-router-dom';

export default function LianaLink(props) {
    return (<div>
        <Link to={'/chatroom/' + props.travel._chatroomId}>
            Go to Chatroom
        </Link>
    </div>
    );
}