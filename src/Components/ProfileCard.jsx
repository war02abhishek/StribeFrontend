import React from 'react'

const ProfileCard = (props) => {
    console.log(props);
    const url = `https://avatars.dicebear.com/api/male/${props.props.id}.svg`;

    return (

        props &&

        <div className="card">
            <div className="card-image">
                <img src={url} alt="person" />
            </div>
            <div className="card-content">
                <h2>{props.props.name}</h2>
                <p>Age: {props.props.age}</p>
                <p>{props.props.body}</p>
            </div>
        </div>
    )
}

export default ProfileCard